import sharp from 'sharp';
import { statSync } from 'fs';

const tasks = [
  { src: '05. Monokai.jpg', dest: 'public/wallpapers/monokai.webp', width: 1920, quality: 78 },
  { src: 'solarized.png', dest: 'public/wallpapers/solarized.webp', width: 1920, quality: 75 },
];

for (const t of tasks) {
  console.log(`Optimizing ${t.src} -> ${t.dest}`);
  await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 4 })
    .toFile(t.dest);
  console.log(`Done ${t.dest}: ${(statSync(t.dest).size/1024).toFixed(1)} KB`);
  // Try AVIF
  try {
    const avifDest = t.dest.replace('.webp', '.avif');
    await sharp(t.src)
      .resize({ width: t.width, withoutEnlargement: true })
      .avif({ quality: 50, effort: 4 })
      .toFile(avifDest);
    console.log(`AVIF ${avifDest}: ${(statSync(avifDest).size/1024).toFixed(1)} KB`);
  } catch (e) {
    console.log(`AVIF failed for ${t.src}: ${e.message}`);
  }
  // Try JXL
  try {
    const jxlDest = t.dest.replace('.webp', '.jxl');
    await sharp(t.src)
      .resize({ width: t.width, withoutEnlargement: true })
      .jxl({ quality: 75, effort: 4 })
      .toFile(jxlDest);
    console.log(`JXL ${jxlDest}: ${(statSync(jxlDest).size/1024).toFixed(1)} KB`);
  } catch (e) {
    console.log(`JXL failed for ${t.src}: ${e.message.slice(0,200)}`);
  }
}
