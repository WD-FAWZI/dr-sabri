'use client';

import Link from 'next/link';

/**
 * FooterSignature Component
 * 
 * A premium "Cyberpunk Luxury" signature with animated silver/cyan shimmer effect.
 * Features:
 * - Silver base with cyan neon accents
 * - Slow-moving shimmer animation (4s loop)
 * - Cyberpunk cyan glow hover state
 * - Opens LinkedIn profile in new tab
 */
export default function FooterSignature() {
    return (
        <div className="flex justify-center py-4">
            <Link
                href="https://www.linkedin.com/in/mohamed-fawzi-mbbs-876876247"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
            >
                <span
                    className="
                        relative
                        text-[10px] uppercase tracking-[0.2em] font-medium
                        bg-gradient-to-r from-slate-500 via-cyan-200 to-slate-500
                        bg-[length:200%_100%]
                        bg-clip-text text-transparent
                        animate-shimmer
                        transition-all duration-500 ease-out
                        group-hover:from-cyan-400 group-hover:via-violet-300 group-hover:to-cyan-400
                    "
                    style={{
                        textShadow: 'none',
                    }}
                >
                    Digital Experience Crafted by Dr. Mohamed Fawzi
                </span>
            </Link>
        </div>
    );
}
