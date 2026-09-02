import sharp from 'sharp';
import { statSync } from 'fs';

const src = 'clouds-3.png';
const dest = 'public/wallpapers/catppuccin.webp';
console.log(`Optimizing ${src} -> ${dest} (w=1920, q=75)`);
await sharp(src)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 75, effort: 4 })
  .toFile(dest);
console.log(`Done ${dest}`);
const s = statSync(dest);
console.log(`${dest}: ${(s.size/1024).toFixed(1)} KB (was ${(statSync(src).size/1024/1024).toFixed(2)} MB)`);
