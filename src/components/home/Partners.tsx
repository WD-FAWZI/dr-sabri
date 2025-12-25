'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { STC_LOGO_BLUR } from '@/lib/imageBlurData';
import { fadeInUpSpring, springTransition } from '@/lib/animations';

/**
 * Partners - Display STC logo and training center affiliation
 * Features:
 * - Fade-in entrance animation with spring physics
 * - Enhanced logo hover with scale and glow
 * - Respects prefers-reduced-motion
 */
export default function Partners({ locale }: { locale: string }) {
    const shouldReduceMotion = useReducedMotion();

    // Animation props
    const containerProps = shouldReduceMotion
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: '-50px' },
            variants: fadeInUpSpring,
        };

    // Logo hover effect
    const logoHoverProps = shouldReduceMotion
        ? {}
        : {
            whileHover: { scale: 1.05, transition: springTransition },
            whileTap: { scale: 0.98 },
        };

    return (
        <div className="bg-slate-900 border-t border-slate-800 py-16">
            <motion.div
                {...containerProps}
                className="max-w-6xl mx-auto px-6"
            >
                <p className="text-center text-xs text-slate-500 uppercase tracking-[0.2em] mb-8">
                    {locale === 'ar' ? 'مركز التدريب الرسمي' : 'Official Training Center'}
                </p>
                <div className="flex justify-center items-center">
                    <motion.div
                        {...logoHoverProps}
                        className="group flex flex-col items-center gap-3 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-500"
                    >
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center grayscale group-hover:grayscale-0 transition-[filter,border-color,box-shadow] duration-500 border border-slate-700 group-hover:border-indigo-500 shadow-none group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] overflow-hidden">
                            <Image
                                src="/images/stc-logo.jpg"
                                alt="STC Logo"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover rounded-full"
                                loading="lazy"
                                quality={80}
                                sizes="96px"
                                placeholder="blur"
                                blurDataURL={STC_LOGO_BLUR}
                            />
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">
                            {locale === 'ar'
                                ? 'مركز د. صبري أبو قرون للتدريب (STC)'
                                : 'Dr. Sabri Abu Quron Training Center (STC)'}
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
