'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
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
                ? 'py-4 backdrop-blur-lg bg-slate-900/80 border-b border-white/5'
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

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-white p-2"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div onClick={() => setIsMobileMenuOpen(false)}>
                                <LanguageSwitcher locale={locale} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
