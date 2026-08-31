"use client";

import { Github, FolderGit2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SITE_CONFIG } from "@/lib/site";

interface Project {
  name: string;
  event?: string;
  description: string;
  url?: string;
  githubUrl?: string;
  icon: string;
  color: string;
  lang: string;
  stars?: string;
}

const projects: Project[] = [
  {
    name: "file-repo",
    event: "Kotak Life",
    description: "Secure document vault — Next.js · Flask · Postgres · Redis/RQ vector search",
    url: SITE_CONFIG.github,
    githubUrl: SITE_CONFIG.github,
    icon: "",
    color: "#7dcfff",
    lang: "TypeScript",
    stars: "private",
  },
  {
    name: "shell-assist",
    event: "Hacksagon '25 Winner",
    description: "Natural language → validated shell commands · Python · Ollama",
    url: `${SITE_CONFIG.github}/shell-assist`,
    githubUrl: `${SITE_CONFIG.github}/shell-assist`,
    icon: "",
    color: "#bb9af7",
    lang: "Python",
    stars: "12",
  },
  {
    name: "gate-entry",
    event: "SAIL · RDCIS",
    description: "Employee access & movement tracking · Secure DB · Auth workflows",
    url: "https://gate-entry-sigma.vercel.app/",
    githubUrl: `${SITE_CONFIG.github}/gate-entry`,
    icon: "",
    color: "#a7c080",
    lang: "TypeScript",
    stars: "4",
  },
  {
    name: "yatragpt",
    event: "Finova 2nd",
    description: "AI travel assistant · Recommendations · REST APIs",
    url: "https://github.com/vee1e/finova",
    githubUrl: "https://github.com/vee1e/finova",
    icon: "",
    color: "#dbbc7f",
    lang: "Python",
    stars: "8",
  },
];

function LangDot({ color }: { color: string }) {
  return <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />;
}

export function ProjectShowcase() {
  return (
    <GlassCard
      id="projects"
      title="ls -la ~/PROJECTS/"
      shortTitle="PROJECTS"
      nerdIcon="󰅩"
      icon={<FolderGit2 className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      {/* Nerdy ls — header */}
      <div className="bg-[var(--th-bg)] overflow-hidden">
        {/* ls header */}
        <div className="flex items-center gap-2 bg-[var(--th-surface)] px-3 py-1.5 text-[11px] font-mono select-none">
          <span className="text-[var(--th-text-dim)]">total {projects.length}</span>
          <span className="hidden sm:inline text-[var(--th-border-subtle)]">·</span>
          <span className="hidden sm:inline text-[var(--th-text-dim)]">drwxr-xr-x</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[var(--th-text-dim)]">
            <span className="bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/40 px-1.5 py-0.5 rounded">4 projects</span>
            <span className="hidden sm:inline">2 internships · 1 win</span>
          </span>
        </div>

        {/* Column head — like exa --header */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1 bg-[var(--th-surface-alt)]/50 border-y border-[var(--th-border-subtle)]/20 text-[10px] font-bold tracking-widest text-[var(--th-text-dim)]">
          <span className="w-6 text-center">ICON</span>
          <span className="w-[120px]">NAME</span>
          <span className="w-[140px] hidden lg:block">EVENT</span>
          <span className="flex-1">DESCRIPTION</span>
          <span className="w-12 text-right hidden sm:block">LANG</span>
          <span className="w-8 text-center hidden sm:block">↗</span>
        </div>

        {/* List — telescope / quickfix style, single interactive per row, no nested buttons */}
        <div className="divide-y divide-[var(--th-border-subtle)]/15">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group flex items-center gap-2 sm:gap-3 px-3 py-2.5 hover:bg-[var(--th-surface-alt)]/40 transition-colors"
            >
              {/* cursor */}
              <span className="text-[var(--th-cyan)] opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                ❯
              </span>
              <span
                className="text-[16px] sm:text-lg shrink-0 w-6 text-center leading-none"
                style={{ color: project.color }}
                aria-hidden
              >
                {project.icon}
              </span>

              {/* Main link — whole row primary action */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 sm:truncate"
              >
                <span
                  className="font-bold text-[13px] sm:text-sm leading-none truncate"
                  style={{ color: project.color }}
                >
                  {project.name}
                </span>
                {project.event && (
                  <span className="inline-flex sm:hidden text-[10px] text-[var(--th-yellow)] bg-[var(--th-bg)] border border-[var(--th-border-subtle)]/50 px-1 py-0 rounded leading-none w-fit">
                    {project.event}
                  </span>
                )}
                <span className="hidden sm:block truncate text-xs leading-5 text-[var(--th-text-muted)] group-hover:text-[var(--th-text)] flex-1">
                  {project.description}
                </span>
                {/* mobile description */}
                <span className="sm:hidden text-[11px] leading-4 text-[var(--th-text-muted)] line-clamp-2">
                  {project.description}
                </span>
              </a>

              {/* Desktop event pill */}
              {project.event && (
                <span className="hidden lg:inline-flex text-[10px] text-[var(--th-yellow)] bg-[var(--th-bg)] border border-[var(--th-border-subtle)]/40 px-1.5 py-0.5 rounded truncate max-w-[140px] shrink-0">
                  {project.event}
                </span>
              )}

              {/* Lang */}
              <span className="hidden sm:flex items-center gap-1 w-20 shrink-0 justify-end text-[11px] text-[var(--th-text-dim)]">
                <LangDot color={project.color} />
                <span className="truncate">{project.lang}</span>
              </span>

              {/* GitHub — separate link, no nesting */}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} source`}
                  className="hidden sm:inline-flex size-7 items-center justify-center rounded bg-[var(--th-surface)] border border-[var(--th-border-subtle)] text-[var(--th-text-dim)] hover:text-[var(--th-cyan)] hover:border-[var(--th-accent)] hover:bg-[var(--th-surface-alt)] transition-colors shrink-0"
                >
                  <Github className="size-3.5" />
                </a>
              ) : (
                <span className="hidden sm:inline-flex size-7 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Footer — like `git status` */}
        <div className="flex items-center gap-2 bg-[var(--th-surface)] px-3 py-1.5 text-[11px] font-mono border-t border-[var(--th-border-subtle)]/20">
          <span className="text-[var(--th-green)]">✓</span>
          <span className="text-[var(--th-text-dim)]">4 projects</span>
          <span className="text-[var(--th-border-subtle)]">·</span>
          <span className="text-[var(--th-text-dim)] hidden sm:inline">press</span>
          <span className="bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)] px-1 py-0 rounded text-[10px] text-[var(--th-cyan)]">↵</span>
          <span className="text-[var(--th-text-dim)] hidden sm:inline">to open</span>
          <span className="ml-auto text-[var(--th-text-dim)] hidden md:inline"> main · telescope.nvim</span>
        </div>
      </div>
    </GlassCard>
  );
}
