import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Tajawal, Inter } from 'next/font/google';
import '../globals.css';

// Arabic font - Tajawal (optimized for Arabic text)
const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['400', '500', '700'],
    display: 'swap',
    variable: '--font-tajawal',
});

// English font - Inter (clean, modern)
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
    variable: '--font-inter',
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Google Analytics Tracking ID (set in environment variables)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'ar' | 'en')) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    // Use Tajawal for Arabic, Inter for English
    const fontClass = locale === 'ar'
        ? `${tajawal.variable} font-arabic`
        : `${inter.variable} font-sans`;

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={fontClass}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0f172a" />

                {/* Google Analytics - Only loads if GA_ID is set */}
                {GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `}
                        </Script>
                    </>
                )}
            </head>
            <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
