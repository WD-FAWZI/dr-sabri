'use client';

import Link from 'next/link';

/**
 * FooterSignature Component
 * 
 * A premium "Quiet Luxury" signature with animated gold shimmer effect.
 * Features:
 * - Slow-moving shimmer animation (4s loop)
 * - Subtle gold hover state
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
                        text-[10px] uppercase tracking-[0.2em] font-medium
                        bg-gradient-to-r from-neutral-600 via-yellow-200 to-neutral-600
                        bg-[length:200%_100%]
                        bg-clip-text text-transparent
                        animate-shimmer
                        transition-all duration-500 ease-out
                        group-hover:bg-none group-hover:text-[#D4AF37]
                    "
                >
                    Digital Experience Crafted by Dr. Mohamed Fawzi
                </span>
            </Link>
        </div>
    );
}
