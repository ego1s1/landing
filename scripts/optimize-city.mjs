import sharp from 'sharp';
import { statSync } from 'fs';
const src = 'city-horizon.jpg';
const dest = 'public/wallpapers/dracula.webp';
console.log(`Optimizing ${src} -> ${dest} (w=1920, q=78)`);
await sharp(src)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 78, effort: 4 })
  .toFile(dest);
console.log(`Done ${dest}`);
const s = statSync(dest);
console.log(`${dest}: ${(s.size/1024).toFixed(1)} KB (was ${(statSync(src).size/1024).toFixed(1)} KB)`);
