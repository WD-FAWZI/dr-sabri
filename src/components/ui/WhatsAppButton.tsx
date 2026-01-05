'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
    phoneNumber?: string;
    message?: string;
    locale?: string;
}

/**
 * WhatsAppButton - Floating WhatsApp contact button
 * Essential for Sudanese market - direct communication channel
 */
export default function WhatsAppButton({
    phoneNumber = '966502851073', // Saudi Arabia +966
    message,
    locale = 'ar',
}: WhatsAppButtonProps) {
    const shouldReduceMotion = useReducedMotion();

    const defaultMessage = locale === 'ar'
        ? 'مرحباً، أود الاستفسار عن دورات مركز د. صبري أبو قرون'
        : 'Hello, I would like to inquire about Dr. Sabri Abu Quron Training Center courses';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || defaultMessage)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label={locale === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
        >
            {/* Tooltip - Hidden on mobile */}
            <span className="hidden md:block bg-slate-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate-700/50">
                {locale === 'ar' ? 'تواصل معنا' : 'Chat with us'}
            </span>

            {/* WhatsApp Button - Theme-integrated */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.6)] transition-shadow duration-300">
                <MessageCircle className="w-6 h-6 text-white" fill="currentColor" />
            </div>
        </motion.a>
    );
}
