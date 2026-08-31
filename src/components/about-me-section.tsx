import { User } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

const aboutMeContent = readFileSync(join(process.cwd(), "public", "about-me.md"), "utf8").trim();

const nvimComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-[var(--th-accent)] font-bold text-[15px] leading-6 border-b border-[var(--th-border-subtle)]/60 pb-1 mb-1.5 flex items-center gap-1.5">
      <span className="text-[var(--th-purple)]"></span>
      {children}
    </h1>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[var(--th-cyan)] font-bold text-[13px] mt-2.5 mb-1 flex items-center gap-1.5">
      <span className="text-[var(--th-green)]">▸</span>
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[var(--th-text)] text-[13px] leading-6 mb-2">{children}</p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-[var(--th-yellow)] font-bold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-[var(--th-cyan)] italic bg-[var(--th-surface-alt)]/30 px-0.5 rounded">{children}</em>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--th-accent)] hover:text-[var(--th-cyan)] underline decoration-dashed underline-offset-2"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-[var(--th-border-subtle)]/25 my-2.5" />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-2 border-[var(--th-purple)] pl-3 py-1 bg-[var(--th-surface-alt)]/15 rounded-r text-[var(--th-text-muted)] italic text-[13px] my-2">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-[var(--th-surface-alt)] text-[var(--th-green)] px-1 py-0.5 rounded text-[11px] border border-[var(--th-border-subtle)]/40">
      {children}
    </code>
  ),
};

