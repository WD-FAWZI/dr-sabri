# Dr. Sabri Abu Quron Training Center (STC)
## Text-to-Design Prompt

> **Purpose**: Use this prompt in AI design tools (Figma AI, Galileo, V0.dev, etc.) to generate improved UI versions that match the current design language.

---

## Full Design Prompt

Create a modern web interface for a Medical Training Center (Dr. Sabri Abu Quron Training Center - STC) featuring a sophisticated dark mode design with a deep slate color foundation, using `#0f172a` (slate-900) as the primary background, layered with `#1e293b` (slate-800) for secondary surfaces, and `#334155` (slate-700) for tertiary elements and borders; the color scheme employs an elegant indigo-teal gradient accent system where `#6366f1` (indigo-500) serves as the primary action color and `#14b8a6` (teal-400) as the secondary accent, creating stunning gradient text effects and glowing button states with box-shadows like `0 0 30px rgba(99,102,241,0.6)` for CTAs; the layout utilizes a centered single-column structure with a max-width of 1152px (max-w-6xl), featuring a fixed top navigation bar that transitions from transparent (with py-8 padding) to a frosted glass effect on scroll (using `backdrop-blur-xl` with a gradient from slate-900/80) accompanied by subtle elevation shadows; typography combines the modern Inter font for English and Tajawal font for Arabic text, with bold (700) weights for headlines (text-4xl to text-6xl), medium (500) for subheadings, and regular (400) for body text, all rendered with antialiased smoothing against the dark background in slate-100 for primary text, slate-400 for secondary text, and slate-500 for muted content; component styling emphasizes glassmorphism extensively with a reusable `.glass-card` class featuring `backdrop-filter: blur(12px)`, a subtle white background at 5% opacity (`rgba(255,255,255,0.05)`), 1px borders using `rgba(255,255,255,0.1)`, and deep shadow layering at `0 25px 50px -12px rgba(0,0,0,0.25)`; buttons feature fully rounded corners (rounded-full) for primary CTAs with gradient backgrounds transitioning from indigo-500 to purple-500, accompanied by intense glow shadows that intensify on hover from 30px to 45px spread with higher opacity, while secondary buttons use semi-transparent backgrounds (bg-white/10) with backdrop blur and visible white borders that brighten on hover; cards universally use generous border-radius (rounded-2xl to rounded-3xl) with consistent internal padding of p-6 to p-12 and include subtle border-color transitions on hover states; the hero section features a prominent circular avatar with a 1px gradient border (indigo to teal) surrounded by a dramatic `0 0 40px rgba(99,102,241,0.5)` glow effect; the background layer is particularly rich with a premium animated NetworkBackground component featuring large floating color orbs (400-500px diameter) with radial gradients of indigo, teal, and purple, heavily blurred (60-80px) at 15-30% opacity, subtly pulsing via CSS keyframe animations over 8-12 second cycles, overlaid with a 50px grid pattern at extremely low opacity (0.03-0.04), a central radial glow, and a vignette effect fading to the primary background; section transitions use a dedicated GradientDivider component with a 32px height featuring a linear gradient fade and a subtle indigo-500/30 center glow line; all interactions are powered by Framer Motion with consistent fadeInUp animations (30px y-offset, 0.5-0.6s duration, easeOut timing), staggered container children with 0.1-0.15s delays, spring-based hover elevations (-3px y-offset), and custom cubic-bezier easing curves like `[0.22, 1, 0.36, 1]` for premium bounce effects; the mobile menu transforms into a full-screen overlay with the solid slate-900 background, staggered link entrances at 0.1s intervals, and a gradient hover effect that transitions link text to transparent with an indigo-to-teal gradient clip; a floating WhatsApp button anchors to the bottom-right corner featuring a green-400 to green-600 gradient with ping animation rings and green-tinted glow shadows; RTL/Arabic support is fully integrated with text-right alignment, proper font switching, and mirrored icon positioning; form inputs use slate-800 backgrounds with slate-700 borders, indigo focus rings, and appropriate directional padding; the overall emotional vibe is premium, authoritative yet approachable, conveying medical professionalism with a modern tech-forward aesthetic — think "Brain.fm meets a high-end medical institution dashboard" — featuring an emphasis on trust-building elements like testimonials with star ratings in yellow-400, achievement counters with animated CountUp numbers, and quote sections with large decorative Quote icons in 30% opacity indigo; accessibility is addressed through proper focus-visible outlines in indigo, full prefers-reduced-motion support that disables all animations, and custom-styled scrollbars matching the dark theme with indigo accent on hover.

---

## Condensed Version (For Tools with Character Limits)

> **~500 characters**

Dark mode medical training center UI. Background: #0f172a slate. Accents: #6366f1 indigo + #14b8a6 teal gradients. Glass cards with blur(12px), 5% white bg, rounded-3xl. Buttons: rounded-full, indigo-purple gradient, glow shadows. Typography: Inter/Tajawal fonts, slate-100 text. Floating orbs background with subtle pulse animations. Fixed navbar with scroll-triggered glassmorphism. Framer Motion fadeInUp animations. RTL Arabic support. Premium, professional medical aesthetic.

---

## Ultra-Short Version (For Quick Reference)

> **~200 characters**

Dark slate UI (#0f172a), indigo-teal accents, glassmorphism cards, glowing gradient buttons, Inter+Tajawal fonts, animated floating orbs background, premium medical training center vibe.

---

*Generated on: December 22, 2025*
