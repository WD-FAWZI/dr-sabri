'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { easings } from '@/lib/animations';
import { contactFormSchema } from '@/lib/validation';

interface ContactFormProps {
    locale: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

/**
 * ContactForm - Professional contact form with luxury animations
 * 
 * === ANIMATIONS ===
 * - Header: Blur-in entrance with stagger
 * - Form fields: Staggered fade-in
 * - Button: Shimmer effect + tactile feedback
 * - Success/Error: Scale + fade entrance
 * - Input focus: Glow ring effect
 * 
 * === PERFORMANCE ===
 * - Device-aware springs (mobile vs desktop)
 * - Respects prefers-reduced-motion
 * - GPU-accelerated properties only
 */
export default function ContactForm({ locale }: ContactFormProps) {
    const { shouldAnimate, staggerDelay } = useAnimationConfig();
    const isRTL = locale === 'ar';

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Translations
    const t = {
        title: isRTL ? 'تواصل معنا' : 'Contact Us',
        subtitle: isRTL
            ? 'نحن نرحب باستفساراتكم وملاحظاتكم'
            : 'We welcome your inquiries and feedback',
        name: isRTL ? 'الاسم الكامل' : 'Full Name',
        email: isRTL ? 'البريد الإلكتروني' : 'Email Address',
        subject: isRTL ? 'الموضوع' : 'Subject',
        message: isRTL ? 'رسالتك' : 'Your Message',
        send: isRTL ? 'إرسال الرسالة' : 'Send Message',
        sending: isRTL ? 'جاري الإرسال...' : 'Sending...',
        success: isRTL
            ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
            : 'Your message has been sent successfully! We will get back to you soon.',
        error: isRTL
            ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.'
            : 'An error occurred while sending. Please try again.',
        required: isRTL ? 'هذا الحقل مطلوب' : 'This field is required',
        invalidEmail: isRTL ? 'البريد الإلكتروني غير صالح' : 'Invalid email address',
        minLength: isRTL ? 'يجب أن يكون 10 أحرف على الأقل' : 'Must be at least 10 characters',
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1,
            },
        },
    };

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: easings.easeOutExpo,
            },
        },
    };

    const fieldVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: easings.easeOutExpo,
            },
        },
    };

    const alertVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: -10,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 25,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
    };

    // Validation
    const validateForm = (): boolean => {
        // Zod Validation
        const result = contactFormSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors: FormErrors = {};

            // Map Zod errors to form errors
            result.error.issues.forEach((issue) => {
                // Key is the first element of path (e.g., 'email')
                const key = issue.path[0] as keyof FormErrors;
                formattedErrors[key] = issue.message;
            });

            setErrors(formattedErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle form submission - opens WhatsApp with form data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus('submitting');

        // Format message for WhatsApp
        const whatsappMessage = isRTL
            ? `*رسالة جديدة من موقع المركز*

📛 *الاسم:* ${formData.name}
📧 *البريد:* ${formData.email}
📌 *الموضوع:* ${formData.subject}

💬 *الرسالة:*
${formData.message}`
            : `*New Message from Website*

📛 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📌 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}`;

        // Saudi phone number
        const phoneNumber = '966502851073';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Small delay for UX feedback
        await new Promise(resolve => setTimeout(resolve, 500));

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    // Input glow animation
    const getInputGlowStyle = (fieldName: string) => {
        if (focusedField === fieldName) {
            return {
                boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1)",
            };
        }
        return {};
    };

    return (
        <motion.div
            initial={shouldAnimate ? "hidden" : undefined}
            animate={shouldAnimate ? "visible" : undefined}
            variants={containerVariants}
            className="w-full max-w-2xl mx-auto"
        >
            {/* Header with luxury animation */}
            <motion.div
                className={`text-center mb-10 ${isRTL ? 'text-right' : ''}`}
                variants={headerVariants}
            >
                <motion.div
                    className="inline-block mb-4"
                    initial={shouldAnimate ? { scale: 0, rotate: -30 } : undefined}
                    animate={shouldAnimate ? { scale: 1, rotate: 0 } : undefined}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                    <MessageSquare className="text-indigo-400 mx-auto" size={48} />
                </motion.div>
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                    initial={shouldAnimate ? { opacity: 0, y: 20, filter: 'blur(8px)' } : undefined}
                    animate={shouldAnimate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                    transition={{ duration: 0.5, delay: 0.2, ease: easings.easeOutExpo }}
                >
                    {t.title}
                </motion.h1>
                <motion.p
                    className="text-slate-400 text-lg"
                    initial={shouldAnimate ? { opacity: 0, y: 15 } : undefined}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.4, delay: 0.3, ease: easings.easeOutExpo }}
                >
                    {t.subtitle}
                </motion.p>
            </motion.div>

            {/* Success/Error Messages with AnimatePresence */}
            <AnimatePresence mode="wait">
                {status === 'success' && (
                    <motion.div
                        key="success"
                        className="mb-6 p-4 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center gap-3"
                        variants={alertVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <CheckCircle className="text-teal-400 shrink-0" size={24} />
                        <p className="text-teal-300">{t.success}</p>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        key="error"
                        className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center gap-3"
                        variants={alertVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <AlertCircle className="text-red-400 shrink-0" size={24} />
                        <p className="text-red-300">{t.error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form with staggered field animations */}
            <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
            >
                {/* Name Field */}
                <motion.div variants={fieldVariants}>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.name}
                    </label>
                    <motion.div
                        animate={getInputGlowStyle('name')}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl"
                    >
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            disabled={status === 'submitting'}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.name ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-[border-color,box-shadow] duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                            placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {errors.name && (
                            <motion.p
                                id="name-error"
                                className="mt-2 text-sm text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {errors.name}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={fieldVariants}>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.email}
                    </label>
                    <motion.div
                        animate={getInputGlowStyle('email')}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl"
                    >
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            disabled={status === 'submitting'}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.email ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-[border-color,box-shadow] duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                            placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                            dir="ltr"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {errors.email && (
                            <motion.p
                                id="email-error"
                                className="mt-2 text-sm text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {errors.email}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Subject Field */}
                <motion.div variants={fieldVariants}>
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.subject}
                    </label>
                    <motion.div
                        animate={getInputGlowStyle('subject')}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl"
                    >
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            disabled={status === 'submitting'}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.subject ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-[border-color,box-shadow] duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                            placeholder={isRTL ? 'موضوع الرسالة' : 'Subject of your message'}
                            aria-invalid={!!errors.subject}
                            aria-describedby={errors.subject ? 'subject-error' : undefined}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {errors.subject && (
                            <motion.p
                                id="subject-error"
                                className="mt-2 text-sm text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {errors.subject}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Message Field */}
                <motion.div variants={fieldVariants}>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.message}
                    </label>
                    <motion.div
                        animate={getInputGlowStyle('message')}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl"
                    >
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            disabled={status === 'submitting'}
                            rows={5}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.message ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-[border-color,box-shadow] duration-200 resize-none
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                            placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {errors.message && (
                            <motion.p
                                id="message-error"
                                className="mt-2 text-sm text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {errors.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Submit Button with shimmer effect */}
                <motion.div variants={fieldVariants}>
                    <motion.button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-base btn-form disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        whileHover={shouldAnimate && status !== 'submitting' ? {
                            scale: 1.02,
                            boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
                        } : undefined}
                        whileTap={shouldAnimate && status !== 'submitting' ? { scale: 0.98 } : undefined}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Button shimmer effect */}
                        {status !== 'submitting' && (
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

                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                {t.sending}
                            </>
                        ) : (
                            <>
                                <Send size={20} className="relative z-10" />
                                <span className="relative z-10">{t.send}</span>
                            </>
                        )}
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}
