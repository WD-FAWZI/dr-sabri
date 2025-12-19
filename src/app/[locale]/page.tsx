import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import NetworkBackground from '@/components/ui/NetworkBackground';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Philosophy from '@/components/home/Philosophy';
import Partners from '@/components/home/Partners';
import Footer from '@/components/layout/Footer';
import { generatePageMetadata, generatePersonStructuredData, generateOrganizationStructuredData } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'hero' });

    return generatePageMetadata({
        locale,
        title: locale === 'ar'
            ? 'د. صبري أبو قرون - مرشد طبي'
            : 'Dr. Sabri Abu Quron - Medical Mentor',
        description: t('subheadline'),
        path: '',
    });
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const personData = generatePersonStructuredData(locale);
    const organizationData = generateOrganizationStructuredData(locale);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />

            {/* Fixed Navbar */}
            <Navbar locale={locale} />

            {/* Main Content */}
            <main className="relative min-h-screen">
                {/* Interactive Background */}
                <NetworkBackground />

                {/* Content */}
                <div className="relative z-10">
                    <Hero locale={locale} />
                    <Philosophy locale={locale} />
                    <Partners locale={locale} />
                </div>
            </main>

            {/* Footer */}
            <Footer locale={locale} />
        </>
    );
}
