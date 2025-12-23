'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Languages } from 'lucide-react';

/**
 * LanguageSwitcher - Toggles between Arabic and English
 * Updated to maintain scroll position when switching languages
 */
export default function LanguageSwitcher({ locale }: { locale: string }) {
    const t = useTranslations('language');
    const pathname = usePathname();
    const router = useRouter();
    const nextLocale = locale === 'ar' ? 'en' : 'ar';

    const handleLanguageSwitch = () => {
        // Save current scroll position
        const scrollY = window.scrollY;

        // Switch locale while maintaining the current path
        router.replace(pathname, { locale: nextLocale });

        // Restore scroll position after navigation
        setTimeout(() => {
            window.scrollTo({ top: scrollY, behavior: 'instant' });
        }, 50);
    };

    return (
        <button
            onClick={handleLanguageSwitch}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-600 text-slate-300 hover:border-white hover:text-white transition-[border-color,color] duration-200 text-sm"
        >
            <Languages size={16} />
            <span>{t('switch')}</span>
        </button>
    );
}
