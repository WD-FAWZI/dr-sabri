'use client';

import { useState, useEffect } from 'react';

/**
 * useScrollThreshold - Custom hook for scroll-based UI changes
 * Migrated from original DR.SABRY-CODE.txt
 * 
 * Uses requestAnimationFrame for performance optimization
 */
export function useScrollThreshold(threshold = 20): boolean {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // SSR safety check - window doesn't exist during prerendering
        if (typeof window === 'undefined') return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > threshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
}