export default function AboutMeSection() {
  const rawLines = aboutMeContent.split("\n");
  const lineCount = rawLines.length; // keep original for gutter fidelity (old-school)
  const fillerCount = Math.max(0, 10 - lineCount);

  return (
    <GlassCard
      id="about"
      title="nvim whoami.txt"
      shortTitle="ABOUT"
      nerdIcon="󰆍"
      icon={<User className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      {/* Neovim — old-school + modern */}
      <div className="bg-[var(--th-bg)] overflow-hidden">
        {/* Winbar — minimal, no border */}
        <div className="flex items-center gap-1.5 bg-[var(--th-surface)] px-2 py-1.5 text-xs font-mono select-none">
          <span className="text-[var(--th-cyan)]"></span>
          <span className="text-[var(--th-text)] font-medium">whoami.txt</span>
          <span className="text-[var(--th-yellow)] text-[11px]">●</span>
          <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[11px] text-[var(--th-text-dim)]">
            <span className="bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/40 px-1.5 py-0.5 rounded">markdown</span>
            <span>utf-8</span>
            <span>unix</span>
          </span>
        </div>

        {/* Editor */}
        <div className="flex min-h-[150px]">
          {/* Gutter — old-school line numbers + ~ filler */}
          <div className="hidden sm:flex flex-col items-end select-none bg-[var(--th-surface)]/30 border-r border-[var(--th-border-subtle)]/30 px-2 py-2.5 text-[11px] leading-6 font-mono text-[var(--th-text-dim)] min-w-[38px]">
            <span className="text-[var(--th-text-dim)]/60 text-[10px] leading-6 mb-0.5">⎻</span>
            {Array.from({ length: lineCount }).map((_, i) => {
              const n = i + 1;
              const isCursor = n === 3;
              const isBlank = rawLines[i]?.trim() === "";
              return (
                <span
                  key={n}
                  className={`leading-6 flex items-center gap-1 justify-end w-full ${isBlank ? "text-[var(--th-border-subtle)]/30" : isCursor ? "text-[var(--th-yellow)] font-bold" : "text-[var(--th-text-dim)]"}`}
                >
                  {isCursor && <span className="text-[var(--th-yellow)]/60 text-[8px]">▌</span>}
                  <span>{isBlank ? "~" : String(n).padStart(2, " ")}</span>
                </span>
              );
            })}
            {Array.from({ length: fillerCount }).map((_, i) => (
              <span key={`f-${i}`} className="leading-6 text-[var(--th-border-subtle)]/30 text-[11px]">
                ~
              </span>
            ))}
          </div>
          <div className="sm:hidden flex flex-col items-end select-none bg-[var(--th-surface)]/20 border-r border-[var(--th-border-subtle)]/20 px-1.5 py-2.5 text-[11px] leading-6 font-mono text-[var(--th-text-dim)] min-w-[28px]">
            {Array.from({ length: lineCount }).map((_, i) => (
              <span key={i} className="leading-6">
                {rawLines[i]?.trim() === "" ? "~" : i + 1}
              </span>
            ))}
          </div>

          {/* Content — cursorline + sign */}
          <div className="flex-1 relative py-3 px-3 sm:px-4 overflow-hidden">
            {/* cursorline — old-school highlight */}
            <div className="absolute left-0 right-0 top-[2.55rem] h-6 bg-[var(--th-surface-alt)]/25 border-y border-[var(--th-border-subtle)]/15 pointer-events-none" />
            {/* sign column indicator */}
            <div className="absolute left-0 top-[2.55rem] bottom-auto w-0.5 h-6 bg-[var(--th-yellow)]/80 hidden sm:block" />
            <div className="relative prose max-w-none font-mono leading-6 text-[13px]">
              <ReactMarkdown components={nvimComponents as unknown as import("react-markdown").Components}>
                {aboutMeContent}
              </ReactMarkdown>
            </div>
            {/* virtual text hint — modern */}
            <div className="absolute right-2 top-2 hidden lg:block text-[11px] font-mono bg-[var(--th-surface-alt)] text-[var(--th-text-dim)] border border-[var(--th-border-subtle)] px-1.5 py-0.5 rounded opacity-60">
              󰈙 friendly
            </div>
          </div>
        </div>

        {/* Statusline — minimal */}
        <div className="flex items-center bg-[var(--th-surface-alt)]/80 text-[11px] font-mono select-none">
          <span className="bg-[var(--th-green)] text-[var(--th-bg)] px-2 py-1 font-bold tracking-wide flex items-center gap-1">
            <span className="hidden sm:inline"></span> NORMAL
          </span>
          <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[var(--th-surface)] text-[var(--th-text)] border-r border-[var(--th-border)] font-medium">
            <span className="text-[var(--th-cyan)]"></span> whoami.txt
            <span className="text-[var(--th-yellow)]">●</span>
          </span>
          <span className="hidden md:flex items-center gap-1 px-2 py-1 text-[var(--th-text-dim)]">
            <span className="text-[var(--th-purple)]"></span> main
            <span className="text-[var(--th-green)]">✓</span>
          </span>
          <span className="ml-auto flex items-center gap-1 px-2 py-1 text-[var(--th-text-muted)]">
            <span className="hidden sm:inline text-[var(--th-text-dim)]"> 3:12</span>
            <span className="text-[var(--th-border-subtle)] hidden sm:inline">│</span>
            <span>markdown</span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-1 bg-[var(--th-bg)] border border-[var(--th-border-subtle)] px-1 py-0.5 rounded text-[10px]">
              <span className="size-1.5 rounded-full bg-[var(--th-green)] animate-pulse" />
              Treesitter
            </span>
          </span>
        </div>

        {/* Command line — minimal, no border */}
        <div className="bg-[var(--th-bg)] px-2 py-1 flex items-center gap-1.5 text-xs font-mono">
          <span className="text-[var(--th-cyan)] font-bold">:</span>
          <span className="text-[var(--th-yellow)]">set</span>
          <span className="text-[var(--th-text)]">number</span>
          <span className="text-[var(--th-text-dim)]">relativenumber</span>
          <span className="ml-auto hidden sm:inline text-[var(--th-border-subtle)] text-[10px]">[No Name] — 7 lines</span>
        </div>
      </div>
    </GlassCard>
  );
}
