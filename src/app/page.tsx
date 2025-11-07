import Container from "@/components/container";
import { Metadata } from "next";
import { Hero } from "@/components/hero";
import type { WebPage, WithContext } from "schema-dts";
import { Info } from "lucide-react";
import { TextScroll } from "@/components/ui/text-scroll";
import { TechStack } from "@/components/tech-stack";
import { ProjectShowcase } from "@/components/project-showcase";
import AboutMeSection from "@/components/about-me-section";
import WorkExperienceSection from "@/components/work-experience-section";
import { GlassCard } from "@/components/ui/glass-card";


export const metadata: Metadata = {
  title: "Landing | ego1s1.",
  description: "Where it all begins.",
  openGraph: {
    title: "Landing | ego1s1.",
    description: "Where it all begins.",
  },
};

const jsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Priyanshu Sharma",
  alternateName: "landing.",
  mainEntityOfPage: "https://priyanshusharma.dev/",
  description: "Where it all begins.",
  url: "https://priyanshusharma.dev/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Landing",
        item: "https://priyanshusharma.dev/",
      }
    ],
  },
};

export default function Home() {
  return (
    <>
      <Container>
        <section id="home" className="w-full scroll-mt-32">
          <Hero />
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

        <GlassCard
          title="ABOUT_SITE.md"
          icon={<Info className="size-4" />}
          contentClassName="text-sm leading-relaxed space-y-3"
        >
          <p>
            This site is built using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              TailwindCSS
            </a>
            ,{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              shadcn/ui
            </a>
            , and{" "}
            <a
              href="https://tanstack.com/query"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Tanstack Query
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/ego1s1/landing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              GitHub
            </a>
            .
          </p>
        </GlassCard>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="Hard work is worthless for those that don't believe in themselves.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
