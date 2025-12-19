'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, User, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Certificate } from '@/services/certificateService';

interface VerificationResultProps {
    certificate: Certificate | null;
    locale: string;
    onReset: () => void;
}

/**
 * VerificationResult - Display verification result
 */
export default function VerificationResult({
    certificate,
    locale,
    onReset,
}: VerificationResultProps) {
    const t = useTranslations('verify');

    const isValid = certificate !== null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div
                className={`glass-card rounded-2xl p-8 border-2 ${isValid
                        ? 'border-green-500/30 bg-green-500/5'
                        : 'border-red-500/30 bg-red-500/5'
                    }`}
            >
                {/* Status Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    {isValid ? (
                        <CheckCircle2 className="text-green-400" size={48} />
                    ) : (
                        <XCircle className="text-red-400" size={48} />
                    )}
                    <h2
                        className={`text-2xl font-bold ${isValid ? 'text-green-400' : 'text-red-400'
                            }`}
                    >
                        {isValid ? t('valid') : t('invalid')}
                    </h2>
                </div>

                {/* Certificate Details */}
                {isValid && certificate && (
                    <div className="space-y-4 border-t border-slate-700 pt-6">
                        <div className="flex items-start gap-3">
                            <User className="text-indigo-400 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-slate-500">{t('resultName')}</p>
                                <p className="text-white font-medium">
                                    {locale === 'ar'
                                        ? certificate.studentName
                                        : certificate.studentNameEn}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <BookOpen className="text-indigo-400 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-slate-500">{t('resultCourse')}</p>
                                <p className="text-white font-medium">
                                    {locale === 'ar'
                                        ? certificate.courseName
                                        : certificate.courseNameEn}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calendar className="text-indigo-400 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-slate-500">{t('resultDate')}</p>
                                <p className="text-white font-medium">
                                    {new Date(certificate.issueDate).toLocaleDateString(
                                        locale === 'ar' ? 'ar-SA' : 'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Invalid Message */}
                {!isValid && (
                    <p className="text-center text-slate-400 mb-6">
                        {locale === 'ar'
                            ? 'لم يتم العثور على شهادة بهذا الرقم. الرجاء التحقق من الرقم المدخل.'
                            : 'No certificate found with this ID. Please check the entered ID.'}
                    </p>
                )}

                {/* Reset Button */}
                <button
                    onClick={onReset}
                    className="w-full mt-6 px-6 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                    {t('tryAgain')}
                </button>
            </div>
        </motion.div>
    );
}
