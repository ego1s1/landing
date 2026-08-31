import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { NVIM_FILLER_MIN_LINES } from "@/lib/constants";

// Vanilla nvim — minimal, no winbar, subtle highlights
export const nvimMarkdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-[var(--th-text)] font-bold text-[14px] leading-6 pb-1 mb-1">{children}</h1>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[var(--th-text)] font-bold text-[13px] mt-2 mb-1">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[var(--th-text-muted)] text-[13px] leading-6 mb-1.5">{children}</p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-[var(--th-text)] font-bold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-[var(--th-text-muted)] italic">{children}</em>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => {
    const safeHref = href && /^(https?:\/\/|mailto:)/.test(href) ? href : undefined;
    if (!safeHref) return <span className="text-[var(--th-text)]">{children}</span>;
    return (
      <a
        href={safeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--th-text)] underline decoration-[var(--th-border-subtle)] underline-offset-2 hover:text-[var(--th-accent)]"
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="border-[var(--th-border-subtle)]/20 my-2" />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l border-[var(--th-border-subtle)] pl-3 py-0.5 text-[var(--th-text-dim)] italic text-[13px] my-1.5">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-[var(--th-surface)] text-[var(--th-text)] px-1 py-0.5 rounded text-[11px] border border-[var(--th-border-subtle)]/30">
      {children}
    </code>
  ),
  ul: ({ children }: { children: React.ReactNode }) => <ul className="space-y-1 my-1.5 list-disc list-inside marker:text-[var(--th-text-dim)]">{children}</ul>,
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-[13px] leading-5 text-[var(--th-text-muted)]">{children}</li>
  ),
};

interface NvimWindowProps {
  content: string;
  fileName: string;
  cursorLine?: number;
}

export function NvimWindow({ content, fileName, cursorLine = 3 }: NvimWindowProps) {
  const rawLines = content.split("\n");
  const nonBlankLines = rawLines.filter((l) => l.trim() !== "");
  const lineCount = nonBlankLines.length;
  const fillerCount = Math.max(0, NVIM_FILLER_MIN_LINES - lineCount);

  return (
    <div className="bg-[var(--th-bg)] overflow-hidden">
      {/* Editor — vanilla, no winbar */}
      <div className="flex min-h-[140px]">
        {/* Gutter — vanilla absolute numbers, no fancy */}
        <div className="hidden sm:flex flex-col items-end select-none bg-[var(--th-bg)] border-r border-[var(--th-border-subtle)]/20 px-2 py-2.5 text-[11px] leading-6 font-mono text-[var(--th-text-dim)]/60 min-w-[36px]">
          {Array.from({ length: lineCount }).map((_, i) => {
            const n = i + 1;
            const isCursor = n === cursorLine;
            return (
              <span key={n} className={`leading-6 w-full text-right ${isCursor ? "text-[var(--th-text)] font-medium" : ""}`}>
                {String(n).padStart(2, " ")}
              </span>
            );
          })}
          {Array.from({ length: fillerCount }).map((_, i) => (
            <span key={`f-${i}`} className="leading-6 text-[var(--th-border-subtle)]/20">
              ~
            </span>
          ))}
        </div>
        <div className="sm:hidden flex flex-col items-end select-none bg-[var(--th-bg)] border-r border-[var(--th-border-subtle)]/20 px-1.5 py-2.5 text-[11px] leading-6 font-mono text-[var(--th-text-dim)]/60 min-w-[26px]">
          {Array.from({ length: lineCount }).map((_, i) => (
            <span key={i} className="leading-6">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Content — vanilla, no cursorline highlight */}
        <div className="flex-1 py-2.5 px-3 sm:px-4 overflow-hidden">
          <div className="prose max-w-none font-mono leading-6 text-[13px]">
            <ReactMarkdown
              rehypePlugins={[rehypeSanitize]}
              components={nvimMarkdownComponents as unknown as import("react-markdown").Components}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Statusline — like hero */}
      <div className="bg-[var(--th-surface-alt)]/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[var(--th-text-dim)]">
        <div className="flex items-center gap-3">
          <span className="bg-[var(--th-accent)] text-[var(--th-bg)] px-1.5 font-bold">NORMAL</span>
          <span className="text-[var(--th-cyan)]">{fileName}</span>
          <span className="text-[var(--th-green)]">100%</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            ln {cursorLine}, col 1
          </span>
          <span className="text-[var(--th-yellow)]">:w</span>
        </div>
      </div>

      {/* Command line — vanilla, less themed */}
      <div className="bg-[var(--th-bg)] border-t border-[var(--th-border-subtle)]/10 px-2 py-1 flex items-center gap-1.5 text-[11px] font-mono text-[var(--th-text-dim)]">
        <span className="text-[var(--th-cyan)]">:</span>
        <span>e</span>
        <span className="text-[var(--th-text-dim)]">{fileName}</span>
      </div>
    </div>
  );
}
