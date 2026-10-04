// POST /api/contact -> email via Resend (HTTPS). Includes honeypot, rate limit, optional reCAPTCHA v3.
export const runtime = 'nodejs';

const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (body: unknown, status = 200) => Response.json(body, { status });

// Best-effort rate limit: 5 messages / 10 min per IP (per serverless instance)
const hits = new Map<string, number[]>();
function limited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 2000) hits.clear();
    return recent.length > 5;
}

async function recaptchaOk(token: string, secret: string) {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(8000),
    });
    const v = await res.json();
    return Boolean(v.success) && (v.score ?? 0) >= 0.5;
}

export async function POST(req: Request) {
    let data: Record<string, unknown>;
    try {
        data = await req.json();
    } catch {
        return json({ detail: 'Invalid request.' }, 400);
    }

    // Honeypot: real users never fill this hidden field. Pretend success so bots move on.
    if (String(data.website ?? '').trim() !== '') {
        return json({ status: 'success', message: 'Your message has been sent.' });
    }

    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (limited(ip)) {
        return json({ detail: 'Too many messages. Please try again in a few minutes.' }, 429);
    }

    const name = String(data.name ?? '').trim().slice(0, 100);
    const email = String(data.email ?? '').trim().slice(0, 200);
    const subject = String(data.subject ?? 'New Contact Inquiry').trim().slice(0, 200);
    const message = String(data.message ?? '').trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ detail: 'Please enter a valid name, email and message.' }, 422);
    }

    // reCAPTCHA v3 is enforced only when RECAPTCHA_SECRET_KEY is set
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (secret) {
        try {
            const token = String(data.recaptchaToken ?? '');
            if (!token || !(await recaptchaOk(token, secret))) {
                return json({ detail: 'Spam check failed. Please refresh the page and try again.' }, 400);
            }
        } catch (err) {
            console.error('reCAPTCHA verification error', err);
            return json({ detail: 'Spam check unavailable. Please try again shortly.' }, 502);
        }
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
                from: process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>',
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
            console.error('Resend error', res.status, await res.text(), { name, email, message });
            return json({ detail: 'Could not send your message right now. Please try again shortly.' }, 502);
        }
        return json({ status: 'success', message: 'Your message has been sent.' });
    } catch (err) {
        console.error('Resend request failed', err, { name, email, message });
        return json({ detail: 'Could not send your message right now. Please try again shortly.' }, 502);
    }
}
