import { readFileSync } from "fs";
import { join } from "path";

/**
 * Centralized markdown loaders — build-time, with graceful fallback.
 * Avoids top-level `readFileSync` crash if file is missing (ENOENT).
 */
function loadMarkdown(filename: string, fallback = ""): string {
  try {
    const fullPath = join(process.cwd(), "public", filename);
    return readFileSync(fullPath, "utf8").trim();
  } catch (err) {
    console.warn(`[content] failed to load ${filename}:`, (err as Error).message);
    return fallback;
  }
}

export function getAboutMe(): string {
  // Primary: whoami.txt (editable, matches NvimWindow fileName). Fallback to legacy about-me.md
  const whoami = loadMarkdown("whoami.txt", "");
  if (whoami) return whoami;
  return loadMarkdown("about-me.md", "# hey, i'm priyanshu!\n\ncontent unavailable.");
}

export function getWorkExperience(): string {
  return loadMarkdown("work-experience.md", "# experience.log\n\ncontent unavailable.");
}
