/**
 * Centralized site configuration
 * Single source of truth for easy modifications — change once, updates everywhere
 * All components, metadata, and backend logic should import from here
 */

export const SITE_CONFIG = {
  // Identity
  username: "ego1s1",
  displayName: "Priyanshu Sharma",
  shortName: "Priyanshu",
  handle: "@ego1s1",

  // Contact & Socials
  email: "priyanshusharma1803@outlook.com",
  github: "https://github.com/ego1s1",
  githubUsername: "ego1s1",
  linkedin: "https://www.linkedin.com/in/ego1s1",
  linkedinUsername: "ego1s1",

  // Site / Domain — Vercel: ego1s1.vercel.app (no custom domain)
  siteUrl: "https://ego1s1.vercel.app",
  siteUrlDev: "http://127.0.0.1:3000",
  domain: "ego1s1.vercel.app",

  // SEO / Metadata
  title: "ego1s1.",
  titleTemplate: "%s | ego1s1.",
  description: "Where it all begins.",
  ogDescription:
    "B.Tech student in Electronics and Communications Engineering at MIT Manipal. Winner of IEEE Hacksagon 2025. Passionate about development and collaboration.",
  siteName: "Priyanshu Sharma - Portfolio",
  locale: "en_US",

  // Images
  avatar: "/avatar.jpeg",
  ogImage: "/og-image.png",
  twitterImage: "/twitter-image.png",

  // Theme
  themeStorageKey: "ego1s1-theme",
} as const;

// Derived helpers — keep DRY
export const getUserAtHost = (host = "macos") => `${SITE_CONFIG.username}@${host}`;
export const getUserAtDomain = () => `${SITE_CONFIG.username}@${SITE_CONFIG.domain}`;
export const getEmailHref = () => `mailto:${SITE_CONFIG.email}`;
export const getGithubHref = (repo?: string) =>
  repo ? `${SITE_CONFIG.github}/${repo}` : SITE_CONFIG.github;
