'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Partners - Display STC logo and training center affiliation
 */
export default function Partners({ locale }: { locale: string }) {
    return (
        <div className="bg-slate-900 border-t border-slate-800 py-10">
            <div className="max-w-6xl mx-auto px-6">
                <p className="text-center text-xs text-slate-500 uppercase tracking-[0.2em] mb-8">
                    {locale === 'ar' ? 'مركز التدريب الرسمي' : 'Official Training Center'}
                </p>
                <div className="flex justify-center items-center">
                    <div className="group flex flex-col items-center gap-3 cursor-default opacity-60 hover:opacity-100 transition-opacity duration-500">
                        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-700 group-hover:border-indigo-500 shadow-none group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] overflow-hidden">
                            <Image
                                src="/images/stc-logo.jpg"
                                alt="STC Logo"
                                width={96}
                                height={96}
                                className="w-full h-full object-contain p-2"
                            />
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">
                            {locale === 'ar'
                                ? 'مركز د. صبري أبو قرون للتدريب (STC)'
                                : 'Dr. Sabri Abu Quron Training Center (STC)'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
