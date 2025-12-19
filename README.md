# Dr. Sabri Abu Quron - Personal Website

Professional personal website for Dr. Sabri Abu Quron, featuring:
- Bilingual support (Arabic/English)
- Certificate verification system (Demo mode)
- Modern dark theme UI
- SEO optimized

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── page.tsx       # Homepage
│   │   └── verify/        # Certificate verification
│   ├── globals.css        # Global styles
│   ├── robots.ts          # SEO: Robots.txt
│   └── sitemap.ts         # SEO: Sitemap
├── components/
│   ├── home/              # Homepage components
│   ├── verify/            # Verification components
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── ui/                # Reusable UI components
├── i18n/                  # Internationalization
├── lib/                   # Utilities (SEO helpers)
├── services/              # Data layer (Certificate service)
└── data/                  # Demo data (certificates.json)
```

## Features

### ✅ Implemented

- [x] Bilingual routing (`/ar`, `/en`)
- [x] Homepage with Hero, Partners, Footer
- [x] Certificate verification (Demo with local JSON)
- [x] Navbar with language switcher
- [x] SEO: Metadata, Open Graph, Structured Data
- [x] Responsive design (RTL/LTR)
- [x] Dark theme with particle background

### 🔄 API Integration (Future)

The certificate verification currently uses local JSON data. To connect to a real API:

1. Open `src/services/certificateService.ts`
2. Replace the `verifyCertificate` method:

```typescript
// BEFORE (Demo):
const certificate = certificatesData.find(...)

// AFTER (Production):
const response = await fetch(`/api/certificates/verify/${certificateId}`)
const certificate = await response.json()
```

No UI changes needed!

## Environment Variables

Create a `.env.local` file for production:

```env
NEXT_PUBLIC_SITE_URL=https://dr-sabri.com
```

## Deployment

This project can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting

Update the domain in:
- `src/lib/seo.ts` - `baseUrl`
- `src/app/robots.ts` - `baseUrl`
- `src/app/sitemap.ts` - `baseUrl`

## License

© 2025 Dr. Sabri Abu Quron Training Center (STC). All Rights Reserved.
