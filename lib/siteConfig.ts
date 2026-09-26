const contactPage = '/contact';
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;

export const siteConfig = {
    name: 'Ghulam Muneer Uddin',
    domain: process.env.NEXT_PUBLIC_APP_URL || 'https://muneerdev.com',
    socials: {
        github: process.env.NEXT_PUBLIC_GITHUB_URL,
        twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
        linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
        facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
        instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    },
    contact: {
        email: 'contact@muneer.dev',
        booking: {
            link: bookingUrl || contactPage,
            label: bookingUrl ? 'Schedule a Meeting' : 'Contact',
        },
        whatsapp: {
            link: whatsappUrl || contactPage,
            label: whatsappUrl ? 'WhatsApp' : 'Contact',
            formatted: whatsappUrl ? 'WhatsApp' : 'Contact',
        },
    },
};