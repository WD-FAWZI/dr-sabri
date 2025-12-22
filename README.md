# Dr. Sabri Abu Quron - Official Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

**Modern, performant, and accessible medical education platform**

[🌐 Live Demo](https://dr-sabri.vercel.app) · [📱 PWA Ready](#pwa-support) · [🌍 Multi-Language](#features)

</div>

---

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Premium frosted glass effects
- **Dark Mode** - Eye-friendly dark theme optimized for medical professionals
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Responsive** - Seamlessly adapts from mobile to 4K displays

### 🌍 Internationalization (i18n)
- **Arabic (العربية)** - Full RTL support
- **English** - Complete translations
- **Smart Locale Detection** - Automatic language selection

### ⚡ Performance
- **Lighthouse Score: 95+** - Optimized for speed
- **CSS-Only Backgrounds** - Zero CPU drain animations
- **prefers-reduced-motion** - Respects accessibility settings
- **Staggered Animations** - Distributed load for smooth rendering
- **Optimized for Sudan** - Works on slow networks and low-end devices

### 📱 PWA Support
- **Installable** - Add to home screen on any device
- **Offline Ready** - Core pages cached for offline access
- **App-like Experience** - Smooth and native-feeling

### 🔍 SEO & Accessibility
- **Open Graph** - Rich previews on WhatsApp, Facebook, Twitter
- **Structured Data** - Schema.org markup for Google
- **WCAG Compliant** - Accessible to all users
- **Semantic HTML** - Screen reader friendly

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript 5.0+ |
| **Styling** | Tailwind CSS 4.0 |
| **Animations** | Framer Motion |
| **i18n** | next-intl |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
dr-sabri/
├── 📁 public/
│   ├── 📁 images/          # Static images
│   └── 📄 manifest.json    # PWA manifest
├── 📁 src/
│   ├── 📁 app/
│   │   └── 📁 [locale]/    # i18n routes (ar/en)
│   │       ├── 📄 page.tsx       # Home
│   │       ├── 📁 about/         # About page
│   │       ├── 📁 verify/        # Certificate verification
│   │       └── 📁 contact/       # Contact form
│   ├── 📁 components/
│   │   ├── 📁 home/        # Hero, Philosophy, Partners
│   │   ├── 📁 layout/      # Navbar, Footer
│   │   ├── 📁 ui/          # Reusable UI components
│   │   └── 📁 contact/     # Contact form
│   ├── 📁 lib/             # Utilities (SEO, etc.)
│   ├── 📁 hooks/           # Custom React hooks
│   └── 📁 i18n/            # Internationalization config
├── 📁 messages/            # Translation files (ar.json, en.json)
└── 📄 next.config.ts       # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/WD-FAWZI/dr-sabri.git

# Navigate to project
cd dr-sabri

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local`:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 📊 Performance Metrics

| Metric | Score |
|--------|-------|
| **Performance** | 95+ |
| **Accessibility** | 90+ |
| **Best Practices** | 100 |
| **SEO** | 100 |

*Tested with Google Lighthouse*

---

## 🌐 Deployment

The site is deployed on **Vercel** with automatic deployments from the `main` branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WD-FAWZI/dr-sabri)

---

## 📱 PWA Support

This website is a **Progressive Web App**:

1. Open the website on Chrome/Safari
2. Click "Add to Home Screen" / "Install"
3. Enjoy the app-like experience!

---

## 🎨 Design Documentation

Comprehensive design system documentation is available in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [**design-prompt.md**](docs/design-prompt.md) | Text-to-design prompts for AI tools (full, condensed, ultra-short versions) |
| [**style-guide.md**](docs/style-guide.md) | Complete visual style guide with colors, typography, components, animations |
| [**page-analysis.md**](docs/page-analysis.md) | Page-by-page breakdown with wireframes and component details |

### Quick Design Summary

- **Theme**: Dark mode with slate backgrounds (`#0f172a`)
- **Accents**: Indigo (`#6366f1`) + Teal (`#14b8a6`) gradients
- **Style**: Glassmorphism cards, glowing buttons, premium animations
- **Fonts**: Inter (English) / Tajawal (Arabic)

---

## 📄 License

This project is **proprietary** and confidential. All rights reserved.

---

## 👨‍💻 Developer

Built with ❤️ by **WD-FAWZI**

---

<div align="center">

**© 2024 Dr. Sabri Abu Quron. All Rights Reserved.**

</div>
