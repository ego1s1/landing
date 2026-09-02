import { Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "EMBEDDED / FIRMWARE",
    prompt: "ls -la ~/stack/embedded/",
    items: [
      { name: "Embedded C", icon: "", color: "#7dcfff", url: "https://en.cppreference.com/w/c", tag: "C" },
      { name: "Embedded C++", icon: "", color: "#7aa2f7", url: "https://en.cppreference.com/w/cpp", tag: "C++" },
      { name: "ARM & MCUs", icon: "", color: "#e0af68", url: "https://www.arm.com/", tag: "ARM" },
      { name: "ARM Assembly", icon: "", color: "#ff9e64", url: "https://developer.arm.com/documentation/dui0473/m/overview-of-arm-assembly-language", tag: "ASM" },
      { name: "SPI / I2C / CAN", icon: "󰒋", color: "#9ece6a", url: "https://www.can-cia.org/", tag: "BUS" },
      { name: "RTOS & Linux", icon: "", color: "#ff9e64", url: "https://www.freertos.org/", tag: "OS" },
      { name: "GDB & Debug", icon: "", color: "#bb9af7", url: "https://www.sourceware.org/gdb/", tag: "DBG" },
    ],
  },
  {
    title: "LANGUAGES / CS FUNDAMENTALS",
    prompt: "cat ~/stack/lang.txt",
    items: [
      { name: "C++", icon: "", color: "#7aa2f7", url: "https://en.cppreference.com/w/", tag: "PL" },
      { name: "Java", icon: "", color: "#f7768e", url: "https://www.java.com/", tag: "PL" },
      { name: "Python", icon: "", color: "#e0af68", url: "https://www.python.org/", tag: "PL" },
      { name: "TypeScript", icon: "", color: "#7dcfff", url: "https://www.typescriptlang.org/", tag: "PL" },
      { name: "Data Structures", icon: "󰈮", color: "#a7c080", url: "https://en.wikipedia.org/wiki/Data_structure", tag: "CS" },
      { name: "OOPs", icon: "", color: "#e0af68", url: "https://en.wikipedia.org/wiki/Object-oriented_programming", tag: "CS" },
      { name: "JavaScript", icon: "", color: "#ff9e64", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", tag: "PL" },
      { name: "HTML/CSS", icon: "", color: "#bb9af7", url: "https://developer.mozilla.org/en-US/docs/Web", tag: "WEB" },
    ],
  },
  {
    title: "BACKEND / DATA & AI",
    prompt: "psql -c '\\l' && nlp --help",
    items: [
      { name: "PostgreSQL", icon: "", color: "#7aa2f7", url: "https://www.postgresql.org/", tag: "DB" },
      { name: "SQL", icon: "", color: "#7dcfff", url: "https://en.wikipedia.org/wiki/SQL", tag: "DB" },
      { name: "Redis", icon: "", color: "#f7768e", url: "https://redis.io/", tag: "DB" },
      { name: "Docker", icon: "", color: "#7dcfff", url: "https://www.docker.com/", tag: "OPS" },
      { name: "NLP", icon: "󰧑", color: "#bb9af7", url: "https://en.wikipedia.org/wiki/Natural_language_processing", tag: "AI" },
      { name: "Git", icon: "", color: "#f7768e", url: "https://git-scm.com/", tag: "VCS" },
    ],
  },
  {
    title: "TOOLS / SYSTEMS",
    prompt: "echo $SHELL && vim --version | head -n1",
    items: [
      { name: "Vim / Neovim", icon: "", color: "#9ece6a", url: "https://www.vim.org/", tag: "ED" },
      { name: "Linux Shell", icon: "", color: "#e0af68", url: "https://www.gnu.org/software/coreutils/", tag: "SH" },
      { name: "Bash", icon: "", color: "#9ece6a", url: "https://www.gnu.org/software/bash/", tag: "SH" },
      { name: "GDB & Debug", icon: "", color: "#bb9af7", url: "https://www.sourceware.org/gdb/", tag: "DBG" },
    ],
  },
];

export function TechStack() {
  return (
    <Card
      id="stack"
      title="btop -- STACK"
      shortTitle="STACK"
      nerdIcon="󰙲"
      icon={<Cpu className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden bg-[var(--th-bg)]"
    >
      {/* btop header — compact */}
      <div className="bg-[var(--th-surface)] border-b border-[var(--th-border-subtle)]/15 px-3 py-1.5 flex items-center justify-between text-[10px] tracking-wide">
        <span className="flex items-center gap-2">
          <span className="bg-[var(--th-green)] text-[var(--th-bg)] px-1 py-0.5 font-bold leading-none">STACK</span>
          <span className="text-[var(--th-text-dim)] hidden sm:inline">btop • {sections.reduce((a, s) => a + s.items.length, 0)} procs</span>
        </span>
        <span className="flex items-center gap-1.5 text-[var(--th-text-dim)]">
          <span className="size-1 h-4 bg-[var(--th-green)]/60 hidden sm:block" />
          <span className="size-1 h-3 bg-[var(--th-cyan)]/60 hidden sm:block" />
          <span className="size-1 h-2 bg-[var(--th-yellow)]/60 hidden sm:block" />
          <span className="ml-1 text-[var(--th-green)] hidden sm:inline">● run</span>
        </span>
      </div>

      <div className="p-2 sm:p-3 space-y-3">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1.5">
            {/* prompt + title — single line, no extra header rows */}
            <div className="flex items-center gap-2 text-[11px] leading-none">
              <span className="text-[var(--th-green)] font-bold">❯</span>
              <span className="text-[var(--th-cyan)] truncate text-[11px]">{section.prompt}</span>
              <span className="hidden sm:inline-flex ml-auto text-[9px] tracking-widest font-bold text-[var(--th-text-dim)] border border-[var(--th-border-subtle)]/25 bg-[var(--th-surface)]/40 px-1.5 py-0.5 rounded-[1px]">
                {section.title} • {section.items.length}
              </span>
            </div>

            {/* compact ls-style grid — vertical efficient like previous */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 px-2 py-1.5 bg-[var(--th-surface-alt)] hover:bg-[var(--th-surface)] border border-[var(--th-border)] hover:border-[var(--th-accent)] rounded-[3px] transition-colors"
                >
                  <span className="text-[13px] leading-none shrink-0" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--th-text)] group-hover:text-[var(--th-cyan)] truncate leading-none">
                    {item.name}
                  </span>
                  <span className="ml-auto hidden sm:inline text-[8px] font-bold tracking-wide text-[var(--th-text-dim)]/70 group-hover:text-[var(--th-cyan)]/80 shrink-0">
                    {item.tag}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* footer — minimal, single line */}
      <div className="bg-[var(--th-surface-alt)]/70 px-3 py-1 flex items-center justify-between text-[10px] text-[var(--th-text-dim)] border-t border-[var(--th-border-subtle)]/15 leading-none">
        <span className="hidden sm:inline">Tasks: {sections.reduce((a, s) => a + s.items.length, 0)} • q: quit • /: filter</span>
        <span className="sm:hidden">btop • {sections.reduce((a, s) => a + s.items.length, 0)} tasks</span>
        <span className="text-[var(--th-green)]">up 2d</span>
      </div>
    </Card>
  );
}
