import sharp from 'sharp';
import { statSync } from 'fs';

const tasks = [
  { src: 'onedark.png', dest: 'public/wallpapers/onedark.webp', width: 1920, quality: 75 },
  { src: 'rose-pine.jpg', dest: 'public/wallpapers/rose-pine.webp', width: 1920, quality: 78 },
];

for (const t of tasks) {
  console.log(`Optimizing ${t.src} -> ${t.dest}`);
  await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 4 })
    .toFile(t.dest);
  console.log(`Done ${t.dest}: ${(statSync(t.dest).size/1024).toFixed(1)} KB (was ${(statSync(t.src).size/1024).toFixed(1)} KB)`);
  try {
    const avifDest = t.dest.replace('.webp', '.avif');
    await sharp(t.src)
      .resize({ width: t.width, withoutEnlargement: true })
      .avif({ quality: 50, effort: 4 })
      .toFile(avifDest);
    console.log(`AVIF ${avifDest}: ${(statSync(avifDest).size/1024).toFixed(1)} KB`);
  } catch (e) {
    console.log(`AVIF failed for ${t.src}: ${e.message.slice(0,200)}`);
  }
}
