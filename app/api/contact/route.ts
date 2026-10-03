// POST /api/contact  ->  sends the inquiry email via Resend (HTTPS, no SMTP, no Render needed)
export const runtime = 'nodejs';

const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(req: Request) {
    let data: Record<string, unknown>;
    try {
        data = await req.json();
    } catch {
        return json({ detail: 'Invalid request.' }, 400);
    }

    const name = String(data.name ?? '').trim().slice(0, 100);
    const email = String(data.email ?? '').trim().slice(0, 200);
    const subject = String(data.subject ?? 'New Contact Inquiry').trim().slice(0, 200);
    const message = String(data.message ?? '').trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ detail: 'Please enter a valid name, email and message.' }, 422);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not set');
        return json({ detail: 'Email service is not configured. Please email me directly.' }, 503);
    }

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(15000),
            body: JSON.stringify({
                // After verifying muneerdev.com in Resend, set RESEND_FROM="Portfolio <contact@muneerdev.com>"
                from: process.env.RESEND_FROM || 'Portfolio <contact@muneerdev.com>',
                // With onboarding@resend.dev this must be the email your Resend account was created with
                to: [process.env.CONTACT_TO_EMAIL || 'muneer.dev01@gmail.com'],
                reply_to: email,
                subject: `[Portfolio] ${subject}`.slice(0, 250),
                html: `<div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2 style="color:#10b981">New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Subject:</strong> ${esc(subject)}</p>
          <div style="background:#f3f4f6;padding:15px;border-radius:8px;white-space:pre-wrap">${esc(message)}</div>
        </div>`,
            }),
        });

        if (!res.ok) {
            // Visible in Vercel -> Logs; includes the lead so nothing is lost
            console.error('Resend error', res.status, await res.text(), { name, email, message });
            return json({ detail: 'Could not send your message right now. Please try again shortly.' }, 502);
        }
        return json({ status: 'success', message: 'Your message has been sent.' });
    } catch (err) {
        console.error('Resend request failed', err, { name, email, message });
        return json({ detail: 'Could not send your message right now. Please try again shortly.' }, 502);
    }
}
