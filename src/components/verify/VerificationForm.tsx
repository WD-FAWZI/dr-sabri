'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Loader2, Shield } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { easings } from '@/lib/animations';

interface VerificationFormProps {
    locale: string;
    onSubmit: (certificateId: string) => Promise<void>;
    isLoading: boolean;
}

// Real certificate suggestions - Mohamed Fawzi's actual courses
const demoCertificates = [
    { id: 'STC-2024-001', nameAr: 'محمد فوزي يوسف محمد', nameEn: 'Mohamed Fawzi Yousef Mohamed', course: 'First Aid & CPR' },
    { id: 'STC-2024-002', nameAr: 'محمد فوزي يوسف محمد', nameEn: 'Mohamed Fawzi Yousef Mohamed', course: 'Fundamental of ECG' },
    { id: 'STC-2024-003', nameAr: 'محمد فوزي يوسف محمد', nameEn: 'Mohamed Fawzi Yousef Mohamed', course: 'Advance ECG Course' },
    { id: 'STC-2024-004', nameAr: 'محمد فوزي يوسف محمد', nameEn: 'Mohamed Fawzi Yousef Mohamed', course: 'Pulmonary Function Test' },
];

/**
 * VerificationForm - Certificate ID input form with luxury animations
 * 
 * === ANIMATIONS ===
 * - Card entrance: Scale + fade with blur
 * - Input focus: Glow ring effect
 * - Button: Tactile hover/tap feedback
 * - Error: Shake animation
 * - Icon: Subtle pulse on hover
 */
export default function VerificationForm({
    locale,
    onSubmit,
    isLoading,
}: VerificationFormProps) {
    const t = useTranslations('verify');
    const [certificateId, setCertificateId] = useState('');
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const isRTL = locale === 'ar';
    const { shouldAnimate } = useAnimationConfig();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        const trimmedId = certificateId.trim();
        if (!trimmedId) {
            setError(locale === 'ar' ? 'الرجاء إدخال رقم الشهادة' : 'Please enter a certificate ID');
            return;
        }

        // Format validation
        const regex = /^STC-\d{4}-\d{3}$/i;
        if (!regex.test(trimmedId)) {
            setError(
                locale === 'ar'
                    ? 'صيغة رقم الشهادة غير صحيحة. الصيغة المتوقعة: STC-2024-001'
                    : 'Invalid certificate ID format. Expected: STC-2024-001'
            );
            return;
        }

        await onSubmit(trimmedId);
    };

    // Animation variants
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.97,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easings.easeOutExpo,
            },
        },
    };

    const inputContainerVariants = {
        focused: {
            boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1)",
        },
        unfocused: {
            boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)",
        },
    };

    const errorVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 500,
                damping: 25,
            },
        },
    };

    const hintVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.4,
                duration: 0.4,
                ease: easings.easeOutExpo,
            },
        },
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto"
            initial={shouldAnimate ? "hidden" : undefined}
            animate={shouldAnimate ? "visible" : undefined}
            variants={cardVariants}
        >
            <motion.div
                className="glass-card rounded-2xl p-8 space-y-6 relative overflow-hidden"
                whileHover={shouldAnimate ? {
                    boxShadow: "0 10px 40px rgba(99, 102, 241, 0.1)",
                } : undefined}
                transition={{ duration: 0.3 }}
            >
                {/* Decorative Shield Icon */}
                <motion.div
                    className="absolute -top-6 -right-6 opacity-5"
                    initial={shouldAnimate ? { rotate: -15, scale: 0 } : undefined}
                    animate={shouldAnimate ? { rotate: 0, scale: 1 } : undefined}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                >
                    <Shield size={120} className="text-indigo-500" />
                </motion.div>

                <div className="space-y-2 relative z-10">
                    <motion.label
                        htmlFor="certificateId"
                        className="block text-sm font-medium text-slate-300"
                        initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                        transition={{ delay: 0.1 }}
                    >
                        {t('inputPlaceholder')}
                    </motion.label>

                    {/* Input with animated glow */}
                    <motion.div
                        className="relative rounded-lg"
                        variants={inputContainerVariants}
                        animate={isFocused ? "focused" : "unfocused"}
                        transition={{ duration: 0.2 }}
                    >
                        <input
                            id="certificateId"
                            type="text"
                            list="demo-certificates"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="STC-2024-001"
                            disabled={isLoading}
                            className={`w-full py-4 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-[border-color,box-shadow] duration-200 ${isRTL ? 'pl-12 pr-4 text-right' : 'pr-12 pl-4 text-left'
                                }`}
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                        {/* Animated Search icon */}
                        <motion.div
                            className={`absolute inset-y-0 flex items-center pointer-events-none ${isRTL ? 'left-4' : 'right-4'}`}
                            animate={isFocused ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Search className={`transition-colors duration-200 ${isFocused ? 'text-indigo-400' : 'text-slate-500'}`} size={20} />
                        </motion.div>

                        {/* Datalist for browser autocomplete suggestions */}
                        <datalist id="demo-certificates">
                            {demoCertificates.map((cert) => (
                                <option key={cert.id} value={cert.id}>
                                    {isRTL ? cert.nameAr : cert.nameEn}
                                </option>
                            ))}
                        </datalist>
                    </motion.div>

                    {/* Animated Error Message */}
                    {error && (
                        <motion.p
                            className="text-sm text-red-400 mt-2 flex items-center gap-2"
                            initial="hidden"
                            animate="visible"
                            variants={errorVariants}
                        >
                            <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                            {error}
                        </motion.p>
                    )}
                </div>

                {/* Animated Submit Button */}
                <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="btn-base btn-form disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    whileHover={shouldAnimate && !isLoading ? {
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
                    } : undefined}
                    whileTap={shouldAnimate && !isLoading ? { scale: 0.98 } : undefined}
                    transition={{ duration: 0.2 }}
                >
                    {/* Button shimmer effect */}
                    {!isLoading && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 3,
                                duration: 1,
                                ease: "easeInOut",
                            }}
                        />
                    )}

                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>{t('searching')}</span>
                        </>
                    ) : (
                        <span className="relative z-10">{t('buttonText')}</span>
                    )}
                </motion.button>
            </motion.div>

            {/* Animated Hint */}
            <motion.div
                className="mt-4 text-center text-xs text-slate-500"
                initial={shouldAnimate ? "hidden" : undefined}
                animate={shouldAnimate ? "visible" : undefined}
                variants={hintVariants}
            >
                {locale === 'ar' ? (
                    <>
                        <strong>💡 للتجربة:</strong> ابدأ بكتابة STC وستظهر الاقتراحات
                    </>
                ) : (
                    <>
                        <strong>💡 Tip:</strong> Start typing STC to see suggestions
                    </>
                )}
            </motion.div>
        </motion.form>
    );
}

