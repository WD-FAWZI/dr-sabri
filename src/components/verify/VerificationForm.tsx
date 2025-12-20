'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Loader2 } from 'lucide-react';

interface VerificationFormProps {
    locale: string;
    onSubmit: (certificateId: string) => Promise<void>;
    isLoading: boolean;
}

// Demo certificate suggestions
const demoCertificates = [
    { id: 'STC-2024-001', nameAr: 'أحمد محمد علي', nameEn: 'Ahmed Mohammed Ali' },
    { id: 'STC-2024-002', nameAr: 'فاطمة أحمد حسن', nameEn: 'Fatima Ahmed Hassan' },
    { id: 'STC-2024-003', nameAr: 'محمد عبدالله سعيد', nameEn: 'Mohammed Abdullah Saeed' },
    { id: 'STC-2024-004', nameAr: 'سارة علي إبراهيم', nameEn: 'Sara Ali Ibrahim' },
    { id: 'STC-2024-005', nameAr: 'عمر حسن محمود', nameEn: 'Omar Hassan Mahmoud' },
];

/**
 * VerificationForm - Certificate ID input form
 */
export default function VerificationForm({
    locale,
    onSubmit,
    isLoading,
}: VerificationFormProps) {
    const t = useTranslations('verify');
    const [certificateId, setCertificateId] = useState('');
    const [error, setError] = useState('');
    const isRTL = locale === 'ar';

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

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8 space-y-6">
                <div className="space-y-2">
                    <label
                        htmlFor="certificateId"
                        className="block text-sm font-medium text-slate-300"
                    >
                        {t('inputPlaceholder')}
                    </label>
                    <div className="relative">
                        <input
                            id="certificateId"
                            type="text"
                            list="demo-certificates"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                            placeholder="STC-2024-001"
                            disabled={isLoading}
                            className={`w-full py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'pl-10 pr-4 text-right' : 'pr-10 pl-4 text-left'
                                }`}
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                        {/* Search icon - positioned based on locale */}
                        <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isRTL ? 'left-3' : 'right-3'
                            }`}>
                            <Search className="text-slate-500" size={20} />
                        </div>

                        {/* Datalist for browser autocomplete suggestions */}
                        <datalist id="demo-certificates">
                            {demoCertificates.map((cert) => (
                                <option key={cert.id} value={cert.id}>
                                    {isRTL ? cert.nameAr : cert.nameEn}
                                </option>
                            ))}
                        </datalist>
                    </div>
                    {error && (
                        <p className="text-sm text-red-400 mt-1">{error}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>{t('searching')}</span>
                        </>
                    ) : (
                        <span>{t('buttonText')}</span>
                    )}
                </button>
            </div>

            {/* Example IDs hint */}
            <div className="mt-4 text-center text-xs text-slate-500">
                {locale === 'ar' ? (
                    <>
                        <strong>💡 للتجربة:</strong> ابدأ بكتابة STC وستظهر الاقتراحات
                    </>
                ) : (
                    <>
                        <strong>💡 Tip:</strong> Start typing STC to see suggestions
                    </>
                )}
            </div>
        </form>
    );
}

