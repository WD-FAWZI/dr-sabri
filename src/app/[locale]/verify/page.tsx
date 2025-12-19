import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import VerifyPageContent from '@/components/verify/VerifyPageContent';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'verify' });

    return generatePageMetadata({
        locale,
        title: t('title'),
        description: t('subtitle'),
        path: '/verify',
    });
}

export default async function VerifyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <VerifyPageContent locale={locale} />;
}
