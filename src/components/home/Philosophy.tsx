'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { createStaggerContainer, createFadeInUpVariant, fastTransition } from '@/lib/animations';

/**
 * Philosophy - Scientific message and teaching philosophy
 * Features:
 * - Device-aware staggered entrance animations
 * - Desktop: Luxurious springs | Mobile: Snappy springs
 * - Quote card and content animate sequentially
 * - Feature cards have individual spring animations
 */
export default function Philosophy({ locale }: { locale: string }) {
    // Device-aware animation config
    const { spring, shouldAnimate, staggerDelay, viewportMargin } = useAnimationConfig();

    // Create device-optimized variants
    const staggerContainer = createStaggerContainer(staggerDelay);
    const fadeInUpVariant = createFadeInUpVariant(spring);

    // Container animation props
    const containerProps = shouldAnimate
        ? {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: viewportMargin },
            variants: staggerContainer,
        }
        : {};

    // Item animation props
    const itemProps = shouldAnimate ? { variants: fadeInUpVariant } : {};

    // Card hover effect
    const cardHoverProps = shouldAnimate
        ? {
            whileHover: { y: -4, transition: fastTransition },
        }
        : {};

    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    {...containerProps}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Quote Card */}
                    <motion.div
                        {...itemProps}
                        className="order-2 md:order-1 relative"
                    >
                        <div className="relative z-10 glass-card p-8 md:p-10 rounded-3xl space-y-6 text-right">
                            <div className="absolute -top-6 -right-6 text-indigo-500/30 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                <Quote size={80} fill="currentColor" />
                            </div>

                            <p className="text-xl font-light text-slate-200 leading-loose relative z-20">
                                {locale === 'ar' ? (
                                    <>
                                        "المعلومة الطبية مثل الخيط الرفيع؛ إن لم تربطه بغيره، سيطير مع أول
                                        اختبار حقيقي في المستشفى. فلسفتي تقوم على تحويل هذه الخيوط إلى نسيج
                                        متين عبر{' '}
                                        <span className="text-teal-400 font-bold">الخرائط الذهنية</span>."
                                    </>
                                ) : (
                                    <>
                                        "Medical information is like a thin thread; if you don't connect it to
                                        others, it will fly away with the first real test in the hospital. My
                                        philosophy is to turn these threads into a strong fabric through{' '}
                                        <span className="text-teal-400 font-bold">mind maps</span>."
                                    </>
                                )}
                            </p>

                            <div className="flex items-center gap-3 pt-6 border-t border-slate-700/50">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                                    <span className="text-sm">{locale === 'ar' ? 'ص' : 'S'}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">
                                        {locale === 'ar' ? 'د. صبري أبو قرون' : 'Dr. Sabri Abu Quron'}
                                    </p>
                                    <p className="text-xs text-indigo-300">
                                        {locale === 'ar' ? 'طبيب ومدرب طبي' : 'Physician & Medical Educator'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Philosophy Content */}
                    <motion.div
                        {...itemProps}
                        className="order-1 md:order-2 space-y-8 text-right"
                    >
                        <div>
                            <span className="text-teal-400 font-bold tracking-widest text-xs uppercase mb-2 block">
                                {locale === 'ar' ? 'لماذا أنا هنا؟' : 'Why Am I Here?'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {locale === 'ar'
                                    ? 'ردم الفجوة.. هندسة وليس حظاً'
                                    : 'Bridging the Gap.. Engineering, Not Luck'}
                            </h2>
                            <p className="text-slate-400 leading-loose">
                                {locale === 'ar'
                                    ? 'التعليم الطبي التقليدي يعتمد على التلقين العمودي. ما أفعله هو التعليم الأفقي؛ أربط لك الـ Physiology بالـ Pathology بالـ Pharmacology في جلسة واحدة.'
                                    : 'Traditional medical education relies on vertical memorization. What I do is horizontal education; I connect Physiology, Pathology, and Pharmacology in one session.'}
                            </p>
                        </div>

                        {/* Feature Cards with hover effect */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                {...cardHoverProps}
                                className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 transition-colors hover:border-indigo-500/30"
                            >
                                <h3 className="text-white font-bold mb-1">
                                    {locale === 'ar' ? 'التبسيط' : 'Simplification'}
                                </h3>
                                <p className="text-xs text-slate-400">
                                    {locale === 'ar'
                                        ? 'تحويل المعقد إلى مرئي'
                                        : 'Turning complexity into visuals'}
                                </p>
                            </motion.div>
                            <motion.div
                                {...cardHoverProps}
                                className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 transition-colors hover:border-indigo-500/30"
                            >
                                <h3 className="text-white font-bold mb-1">
                                    {locale === 'ar' ? 'الترابط' : 'Interconnection'}
                                </h3>
                                <p className="text-xs text-slate-400">
                                    {locale === 'ar'
                                        ? 'شبكة معلومات متصلة'
                                        : 'Connected knowledge network'}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
