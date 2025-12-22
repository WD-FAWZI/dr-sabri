'use client';

import React from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface TestimonialsProps {
    locale: string;
}

interface Testimonial {
    id: number;
    name: string;
    nameEn: string;
    role: string;
    roleEn: string;
    content: string;
    contentEn: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'د. أحمد محمد',
        nameEn: 'Dr. Ahmed Mohammed',
        role: 'طبيب باطنية - السعودية',
        roleEn: 'Internal Medicine - Saudi Arabia',
        content: 'تجربتي مع مركز د. صبري كانت استثنائية. المنهجية في الشرح والربط بين المعلومات ساعدتني في اجتياز USMLE Step 1 من أول محاولة.',
        contentEn: 'My experience with Dr. Sabri Center was exceptional. The methodology in explanation and connecting information helped me pass USMLE Step 1 on my first attempt.',
        rating: 5,
    },
    {
        id: 2,
        name: 'د. فاطمة حسن',
        nameEn: 'Dr. Fatima Hassan',
        role: 'طبيبة نساء وتوليد - الإمارات',
        roleEn: 'OBGYN - UAE',
        content: 'دورة الموجات فوق الصوتية كانت شاملة ومفصلة. أصبحت الآن أكثر ثقة في تشخيص الحالات. شكراً للدكتور صبري وفريقه.',
        contentEn: 'The ultrasound course was comprehensive and detailed. I am now more confident in diagnosing cases. Thanks to Dr. Sabri and his team.',
        rating: 5,
    },
    {
        id: 3,
        name: 'د. عمر سعيد',
        nameEn: 'Dr. Omar Saeed',
        role: 'طبيب طوارئ - قطر',
        roleEn: 'Emergency Medicine - Qatar',
        content: 'أفضل دورة ECG حضرتها في حياتي. الطريقة العملية في التدريس جعلت المفاهيم المعقدة سهلة الفهم والتطبيق.',
        contentEn: 'The best ECG course I have ever attended. The practical teaching method made complex concepts easy to understand and apply.',
        rating: 5,
    },
];

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

/**
 * Testimonials - Student success stories section
 * Essential for building trust, especially in Sudanese market
 */
export default function Testimonials({ locale }: TestimonialsProps) {
    const shouldReduceMotion = useReducedMotion();
    const isRTL = locale === 'ar';

    const sectionTitle = isRTL ? 'ماذا يقول خريجونا' : 'What Our Graduates Say';
    const sectionSubtitle = isRTL
        ? 'قصص نجاح من خريجي مركز د. صبري أبو قرون للتدريب الطبي'
        : 'Success stories from Dr. Sabri Abu Quron Training Center graduates';

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-indigo-950/20 to-slate-900/50" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {sectionTitle}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {sectionSubtitle}
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    initial={shouldReduceMotion ? {} : 'hidden'}
                    whileInView={shouldReduceMotion ? {} : 'visible'}
                    viewport={{ once: true, margin: '-50px' }}
                    variants={shouldReduceMotion ? {} : containerVariants}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={shouldReduceMotion ? {} : cardVariants}
                            className="glass-card rounded-2xl p-6 relative group hover:border-indigo-500/30 transition-colors duration-300"
                        >
                            {/* Quote Icon */}
                            <Quote
                                className="absolute top-4 right-4 text-indigo-500/20 group-hover:text-indigo-500/30 transition-colors"
                                size={40}
                            />

                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="text-yellow-400 fill-yellow-400"
                                        size={16}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                                {isRTL ? testimonial.content : testimonial.contentEn}
                            </p>

                            {/* Author */}
                            <div className="border-t border-slate-700/50 pt-4">
                                <h4 className="font-bold text-white">
                                    {isRTL ? testimonial.name : testimonial.nameEn}
                                </h4>
                                <p className="text-xs text-indigo-400">
                                    {isRTL ? testimonial.role : testimonial.roleEn}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
