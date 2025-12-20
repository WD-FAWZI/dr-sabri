'use client';

import React from 'react';

/**
 * NetworkBackground - Premium CSS-only animated background
 * 
 * === MAGIC MIX - ENHANCED VERSION ===
 * More visible effects while maintaining performance
 */
const NetworkBackground = React.memo(() => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">

            {/* Layer 1: Animated Gradient Flow - MORE VISIBLE */}
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    background: `
                        linear-gradient(
                            135deg,
                            #0f172a 0%,
                            #312e81 20%,
                            #0f172a 40%,
                            #134e4a 60%,
                            #0f172a 80%,
                            #1e1b4b 100%
                        )
                    `,
                    backgroundSize: '400% 400%',
                    animation: 'gradientFlow 20s ease infinite',
                }}
            />

            {/* Layer 2: Grid Pattern - SLIGHTLY MORE VISIBLE */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Layer 3: Floating Orb - Top Left (Indigo) - BIGGER & BRIGHTER */}
            <div
                className="absolute -top-20 -left-20 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(99, 102, 241, 0.3) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'subtlePulse 8s ease-in-out infinite',
                }}
            />

            {/* Layer 4: Floating Orb - Bottom Right (Teal) - BIGGER & BRIGHTER */}
            <div
                className="absolute -bottom-20 -right-20 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-25"
                style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 1) 0%, rgba(20, 184, 166, 0.3) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'subtlePulse 10s ease-in-out infinite',
                    animationDelay: '3s',
                }}
            />

            {/* Layer 5: Center Glow - MORE VISIBLE */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 50%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Layer 6: Accent Orb - Top Right (Purple) - NEW */}
            <div
                className="absolute -top-10 right-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 1) 0%, transparent 60%)',
                    filter: 'blur(50px)',
                    animation: 'subtlePulse 12s ease-in-out infinite',
                    animationDelay: '5s',
                }}
            />

            {/* Layer 7: Vignette Effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15, 23, 42, 0.5) 100%)',
                }}
            />

            {/* Layer 8: Subtle top-to-bottom gradient for depth */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)',
                }}
            />
        </div>
    );
});

NetworkBackground.displayName = 'NetworkBackground';

export default NetworkBackground;
