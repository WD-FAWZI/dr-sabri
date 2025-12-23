'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerificationForm from '@/components/verify/VerificationForm';
import VerificationResult from '@/components/verify/VerificationResult';
import { certificateService, type Certificate } from '@/services/certificateService';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { easings } from '@/lib/animations';

interface VerifyPageContentProps {
    locale: string;
}

/**
 * VerifyPageContent - Client component for certificate verification
 * 
 * === LUXURY ANIMATIONS ===
 * - Header: Staggered fade-in with subtle scale
 * - Form/Result: Smooth crossfade with AnimatePresence
 * - Background orbs: Subtle floating effect
 * - Demo notice: Delayed fade-in
 */
function VerifyPageContent({ locale }: VerifyPageContentProps) {
    const t = useTranslations('verify');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Certificate | null | 'not-found'>(null);
    const { shouldAnimate, spring } = useAnimationConfig();

    const handleVerify = async (certificateId: string) => {
        setIsLoading(true);
        setResult(null);

        try {
            const certificate = await certificateService.verifyCertificate(certificateId);
            setResult(certificate || 'not-found');
        } catch (error) {
            console.error('Verification error:', error);
            setResult('not-found');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: easings.easeOutExpo,
            },
        },
    };

    const subtitleVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.2,
                ease: easings.easeOutExpo,
            },
        },
    };

    const formContainerVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.3,
                ease: easings.easeOutExpo,
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.98,
            transition: {
                duration: 0.3,
                ease: easings.easeInOutCubic,
            },
        },
    };

    const demoNoticeVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.6,
                ease: easings.easeOutExpo,
            },
        },
    };

    return (
        <>
            <Navbar locale={locale} />

            <main className="min-h-screen bg-slate-900 pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px]"
                        animate={shouldAnimate ? {
                            x: [0, 20, 0],
                            y: [0, -15, 0],
                        } : undefined}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-[120px]"
                        animate={shouldAnimate ? {
                            x: [0, -15, 0],
                            y: [0, 20, 0],
                        } : undefined}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </div>

                <motion.div
                    className="max-w-4xl mx-auto relative z-10"
                    initial={shouldAnimate ? "hidden" : undefined}
                    animate={shouldAnimate ? "visible" : undefined}
                    variants={containerVariants}
                >
                    {/* Header with Luxury Animation */}
                    <motion.div
                        className="text-center mb-12"
                        variants={headerVariants}
                    >
                        <motion.h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            variants={headerVariants}
                        >
                            {t('title')}
                        </motion.h1>
                        <motion.p
                            className="text-slate-400 max-w-2xl mx-auto mb-6"
                            variants={subtitleVariants}
                        >
                            {t('subtitle')}
                        </motion.p>

                        {/* Coming Soon: QR Code Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-teal-500/10 border border-indigo-500/20"
                            initial={shouldAnimate ? { opacity: 0, scale: 0.8, y: 10 } : undefined}
                            animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : undefined}
                            transition={{ delay: 0.5, duration: 0.4, ease: easings.easeOutExpo }}
                            whileHover={shouldAnimate ? {
                                scale: 1.05,
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)",
                            } : undefined}
                        >
                            <motion.div
                                animate={shouldAnimate ? { rotate: [0, 10, -10, 0] } : undefined}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <QrCode className="w-4 h-4 text-indigo-400" />
                            </motion.div>
                            <span className="text-xs font-medium bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                                {locale === 'ar' ? 'قريباً: مسح QR Code' : 'Coming Soon: QR Scan'}
                            </span>
                            <Sparkles className="w-3 h-3 text-teal-400" />
                        </motion.div>
                    </motion.div>

                    {/* Form/Result with Smooth Crossfade */}
                    <AnimatePresence mode="wait">
                        {result === null ? (
                            <motion.div
                                key="form"
                                initial={shouldAnimate ? formContainerVariants.hidden : undefined}
                                animate={shouldAnimate ? formContainerVariants.visible : undefined}
                                exit={shouldAnimate ? formContainerVariants.exit : undefined}
                                transition={spring}
                            >
                                <VerificationForm
                                    locale={locale}
                                    onSubmit={handleVerify}
                                    isLoading={isLoading}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={shouldAnimate ? { opacity: 0, scale: 0.95, y: 20 } : undefined}
                                animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : undefined}
                                exit={shouldAnimate ? { opacity: 0, scale: 0.95, y: -20 } : undefined}
                                transition={{
                                    duration: 0.4,
                                    ease: easings.easeOutExpo,
                                }}
                            >
                                <VerificationResult
                                    certificate={result === 'not-found' ? null : result}
                                    locale={locale}
                                    onReset={handleReset}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Demo Mode Notice with Delayed Animation */}
                    <motion.div
                        className="mt-12 text-center"
                        variants={demoNoticeVariants}
                    >
                        <motion.div
                            className="inline-block glass-card rounded-lg px-4 py-2"
                            whileHover={shouldAnimate ? {
                                scale: 1.02,
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)",
                            } : undefined}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-xs text-slate-500">
                                {locale === 'ar' ? (
                                    <>
                                        <strong>وضع التجربة:</strong> البيانات محلية حالياً. في الإنتاج سيتم الربط
                                        مع API.
                                    </>
                                ) : (
                                    <>
                                        <strong>Demo Mode:</strong> Data is local. In production, this will connect
                                        to an API.
                                    </>
                                )}
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer locale={locale} />
        </>
    );
}

export default VerifyPageContent;
