
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = 'C:/Users/Royal/.gemini/antigravity/brain/aee4693e-ce66-4465-b4b4-a86dc59f3186/uploaded_image_1766586505112.jpg';
const IMAGES_DIR = path.join(__dirname, '../public/images');
const PUBLIC_DIR = path.join(__dirname, '../public');

async function generateIcons() {
    console.log('🎨 Generating App Icons from new source...');

    if (!fs.existsSync(SOURCE_IMAGE)) {
        console.error(`❌ Source image not found at: ${SOURCE_IMAGE}`);
        process.exit(1);
    }

    // Ensure directories exist
    if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

    // Generate 192x192 (for Manifest)
    await sharp(SOURCE_IMAGE)
        .resize(192, 192)
        .png()
        .toFile(path.join(IMAGES_DIR, 'icon-192.png'));
    console.log('✅ Generated public/images/icon-192.png');

    // Generate 512x512 (for Manifest)
    await sharp(SOURCE_IMAGE)
        .resize(512, 512)
        .png()
        .toFile(path.join(IMAGES_DIR, 'icon-512.png'));
    console.log('✅ Generated public/images/icon-512.png');

    // Apple Touch Icon 180x180 (for iOS) - Placed in public root
    await sharp(SOURCE_IMAGE)
        .resize(180, 180)
        .png()
        .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
    console.log('✅ Generated public/apple-touch-icon.png');

    // Favicon 32x32 (for Browser) - Placed in public root
    await sharp(SOURCE_IMAGE)
        .resize(32, 32)
        .png()
        .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
    console.log('✅ Generated public/favicon.ico');
}

generateIcons().catch(console.error);
