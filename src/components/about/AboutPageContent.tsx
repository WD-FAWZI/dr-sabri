'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Target, Award, Users, Globe, Heart, Lightbulb, Shield, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * === PERFORMANCE-OPTIMIZED ANIMATION VARIANTS ===
 * - Respects prefers-reduced-motion
 * - Staggered children for smooth loading
 * - GPU-accelerated transforms only
 */

// Container variant for staggered children
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Item variant for fade-in-up effect
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

// Simple fade for sections
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

interface AboutPageContentProps {
    locale: string;
}

export default function AboutPageContent({ locale }: AboutPageContentProps) {
    const t = useTranslations('about');
    const shouldReduceMotion = useReducedMotion();

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
            number: '500+',
            label: t('achievements.students'),
        },
        {
            icon: Target,
            number: '50+',
            label: t('achievements.courses'),
        },
        {
            icon: Globe,
            number: '15+',
            label: t('achievements.countries'),
        },
    ];

    // Animation props - disabled when user prefers reduced motion
    const getAnimationProps = (variant: Variants) => {
        if (shouldReduceMotion) {
            return {}; // No animation
        }
        return {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: '-50px' },
            variants: variant,
        };
    };

    const getInitialAnimationProps = (variant: Variants) => {
        if (shouldReduceMotion) {
            return {};
        }
        return {
            initial: "hidden",
            animate: "visible",
            variants: variant,
        };
    };

    return (
        <>
            <Navbar locale={locale} />

            <main className="min-h-screen bg-slate-900 pt-32 pb-20">
                {/* Hero Section */}
                <div className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        {...getInitialAnimationProps(fadeInUp)}
                        className="text-center space-y-4"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-indigo-400 font-medium">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>

                {/* Mission & Vision */}
                <div className="max-w-6xl mx-auto px-6 mb-24">
                    <motion.div
                        {...getAnimationProps(fadeInUp)}
                        className="glass-card rounded-3xl p-8 md:p-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            {t('mission.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="text-teal-400" size={24} />
                                    <h3 className="text-xl font-bold text-white">
                                        {locale === 'ar' ? 'الرؤية' : 'Vision'}
                                    </h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed">
                                    {t('mission.vision')}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="text-indigo-400" size={24} />
                                    <h3 className="text-xl font-bold text-white">
                                        {locale === 'ar' ? 'الرسالة' : 'Mission'}
                                    </h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed">
                                    {t('mission.mission')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Core Values - STAGGERED ANIMATION */}
                <div className="max-w-6xl mx-auto px-6 mb-24">
                    <motion.div
                        {...getAnimationProps(containerVariants)}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-12 text-center"
                        >
                            {t('values.title')}
                        </motion.h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="glass-card rounded-2xl p-6 hover:border-indigo-500/50 transition-colors"
                                >
                                    <value.icon className="text-indigo-400 mb-4" size={40} />
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Founder Section */}
                <div className="max-w-6xl mx-auto px-6 mb-24">
                    <motion.div
                        {...getAnimationProps(fadeInUp)}
                        className="glass-card rounded-3xl p-8 md:p-12"
                    >
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-1 flex justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                                        <Image
                                            src="/images/dr-sabri.jpg"
                                            alt={t('founder.name')}
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4 text-center md:text-right">
                                <h2 className="text-2xl font-bold text-white">
                                    {t('founder.title')}
                                </h2>
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
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
                        {...getAnimationProps(containerVariants)}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-12 text-center"
                        >
                            {t('achievements.title')}
                        </motion.h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform"
                                >
                                    <achievement.icon
                                        className="text-teal-400 mx-auto mb-4"
                                        size={48}
                                    />
                                    <div className="text-4xl font-bold text-white mb-2">
                                        {achievement.number}
                                    </div>
                                    <p className="text-slate-400">{achievement.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Accreditations */}
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        {...getAnimationProps(fadeInUp)}
                        className="glass-card rounded-3xl p-8 md:p-12 text-center"
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
