import Container from "@/components/container";
import { Metadata } from "next";
import { Hero } from "@/components/hero";
import type { WebPage, WithContext } from "schema-dts";
import { Info } from "lucide-react";
import { SpotifyWindowSkeleton } from "@/components/spotify-window";
import { SpotifyWindowServer } from "@/components/spotify-window-server";
import { TechStack } from "@/components/tech-stack";
import { ProjectShowcase } from "@/components/project-showcase";
import AboutMeSection from "@/components/about-me-section";
import WorkExperienceSection from "@/components/work-experience-section";
import { Card } from "@/components/ui/card";
import { WindowProvider } from "@/components/window-context";
import { LeftDock } from "@/components/left-dock";
import { ThemeProvider } from "@/components/theme-context";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BadAppleWindow } from "@/components/bad-apple-window";
import { SITE_CONFIG } from "@/lib/site";
import { Suspense } from "react";
import { GitHubContributionsServer } from "@/components/github-contributions-server";
import { GitHubContributionsSkeleton } from "@/components/github-contributions";
import { Wallpaper } from "@/components/wallpaper";
import { PageFade } from "@/components/page-fade";

export const metadata: Metadata = {
  title: `Landing | ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `Landing | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
  },
};

const jsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: SITE_CONFIG.displayName,
  alternateName: "landing.",
  mainEntityOfPage: `${SITE_CONFIG.siteUrl}/`,
  description: SITE_CONFIG.description,
  url: `${SITE_CONFIG.siteUrl}/`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Landing",
        item: `${SITE_CONFIG.siteUrl}/`,
      },
    ],
  },
};

export default function Home() {
  return (
    <ThemeProvider>
      <Wallpaper />
      <WindowProvider>
        <LeftDock />
        <PageFade>
          <Container>
          <section id="home" className="w-full scroll-mt-32">
            <Hero
              contributionsSlot={
                <Suspense fallback={<GitHubContributionsSkeleton />}>
                  <GitHubContributionsServer />
                </Suspense>
              }
            />
          </section>

          <section id="about" className="w-full scroll-mt-32">
            <AboutMeSection />
          </section>

          <section id="experience" className="w-full scroll-mt-32">
            <WorkExperienceSection />
          </section>

          <section id="stack" className="w-full scroll-mt-32">
            <TechStack />
          </section>

          <section id="projects" className="w-full scroll-mt-32">
            <ProjectShowcase />
          </section>

          {/* Spotify — last played, now SSR cached 60s + Suspense skeleton on first visit */}
          <Suspense fallback={<SpotifyWindowSkeleton />}>
            <SpotifyWindowServer />
          </Suspense>

          <Card
            id="about-site"
            title="cat ABOUT_SITE.md"
            shortTitle="SITE"
            nerdIcon="󰋜"
            icon={<Info className="size-4" />}
            contentClassName="text-xs font-mono leading-relaxed space-y-3 text-[var(--th-text-muted)]"
          >
            <p>
              Crafted with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                Next.js 15
              </a>{" "}
              +{" "}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                React 19
              </a>{" "}
              (Turbopack) ·{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                Tailwind CSS 4
              </a>{" "}
              ·{" "}
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                shadcn/ui
              </a>{" "}
              ·{" "}
              <a
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                TypeScript
              </a>{" "}
              ·{" "}
              <a
                href="https://bun.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                Bun
              </a>{" "}
              +{" "}
              <a
                href="https://vercel.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                Vercel Analytics
              </a>{" "}
              — themed{" "}
              <span className="text-[var(--th-green)] font-semibold">Everforest</span> · deployed on Vercel. Source on{" "}
              <a
                href={`${SITE_CONFIG.github}/landing`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline underline-offset-2"
              >
                GitHub
              </a>
              .
            </p>
            <p className="text-[11px] text-[var(--th-text-dim)]">
              <span className="text-[var(--th-cyan)]">❯</span> bun run build · next-view-transitions · rehype-sanitize · zod · sharp
            </p>
          </Card>

          <ThemeSwitcher />

          {/* Bad Apple — ASCII cinema, starts on unminimise (below colorscheme) */}
          <BadAppleWindow />
        </Container>
        </PageFade>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </WindowProvider>
    </ThemeProvider>
  );
}
