'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

export default function NetworkStatusBanner() {
    const [isOnline, setIsOnline] = useState(true);
    const [showBanner, setShowBanner] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        // Check initial status
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            if (wasOffline) {
                // Show "back online" message for 3 seconds
                setTimeout(() => {
                    setShowBanner(false);
                }, 3000);
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
            setShowBanner(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [wasOffline]);

    // Don't show anything if online and banner is hidden
    if (isOnline && !showBanner) return null;

    const isArabic = locale === 'ar';

    return (
        <div
            className={`
                fixed top-0 left-0 right-0 z-[9999] 
                flex items-center justify-center gap-2
                px-4 py-2 text-sm font-medium
                transition-[transform,opacity,background-color] duration-300 ease-out
                ${isOnline
                    ? 'bg-emerald-500/95 text-white translate-y-0'
                    : 'bg-red-500/95 text-white translate-y-0'
                }
                backdrop-blur-sm
            `}
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {isOnline ? (
                <>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span>
                        {isArabic ? 'تم استعادة الاتصال' : 'Connection restored'}
                    </span>
                </>
            ) : (
                <>
                    <svg
                        className="w-4 h-4 animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                        />
                    </svg>
                    <span>
                        {isArabic ? 'لا يوجد اتصال بالإنترنت' : "You're offline"}
                    </span>
                </>
            )}
        </div>
    );
}
