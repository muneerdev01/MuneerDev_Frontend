const contactPage = '/contact';
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

// Public contact details. Each can be overridden with a NEXT_PUBLIC_* variable in Vercel.
const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    'https://wa.me/923151304012?text=Hello%20Muneer%2C%20I%20found%20you%20on%20muneerdev.com';

export const siteConfig = {
    name: 'Ghulam Muneer Uddin',
    domain: process.env.NEXT_PUBLIC_APP_URL || 'https://muneerdev.com',
    socials: {
        github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/muneerdev01',
        twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/DevMuneerAi',
        linkedin:
            process.env.NEXT_PUBLIC_LINKEDIN_URL ||
            'https://www.linkedin.com/in/ghulam-muneer-uddin-57871b3b4/',
        facebook:
            process.env.NEXT_PUBLIC_FACEBOOK_URL ||
            'https://www.facebook.com/profile.php?id=61585046272340',
        instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/muneerdev/',
    },
    contact: {
        // Set NEXT_PUBLIC_CONTACT_EMAIL in Vercel once your muneerdev.com mailbox exists
        email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'muneer.dev01@gmail.com',
        booking: {
            link: bookingUrl || contactPage,
            label: bookingUrl ? 'Schedule a Meeting' : 'Contact',
        },
        whatsapp: {
            link: whatsappUrl,
            label: 'WhatsApp',
            formatted: '+92 315 1304012',
        },
    },
};
