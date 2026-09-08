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
  // Single source of truth: public/about-me.md.
  // (Legacy fallback: public/whoami.txt — kept only for backwards compat.)
  const aboutMe = loadMarkdown("about-me.md", "");
  if (aboutMe) return aboutMe;
  return loadMarkdown("whoami.txt", "# hey, i'm priyanshu!\n\ncontent unavailable.");
}

export function getWorkExperience(): string {
  return loadMarkdown("work-experience.md", "# experience.log\n\ncontent unavailable.");
}
