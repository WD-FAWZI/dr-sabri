/**
 * Image Optimization Script for DR. SABRI Website
 * 
 * Optimizes images for low-bandwidth Sudan market
 * 
 * Usage:
 *   npm install sharp
 *   node scripts/optimize-images.js
 * 
 * What it does:
 *   1. Compresses dr-sabri.jpg from 251KB to ~50KB (max 400px width)
 *   2. Compresses og-image.png from 450KB to ~100KB
 *   3. Compresses stc-logo.jpg from 45KB to ~15KB (max 200px width)
 *   4. Keeps original backups in /public/images/originals/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(IMAGES_DIR, 'originals');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function optimizeImages() {
    console.log('🖼️  Starting image optimization for Sudan market...\n');

    // 1. Optimize dr-sabri.jpg (Hero & About page)
    const drSabriPath = path.join(IMAGES_DIR, 'dr-sabri.jpg');
    if (fs.existsSync(drSabriPath)) {
        // Backup original
        fs.copyFileSync(drSabriPath, path.join(BACKUP_DIR, 'dr-sabri-original.jpg'));

        const originalSize = fs.statSync(drSabriPath).size;

        await sharp(drSabriPath)
            .resize(400, 400, { fit: 'cover' })
            .jpeg({ quality: 80, progressive: true })
            .toFile(path.join(IMAGES_DIR, 'dr-sabri-optimized.jpg'));

        // Replace original
        fs.unlinkSync(drSabriPath);
        fs.renameSync(
            path.join(IMAGES_DIR, 'dr-sabri-optimized.jpg'),
            drSabriPath
        );

        const newSize = fs.statSync(drSabriPath).size;
        console.log(`✅ dr-sabri.jpg: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / originalSize) * 100).toFixed(0)}% smaller)`);
    }

    // 2. Optimize og-image.png (OpenGraph)
    const ogImagePath = path.join(IMAGES_DIR, 'og-image.png');
    if (fs.existsSync(ogImagePath)) {
        // Backup original
        fs.copyFileSync(ogImagePath, path.join(BACKUP_DIR, 'og-image-original.png'));

        const originalSize = fs.statSync(ogImagePath).size;

        // Convert to JPG for smaller size (OG images don't need transparency)
        await sharp(ogImagePath)
            .resize(1200, 630, { fit: 'cover' })
            .jpeg({ quality: 85, progressive: true })
            .toFile(path.join(IMAGES_DIR, 'og-image.jpg'));

        const newSize = fs.statSync(path.join(IMAGES_DIR, 'og-image.jpg')).size;
        console.log(`✅ og-image.png → og-image.jpg: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / originalSize) * 100).toFixed(0)}% smaller)`);
        console.log('   ⚠️  Note: Update opengraph-image.tsx to use .jpg extension');
    }

    // 3. Optimize stc-logo.jpg (Partners section)
    const stcLogoPath = path.join(IMAGES_DIR, 'stc-logo.jpg');
    if (fs.existsSync(stcLogoPath)) {
        // Backup original
        fs.copyFileSync(stcLogoPath, path.join(BACKUP_DIR, 'stc-logo-original.jpg'));

        const originalSize = fs.statSync(stcLogoPath).size;

        await sharp(stcLogoPath)
            .resize(200, 200, { fit: 'cover' })
            .jpeg({ quality: 75, progressive: true })
            .toFile(path.join(IMAGES_DIR, 'stc-logo-optimized.jpg'));

        // Replace original
        fs.unlinkSync(stcLogoPath);
        fs.renameSync(
            path.join(IMAGES_DIR, 'stc-logo-optimized.jpg'),
            stcLogoPath
        );

        const newSize = fs.statSync(stcLogoPath).size;
        console.log(`✅ stc-logo.jpg: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / originalSize) * 100).toFixed(0)}% smaller)`);
    }

    console.log('\n✨ Image optimization complete!');
    console.log(`📁 Original images backed up to: ${BACKUP_DIR}`);
    console.log('\n💡 Next.js will auto-convert to WebP/AVIF at runtime for modern browsers.');
}

optimizeImages().catch(console.error);
