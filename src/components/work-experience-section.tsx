import { Briefcase } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

const workExperienceContent = readFileSync(join(process.cwd(), "public", "work-experience.md"), "utf8").trim();

const nvimComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-[var(--th-accent)] font-bold text-[13px] leading-5 border-b border-[var(--th-border-subtle)]/60 pb-1 mb-1.5 flex items-center gap-1.5">
      <span className="text-[var(--th-purple)]">󰈙</span>
      {children}
    </h1>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[var(--th-text)] font-bold text-xs mt-2 mb-1 leading-5 flex items-center gap-1.5">
      <span className="text-[var(--th-green)]">▸</span>
      <span className="flex-1">{children}</span>
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[var(--th-text-muted)] text-xs leading-5 mb-1.5">{children}</p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-[var(--th-yellow)] font-bold bg-[var(--th-surface-alt)]/20 px-0.5 rounded">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-[var(--th-cyan)] italic">{children}</em>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline decoration-dotted underline-offset-2"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-[3px] border-[var(--th-green)] pl-3 py-0.5 my-1.5 bg-[var(--th-green)]/10 rounded-r text-[var(--th-text)] text-xs italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-[var(--th-border-subtle)]/25 my-2" />,
  ul: ({ children }: { children: React.ReactNode }) => <ul className="space-y-0.5 my-1.5">{children}</ul>,
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="flex gap-2 text-xs leading-5">
      <span className="text-[var(--th-cyan)] mt-[1px] shrink-0">❯</span>
      <span className="flex-1 text-[var(--th-text)]">{children}</span>
    </li>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-[var(--th-surface-alt)] text-[var(--th-green)] px-1 py-0.5 rounded text-[10px] border border-[var(--th-border-subtle)]/40 font-mono">
      {children}
    </code>
  ),
};

export default function WorkExperienceSection() {
  const rawLines = workExperienceContent.split("\n");
  const lineCount = rawLines.length;
  const fillerCount = Math.max(0, 14 - lineCount);

  return (
    <GlassCard
      id="experience"
      title="nvim work-experience.md"
      shortTitle="EXP"
      nerdIcon="󰌢"
      icon={<Briefcase className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      <div className="bg-[var(--th-bg)] overflow-hidden">
        {/* Winbar — minimal, no border */}
        <div className="flex items-center gap-1.5 bg-[var(--th-surface)] px-2 py-1 text-[11px] font-mono select-none">
          <span className="text-[var(--th-purple)]"></span>
          <span className="text-[var(--th-text)] font-medium">work-experience.md</span>
          <span className="text-[var(--th-green)] text-[10px]">●</span>
          <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-[var(--th-text-dim)]">
            <span className="bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)] px-1.5 py-0.5 rounded">markdown</span>
            <span>utf-8</span>
            <span className="text-[var(--th-border-subtle)]">│</span>
            <span>unix</span>
          </span>
        </div>

        {/* Editor */}
        <div className="flex min-h-[220px]">
          {/* Gutter — old-school ~ */}
          <div className="hidden sm:flex flex-col items-end select-none bg-[var(--th-surface)]/30 border-r border-[var(--th-border-subtle)]/30 px-2 py-2.5 text-[10px] leading-5 font-mono text-[var(--th-text-dim)] min-w-[36px]">
            {Array.from({ length: lineCount }).map((_, i) => {
              const isActive = i + 1 === 7;
              const isBlank = rawLines[i]?.trim() === "";
              return (
                <span
                  key={i}
                  className={`leading-5 w-full flex justify-end items-center gap-1 ${isBlank ? "text-[var(--th-border-subtle)]/30" : isActive ? "text-[var(--th-yellow)] font-bold" : ""}`}
                >
                  {isActive && <span className="text-[var(--th-yellow)]/60 text-[8px]">▌</span>}
                  <span>{isBlank ? "~" : String(i + 1).padStart(2, " ")}</span>
                </span>
              );
            })}
            {Array.from({ length: fillerCount }).map((_, i) => (
              <span key={`f-${i}`} className="leading-5 text-[var(--th-border-subtle)]/30">
                ~
              </span>
            ))}
          </div>
          <div className="sm:hidden flex flex-col items-end select-none bg-[var(--th-surface)]/20 border-r border-[var(--th-border-subtle)]/20 px-1.5 py-2.5 text-[10px] leading-5 font-mono text-[var(--th-text-dim)] min-w-[26px]">
            {Array.from({ length: lineCount }).map((_, i) => (
              <span key={i} className="leading-5">
                {rawLines[i]?.trim() === "" ? "~" : i + 1}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 relative py-2.5 px-3 sm:px-4 overflow-hidden">
            {/* cursorline */}
            <div className="absolute left-0 right-0 top-[4.6rem] h-5 bg-[var(--th-surface-alt)]/20 border-y border-[var(--th-border-subtle)]/15 pointer-events-none" />
            <div className="absolute left-0 top-[4.6rem] w-0.5 h-5 bg-[var(--th-yellow)]/70 hidden sm:block" />
            <div className="relative prose max-w-none font-mono leading-5 text-xs">
              <ReactMarkdown components={nvimComponents as unknown as import("react-markdown").Components}>
                {workExperienceContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Statusline — minimal */}
        <div className="flex items-center bg-[var(--th-surface-alt)]/80 text-[10px] font-mono select-none">
          <span className="bg-[var(--th-purple)] text-white px-2 py-1 font-bold tracking-wide flex items-center gap-1">
            <span className="hidden sm:inline"></span> NORMAL
          </span>
          <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[var(--th-surface)] text-[var(--th-text)] border-r border-[var(--th-border)]">
            <span className="text-[var(--th-cyan)]"></span> work-experience.md
          </span>
          <span className="hidden md:flex items-center gap-1 px-2 py-1 text-[var(--th-text-dim)]">
            <span className="text-[var(--th-green)]"></span> main
            <span className="text-[var(--th-green)]">✓ 4</span>
          </span>
          <span className="ml-auto flex items-center gap-1 px-2 py-1 text-[var(--th-text-muted)]">
            <span className="hidden sm:inline text-[var(--th-text-dim)]"> 7:1</span>
            <span className="text-[var(--th-border-subtle)] hidden sm:inline">│</span>
            <span>markdown</span>
            <span className="hidden lg:inline-flex items-center gap-1 ml-1 bg-[var(--th-bg)] border border-[var(--th-border-subtle)] px-1 py-0.5 rounded text-[9px]">
              <span className="size-1.5 rounded-full bg-[var(--th-green)] animate-pulse" />
              Treesitter
            </span>
          </span>
        </div>

        {/* Cmdline — minimal, no border */}
        <div className="bg-[var(--th-bg)] px-2 py-1 flex items-center gap-1.5 text-[11px] font-mono">
          <span className="text-[var(--th-green)]">❯</span>
          <span className="text-[var(--th-cyan)]">:lua</span>
          <span className="text-[var(--th-text)]">vim.lsp.buf.format()</span>
          <span className="ml-auto hidden sm:inline text-[var(--th-border-subtle)] text-[10px]">— 14 lines</span>
        </div>
      </div>
    </GlassCard>
  );
}
