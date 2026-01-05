'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
// import Image from 'next/image'; // ImageWithSkeleton uses Image internally
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';
// import { DR_SABRI_BLUR } from '@/lib/imageBlurData';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { createStaggerContainer, createFadeInUpVariant, scaleInSpring } from '@/lib/animations';
import MotionButton from '@/components/ui/MotionButton';

/**
 * Hero - Main hero section with Dr. Sabri's introduction
 * Features:
 * - Device-aware staggered entrance animations
 * - Desktop: Luxurious springs | Mobile: Snappy springs
 * - Elements animate one-by-one (avatar → headline → subheadline → buttons)
 * - Tactile MotionButton for CTAs
 * - Full prefers-reduced-motion support
 */
export default function Hero({ locale }: { locale: string }) {
    const t = useTranslations('hero');
    const [imageError, setImageError] = useState(false);

    // Device-aware animation config
    const { spring, shouldAnimate, staggerDelay } = useAnimationConfig();

    // Create device-optimized variants
    const staggerContainer = createStaggerContainer(staggerDelay);
    const fadeInUpVariant = createFadeInUpVariant(spring);

    // Container animation props
    const containerProps = shouldAnimate
        ? {
            initial: "hidden",
            animate: "visible",
            variants: staggerContainer,
        }
        : {};

    // Item animation props
    const itemProps = shouldAnimate ? { variants: fadeInUpVariant } : {};
    const scaleItemProps = shouldAnimate ? { variants: scaleInSpring } : {};

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    {...containerProps}
                    className="space-y-8"
                >
                    {/* Glowing Avatar Container - Scale in animation */}
                    {/* Glowing Avatar Container - Scale in animation */}
                    <motion.div
                        {...scaleItemProps}
                        className="w-32 h-32 mx-auto rounded-full p-[3px] bg-gradient-to-b from-indigo-400 via-teal-400/50 to-indigo-600/20 shadow-[0_0_50px_-10px_rgba(99,102,241,0.4),0_0_20px_rgba(20,184,166,0.3)] cursor-pointer relative group backdrop-blur-xl"
                    >
                        <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center relative border-2 border-slate-900/50">
                            {!imageError ? (
                                <ImageWithSkeleton
                                    src="/images/dr-sabri.jpg"
                                    alt={t('name')}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    priority
                                    quality={85}
                                    sizes="128px"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-slate-400 w-full h-full bg-slate-800">
                                    <span className="text-4xl">👨‍⚕️</span>
                                </div>
                            )}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </motion.div>

                    {/* Headline - Fade in up */}
                    <motion.h1
                        {...itemProps}
                        className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter rtl:tracking-normal"
                    >
                        {t('headline')}
                        <br />
                        <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 text-3xl md:text-5xl mt-2 block leading-normal pb-2 tracking-normal">
                            {locale === 'ar' ? 'فن ربط المعلومات' : 'The Art of Connecting Knowledge'}
                        </span>
                    </motion.h1>

                    {/* Subheadline - Fade in up */}
                    <motion.p
                        {...itemProps}
                        className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light"
                    >
                        {t('subheadline')}
                    </motion.p>

                    {/* CTA Buttons - Fade in up with tactile MotionButton */}
                    <motion.div
                        {...itemProps}
                        className="pt-8 flex justify-center gap-5 flex-wrap"
                    >
                        <MotionButton
                            variant="primary"
                            href="https://www.stc.training"
                            external
                            className="text-lg px-10 py-4"
                        >
                            {locale === 'ar' ? 'انضم لمنصة التدريب' : 'Join Training Platform'}
                        </MotionButton>
                        <MotionButton
                            variant="secondary"
                            href={`/${locale}/verify`}
                            className="text-lg px-10 py-4"
                        >
                            {locale === 'ar' ? 'تحقق من الشهادات' : 'Verify Certificates'}
                        </MotionButton>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
