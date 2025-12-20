'use client';

import React from 'react';

/**
 * NetworkBackground - Lightweight CSS-only background
 * 
 * === PERFORMANCE NOTE ===
 * The original Canvas animation was heavy on CPU (25-50 particles @ 60fps).
 * This version uses pure CSS for Sudan's network conditions:
 * - No JavaScript calculations
 * - No requestAnimationFrame loop
 * - Uses GPU-accelerated CSS properties only
 * - Falls back to static gradient on very slow devices
 */
const NetworkBackground = React.memo(() => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
            {/* Gradient Overlay - Pure CSS, GPU accelerated */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
                        linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)
                    `,
                }}
            />

            {/* Optional: Subtle CSS Grid Pattern - Very lightweight */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />
        </div>
    );
});

NetworkBackground.displayName = 'NetworkBackground';

export default NetworkBackground;
