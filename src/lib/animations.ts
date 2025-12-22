import { Variants, Transition } from 'framer-motion';

/**
 * === CENTRALIZED ANIMATION UTILITIES ===
 * Premium motion design with spring-based physics
 * All animations respect prefers-reduced-motion via useReducedMotion hook
 */

// ===================================
// SPRING TRANSITION PRESETS
// ===================================

/**
 * Natural spring for general animations
 * Stiffness 100 creates a smooth, premium feel
 */
export const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
};

/**
 * Snappy spring for micro-interactions
 * Higher stiffness for immediate tactile feedback
 */
export const snappySpring: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
};

/**
 * Gentle spring for subtle movements
 */
export const gentleSpring: Transition = {
    type: "spring",
    stiffness: 80,
    damping: 12,
};

// ===================================
// STAGGER CONTAINER VARIANTS
// ===================================

/**
 * Container variant with staggered children
 * Use with whileInView for scroll-triggered animations
 * Children delay: 0.1s between each item
 */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

/**
 * Fast stagger for lists with many items
 */
export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

// ===================================
// ITEM VARIANTS (For use inside stagger containers)
// ===================================

/**
 * Fade in and slide up with spring physics
 * Default item animation for most use cases
 */
export const fadeInUpSpring: Variants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: springTransition,
    },
};

/**
 * Simple fade in with spring
 */
export const fadeInSpring: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: springTransition,
    },
};

/**
 * Scale up from small with spring bounce
 */
export const scaleInSpring: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: springTransition,
    },
};

// ===================================
// LEGACY VARIANTS (Backward compatibility)
// ===================================

/**
 * Legacy fadeInUp with easeOut (for gradual migration)
 */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

// ===================================
// MICRO-INTERACTION VARIANTS
// ===================================

/**
 * Hover and tap states for buttons/cards
 * Apply these via whileHover and whileTap props
 */
export const tapScale = { scale: 0.95 };
export const hoverScale = { scale: 1.05 };
export const hoverScaleSubtle = { scale: 1.02 };

/**
 * Card hover with lift effect
 */
export const cardHover = {
    y: -4,
    transition: { duration: 0.2 },
};

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Get animation props that respect reduced motion preference
 * @param shouldReduceMotion - from useReducedMotion hook
 * @param variants - Framer Motion variants to apply
 * @param useWhileInView - true for scroll-triggered, false for initial load
 */
export const getMotionProps = (
    shouldReduceMotion: boolean | null,
    variants: Variants,
    useWhileInView: boolean = true
) => {
    if (shouldReduceMotion) {
        return {}; // No animation for users who prefer reduced motion
    }

    if (useWhileInView) {
        return {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: '-50px' },
            variants,
        };
    }

    return {
        initial: "hidden",
        animate: "visible",
        variants,
    };
};

/**
 * Get hover/tap props that respect reduced motion
 */
export const getInteractionProps = (shouldReduceMotion: boolean | null) => {
    if (shouldReduceMotion) {
        return {};
    }

    return {
        whileHover: hoverScale,
        whileTap: tapScale,
        transition: snappySpring,
    };
};

/**
 * Get subtle hover/tap props (for primary buttons that already scale)
 */
export const getSubtleInteractionProps = (shouldReduceMotion: boolean | null) => {
    if (shouldReduceMotion) {
        return {};
    }

    return {
        whileHover: hoverScaleSubtle,
        whileTap: tapScale,
        transition: snappySpring,
    };
};
