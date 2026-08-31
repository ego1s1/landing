"use client";

import { useState } from "react";
import { Github, FolderGit2, ChevronRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site";

interface Project {
  name: string;
  event?: string;
  description: string;
  verbose: string;
  stack: string[];
  url?: string;
  githubUrl?: string;
  icon: string;
  color: string;
  lang: string;
}

const projects: Project[] = [
  {
    name: "file-repo",
    event: "Kotak Life",
    description: "Secure document vault — Next.js · Flask · Postgres · Redis/RQ vector search",
    verbose:
      "Enterprise-grade doc vault with RBAC, presigned uploads, audit logs, and semantic search via pgvector + Redis queue workers. Built for Kotak Life IT Apps during on-site internship.",
    stack: ["Next.js", "Flask", "PostgreSQL", "Docker", "Redis/RQ", "pgvector"],
    url: SITE_CONFIG.github,
    githubUrl: SITE_CONFIG.github,
    icon: "",
    color: "#7dcfff",
    lang: "TypeScript",
  },
  {
    name: "shell-assist",
    event: "Hacksagon '25 Winner",
    description: "Natural language → validated shell commands · Python · Ollama",
    verbose:
      "Local-first AI that translates plain English to safe, validated shell commands. Uses Ollama for inference, AST parsing for validation, and dry-run execution. Won IEEE Hacksagon '25.",
    stack: ["Python", "Ollama", "Bash AST", "Validation"],
    url: `${SITE_CONFIG.github}/shell-assist`,
    githubUrl: `${SITE_CONFIG.github}/shell-assist`,
    icon: "",
    color: "#bb9af7",
    lang: "Python",
  },
  {
    name: "gate-entry",
    event: "SAIL · RDCIS",
    description: "Employee access & movement tracking · Secure DB · Auth workflows",
    verbose:
      "On-site at SAIL RDCIS — built gate-entry for plant employees with centralized DB, RFID-ready auth, and automated in/out movement tracking with compliance reports.",
    stack: ["TypeScript", "PostgreSQL", "Auth", "Tracking"],
    url: "https://gate-entry-sigma.vercel.app/",
    githubUrl: `${SITE_CONFIG.github}/gate-entry`,
    icon: "",
    color: "#a7c080",
    lang: "TypeScript",
  },
  {
    name: "yatragpt",
    event: "Finova 2nd",
    description: "AI travel assistant · Recommendations · REST APIs",
    verbose:
      "Finova hackathon runner-up — AI itinerary planner with scalable frontend, REST integrations, and personalized recommendations. Team of 4, built in 24h.",
    stack: ["Next.js", "REST", "AI", "Maps"],
    url: "https://github.com/vee1e/finova",
    githubUrl: "https://github.com/vee1e/finova",
    icon: "",
    color: "#dbbc7f",
    lang: "Python",
  },
];

function LangDot({ color }: { color: string }) {
  return <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />;
}

export function ProjectShowcase() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Card
      id="projects"
      title="ls -la ~/PROJECTS/"
      shortTitle="PROJECTS"
      nerdIcon="󰅩"
      icon={<FolderGit2 className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      <div className="bg-[var(--th-bg)] overflow-hidden">
        <div className="flex items-center gap-2 bg-[var(--th-surface)] px-3 py-1.5 text-[11px] font-mono select-none">
          <span className="text-[var(--th-text-dim)]">total {projects.length}</span>
          <span className="hidden sm:inline text-[var(--th-border-subtle)]">·</span>
          <span className="hidden sm:inline text-[var(--th-text-dim)]">drwxr-xr-x</span>
          <span className="ml-auto text-[10px] text-[var(--th-text-dim)] hidden sm:inline">click ▸ to expand</span>
        </div>

        <div className="hidden md:flex items-center gap-3 px-3 py-1 bg-[var(--th-surface-alt)]/50 border-y border-[var(--th-border-subtle)]/20 text-[10px] font-bold tracking-widest text-[var(--th-text-dim)]">
          <span className="w-5 text-center">›</span>
          <span className="w-6 text-center">ICON</span>
          <span className="w-[120px]">NAME</span>
          <span className="w-[140px] hidden lg:block">EVENT</span>
          <span className="flex-1">DESCRIPTION</span>
          <span className="w-12 text-right hidden sm:block">LANG</span>
          <span className="w-8 text-center hidden sm:block">↗</span>
        </div>

        <div className="divide-y divide-[var(--th-border-subtle)]/15">
          {projects.map((project) => {
            const isExpanded = expanded === project.name;
            return (
              <div key={project.name} className={`group ${isExpanded ? "bg-[var(--th-surface-alt)]/15" : ""}`}>
                <div
                  className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 transition-colors ${isExpanded ? "bg-[var(--th-surface-alt)]/20" : "hover:bg-[var(--th-surface-alt)]/20"}`}
                >
                  {/* Clickable arrow — expands verbose */}
                  <button
                    type="button"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    aria-expanded={isExpanded}
                    onClick={() => setExpanded(isExpanded ? null : project.name)}
                    className="size-5 flex items-center justify-center rounded bg-[var(--th-surface)] border border-[var(--th-border-subtle)] text-[var(--th-cyan)] hover:text-[var(--th-text)] hover:border-[var(--th-accent)] hover:bg-[var(--th-surface-alt)] transition-colors shrink-0 cursor-pointer"
                  >
                    {isExpanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
                  </button>

                  <span
                    className="text-[16px] sm:text-lg shrink-0 w-6 text-center leading-none"
                    style={{ color: project.color }}
                    aria-hidden
                  >
                    {project.icon}
                  </span>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 sm:truncate"
                  >
                    <span className="font-bold text-[13px] sm:text-sm leading-none truncate" style={{ color: project.color }}>
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
                    <span className="sm:hidden text-[11px] leading-4 text-[var(--th-text-muted)] line-clamp-2">
                      {project.description}
                    </span>
                  </a>

                  {project.event && (
                    <span className="hidden lg:inline-flex text-[10px] text-[var(--th-yellow)] bg-[var(--th-bg)] border border-[var(--th-border-subtle)]/40 px-1.5 py-0.5 rounded truncate max-w-[140px] shrink-0">
                      {project.event}
                    </span>
                  )}

                  <span className="hidden sm:flex items-center gap-1 w-20 shrink-0 justify-end text-[11px] text-[var(--th-text-dim)]">
                    <LangDot color={project.color} />
                    <span className="truncate">{project.lang}</span>
                  </span>

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

                {/* Verbose — seamless inline expand */}
                {isExpanded && (
                  <div className="border-t border-[var(--th-border-subtle)]/15 bg-[var(--th-bg)]/50">
                    <div className="ml-8 sm:ml-[44px] border-l-2 border-[var(--th-cyan)]/20 pl-3 pr-3 py-2.5">
                      <p className="text-[var(--th-text-muted)] text-xs leading-5 mb-2">{project.verbose}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] bg-[var(--th-surface)] text-[var(--th-text-dim)] border border-[var(--th-border-subtle)]/20 px-1.5 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
    </Card>
  );
}
