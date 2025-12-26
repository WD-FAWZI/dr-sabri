'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const hasTriggeredHaptic = useRef(false);

    // Trigger haptic feedback when logo fully appears
    const triggerHapticFeedback = () => {
        if (hasTriggeredHaptic.current) return;
        hasTriggeredHaptic.current = true;

        // Check if vibration API is supported
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50); // Short premium haptic pulse
        }
    };

    useEffect(() => {
        // Animation sequence timing
        // Total duration: ~2.5s before exit starts
        const timer = setTimeout(() => {
            setIsExiting(true);
            // Give exit animation time to finish (600ms) before unmounting
            setTimeout(() => {
                setIsVisible(false);
                onComplete();
            }, 600);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        // Radial gradient: darker edges (almost black), lighter navy center
                        background: 'radial-gradient(ellipse at center, #0a1628 0%, #050d1a 50%, #020509 100%)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        scale: isExiting ? 1.1 : 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                    }}
                    transition={{
                        duration: isExiting ? 0.6 : 0.5,
                        ease: 'easeOut',
                    }}
                >
                    {/* Subtle ambient light behind logo */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 45%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
                        }}
                    />

                    {/* Icon Container with Glassy Glow */}
                    <div className="relative mb-8">
                        {/* Glow Effect */}
                        <motion.div
                            className="absolute -inset-6 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Icon with Breathing Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                stiffness: 100
                            }}
                            onAnimationComplete={() => triggerHapticFeedback()}
                        >
                            {/* Breathing Wrapper */}
                            <motion.div
                                animate={{
                                    scale: [0.95, 1.05, 0.95],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8, // Start breathing after initial entrance
                                }}
                            >
                                <div className="relative h-32 w-32 overflow-hidden rounded-2xl shadow-2xl md:h-40 md:w-40">
                                    {/* Golden border ring */}
                                    <div
                                        className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                                        style={{
                                            border: '2px solid rgba(212, 175, 55, 0.6)',
                                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)',
                                        }}
                                    />

                                    <Image
                                        src="/images/icon-512.png"
                                        alt="Dr. Sabri Medical Center"
                                        fill
                                        className="object-cover"
                                        priority
                                    />

                                    {/* Diagonal Shimmer Effect - runs once */}
                                    <motion.div
                                        className="absolute inset-0 z-20 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(212, 175, 55, 0.4) 50%, transparent 60%, transparent 100%)',
                                            transform: 'translateX(-150%) translateY(-150%)',
                                        }}
                                        animate={{
                                            x: ['-150%', '150%'],
                                            y: ['-150%', '150%'],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 1, // Start after logo appears
                                            ease: "easeInOut",
                                            // No repeat - runs only once
                                        }}
                                    />

                                    {/* Subtle inner glow overlay */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-10"
                                        style={{
                                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Text Reveal */}
                    <motion.div
                        className="text-center relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
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
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Most Trusted Medical Training Center
                        </motion.p>
                    </motion.div>

                    {/* Subtle bottom gradient fade */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to top, rgba(2, 5, 9, 0.8) 0%, transparent 100%)',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
