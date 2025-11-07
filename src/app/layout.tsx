import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Navbar } from "@/components/navbar";
import Providers from "@/lib/provider/react-query";
import { Analytics } from "@vercel/analytics/next";
import { GlassFilterDefs } from "@/components/ui/glass-filter";

import "./globals.css";
import "./fonts.css";
import { Footer } from "@/components/footer";

const baseSans = Inter({
  variable: "--font-base",
  subsets: ["latin"],
  display: "swap",
});

const displaySerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

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
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${baseSans.variable} ${displaySerif.variable} ${mono.variable} antialiased scroll-smooth`}
        >
          <GlassFilterDefs />
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
