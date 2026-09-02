import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Optimize wallpaper delivery
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/wallpapers/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://*.vercel-scripts.com; connect-src 'self' https://github-contributions-api.jogruber.de; img-src 'self' data: https://avatars.githubusercontent.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-ancestors 'none'",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
