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
                    <div className="pt-8 flex justify-center gap-5 flex-wrap">
                        <a
                            href="https://www.stc.training"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-bold hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:shadow-[0_0_45px_rgba(99,102,241,0.8)] hover:scale-105"
                        >
                            {locale === 'ar' ? 'انضم لمنصة التدريب' : 'Join Training Platform'}
                        </a>
                        <a
                            href={`/${locale}/verify`}
                            className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 text-white text-lg font-bold hover:border-white hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105"
                        >
                            {locale === 'ar' ? 'تحقق من الشهادات' : 'Verify Certificates'}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
