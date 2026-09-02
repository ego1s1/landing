import sharp from 'sharp';
import { statSync } from 'fs';

const tasks = [
  { src: 'foggy_valley_1.png', dest: 'public/wallpapers/everforest.webp', width: 1920, quality: 75 },
  { src: 'tokyonight_original.png', dest: 'public/wallpapers/tokyonight.webp', width: 1920, quality: 75 },
  { src: 'beach.jpg', dest: 'public/wallpapers/gruvbox.webp', width: 1920, quality: 78 },
  { src: 'nord.jpg', dest: 'public/wallpapers/nord.webp', width: 1920, quality: 78 },
];

for (const t of tasks) {
  console.log(`Optimizing ${t.src} -> ${t.dest} (w=${t.width}, q=${t.quality})`);
  await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 4 })
    .toFile(t.dest);
  console.log(`Done ${t.dest}`);
}

for (const t of tasks) {
  const s = statSync(t.dest);
  console.log(`${t.dest}: ${(s.size/1024).toFixed(1)} KB`);
}
