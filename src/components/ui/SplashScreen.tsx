'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Animation sequence timing
        // Total duration: ~2.5s
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Give exit animation time to finish before unmounting
            setTimeout(onComplete, 600);
        }, 2200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixedinset-0 z-50 flex flex-col items-center justify-center bg-slate-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Icon Container with Glassy Glow */}
                    <div className="relative mb-8">
                        {/* Glow Effect */}
                        <motion.div
                            className="absolute -inset-4 rounded-full bg-blue-500/20 blur-2xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <div className="relative h-32 w-32 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 md:h-40 md:w-40">
                                <Image
                                    src="/images/icon-512.png"
                                    alt="Dr. Sabri Medical Center"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Shimmer Overlay */}
                                <motion.div
                                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ translateX: ['-100%', '100%'] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 0.5,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Reveal */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h1 className="bg-gradient-to-r from-slate-100 via-blue-100 to-slate-100 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                            Dr. Sabri Abu Quron
                        </h1>
                        <motion.p
                            className="mt-2 text-sm text-slate-400 font-medium tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Most Trusted Medical Training Center
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
