'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

/**
 * Hero - Main hero section with Dr. Sabri's introduction
 * Performance optimized with prefers-reduced-motion support
 */
export default function Hero({ locale }: { locale: string }) {
    const t = useTranslations('hero');
    const [imageError, setImageError] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Scroll Down Hint - Only animate if motion is allowed */}
            {!shouldReduceMotion ? (
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 z-10"
                >
                    <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-indigo-500 rounded-full" />
                    </div>
                </motion.div>
            ) : (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 z-10">
                    <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-indigo-500 rounded-full" />
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={shouldReduceMotion ? undefined : "hidden"}
                    animate={shouldReduceMotion ? undefined : "visible"}
                    variants={shouldReduceMotion ? undefined : fadeInUp}
                    className="space-y-8"
                >
                    {/* Glowing Avatar Container */}
                    <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-indigo-500 to-teal-400 shadow-[0_0_40px_rgba(99,102,241,0.5)] cursor-pointer relative group">
                        <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden flex items-center justify-center relative">
                            {!imageError ? (
                                <Image
                                    src="/images/dr-sabri.jpg"
                                    alt={t('name')}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                    priority
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-slate-400 w-full h-full bg-slate-800">
                                    <span className="text-4xl">👨‍⚕️</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors" />
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        {t('headline')}
                        <br />
                        <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 text-3xl md:text-5xl mt-2 block leading-normal pb-2">
                            {locale === 'ar' ? 'فن ربط المعلومات' : 'The Art of Connecting Knowledge'}
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
                        {t('subheadline')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="pt-8 flex justify-center gap-4 flex-wrap">
                        <a
                            href="https://www.stc.training"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] btn-glow"
                        >
                            {locale === 'ar' ? 'انضم لمنصة التدريب' : 'Join Training Platform'}
                        </a>
                        <a
                            href={`/${locale}/verify`}
                            className="px-8 py-3 rounded-full bg-transparent border border-slate-600 text-slate-300 hover:border-white hover:text-white transition-all"
                        >
                            {locale === 'ar' ? 'تحقق من الشهادات' : 'Verify Certificates'}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
