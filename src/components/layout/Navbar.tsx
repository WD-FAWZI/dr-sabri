'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import LanguageSwitcher from '../ui/LanguageSwitcher';

/**
 * Navbar - Main navigation component with i18n and mobile support
 * Migrated and enhanced from original DR.SABRY-CODE.txt
 */
export default function Navbar({ locale }: { locale: string }) {
    const t = useTranslations('nav');
    const isScrolled = useScrollThreshold(20);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = useMemo(
        () => [
            { id: 'home', label: t('home'), href: '/' },
            { id: 'about', label: t('about'), href: '/about' },
            { id: 'verify', label: t('verify'), href: '/verify' },
        ],
        [t]
    );

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                ? 'py-4 backdrop-blur-xl bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                : 'py-8 bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="cursor-pointer z-50">
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
                    className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center group"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="relative w-6 h-5 flex flex-col justify-between">
                        {/* Top Line */}
                        <span
                            className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-out origin-center ${isMobileMenuOpen
                                ? 'rotate-45 translate-y-[9px]'
                                : 'rotate-0 translate-y-0'
                                }`}
                        />

                        {/* Middle Line */}
                        <span
                            className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                }`}
                        />

                        {/* Bottom Line */}
                        <span
                            className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-out origin-center ${isMobileMenuOpen
                                ? '-rotate-45 -translate-y-[9px]'
                                : 'rotate-0 translate-y-0'
                                }`}
                        />
                    </div>

                    {/* Hover Glow Effect */}
                    <span className="absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop with Glassmorphism */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 z-40 cursor-pointer"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.92) 100%)',
                                    backdropFilter: 'blur(24px)',
                                    WebkitBackdropFilter: 'blur(24px)',
                                }}
                            >
                                {/* Subtle Grid Pattern Overlay */}
                                <div
                                    className="absolute inset-0 opacity-[0.03]"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                                        `,
                                        backgroundSize: '50px 50px'
                                    }}
                                />

                                {/* Menu Content Container */}
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -30, opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.34, 1.56, 0.64, 1] // Premium bounce
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative h-full flex flex-col items-center justify-center"
                                >
                                    {/* Decorative Glow */}
                                    <div className="absolute top-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

                                    {/* Menu Items with Staggered Animation */}
                                    <div className="relative z-10 flex flex-col items-center space-y-6">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: index * 0.1,
                                                    ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="group relative text-3xl font-bold text-white transition-all duration-300 hover:scale-110"
                                                >
                                                    {/* Hover Glow Effect */}
                                                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-teal-400/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                                                    {/* Text with Gradient on Hover */}
                                                    <span className="relative group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                        {link.label}
                                                    </span>

                                                    {/* Underline Animation */}
                                                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-teal-400 group-hover:w-full transition-all duration-500 ease-out" />
                                                </Link>
                                            </motion.div>
                                        ))}

                                        {/* Language Switcher with Delay */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: navLinks.length * 0.1,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="mt-8"
                                        >
                                            <LanguageSwitcher locale={locale} />
                                        </motion.div>
                                    </div>

                                    {/* Close Hint Text */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.6, duration: 0.4 }}
                                        className="absolute bottom-12 text-sm text-slate-400 font-light"
                                    >
                                        {locale === 'ar' ? 'اضغط في أي مكان للإغلاق' : 'Tap anywhere to close'}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
