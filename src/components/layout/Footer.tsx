'use client';

import React from 'react';
import FooterSignature from '@/components/ui/FooterSignature';

/**
 * Footer - Simple professional footer with premium signature
 */
export default function Footer({ locale }: { locale: string }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-8">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm">
                    © {currentYear}{' '}
                    {locale === 'ar'
                        ? 'مركز د. صبري أبو قرون للتدريب (STC)'
                        : 'Dr. Sabri Abu Quron Training Center (STC)'}
                </p>
                <p className="text-xs text-slate-600 mt-2">
                    {locale === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}
                </p>
            </div>

            {/* Premium Developer Signature */}
            <div className="border-t border-slate-900/50 mt-6">
                <FooterSignature />
            </div>
        </footer>
    );
}

