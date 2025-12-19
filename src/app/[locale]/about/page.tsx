import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import AboutPageContent from '@/components/about/AboutPageContent';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    return generatePageMetadata({
        locale,
        title: t('title'),
        description: t('subtitle'),
        path: '/about',
    });
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <AboutPageContent locale={locale} />;
}
