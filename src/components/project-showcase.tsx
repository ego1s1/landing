"use client";

import { useCallback, type MouseEvent } from "react";
import { Github, FolderGit2, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { SITE_CONFIG } from "@/lib/site";

interface Project {
  name: string;
  event?: string;
  description: string;
  url?: string;
  githubUrl?: string;
  icon: string;
  color: string;
}

function ProjectTile({ project }: { project: Project }) {
  const handleGithubClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      event.stopPropagation();
      if (project.githubUrl) {
        window.open(project.githubUrl, "_blank", "noopener,noreferrer");
      }
    },
    [project.githubUrl],
  );

  const cardContent = (
    <div className="flex flex-col justify-between h-full space-y-3">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="font-['Iosevka_Nerd_Font','Iosevka_Nerd_Font','Iosevka',monospace] text-xl shrink-0 flex items-center justify-center"
              style={{ color: project.color }}
            >
              {project.icon}
            </span>
            <span
              className="font-mono font-bold text-sm truncate"
              style={{ color: project.color }}
            >
              {project.name}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {project.url && (
              <span className="text-[var(--th-text-dim)] text-xs font-mono group-hover:text-[var(--th-cyan)]">
                <ExternalLink className="size-3.5" />
              </span>
            )}
            {project.githubUrl && (
              <GlassButton className="w-7 h-7 p-0" onClick={handleGithubClick} title="View Source">
                <Github className="size-3.5" />
              </GlassButton>
            )}
          </div>
        </div>
        {project.event && (
          <p className="text-[11px] text-[var(--th-yellow)] font-mono bg-[var(--th-bg)] border border-[var(--th-border-subtle)] px-2 py-0.5 rounded-none mb-2 w-fit">
            [{project.event}]
          </p>
        )}
        <p className="text-xs text-[var(--th-text-muted)] font-mono leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[var(--th-text-dim)] font-mono border-t border-[var(--th-border-subtle)]/50 pt-2">
        <span>STATUS: 200 OK</span>
        <span className="text-[var(--th-cyan)]">READ_MORE ❯</span>
      </div>
    </div>
  );

  const tileClasses =
    "block p-4 bg-[var(--th-surface-alt)] hover:bg-[var(--th-surface)] border border-[var(--th-border)] hover:border-[var(--th-accent)] shadow-[2px_2px_0px_var(--th-shadow)] rounded-[4px] font-mono transition-none cursor-pointer group text-left h-full";

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={tileClasses}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={tileClasses}>{cardContent}</div>;
}

const projects: Project[] = [
  {
    name: "File Repo",
    event: "Kotak Life Insurance Project",
    description: "Secure full-stack document repository using Next.js, Flask, Docker, PostgreSQL, and an AI vector search querying pipeline with Redis/RQ.",
    url: SITE_CONFIG.github,
    githubUrl: SITE_CONFIG.github,
    icon: "",
    color: "#7dcfff",
  },
  {
    name: "Shell Assist",
    event: "IEEE Hacksagon '25 Winner",
    description: "AI-powered application translating natural language into validated, secure shell commands with execution validation using Python & Ollama.",
    url: `${SITE_CONFIG.github}/shell-assist`,
    githubUrl: `${SITE_CONFIG.github}/shell-assist`,
    icon: "",
    color: "#bb9af7",
  },
  {
    name: "Gate Entry",
    event: "RDCIS, SAIL Project",
    description: "Employee access management application with secure database-backed authentication and movement tracking workflows.",
    url: "https://gate-entry-sigma.vercel.app/",
    githubUrl: `${SITE_CONFIG.github}/gate-entry`,
    icon: "",
    color: "#9ece6a",
  },
  {
    name: "YatraGPT",
    event: "finova Hackathon '25 2nd Prize",
    description: "AI-powered travel assistant providing intelligent travel recommendations, scalable frontend architecture, and REST API integrations.",
    url: "https://github.com/vee1e/finova",
    githubUrl: "https://github.com/vee1e/finova",
    icon: "",
    color: "#e0af68",
  },
];

export function ProjectShowcase() {
  return (
    <GlassCard
      id="projects"
      title="ls -la ~/PROJECTS/"
      shortTitle="PROJECTS"
      nerdIcon="󰅩"
      icon={<FolderGit2 className="size-4" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectTile key={project.name} project={project} />
        ))}
      </div>
    </GlassCard>
  );
}
