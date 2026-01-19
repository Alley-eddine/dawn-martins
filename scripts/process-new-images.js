import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '../public/images');

const CONFIG = {
  maxWidth: 800,
  maxHeight: 1200,
  webpQuality: 82,
};

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function getAllImages(dir) {
  const images = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await getAllImages(fullPath)));
    } else if (IMAGE_EXTENSIONS.includes(extname(entry.name).toLowerCase())) {
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

async function processImage(imagePath) {
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  // Si le WebP existe déjà, skip
  if (existsSync(webpPath)) {
    return null;
  }

  try {
    // Générer WebP optimisé et redimensionné
    await sharp(imagePath)
      .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);

    const webpStats = await stat(webpPath);
    const origStats = await stat(imagePath);

    console.log(`✓ ${imagePath.split('images')[1]}`);
    console.log(`  Original: ${formatBytes(origStats.size)} → WebP: ${formatBytes(webpStats.size)}`);

    return { processed: true };
  } catch (error) {
    console.error(`✗ ${imagePath}: ${error.message}`);
    return { error: true };
  }
}

async function main() {
  console.log('🖼️  Génération des WebP pour nouvelles images...\n');

  const images = await getAllImages(IMAGES_DIR);
  let processed = 0;
  let errors = 0;

  for (const imagePath of images) {
    const result = await processImage(imagePath);
    if (result) {
      if (result.processed) processed++;
      if (result.error) errors++;
    }
  }

  if (processed === 0 && errors === 0) {
    console.log('✅ Toutes les images ont déjà leur version WebP.');
  } else {
    console.log(`\n✅ ${processed} WebP générés, ${errors} erreurs.`);
  }
}

main().catch(console.error);
