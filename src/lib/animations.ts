import { Variants, Transition } from 'framer-motion';

/**
 * === CENTRALIZED ANIMATION UTILITIES ===
 * Premium motion design with device-aware spring physics
 * 
 * Architecture:
 * - Desktop: Luxurious, heavy springs for premium feel
 * - Mobile: Snappy, responsive springs for battery efficiency
 * - All animations respect prefers-reduced-motion
 * 
 * Use with useAnimationConfig hook for device detection
 */

// ===================================
// STANDARDIZED EASINGS (Single Source of Truth)
// ===================================

/**
 * Apple-style easing curves for consistent brand feel
 * These replace all ad-hoc cubic-bezier values across components
 */
export const easings = {
    /** Apple-style ease-out - smooth deceleration for entrances */
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    /** Snappy with slight overshoot - for micro-interactions */
    easeOutBack: [0.34, 1.56, 0.64, 1] as const,
    /** Smooth symmetrical - for reversible animations */
    easeInOutCubic: [0.65, 0, 0.35, 1] as const,
    /** Quick start, gentle end - for page transitions */
    easeOutQuart: [0.25, 1, 0.5, 1] as const,
} as const;

// ===================================
// DEVICE-AWARE SPRING CONFIGURATIONS
// ===================================

/**
 * Luxurious spring for desktop - Heavy, premium feel
 * Creates "weight" in animations that feels expensive
 * Use on devices with good GPU (desktop, high-end tablets)
 */
export const luxuriousSpring: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
};

/**
 * Mobile-optimized spring - Snappy, battery-efficient
 * Higher stiffness = faster settling = less GPU work
 * Use on mobile devices and low-power mode
 */
export const mobileSpring: Transition = {
    type: "spring",
    stiffness: 150,
    damping: 25,
};

/**
 * Snappy spring for micro-interactions (hover, tap)
 * Same across all devices - interactions must feel immediate
 */
export const snappySpring: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
};

/**
 * Gentle spring for subtle ambient movements
 * Use sparingly - only for decorative elements
 */
export const gentleSpring: Transition = {
    type: "spring",
    stiffness: 80,
    damping: 12,
};

// Legacy alias (backward compatibility)
export const springTransition = luxuriousSpring;

// ===================================
// STANDARDIZED DURATION TRANSITIONS
// ===================================

/**
 * Standard entrance transition with Apple easing
 * Use when spring physics isn't appropriate
 */
export const standardTransition: Transition = {
    duration: 0.4,
    ease: easings.easeOutExpo,
};

/**
 * Fast transition for UI feedback
 */
export const fastTransition: Transition = {
    duration: 0.2,
    ease: easings.easeOutExpo,
};

/**
 * Page transition config
 */
export const pageTransition: Transition = {
    duration: 0.3,
    ease: easings.easeOutQuart,
};

// ===================================
// STAGGER CONTAINER VARIANTS
// ===================================

/**
 * Container variant with staggered children
 * Use with whileInView for scroll-triggered animations
 * @param staggerDelay - from useAnimationConfig().staggerDelay
 */
export const createStaggerContainer = (staggerDelay: number = 0.1): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: staggerDelay,
        },
    },
});

/** Default stagger container (desktop timing) */
export const staggerContainer: Variants = createStaggerContainer(0.1);

/** Fast stagger for lists with many items */
export const staggerContainerFast: Variants = createStaggerContainer(0.05);

/** Mobile-optimized stagger */
export const staggerContainerMobile: Variants = createStaggerContainer(0.05);

// ===================================
// ITEM VARIANTS (For use inside stagger containers)
// ===================================

/**
 * Create fade-in-up variant with device-appropriate spring
 * @param spring - from useAnimationConfig().spring
 */
export const createFadeInUpVariant = (spring: Transition = luxuriousSpring): Variants => ({
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: spring,
    },
});

/** Fade in and slide up with luxurious spring (desktop default) */
export const fadeInUpSpring: Variants = createFadeInUpVariant(luxuriousSpring);

/** Fade in and slide up with mobile spring */
export const fadeInUpMobile: Variants = createFadeInUpVariant(mobileSpring);

/** Simple fade in with spring */
export const fadeInSpring: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: luxuriousSpring,
    },
};

/** Scale up from small with spring bounce */
export const scaleInSpring: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: luxuriousSpring,
    },
};

// ===================================
// LEGACY VARIANTS (Backward compatibility)
// ===================================

/** Legacy fadeInUp with easeOut */
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

/** Tap scale for buttons */
export const tapScale = { scale: 0.95 };

/** Hover scale for cards/buttons */
export const hoverScale = { scale: 1.05 };

/** Subtle hover scale for primary buttons */
export const hoverScaleSubtle = { scale: 1.02 };

/** Card hover with lift effect */
export const cardHover = {
    y: -4,
    transition: fastTransition,
};

// ===================================
// LUXURY SHINE EFFECT
// ===================================

/**
 * Shine keyframes for primary buttons
 * A subtle white beam that traverses the element
 */
export const shineVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
        x: "200%",
        opacity: [0, 0.4, 0],
        transition: {
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
        },
    },
};

// ===================================
// SMART UTILITY FUNCTIONS
// ===================================

/**
 * Get animation props that respect reduced motion preference
 * @param shouldAnimate - from useAnimationConfig().shouldAnimate
 * @param variants - Framer Motion variants to apply
 * @param useWhileInView - true for scroll-triggered, false for initial load
 * @param viewportMargin - from useAnimationConfig().viewportMargin
 */
export const getMotionProps = (
    shouldAnimate: boolean,
    variants: Variants,
    useWhileInView: boolean = true,
    viewportMargin: string = '-50px'
) => {
    if (!shouldAnimate) {
        return {}; // No animation for users who prefer reduced motion
    }

    if (useWhileInView) {
        return {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: viewportMargin },
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
 * @param shouldAnimate - from useAnimationConfig().shouldAnimate
 */
export const getInteractionProps = (shouldAnimate: boolean) => {
    if (!shouldAnimate) {
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
 * @param shouldAnimate - from useAnimationConfig().shouldAnimate
 */
export const getSubtleInteractionProps = (shouldAnimate: boolean) => {
    if (!shouldAnimate) {
        return {};
    }

    return {
        whileHover: hoverScaleSubtle,
        whileTap: tapScale,
        transition: snappySpring,
    };
};

/**
 * Create device-aware fade-in-up props
 * Combines device detection with motion props
 */
export const getDeviceAwareMotionProps = (
    shouldAnimate: boolean,
    isMobile: boolean,
    useWhileInView: boolean = true,
    viewportMargin: string = '-50px'
) => {
    const variants = isMobile ? fadeInUpMobile : fadeInUpSpring;
    return getMotionProps(shouldAnimate, variants, useWhileInView, viewportMargin);
};
