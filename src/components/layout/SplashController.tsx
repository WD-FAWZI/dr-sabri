'use client';

import { useEffect, useState } from 'react';
import SplashScreen from '@/components/ui/SplashScreen';

export default function SplashController() {
    const [showSplash, setShowSplash] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check if user has already seen the splash screen in this session
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

        if (!hasSeenSplash) {
            setShowSplash(true);
            // Mark as seen immediately so refreshing won't show it again
            sessionStorage.setItem('hasSeenSplash', 'true');
        }
    }, []);

    if (!mounted || !showSplash) return null;

    return (
        <SplashScreen onComplete={() => setShowSplash(false)} />
    );
}
