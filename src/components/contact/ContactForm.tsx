'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
 * ContactForm - Professional contact form with validation
 * Features:
 * - Client-side validation
 * - Multi-language support (AR/EN)
 * - Glassmorphism design
 * - Accessible (ARIA labels)
 * - prefers-reduced-motion support
 */
export default function ContactForm({ locale }: ContactFormProps) {
    const shouldReduceMotion = useReducedMotion();
    const isRTL = locale === 'ar';

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');

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

    // Validation
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t.required;
        }

        if (!formData.email.trim()) {
            newErrors.email = t.required;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t.invalidEmail;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = t.required;
        }

        if (!formData.message.trim()) {
            newErrors.message = t.required;
        } else if (formData.message.length < 10) {
            newErrors.message = t.minLength;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus('submitting');

        // Simulate API call (replace with actual API later)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    // Animation variants
    const formVariants: import('framer-motion').Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? undefined : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
            variants={shouldReduceMotion ? undefined : formVariants}
            className="w-full max-w-2xl mx-auto"
        >
            {/* Header */}
            <div className={`text-center mb-10 ${isRTL ? 'text-right' : ''}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {t.title}
                </h1>
                <p className="text-slate-400 text-lg">
                    {t.subtitle}
                </p>
            </div>

            {/* Success/Error Messages */}
            {status === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center gap-3">
                    <CheckCircle className="text-teal-400 shrink-0" size={24} />
                    <p className="text-teal-300">{t.success}</p>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center gap-3">
                    <AlertCircle className="text-red-400 shrink-0" size={24} />
                    <p className="text-red-300">{t.error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.name}
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.name ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-all
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-400">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.email}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.email ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-all
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                        dir="ltr"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-400">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Subject Field */}
                <div>
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.subject}
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.subject ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-all
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder={isRTL ? 'موضوع الرسالة' : 'Subject of your message'}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                        <p id="subject-error" className="mt-2 text-sm text-red-400">
                            {errors.subject}
                        </p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        {t.message}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border 
                            ${errors.message ? 'border-red-500' : 'border-slate-700'} 
                            text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:border-transparent transition-all resize-none
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                        <p id="message-error" className="mt-2 text-sm text-red-400">
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold 
                        hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30 
                        hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
                >
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            {t.sending}
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            {t.send}
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
