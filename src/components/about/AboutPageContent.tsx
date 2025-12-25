'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';
// import { DR_SABRI_BLUR } from '@/lib/imageBlurData';
import { Target, Award, Users, Globe, Heart, Lightbulb, Shield, Sparkles } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { easings, createStaggerContainer, createFadeInUpVariant } from '@/lib/animations';

/**
 * === ABOUT PAGE CONTENT ===
 * Luxury animations with device-aware configurations
 * - Respects prefers-reduced-motion
 * - Device-aware spring physics (mobile vs desktop)
 * - Staggered children for smooth loading
 * - Animated background orbs
 * - Blur-in entrance effects
 */

interface AboutPageContentProps {
    locale: string;
}

export default function AboutPageContent({ locale }: AboutPageContentProps) {
    const t = useTranslations('about');
    const { shouldAnimate, spring, staggerDelay, viewportMargin } = useAnimationConfig();

    // Create device-aware variants
    const staggerContainer = createStaggerContainer(staggerDelay);
    const fadeInUpVariant = createFadeInUpVariant(spring);

    // Enhanced item variant with blur effect
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                ...spring,
                duration: 0.5,
                ease: easings.easeOutExpo,
            },
        },
    };

    // Header variants with scale
    const headerVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.98,
            filter: 'blur(8px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: easings.easeOutExpo,
            },
        },
    };

    // Card variants with glow
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.97,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easings.easeOutExpo,
            },
        },
    };

    const values = [
        {
            icon: Award,
            title: t('values.excellence.title'),
            description: t('values.excellence.description'),
        },
        {
            icon: Heart,
            title: t('values.practice.title'),
            description: t('values.practice.description'),
        },
        {
            icon: Shield,
            title: t('values.integrity.title'),
            description: t('values.integrity.description'),
        },
        {
            icon: Lightbulb,
            title: t('values.innovation.title'),
            description: t('values.innovation.description'),
        },
    ];

    const achievements = [
        {
            icon: Users,
            numericValue: 500,
            suffix: '+',
            label: t('achievements.students'),
        },
        {
            icon: Target,
            numericValue: 50,
            suffix: '+',
            label: t('achievements.courses'),
        },
        {
            icon: Globe,
            numericValue: 15,
            suffix: '+',
            label: t('achievements.countries'),
        },
    ];

    // Animation props helper
    const getAnimationProps = (variants: typeof fadeInUpVariant) => {
        if (!shouldAnimate) {
            return {};
        }
        return {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: viewportMargin },
            variants,
        };
    };

    const getInitialAnimationProps = (variants: typeof fadeInUpVariant) => {
        if (!shouldAnimate) {
            return {};
        }
        return {
            initial: "hidden",
            animate: "visible",
            variants,
        };
    };

    return (
        <>
            <Navbar locale={locale} />

            <main className="min-h-screen bg-slate-900 pt-32 pb-20 relative overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px]"
                        animate={shouldAnimate ? {
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        } : undefined}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-[120px]"
                        animate={shouldAnimate ? {
                            x: [0, -20, 0],
                            y: [0, 25, 0],
                        } : undefined}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/3 rounded-full blur-[100px]"
                        animate={shouldAnimate ? {
                            x: [0, 15, 0],
                            y: [0, -15, 0],
                        } : undefined}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </div>

                {/* Hero Section */}
                <div className="max-w-6xl mx-auto px-6 mb-20 relative z-10">
                    <motion.div
                        {...getInitialAnimationProps(headerVariants)}
                        className="text-center space-y-4"
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-white"
                            initial={shouldAnimate ? { opacity: 0, y: 30, filter: 'blur(8px)' } : undefined}
                            animate={shouldAnimate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                            transition={{ duration: 0.6, ease: easings.easeOutExpo }}
                        >
                            {t('title')}
                        </motion.h1>
                        <motion.p
                            className="text-xl text-indigo-400 font-medium"
                            initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 0.5, delay: 0.2, ease: easings.easeOutExpo }}
                        >
                            {t('subtitle')}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Mission & Vision */}
                <div className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
                    <motion.div
                        {...getAnimationProps(cardVariants)}
                        className="glass-card rounded-3xl p-8 md:p-12"
                        whileHover={shouldAnimate ? {
                            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.1)",
                        } : undefined}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.h2
                            className="text-3xl font-bold text-white mb-8 text-center"
                            initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: easings.easeOutExpo }}
                        >
                            {t('mission.title')}
                        </motion.h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                className="space-y-3"
                                initial={shouldAnimate ? { opacity: 0, x: -30 } : undefined}
                                whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1, ease: easings.easeOutExpo }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <motion.div
                                        whileHover={shouldAnimate ? { rotate: 15, scale: 1.1 } : undefined}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Target className="text-teal-400" size={24} />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white">
                                        {locale === 'ar' ? 'الرؤية' : 'Vision'}
                                    </h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed">
                                    {t('mission.vision')}
                                </p>
                            </motion.div>
                            <motion.div
                                className="space-y-3"
                                initial={shouldAnimate ? { opacity: 0, x: 30 } : undefined}
                                whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2, ease: easings.easeOutExpo }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <motion.div
                                        whileHover={shouldAnimate ? { rotate: -15, scale: 1.1 } : undefined}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sparkles className="text-indigo-400" size={24} />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white">
                                        {locale === 'ar' ? 'الرسالة' : 'Mission'}
                                    </h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed">
                                    {t('mission.mission')}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
                    <motion.div
                        initial={shouldAnimate ? "hidden" : undefined}
                        whileInView={shouldAnimate ? "visible" : undefined}
                        viewport={{ once: true, margin: viewportMargin }}
                        variants={staggerContainer}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-12 text-center"
                        >
                            {t('values.title')}
                        </motion.h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => {
                                // Different subtle glow colors for each icon
                                const glowColors = [
                                    'group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]',   // Yellow for Award
                                    'group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]', // Red for Heart
                                    'group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',  // Blue for Shield
                                    'group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]',  // Amber for Lightbulb
                                ];
                                const iconColors = [
                                    'text-indigo-400 group-hover:text-yellow-400',
                                    'text-indigo-400 group-hover:text-red-400',
                                    'text-indigo-400 group-hover:text-blue-400',
                                    'text-indigo-400 group-hover:text-amber-400',
                                ];

                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="glass-card rounded-2xl p-6 transition-transform duration-300 group"
                                        whileHover={!shouldAnimate ? {} : {
                                            y: -5,
                                            boxShadow: "0 15px 40px rgba(99, 102, 241, 0.15)",
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {/* Icon with subtle colored glow on hover */}
                                        <div className="mb-4">
                                            <value.icon
                                                className={`transition-[color,filter] duration-300 ${iconColors[index]} ${glowColors[index]}`}
                                                size={40}
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Founder Section */}
                <div className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
                    <motion.div
                        {...getAnimationProps(cardVariants)}
                        className="glass-card rounded-3xl p-8 md:p-12"
                        whileHover={shouldAnimate ? {
                            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.1)",
                        } : undefined}
                    >
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-1 flex justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                                        <ImageWithSkeleton
                                            src="/images/dr-sabri.jpg"
                                            alt={t('founder.name')}
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            quality={85}
                                            sizes="192px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4 text-center md:text-right">
                                <h2 className="text-2xl font-bold text-white">
                                    {t('founder.title')}
                                </h2>
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 leading-relaxed pb-1">
                                    {t('founder.name')}
                                </h3>
                                <p className="text-indigo-300 font-medium">
                                    {t('founder.role')}
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    {t('founder.description')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Achievements - STAGGERED ANIMATION */}
                <div className="max-w-6xl mx-auto px-6 mb-24">
                    <motion.div
                        {...getAnimationProps(staggerContainer)}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-12 text-center"
                        >
                            {t('achievements.title')}
                        </motion.h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {achievements.map((achievement, index) => {
                                // Unique entrance animations for each icon (runs once only)
                                const iconAnimations = [
                                    // Users - Gentle bounce in (from small to normal)
                                    {
                                        initial: !shouldAnimate ? {} : { scale: 0.5, opacity: 0 },
                                        whileInView: !shouldAnimate ? {} : { scale: 1, opacity: 1 },
                                        transition: { type: "spring" as const, stiffness: 200, damping: 15, delay: 0.2 },
                                    },
                                    // Target - Arrow hitting target (from big to normal)
                                    {
                                        initial: !shouldAnimate ? {} : { scale: 1.5, opacity: 0 },
                                        whileInView: !shouldAnimate ? {} : { scale: 1, opacity: 1 },
                                        transition: { type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 },
                                    },
                                    // Globe - Rotation entrance (rotates 30 degrees)
                                    {
                                        initial: !shouldAnimate ? {} : { rotate: -30, opacity: 0 },
                                        whileInView: !shouldAnimate ? {} : { rotate: 0, opacity: 1 },
                                        transition: { type: "spring" as const, stiffness: 150, damping: 12, delay: 0.4 },
                                    },
                                ];

                                const iconAnim = iconAnimations[index] || iconAnimations[0];

                                return (
                                    <div
                                        key={index}
                                        className="glass-card rounded-2xl p-8 text-center"
                                    >
                                        {/* Icon with unique entrance animation - NO hover effects */}
                                        <motion.div
                                            initial={iconAnim.initial}
                                            whileInView={iconAnim.whileInView}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={iconAnim.transition}
                                            className="inline-block"
                                        >
                                            <achievement.icon
                                                className="text-teal-400 mx-auto mb-4"
                                                size={48}
                                            />
                                        </motion.div>
                                        <div className="text-4xl font-bold text-white mb-2">
                                            <CountUp
                                                end={achievement.numericValue}
                                                suffix={achievement.suffix}
                                                duration={2000}
                                            />
                                        </div>
                                        <p className="text-slate-400">{achievement.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Accreditations */}
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <motion.div
                        {...getAnimationProps(cardVariants)}
                        className="glass-card rounded-3xl p-8 md:p-12 text-center"
                        whileHover={shouldAnimate ? {
                            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.1)",
                        } : undefined}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {t('accreditations.title')}
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            {t('accreditations.description')}
                        </p>
                    </motion.div>
                </div>
            </main>

            <Footer locale={locale} />
        </>
    );
}
