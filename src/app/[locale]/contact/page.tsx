import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return generatePageMetadata({
        locale,
        title: locale === 'ar' ? 'اتصل بنا - د. صبري أبو قرون' : 'Contact Us - Dr. Sabri Abu Quron',
        description: locale === 'ar'
            ? 'تواصل معنا للاستفسارات والملاحظات. نحن هنا لمساعدتك.'
            : 'Get in touch with us for inquiries and feedback. We are here to help.',
        path: '/contact',
    });
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} />

            <main className="min-h-screen bg-slate-900 pt-32 pb-20">
                {/* Background Gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"
                    />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="glass-card rounded-3xl p-8 md:p-12">
                        <ContactForm locale={locale} />
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </>
    );
}
