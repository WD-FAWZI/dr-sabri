'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Download, Share, PlusSquare, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useTranslations } from 'next-intl';

/**
 * InstallAppButton - A luxury floating action button to install the PWA
 * Features OS-specific logic, Glassmorphism UI, and Framer Motion animations.
 */
export default function InstallAppButton() {
    const { isInstallable, isStandalone, isIOS, promptInstall } = usePWAInstall();
    const [showIOSModal, setShowIOSModal] = useState(false);
    const t = useTranslations('pwa');
    const shouldReduceMotion = useReducedMotion();

    // Hide if already in standalone mode (already installed)
    if (isStandalone) return null;

    // Hide if not installable via browser and not iOS
    if (!isInstallable && !isIOS) return null;

    const handleClick = () => {
        if (isIOS) {
            setShowIOSModal(true);
        } else {
            promptInstall();
        }
    };

    return (
        <>
            {/* Pulsing FAB Button */}
            <motion.button
                onClick={handleClick}
                className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full glass-card border-white/20 text-white shadow-glow-md hover:shadow-glow-lg transition-[transform,box-shadow] duration-300 cursor-pointer group"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                aria-label={t('installButton')}
            >
                {/* Visual Pulse Effect - only if motion is not reduced */}
                {!shouldReduceMotion && (
                    <motion.span
                        className="absolute inset-0 rounded-full bg-indigo-500/30"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}

                <Download className="w-6 h-6 relative z-10 group-hover:text-indigo-400 transition-colors" />
            </motion.button>

            {/* iOS Instruction Modal */}
            <AnimatePresence>
                {showIOSModal && (
                    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
                        {/* Backdrop with Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowIOSModal(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                            className="relative w-full max-w-sm glass-card p-8 rounded-b-none rounded-t-3xl sm:rounded-3xl overflow-hidden border-white/20 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowIOSModal(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center space-y-8">
                                {/* Icon Header */}
                                <div className="relative mx-auto w-20 h-20">
                                    <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-pulse" />
                                    <div className="relative w-full h-full rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
                                        <Smartphone className="w-10 h-10 text-indigo-400" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                        {t('installTitle')}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed px-4">
                                        {t('installDesc')}
                                    </p>
                                </div>

                                {/* Step-by-Step Instructions */}
                                <div className="space-y-4 text-left">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Share size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-200">
                                            {t('step1')}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <PlusSquare size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-200">
                                            {t('step2')}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => setShowIOSModal(false)}
                                    className="btn-primary w-full py-4 text-sm tracking-wide uppercase"
                                >
                                    {t('gotIt')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
