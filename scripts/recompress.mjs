import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const dir = 'public/wallpapers';
const files = readdirSync(dir).filter(f => f.endsWith('.webp'));
console.log('Found', files.length, 'webp files');
for (const file of files) {
  const src = join(dir, file);
  const before = statSync(src).size;
  const tmp = src + '.tmp';
  // Recompress more aggressively: 1280px, quality 45 (since blurred, fine)
  await sharp(src)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 45, effort: 6, smartSubsample: true })
    .toFile(tmp);
  const after = statSync(tmp).size;
  // Replace original with recompressed
  await import('fs/promises').then(m => m.rename(tmp, src));
  console.log(`${file}: ${(before/1024).toFixed(1)}KB -> ${(after/1024).toFixed(1)}KB (${((1-after/before)*100).toFixed(0)}% saved)`);
}
console.log('Done');
