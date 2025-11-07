"use client";

import { useCallback } from "react";
import { Github } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useGlassEffect } from "@/components/ui/use-glass-effect";
import { GlassButton } from "@/components/ui/glass-button";

interface Project {
  name: string;
  event?: string;
  description: string;
  url?: string;
  githubUrl?: string;
  icon: string;
  color: string;
}

function GlassProjectTile({ project }: { project: Project }) {
  const { specularRef, handlePointerLeave, handlePointerMove } = useGlassEffect<HTMLElement>();
  const handleGithubClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (project.githubUrl) {
        window.open(project.githubUrl, "_blank", "noopener,noreferrer");
      }
    },
    [project.githubUrl],
  );
  const content = (
    <>
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-distortion-overlay" />
      <div ref={specularRef} className="glass-specular" />
      <div className="glass-content">
        <div className="glass-grid-card-inner">
          <div className="glass-grid-card-header">
            <div className="glass-grid-card-title">
              <span
                className="font-['JetBrainsMono_Nerd_Font'] text-xl"
                style={{ color: project.color }}
              >
                {project.icon}
              </span>
              <span
                className="font-mono text-base"
                style={{ color: project.color }}
              >
                {project.name}
              </span>
            </div>
            {project.githubUrl && (
              <GlassButton className="w-9 h-9 p-0" onClick={handleGithubClick}>
                <span className="glass-button-icon">
                  <Github className="size-4" />
                </span>
              </GlassButton>
            )}
          </div>
          {project.event && (
            <p className="text-xs text-foreground/60">
              {project.event}
            </p>
          )}
          <p className="glass-grid-card-description text-sm">
            {project.description}
          </p>
        </div>
      </div>
    </>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card glass-grid-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="glass-card glass-grid-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </div>
  );
}

const projects: Project[] = [
  {
    name: "Shell Assistant",
    event: "IEEE Hacksagon 2025, IIITM Gwalior - Overall Software Category Winner",
    description: "A local application that interprets natural language commands and executes them on a Linux/macos system.",
    url: "https://github.com/ego1s1/shell-assist",
    githubUrl: "https://github.com/ego1s1/shell-assist",
    icon: "",
    color: "var(--mauve)",
  },
  {
    name: "Gate Entry",
    description: "A modern gate entry management system built with Next.js 14, featuring role-based access control and visitor tracking.",
    url: "https://gate-entry-sigma.vercel.app/",
    githubUrl: "https://github.com/ego1s1/gate-entry",
    icon: "",
    color: "var(--teal)",
  },
  {
    name: "YatraGPT",
    event: "finova SoftLaunch Hackathon 2025 - 2nd Prize",
    description: "An AI powered personalised travel agent that provides intelligent travel recommendations and planning assistance.",
    url: "https://github.com/vee1e/finova",
    githubUrl: "https://github.com/vee1e/finova",
    icon: "",
    color: "var(--blue)",
  },
  {
    name: "More to come",
    description: "Exciting projects in development. Stay tuned for more innovative solutions and collaborations.",
    url: "https://github.com/ego1s1",
    githubUrl: "https://github.com/ego1s1",
    icon: "",
    color: "var(--green)",
  },
];

export function ProjectShowcase() {
  return (
    <GlassCard title="PROJECTS.md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <GlassProjectTile key={project.name} project={project} />
        ))}
      </div>
    </GlassCard>
  );
}