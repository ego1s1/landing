import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Providers from "@/lib/provider/react-query";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import "./fonts.css";
import { Footer } from "@/components/footer";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ego1s1.",
    template: "%s | ego1s1.",
  },
  description: "Where it all begins.",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://priyanshusharma.dev"
      : "http://localhost:3000",
  ),
  openGraph: {
    title: {
      default: "ego1s1.",
      template: "%s | ego1s1.",
    },
    description: "B.Tech student in Electronics and Communications Engineering at MIT Manipal. Winner of IEEE Hacksagon 2025. Passionate about development and collaboration.",
    url: "https://priyanshusharma.dev",
    siteName: "Priyanshu Sharma - Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "Priyanshu Sharma - Developer & Student Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ego1s1.",
    description: "B.Tech student in Electronics and Communications Engineering at MIT Manipal. Winner of IEEE Hacksagon 2025. Passionate about development and collaboration.",
    site: "@ego1s1",
    creator: "@ego1s1",
    images: [
      {
        url: "/twitter-image.png",
        width: 1536,
        height: 1024,
        alt: "Priyanshu Sharma - Developer & Student Portfolio",
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
      <html lang="en" suppressHydrationWarning className="bg-[#1a1b26] text-[#c0caf5]">
        <body
          className={`${mono.variable} antialiased bg-[#1a1b26] text-[#c0caf5] selection:bg-[#3b4261] selection:text-[#7dcfff]`}
        >
          <Providers>
            <div className="relative z-10 min-h-screen bg-[#1a1b26]">
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
