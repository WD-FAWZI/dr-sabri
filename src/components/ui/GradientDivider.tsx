'use client';

import React from 'react';

/**
 * GradientDivider - Smooth transition between animated and static backgrounds
 * Creates a visual fade effect between sections
 */
export default function GradientDivider() {
    return (
        <div className="relative h-32 pointer-events-none -mt-32 z-20">
            {/* Main gradient fade */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgb(15, 23, 42) 100%)'
                }}
            />
            {/* Subtle glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px">
                <div className="h-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                <div className="absolute inset-0 h-full bg-indigo-500/10 blur-sm" />
            </div>
        </div>
    );
}
