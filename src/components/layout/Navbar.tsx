'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { easings } from '@/lib/animations';
import LanguageSwitcher from '../ui/LanguageSwitcher';

/**
 * Navbar - Main navigation component with i18n and mobile support
 * Features:
 * - Device-aware animations via useAnimationConfig
 * - Standardized Apple-style easing curves
 * - Optimized transition durations (300ms instead of 500ms)
 */
export default function Navbar({ locale }: { locale: string }) {
    const t = useTranslations('nav');
    const isScrolled = useScrollThreshold(20);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Device-aware animation config
    const { shouldAnimate, staggerDelay } = useAnimationConfig();

    const navLinks = useMemo(
        () => [
            { id: 'home', label: t('home'), href: '/' },
            { id: 'about', label: t('about'), href: '/about' },
            { id: 'verify', label: t('verify'), href: '/verify' },
            { id: 'contact', label: t('contact'), href: '/contact' },
        ],
        [t]
    );

    return (
        <nav
            className={`fixed w-full z-[100] transition-[padding,background-color,box-shadow] duration-300 ${isScrolled
                ? 'py-4 backdrop-blur-xl bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                : 'py-8 bg-transparent'
                }`}
            style={{ position: 'fixed' }}
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="cursor-pointer relative z-[110]">
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        {locale === 'ar' ? 'د. صبري أبو قرون' : 'Dr. Sabri Abu Quron'}
                    </h1>
                    <p className="text-[10px] text-indigo-400 tracking-widest uppercase">
                        Medical Mentor
                    </p>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <LanguageSwitcher locale={locale} />
                </div>


                {/* Mobile Toggle - Animated Hamburger */}
                <button
                    className="md:hidden relative z-[110] w-10 h-10 flex items-center justify-center group"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="relative w-6 h-5 flex flex-col justify-between">
                        {/* Top Line */}
                        <span
                            className={`block h-0.5 w-full bg-white rounded-full transition-transform duration-300 ease-out origin-center ${isMobileMenuOpen
                                ? 'rotate-45 translate-y-[9px]'
                                : 'rotate-0 translate-y-0'
                                }`}
                        />

                        {/* Middle Line */}
                        <span
                            className={`block h-0.5 w-full bg-white rounded-full transition-[opacity,transform] duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                }`}
                        />

                        {/* Bottom Line */}
                        <span
                            className={`block h-0.5 w-full bg-white rounded-full transition-transform duration-300 ease-out origin-center ${isMobileMenuOpen
                                ? '-rotate-45 -translate-y-[9px]'
                                : 'rotate-0 translate-y-0'
                                }`}
                        />
                    </div>

                    {/* Hover Glow Effect */}
                    <span className="absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                </button>
            </div>

            {/* Mobile Menu - with luxurious animation */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        initial={shouldAnimate ? {
                            opacity: 0,
                            scale: 0.95,
                            filter: 'blur(10px)'
                        } : undefined}
                        animate={shouldAnimate ? {
                            opacity: 1,
                            scale: 1,
                            filter: 'blur(0px)'
                        } : undefined}
                        exit={shouldAnimate ? {
                            opacity: 0,
                            scale: 1.02,
                            filter: 'blur(5px)'
                        } : undefined}
                        transition={{
                            duration: 0.4,
                            ease: easings.easeOutExpo,
                        }}
                        className="fixed inset-0 top-0 left-0 w-full min-h-screen bg-slate-900 z-[99] flex flex-col items-center justify-center"
                        style={{ backgroundColor: '#0f172a' }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {/* Menu Items */}
                        <div
                            className="flex flex-col items-center space-y-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.id}
                                    initial={shouldAnimate ? {
                                        opacity: 0,
                                        y: 40,
                                        scale: 0.9,
                                        filter: 'blur(4px)'
                                    } : undefined}
                                    animate={shouldAnimate ? {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: 'blur(0px)'
                                    } : undefined}
                                    exit={shouldAnimate ? {
                                        opacity: 0,
                                        y: -20,
                                        scale: 0.95
                                    } : undefined}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1 + index * 0.08,
                                        ease: easings.easeOutBack,
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="group relative text-3xl font-bold text-white transition-all duration-300 hover:scale-110"
                                    >
                                        <span className="relative group-hover:text-indigo-400 transition-colors duration-300">
                                            {link.label}
                                        </span>
                                        {/* Underline effect on hover */}
                                        <motion.span
                                            className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"
                                        />
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Language Switcher */}
                            <motion.div
                                initial={shouldAnimate ? {
                                    opacity: 0,
                                    y: 30,
                                    scale: 0.9
                                } : undefined}
                                animate={shouldAnimate ? {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1
                                } : undefined}
                                exit={shouldAnimate ? {
                                    opacity: 0,
                                    y: -10
                                } : undefined}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + navLinks.length * 0.08,
                                    ease: easings.easeOutBack,
                                }}
                                className="mt-10"
                            >
                                <LanguageSwitcher locale={locale} />
                            </motion.div>
                        </div>

                        {/* Close Hint */}
                        <motion.p
                            initial={shouldAnimate ? { opacity: 0 } : undefined}
                            animate={shouldAnimate ? { opacity: 1 } : undefined}
                            exit={shouldAnimate ? { opacity: 0 } : undefined}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="absolute bottom-12 text-sm text-slate-500"
                        >
                            {locale === 'ar' ? 'اضغط في أي مكان للإغلاق' : 'Tap anywhere to close'}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
