import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import "./fonts.css";
import { Footer } from "@/components/footer";
import { SITE_CONFIG } from "@/lib/site";
import { THEMES, DEFAULT_THEME_ID } from "@/lib/themes";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(
    process.env.NODE_ENV === "production" ? SITE_CONFIG.siteUrl : SITE_CONFIG.siteUrlDev,
  ),
  openGraph: {
    title: {
      default: SITE_CONFIG.title,
      template: SITE_CONFIG.titleTemplate,
    },
    description: SITE_CONFIG.ogDescription,
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.siteName,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1536,
        height: 1024,
        alt: `${SITE_CONFIG.displayName} - Developer & Student Portfolio`,
      },
    ],
    type: "website",
    locale: SITE_CONFIG.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.ogDescription,
    site: SITE_CONFIG.handle,
    creator: SITE_CONFIG.handle,
    images: [
      {
        url: SITE_CONFIG.twitterImage,
        width: 1536,
        height: 1024,
        alt: `${SITE_CONFIG.displayName} - Developer & Student Portfolio`,
      },
    ],
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#272e33",
  initialScale: 1,
  width: "device-width",
};

const themeMap = Object.fromEntries(THEMES.map((t) => [t.id, { colors: t.colors, wallpaper: t.wallpaper, name: t.name }]));
const themeInitScript = `(function(){try{var k='${SITE_CONFIG.themeStorageKey}';var d='${DEFAULT_THEME_ID}';var m=document.cookie.match(/(?:^|; )${SITE_CONFIG.themeStorageKey}=([^;]*)/);var c=m?decodeURIComponent(m[1]):null;var s=localStorage.getItem(k);var i=c||s||d;var t=${JSON.stringify(themeMap)};var e=t[i]||t[d];if(e&&e.colors){var co=e.colors;var r=document.documentElement;r.dataset.theme=i;r.dataset.wallpaper=e.wallpaper||'';r.style.setProperty('--th-bg',co.background);r.style.setProperty('--th-surface',co.surface);r.style.setProperty('--th-surface-alt',co.surfaceAlt);r.style.setProperty('--th-border',co.border);r.style.setProperty('--th-border-subtle',co.borderSubtle);r.style.setProperty('--th-text',co.text);r.style.setProperty('--th-text-muted',co.textMuted);r.style.setProperty('--th-text-dim',co.textDim);r.style.setProperty('--th-accent',co.accent);r.style.setProperty('--th-cyan',co.accentCyan);r.style.setProperty('--th-purple',co.accentPurple);r.style.setProperty('--th-green',co.accentGreen);r.style.setProperty('--th-yellow',co.accentYellow);r.style.setProperty('--th-red',co.accentRed);r.style.setProperty('--th-dot',co.dotGrid);r.style.setProperty('--th-shadow',co.shadow);if(e.wallpaper){var l=document.createElement('link');l.rel='preload';l.as='image';l.href=e.wallpaper;l.fetchPriority='high';document.head.appendChild(l);r.style.setProperty('--th-wallpaper','url('+e.wallpaper+')');}else{r.style.setProperty('--th-wallpaper','none');}var n=document.querySelector('[data-theme-name]');if(n&&e.name)n.textContent=e.name;if(c!==i&&s){document.cookie=k+'='+encodeURIComponent(s)+'; path=/; max-age=31536000; SameSite=Lax';}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className="bg-[var(--th-bg)] text-[var(--th-text)]"
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </head>
        <body
          className={`${mono.variable} antialiased bg-transparent text-[var(--th-text)] selection:bg-[var(--th-border-subtle)] selection:text-[var(--th-cyan)]`}
        >
          <div className="relative z-10 min-h-screen bg-transparent">
            {children}
            <Footer />
          </div>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
