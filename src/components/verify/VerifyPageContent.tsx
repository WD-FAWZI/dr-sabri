'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerificationForm from '@/components/verify/VerificationForm';
import VerificationResult from '@/components/verify/VerificationResult';
import { certificateService, type Certificate } from '@/services/certificateService';

interface VerifyPageContentProps {
    locale: string;
}

/**
 * VerifyPageContent - Client component for certificate verification
 */
function VerifyPageContent({ locale }: VerifyPageContentProps) {
    const t = useTranslations('verify');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Certificate | null | 'not-found'>(null);

    const handleVerify = async (certificateId: string) => {
        setIsLoading(true);
        setResult(null);

        try {
            const certificate = await certificateService.verifyCertificate(certificateId);
            setResult(certificate || 'not-found');
        } catch (error) {
            console.error('Verification error:', error);
            setResult('not-found');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
    };

    return (
        <>
            <Navbar locale={locale} />

            <main className="min-h-screen bg-slate-900 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Verification Form or Result */}
                    {result === null ? (
                        <VerificationForm
                            locale={locale}
                            onSubmit={handleVerify}
                            isLoading={isLoading}
                        />
                    ) : (
                        <VerificationResult
                            certificate={result === 'not-found' ? null : result}
                            locale={locale}
                            onReset={handleReset}
                        />
                    )}

                    {/* Demo Mode Notice */}
                    <div className="mt-12 text-center">
                        <div className="inline-block glass-card rounded-lg px-4 py-2">
                            <p className="text-xs text-slate-500">
                                {locale === 'ar' ? (
                                    <>
                                        <strong>وضع التجربة:</strong> البيانات محلية حالياً. في الإنتاج سيتم الربط
                                        مع API.
                                    </>
                                ) : (
                                    <>
                                        <strong>Demo Mode:</strong> Data is local. In production, this will connect
                                        to an API.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </>
    );
}

export default VerifyPageContent;
