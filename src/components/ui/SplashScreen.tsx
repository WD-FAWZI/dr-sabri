'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

// CRITICAL: This must match manifest.json background_color exactly
const NATIVE_SPLASH_BG = '#020509';

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [animationPhase, setAnimationPhase] = useState<'native' | 'morphing' | 'premium' | 'exiting'>('native');
    const hasTriggeredHaptic = useRef(false);

    // Trigger haptic feedback when logo fully morphs
    const triggerHapticFeedback = () => {
        if (hasTriggeredHaptic.current) return;
        hasTriggeredHaptic.current = true;

        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    useEffect(() => {
        // Animation sequence timing:
        // Phase 0 (native): 0ms - Solid background, simple logo (matches native splash)
        // Phase 1 (morphing): 100ms - Start morphing to premium
        // Phase 2 (premium): 600ms - Full premium effects active
        // Phase 3 (exiting): 2500ms - Begin exit animation

        const morphTimer = setTimeout(() => {
            setAnimationPhase('morphing');
        }, 100);

        const premiumTimer = setTimeout(() => {
            setAnimationPhase('premium');
            triggerHapticFeedback();
        }, 600);

        const exitTimer = setTimeout(() => {
            setAnimationPhase('exiting');
            setTimeout(() => {
                setIsVisible(false);
                onComplete();
            }, 600);
        }, 2500);

        return () => {
            clearTimeout(morphTimer);
            clearTimeout(premiumTimer);
            clearTimeout(exitTimer);
        };
    }, [onComplete]);

    const isExiting = animationPhase === 'exiting';
    const isPremium = animationPhase === 'premium' || animationPhase === 'exiting';
    const isMorphing = animationPhase !== 'native';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        // Start with solid color matching manifest, morph to gradient
                        backgroundColor: NATIVE_SPLASH_BG,
                    }}
                    initial={{ opacity: 1 }} // Start fully visible (no fade-in to prevent flash)
                    animate={{
                        opacity: isExiting ? 0 : 1,
                        scale: isExiting ? 1.1 : 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                    }}
                    transition={{
                        duration: isExiting ? 0.6 : 0.3,
                        ease: 'easeOut',
                    }}
                >
                    {/* Premium gradient overlay - fades in during morphing phase */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, #0a1628 0%, #050d1a 50%, #020509 100%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isMorphing ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />

                    {/* Subtle ambient light - appears during premium phase */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 45%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isPremium ? 1 : 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />

                    {/* Icon Container */}
                    <div className="relative mb-8">
                        {/* Glow Effect - fades in during premium phase */}
                        <motion.div
                            className="absolute -inset-6 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: isPremium ? [0.4, 0.7, 0.4] : 0,
                                scale: isPremium ? [1, 1.15, 1] : 0.8,
                            }}
                            transition={{
                                duration: 3,
                                repeat: isPremium ? Infinity : 0,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Logo Container - starts at native size, morphs to premium */}
                        <motion.div
                            initial={{
                                scale: 1,
                                opacity: 1,
                            }}
                            animate={{
                                scale: isPremium ? [0.95, 1.05, 0.95] : 1,
                            }}
                            transition={{
                                duration: 3,
                                repeat: isPremium ? Infinity : 0,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Logo wrapper with size morphing */}
                            <motion.div
                                className="relative overflow-hidden rounded-2xl shadow-2xl"
                                initial={{
                                    width: 128, // Match native icon visual size
                                    height: 128,
                                }}
                                animate={{
                                    width: isMorphing ? 160 : 128,
                                    height: isMorphing ? 160 : 128,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                {/* Golden border ring - fades in during morphing */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                                    style={{
                                        border: '2px solid rgba(212, 175, 55, 0.6)',
                                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)',
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isMorphing ? 1 : 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                />

                                <Image
                                    src="/images/icon-512.png"
                                    alt="Dr. Sabri Medical Center"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Diagonal Shimmer Effect - runs once during premium phase */}
                                {isPremium && (
                                    <motion.div
                                        className="absolute inset-0 z-20 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(212, 175, 55, 0.4) 50%, transparent 60%, transparent 100%)',
                                        }}
                                        initial={{ x: '-150%', y: '-150%' }}
                                        animate={{ x: '150%', y: '150%' }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "easeInOut",
                                        }}
                                    />
                                )}

                                {/* Subtle inner glow overlay */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none z-10"
                                    style={{
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isMorphing ? 1 : 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Text Reveal - appears during morphing phase */}
                    <motion.div
                        className="text-center relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isMorphing ? 1 : 0,
                            y: isMorphing ? 0 : 20
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1
                            className="text-xl font-bold md:text-2xl"
                            style={{
                                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 50%, #f8fafc 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Dr. Sabri Abu Quron
                        </h1>
                        <motion.p
                            className="mt-2 text-sm font-medium tracking-wide"
                            style={{ color: 'rgba(148, 163, 184, 0.8)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isPremium ? 1 : 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            Most Trusted Medical Training Center
                        </motion.p>
                    </motion.div>

                    {/* Subtle bottom gradient fade - appears during premium phase */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to top, rgba(2, 5, 9, 0.8) 0%, transparent 100%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isPremium ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
