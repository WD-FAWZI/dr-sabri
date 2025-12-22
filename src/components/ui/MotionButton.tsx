'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { snappySpring, hoverScale, tapScale } from '@/lib/animations';

/**
 * Button variant types matching globals.css button classes
 */
type ButtonVariant = 'primary' | 'secondary' | 'form' | 'ghost';

/**
 * Props for MotionButton component
 */
interface MotionButtonProps {
    /** Button style variant */
    variant?: ButtonVariant;
    /** Render as anchor tag instead of button */
    href?: string;
    /** External link (adds target="_blank" and rel) */
    external?: boolean;
    /** Button content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Click handler (for button type) */
    onClick?: () => void;
    /** Disabled state */
    disabled?: boolean;
    /** Button type (for form submission) */
    type?: 'button' | 'submit' | 'reset';
    /** Aria label for accessibility */
    'aria-label'?: string;
}

/**
 * MotionButton - Reusable animated button with tactile feedback
 * 
 * Features:
 * - whileHover scale: 1.05 with shadow intensification
 * - whileTap scale: 0.95 for tactile press feedback
 * - Full prefers-reduced-motion support
 * - Supports all Phase 1 button variants (primary, secondary, form, ghost)
 * - Polymorphic: renders as <button> or <a> based on href prop
 * 
 * Usage:
 * <MotionButton variant="primary" href="/contact">Contact Us</MotionButton>
 * <MotionButton variant="secondary" onClick={handleClick}>Click Me</MotionButton>
 */
export default function MotionButton({
    variant = 'primary',
    href,
    external = false,
    children,
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    'aria-label': ariaLabel,
}: MotionButtonProps) {
    const shouldReduceMotion = useReducedMotion();

    // Map variant to CSS classes from globals.css
    const variantClasses: Record<ButtonVariant, string> = {
        primary: 'btn-base btn-primary',
        secondary: 'btn-base btn-secondary',
        form: 'btn-base btn-form',
        ghost: 'btn-base btn-ghost',
    };

    const baseClasses = variantClasses[variant];
    const combinedClasses = `${baseClasses} ${className}`.trim();

    // Animation props - disabled when user prefers reduced motion
    const motionProps = shouldReduceMotion
        ? {}
        : {
            whileHover: disabled ? {} : hoverScale,
            whileTap: disabled ? {} : tapScale,
            transition: snappySpring,
        };

    // Render as anchor if href is provided
    if (href) {
        const linkProps = external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};

        return (
            <motion.a
                href={href}
                className={combinedClasses}
                aria-label={ariaLabel}
                {...linkProps}
                {...motionProps}
            >
                {children}
            </motion.a>
        );
    }

    // Render as button
    return (
        <motion.button
            type={type}
            className={combinedClasses}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            {...motionProps}
        >
            {children}
        </motion.button>
    );
}

/**
 * MotionLink - Simplified wrapper for animated links (not buttons)
 * Use for navigation links that need tactile feedback
 */
export function MotionLink({
    href,
    external = false,
    children,
    className = '',
    'aria-label': ariaLabel,
}: {
    href: string;
    external?: boolean;
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
}) {
    const shouldReduceMotion = useReducedMotion();

    const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};

    const motionProps = shouldReduceMotion
        ? {}
        : {
            whileHover: hoverScale,
            whileTap: tapScale,
            transition: snappySpring,
        };

    return (
        <motion.a
            href={href}
            className={className}
            aria-label={ariaLabel}
            {...linkProps}
            {...motionProps}
        >
            {children}
        </motion.a>
    );
}
