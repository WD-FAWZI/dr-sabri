'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, User, BookOpen, Calendar, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import type { Certificate } from '@/services/certificateService';

interface VerificationResultProps {
    certificate: Certificate | null;
    locale: string;
    onReset: () => void;
}

/**
 * VerificationResult - Display verification result with premium animations
 * 
 * === ANIMATIONS ===
 * - Card entrance: Scale + fade from bottom
 * - Icon: Bounce effect with scale
 * - Details: Staggered fade-in
 * - Button: Subtle hover glow
 * 
 * === PERFORMANCE ===
 * - Respects prefers-reduced-motion
 * - Uses GPU-accelerated properties only (opacity, transform)
 * - Runs once, not continuously
 */
export default function VerificationResult({
    certificate,
    locale,
    onReset,
}: VerificationResultProps) {
    const t = useTranslations('verify');
    const shouldReduceMotion = useReducedMotion();

    const isValid = certificate !== null;

    // Animation Variants
    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const iconVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const buttonVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                delay: 0.5,
            },
        },
    };

    // Simplified animations for reduced motion
    const getAnimationProps = (variants: Variants) => {
        if (shouldReduceMotion) {
            return {};
        }
        return { variants };
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={shouldReduceMotion ? undefined : cardVariants}
            className="w-full max-w-2xl mx-auto"
        >
            <div
                className={`glass-card rounded-2xl p-8 border-2 relative overflow-hidden ${isValid
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'border-red-500/30 bg-red-500/5'
                    }`}
            >
                {/* Success Glow Effect */}
                {isValid && (
                    <div
                        className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 opacity-20 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                        }}
                    />
                )}

                {/* Status Header */}
                <motion.div
                    className="flex flex-col items-center justify-center gap-3 mb-6"
                    {...getAnimationProps(iconVariants)}
                >
                    {/* Animated Icon Container */}
                    <motion.div
                        initial={shouldReduceMotion ? undefined : { scale: 0, rotate: -180 }}
                        animate={shouldReduceMotion ? undefined : { scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: 0.2,
                        }}
                        className="relative"
                    >
                        {/* Icon Glow Ring */}
                        <div
                            className={`absolute inset-0 rounded-full blur-md ${isValid ? 'bg-green-500/30' : 'bg-red-500/30'
                                }`}
                            style={{ transform: 'scale(1.5)' }}
                        />

                        {isValid ? (
                            <CheckCircle2 className="text-green-400 relative z-10" size={56} />
                        ) : (
                            <XCircle className="text-red-400 relative z-10" size={56} />
                        )}
                    </motion.div>

                    {/* Status Text */}
                    <motion.h2
                        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className={`text-2xl font-bold flex items-center gap-2 ${isValid ? 'text-green-400' : 'text-red-400'
                            }`}
                    >
                        {isValid && <Sparkles className="text-green-300" size={20} />}
                        {isValid ? t('valid') : t('invalid')}
                        {isValid && <Sparkles className="text-green-300" size={20} />}
                    </motion.h2>
                </motion.div>

                {/* Certificate Details - Staggered Animation */}
                {isValid && certificate && (
                    <motion.div
                        className="space-y-4 border-t border-slate-700 pt-6"
                        initial={shouldReduceMotion ? undefined : "hidden"}
                        animate={shouldReduceMotion ? undefined : "visible"}
                        variants={shouldReduceMotion ? undefined : {
                            visible: {
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.4,
                                },
                            },
                        }}
                    >
                        {/* Name */}
                        <motion.div
                            className="flex items-start gap-3"
                            {...getAnimationProps(itemVariants)}
                        >
                            <div className="p-2 rounded-lg bg-indigo-500/10">
                                <User className="text-indigo-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">{t('resultName')}</p>
                                <p className="text-white font-medium">
                                    {locale === 'ar'
                                        ? certificate.studentName
                                        : certificate.studentNameEn}
                                </p>
                            </div>
                        </motion.div>

                        {/* Course */}
                        <motion.div
                            className="flex items-start gap-3"
                            {...getAnimationProps(itemVariants)}
                        >
                            <div className="p-2 rounded-lg bg-indigo-500/10">
                                <BookOpen className="text-indigo-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">{t('resultCourse')}</p>
                                <p className="text-white font-medium">
                                    {locale === 'ar'
                                        ? certificate.courseName
                                        : certificate.courseNameEn}
                                </p>
                            </div>
                        </motion.div>

                        {/* Date */}
                        <motion.div
                            className="flex items-start gap-3"
                            {...getAnimationProps(itemVariants)}
                        >
                            <div className="p-2 rounded-lg bg-indigo-500/10">
                                <Calendar className="text-indigo-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">{t('resultDate')}</p>
                                <p className="text-white font-medium">
                                    {new Date(certificate.issueDate).toLocaleDateString(
                                        locale === 'ar' ? 'ar-SA' : 'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Invalid Message */}
                {!isValid && (
                    <motion.p
                        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-slate-400 mb-6"
                    >
                        {locale === 'ar'
                            ? 'لم يتم العثور على شهادة بهذا الرقم. الرجاء التحقق من الرقم المدخل.'
                            : 'No certificate found with this ID. Please check the entered ID.'}
                    </motion.p>
                )}

                {/* Reset Button */}
                <motion.button
                    onClick={onReset}
                    initial={shouldReduceMotion ? undefined : "hidden"}
                    animate={shouldReduceMotion ? undefined : "visible"}
                    variants={shouldReduceMotion ? undefined : buttonVariants}
                    whileHover={shouldReduceMotion ? undefined : {
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                    }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    className="btn-base btn-ghost w-full mt-6 py-3"
                >
                    {t('tryAgain')}
                </motion.button>
            </div>
        </motion.div>
    );
}
