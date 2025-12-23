'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * === useAnimationConfig Hook ===
 * Smart device-aware animation configuration
 * 
 * Detects:
 * - Device type (mobile vs desktop) via media query
 * - User preference (prefers-reduced-motion)
 * 
 * Returns appropriate spring config for optimal UX:
 * - Desktop: Heavy, luxurious springs (stiffness: 100)
 * - Mobile: Snappy, battery-efficient springs (stiffness: 150)
 * 
 * Usage:
 * const { spring, shouldAnimate, isMobile, staggerDelay } = useAnimationConfig();
 */

// Mobile breakpoint (matches Tailwind's md breakpoint)
const MOBILE_BREAKPOINT = 768;

export interface AnimationConfig {
    /** Current spring configuration based on device */
    spring: {
        type: 'spring';
        stiffness: number;
        damping: number;
    };
    /** Whether animations should run (respects reduced motion) */
    shouldAnimate: boolean;
    /** Whether device is mobile */
    isMobile: boolean;
    /** Stagger delay between children (shorter on mobile) */
    staggerDelay: number;
    /** Viewport margin for whileInView (larger on mobile to trigger earlier) */
    viewportMargin: string;
}

export function useAnimationConfig(): AnimationConfig {
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check initial state
        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        // Set initial value
        checkMobile();

        // Listen for resize events (debounced via matchMedia)
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Legacy browsers (Safari < 14)
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    // Return appropriate config based on device
    return {
        spring: isMobile
            ? { type: 'spring', stiffness: 150, damping: 25 } // Mobile: snappy, battery-efficient
            : { type: 'spring', stiffness: 100, damping: 20 }, // Desktop: heavy, luxurious
        shouldAnimate: !prefersReducedMotion,
        isMobile,
        staggerDelay: isMobile ? 0.05 : 0.1, // Faster stagger on mobile
        viewportMargin: isMobile ? '-20px' : '-50px', // Earlier trigger on mobile
    };
}

/**
 * SSR-safe version that returns desktop defaults
 * Use this for server components or initial render
 */
export function getDefaultAnimationConfig(): AnimationConfig {
    return {
        spring: { type: 'spring', stiffness: 100, damping: 20 },
        shouldAnimate: true,
        isMobile: false,
        staggerDelay: 0.1,
        viewportMargin: '-50px',
    };
}
