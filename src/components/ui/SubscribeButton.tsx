'use client';

import { useState, useEffect } from 'react';
import { PushNotificationManager } from '@/lib/PushNotificationManager';
import { Bell, BellOff, Loader2, Share } from 'lucide-react';

export default function SubscribeButton() {
    const [isSupported, setIsSupported] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showIOSPrompt, setShowIOSPrompt] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'Notification' in window) {
            setIsSupported(true);

            // Check initial state
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((sub) => {
                    setIsSubscribed(!!sub);
                    setLoading(false);
                });
            });
        } else {
            setLoading(false);
        }
    }, []);

    const handleSubscribe = async () => {
        // iOS Handling
        if (PushNotificationManager.isIOS() && !PushNotificationManager.isStandalone()) {
            setShowIOSPrompt(true);
            return;
        }

        setLoading(true);
        try {
            const permission = await PushNotificationManager.requestPermission();
            if (permission === 'granted') {
                await PushNotificationManager.registerSubscription();
                setIsSubscribed(true);
            }
        } catch (error) {
            console.error('Subscription failed:', error);
            alert('Failed to enable notifications. Please check your browser settings.');
        } finally {
            setLoading(false);
        }
    };

    if (!isSupported) return null;

    if (loading) {
        return (
            <button disabled className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50">
                <Loader2 className="w-5 h-5 animate-spin" />
            </button>
        );
    }

    if (isSubscribed) {
        return (
            <button
                disabled
                className="p-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 cursor-default"
                title="Notifications Enabled"
            >
                <Bell className="w-5 h-5" />
            </button>
        );
    }

    return (
        <>
            <button
                onClick={handleSubscribe}
                className="group relative p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-primary/20 hover:border-brand-primary/50 hover:text-brand-primary transition-all duration-300 active:scale-95"
                title="Enable Notifications"
            >
                <BellOff className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse" />
            </button>

            {/* iOS Prompt Modal */}
            {showIOSPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowIOSPrompt(false)}>
                    <div className="bg-[#1c1c1e] text-white p-6 rounded-2xl max-w-sm w-full border border-white/10 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">Enable Notifications</h3>
                            <button onClick={() => setShowIOSPrompt(false)} className="text-white/50 hover:text-white">✕</button>
                        </div>

                        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                            To receive notifications on your iPhone, you must first add this app to your Home Screen.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg text-blue-400">
                                    <Share className="w-5 h-5" />
                                </div>
                                <span className="text-sm text-gray-200">1. Tap the <span className="font-bold text-blue-400">Share</span> button below</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg">
                                    <span className="font-bold text-lg">+</span>
                                </div>
                                <span className="text-sm text-gray-200">2. Select <span className="font-bold">Add to Home Screen</span></span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowIOSPrompt(false)}
                                className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                            >
                                Got it
                            </button>
                        </div>

                        {/* Visual Pointer for Share Button (Bottom Center) */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <span className="text-4xl">⬇</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
