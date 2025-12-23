'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { easings, pageTransition } from '@/lib/animations';

/**
 * PageTransitionWrapper - Premium SPA-like page transitions
 * 
 * Features:
 * - AnimatePresence with mode="wait" for smooth exit before enter
 * - Fast exit (0.2s) to prevent perceived lag
 * - Luxurious enter (0.4s) with Apple-style easing
 * - Keyed by pathname for proper route detection
 * - Does not break scroll restoration (Next.js handles this)
 * 
 * Usage: Wrap page content in layout.tsx
 */

interface PageTransitionWrapperProps {
    children: ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4,
                        ease: easings.easeOutExpo,
                    }
                }}
                exit={{
                    opacity: 0,
                    y: -10,
                    transition: {
                        duration: 0.2,
                        ease: easings.easeInOutCubic,
                    }
                }}
                // Ensure proper layout for page content
                className="flex-1"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

/**
 * Alternative: usePageTransition hook for custom implementations
 * Returns animation props to spread on any motion element
 */
export function usePageTransitionProps() {
    const pathname = usePathname();

    return {
        key: pathname,
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: easings.easeOutExpo,
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
                ease: easings.easeInOutCubic,
            }
        },
    };
}
