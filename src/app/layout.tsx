import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Providers from "@/lib/provider/react-query";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import "./fonts.css";
import { Footer } from "@/components/footer";
import { SITE_CONFIG } from "@/lib/site";

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
  themeColor: "#1a1b26",
  initialScale: 1,
  width: "device-width",
};

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
        <body
          className={`${mono.variable} antialiased bg-[var(--th-bg)] text-[var(--th-text)] selection:bg-[var(--th-border-subtle)] selection:text-[var(--th-cyan)]`}
        >
          <Providers>
            <div className="relative z-10 min-h-screen bg-[var(--th-bg)]">
              {children}
              <Footer />
            </div>
          </Providers>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
