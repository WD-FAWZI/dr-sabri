'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// CRITICAL: Must match manifest.json background_color exactly
const SPLASH_BG_COLOR = '#020509';

interface SplashScreenProps {
    onComplete: () => void;
}

/**
 * Ghost Fade Splash Screen
 * 
 * Strategy: Acts as a "curtain" that covers the initial DOM painting,
 * then fades out to reveal the app content underneath.
 * 
 * This avoids the "double logo" glitch by not rendering any logo at all.
 * The user sees: Native PWA Logo -> Fade -> App Content
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const hasTriggeredHaptic = useRef(false);

    // Trigger haptic feedback when curtain starts to fade
    const triggerHapticFeedback = () => {
        if (hasTriggeredHaptic.current) return;
        hasTriggeredHaptic.current = true;

        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    useEffect(() => {
        // Small delay to ensure app content is ready underneath
        const fadeTimer = setTimeout(() => {
            triggerHapticFeedback();
            setIsVisible(false);
        }, 800); // Start fade after 800ms

        return () => clearTimeout(fadeTimer);
    }, []);

    const handleExitComplete = () => {
        onComplete();
    };

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 pointer-events-none"
                    style={{
                        backgroundColor: SPLASH_BG_COLOR,
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                    }}
                />
            )}
        </AnimatePresence>
    );
}
