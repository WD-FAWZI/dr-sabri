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
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label={locale === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
        >
            {/* Tooltip - Hidden on mobile */}
            <span className="hidden md:block bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {locale === 'ar' ? 'تواصل معنا' : 'Chat with us'}
            </span>

            {/* WhatsApp Button */}
            <div className="relative">
                {/* Pulse Ring Animation */}
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />

                {/* Button */}
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.5)] hover:shadow-[0_6px_30px_rgba(34,197,94,0.7)] transition-shadow duration-300">
                    <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
                </div>
            </div>
        </motion.a>
    );
}
