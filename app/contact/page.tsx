import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Get in Touch',
  description:
    'Work with Ghulam Muneer Uddin: full-stack development, data analytics, healthcare automation and AI integration. Send an inquiry or message on WhatsApp.',
};

export default function Page() {
  return <ContactPage />;
}
