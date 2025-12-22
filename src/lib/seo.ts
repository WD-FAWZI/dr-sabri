import { Metadata } from 'next';

interface MetadataParams {
    locale: string;
    title: string;
    description: string;
    path?: string;
}

const SITE_URL = 'https://dr-sabri.vercel.app';

/**
 * Generate metadata for pages with i18n support
 */
export async function generatePageMetadata({
    locale,
    title,
    description,
    path = '',
}: MetadataParams): Promise<Metadata> {
    const baseUrl = SITE_URL;
    const url = `${baseUrl}/${locale}${path}`;

    return {
        title,
        description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: url,
            languages: {
                ar: `${baseUrl}/ar${path}`,
                en: `${baseUrl}/en${path}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: locale === 'ar' ? 'د. صبري أبو قرون' : 'Dr. Sabri Abu Quron',
            locale: locale === 'ar' ? 'ar_SA' : 'en_US',
            type: 'website',
            images: [
                {
                    url: `${baseUrl}/images/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'د. صبري أبو قرون - مدرب طبي' : 'Dr. Sabri Abu Quron - Medical Mentor',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${baseUrl}/images/og-image.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

/**
 * Generate Person structured data for Dr. Sabri
 */
export function generatePersonStructuredData(locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: locale === 'ar' ? 'د. صبري أبو قرون' : 'Dr. Sabri Abu Quron',
        jobTitle: locale === 'ar' ? 'مدرب طبي' : 'Medical Educator',
        description:
            locale === 'ar'
                ? 'مدرب طبي متخصص في التعليم الطبي والتحضير للامتحانات العالمية'
                : 'Medical educator specialized in medical education and international exam preparation',
        affiliation: {
            '@type': 'Organization',
            name: 'Dr. Sabri Abu Quron Training Center (STC)',
            url: 'https://www.stc.training',
        },
        url: locale === 'ar' ? `${SITE_URL}/ar` : `${SITE_URL}/en`,
        image: `${SITE_URL}/images/dr-sabri.jpg`,
    };
}

/**
 * Generate Organization structured data for STC
 */
export function generateOrganizationStructuredData(locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Dr. Sabri Abu Quron Training Center (STC)',
        alternateName: locale === 'ar' ? 'مركز د. صبري أبو قرون للتدريب' : 'STC',
        url: 'https://www.stc.training',
        logo: `${SITE_URL}/images/dr-sabri.jpg`,
        description:
            locale === 'ar'
                ? 'مركز تدريب طبي متخصص في التحضير للامتحانات العالمية والمهارات السريرية'
                : 'Medical training center specialized in international exam preparation and clinical skills',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'SD',
        },
    };
}
