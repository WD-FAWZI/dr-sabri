'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * NetworkBackground - Interactive particle canvas background
 * Migrated from original DR.SABRY-CODE.txt with TypeScript conversion
 * 
 * Performance optimizations:
 * - React.memo to prevent re-renders
 * - Adaptive particle count based on screen width
 * - Uses requestAnimationFrame for smooth animation
 * - Respects user's reduced motion preference
 */
const NetworkBackground = React.memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        // If user prefers reduced motion, skip the canvas entirely
        if (shouldReduceMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let width: number;
        let height: number;
        let particles: Particle[] = [];
        let animationFrameId: number;

        // Configuration - Adaptive Performance
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 25 : 50;
        const connectionDistance = isMobile ? 100 : 150;
        const moveSpeed = 0.3;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * moveSpeed;
                this.vy = (Math.random() - 0.5) * moveSpeed;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fillStyle = 'rgba(99, 102, 241, 0.4)';
                ctx!.fill();
            }
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            // Handle DPI but cap at 2x to prevent GPU overload
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        };

        const init = () => {
            resize();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Clear with solid color
            ctx.fillStyle = '#0f172a'; // slate-900
            ctx.fillRect(0, 0, width, height);

            // Update and Draw Particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                p.draw();

                // Optimized Distance Check
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;

                    // Quick bounding box check
                    if (
                        dx > connectionDistance ||
                        dy > connectionDistance ||
                        dx < -connectionDistance ||
                        dy < -connectionDistance
                    )
                        continue;

                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [shouldReduceMotion]);

    // Fallback for reduced motion
    if (shouldReduceMotion) {
        return <div className="absolute inset-0 z-0 bg-slate-900" />;
    }

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-slate-900" />;
});

NetworkBackground.displayName = 'NetworkBackground';

export default NetworkBackground;
