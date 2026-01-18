import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile, rm } from 'fs/promises';
import { join, extname, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '../public/images');
const OUTPUT_DIR = join(__dirname, '../public/images-optimized');

// Configuration
const CONFIG = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 82,
  generateWebP: true,
  webpQuality: 80,
};

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

async function getAllImages(dir) {
  const images = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await getAllImages(fullPath)));
    } else if (IMAGE_EXTENSIONS.includes(extname(entry.name))) {
      images.push(fullPath);
    }
  }

  return images;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
}

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(imagePath) {
  const originalStats = await stat(imagePath);
  const originalSize = originalStats.size;
  const ext = extname(imagePath).toLowerCase();
  const relativePath = relative(IMAGES_DIR, imagePath);
  const outputPath = join(OUTPUT_DIR, relativePath);

  // Ensure output directory exists
  await ensureDir(dirname(outputPath));

  try {
    let image = sharp(imagePath);
    const metadata = await image.metadata();

    const needsResize = metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight;

    if (needsResize) {
      image = image.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Optimize and write
    if (ext === '.png') {
      await image.png({ quality: CONFIG.quality, compressionLevel: 9 }).toFile(outputPath);
    } else {
      await image.jpeg({ quality: CONFIG.quality, mozjpeg: true }).toFile(outputPath);
    }

    const newStats = await stat(outputPath);
    const newSize = newStats.size;
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    console.log(`✓ ${relativePath}`);
    console.log(`  ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${savingsPercent}%)`);

    // Generate WebP version
    if (CONFIG.generateWebP) {
      const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      await sharp(outputPath).webp({ quality: CONFIG.webpQuality }).toFile(webpPath);
      const webpStats = await stat(webpPath);
      console.log(`  + WebP: ${formatBytes(webpStats.size)}`);
    }

    return { original: originalSize, optimized: newSize, path: relativePath };
  } catch (error) {
    console.error(`✗ ${relativePath}: ${error.message}`);
    return { original: originalSize, optimized: originalSize, path: relativePath, error: true };
  }
}

async function copyNonImageFiles(srcDir, destDir) {
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      await ensureDir(destPath);
      await copyNonImageFiles(srcPath, destPath);
    } else if (!IMAGE_EXTENSIONS.includes(extname(entry.name))) {
      // Copy non-image files (like SVGs)
      await ensureDir(dirname(destPath));
      await copyFile(srcPath, destPath);
      console.log(`📄 Copied: ${entry.name}`);
    }
  }
}

async function main() {
  console.log('🖼️  Optimisation des images...\n');
  console.log(`Config: max ${CONFIG.maxWidth}x${CONFIG.maxHeight}, quality ${CONFIG.quality}%`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Clean output directory if exists
  if (existsSync(OUTPUT_DIR)) {
    await rm(OUTPUT_DIR, { recursive: true });
  }
  await mkdir(OUTPUT_DIR, { recursive: true });

  const images = await getAllImages(IMAGES_DIR);
  console.log(`Found ${images.length} images to process\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let errors = 0;

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    totalOriginal += result.original;
    totalOptimized += result.optimized;
    if (result.error) errors++;
  }

  // Copy SVGs and other non-image files
  console.log('\n📄 Copying non-image files...');
  await copyNonImageFiles(IMAGES_DIR, OUTPUT_DIR);

  const totalSavings = totalOriginal - totalOptimized;
  const savingsPercent = ((totalSavings / totalOriginal) * 100).toFixed(1);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Résumé:');
  console.log(`   Images traitées: ${images.length}`);
  console.log(`   Erreurs: ${errors}`);
  console.log(`   Taille originale: ${formatBytes(totalOriginal)}`);
  console.log(`   Taille optimisée: ${formatBytes(totalOptimized)}`);
  console.log(`   Économie: ${formatBytes(totalSavings)} (-${savingsPercent}%)`);
  console.log('='.repeat(50));
  console.log('\n✅ Les images optimisées sont dans: public/images-optimized/');
  console.log('   Pour les utiliser, renomme le dossier:');
  console.log('   1. Renomme "images" en "images-backup"');
  console.log('   2. Renomme "images-optimized" en "images"');
}

main().catch(console.error);
