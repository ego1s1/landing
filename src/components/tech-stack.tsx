import { Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "EMBEDDED / FIRMWARE",
    prompt: "ls ~/stack/embedded/",
    items: [
      { name: "Embedded C", icon: "", color: "#7dcfff", url: "https://en.cppreference.com/w/c" },
      { name: "Embedded C++", icon: "", color: "#7aa2f7", url: "https://en.cppreference.com/w/cpp" },
      { name: "ARM & MCUs", icon: "", color: "#e0af68", url: "https://www.arm.com/" },
      { name: "ARM Assembly", icon: "", color: "#ff9e64", url: "https://developer.arm.com/documentation/dui0473/m/overview-of-arm-assembly-language" },
      { name: "SPI / I2C / CAN", icon: "󰒋", color: "#9ece6a", url: "https://www.can-cia.org/" },
      { name: "RTOS & Linux", icon: "", color: "#ff9e64", url: "https://www.freertos.org/" },
      { name: "GDB & Debug", icon: "", color: "#bb9af7", url: "https://www.sourceware.org/gdb/" },
    ],
  },
  {
    title: "LANGUAGES / CS",
    prompt: "cat ~/stack/lang.txt",
    items: [
      { name: "C++", icon: "", color: "#7aa2f7", url: "https://en.cppreference.com/w/" },
      { name: "Java", icon: "", color: "#f7768e", url: "https://www.java.com/" },
      { name: "Python", icon: "", color: "#e0af68", url: "https://www.python.org/" },
      { name: "TypeScript", icon: "", color: "#7dcfff", url: "https://www.typescriptlang.org/" },
      { name: "Data Structures", icon: "󰈮", color: "#a7c080", url: "https://en.wikipedia.org/wiki/Data_structure" },
      { name: "OOPs", icon: "", color: "#e0af68", url: "https://en.wikipedia.org/wiki/Object-oriented_programming" },
      { name: "JavaScript", icon: "", color: "#ff9e64", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "HTML/CSS", icon: "", color: "#bb9af7", url: "https://developer.mozilla.org/en-US/docs/Web" },
    ],
  },
  {
    title: "BACKEND / DATA & AI",
    prompt: "ps aux | grep -i sql",
    items: [
      { name: "PostgreSQL", icon: "", color: "#7aa2f7", url: "https://www.postgresql.org/" },
      { name: "SQL", icon: "", color: "#7dcfff", url: "https://en.wikipedia.org/wiki/SQL" },
      { name: "Redis", icon: "", color: "#f7768e", url: "https://redis.io/" },
      { name: "Docker", icon: "", color: "#7dcfff", url: "https://www.docker.com/" },
      { name: "NLP", icon: "󰧑", color: "#bb9af7", url: "https://en.wikipedia.org/wiki/Natural_language_processing" },
      { name: "Git", icon: "", color: "#f7768e", url: "https://git-scm.com/" },
    ],
  },
  {
    title: "TOOLS / SYSTEMS",
    prompt: "which bash vim",
    items: [
      { name: "Vim / Neovim", icon: "", color: "#9ece6a", url: "https://www.vim.org/" },
      { name: "Linux Shell", icon: "", color: "#e0af68", url: "https://www.gnu.org/software/coreutils/" },
      { name: "Bash", icon: "", color: "#9ece6a", url: "https://www.gnu.org/software/bash/" },
      { name: "GDB & Debug", icon: "", color: "#bb9af7", url: "https://www.sourceware.org/gdb/" },
    ],
  },
];

export function TechStack() {
  return (
    <Card
      id="stack"
      title="ls -- STACK"
      shortTitle="STACK"
      nerdIcon="󰙲"
      icon={<Cpu className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden bg-[var(--th-bg)]"
    >
      {/* header — single line, no clutter */}
      <div className="bg-[var(--th-surface)] border-b border-[var(--th-border-subtle)]/12 px-3 py-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] tracking-wide">
          <span className="bg-[var(--th-green)] text-[var(--th-bg)] px-1 py-0.5 font-bold leading-none">STACK</span>
          <span className="text-[var(--th-text-dim)] hidden sm:inline">ls -- {sections.reduce((a, s) => a + s.items.length, 0)} entries</span>
        </span>
        <span className="text-[10px] text-[var(--th-text-dim)]/60 hidden sm:inline">hover • click → docs</span>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-[0.14em] text-[var(--th-cyan)]/90">{section.title}</span>
              <span className="h-px flex-1 bg-[var(--th-border-subtle)]/15 hidden sm:block" />
              <span className="text-[10px] text-[var(--th-text-dim)]/50 hidden sm:inline truncate">{section.prompt}</span>
            </div>

            {/* icon-only — bigger boxes, full-width */}
            <div className="flex flex-wrap gap-2">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={`${item.name} → ${item.url}`}
                  className="group relative flex items-center justify-center size-11 sm:size-12 bg-[var(--th-surface)] hover:bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/20 hover:border-[var(--th-cyan)]/40 rounded-[5px] transition-all hover:-translate-y-px hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
                >
                  <span
                    className="text-[18px] sm:text-[20px] leading-none transition-transform group-hover:scale-110 group-active:scale-95"
                    style={{ color: item.color }}
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--th-surface-alt)] text-[var(--th-text)] text-[10px] font-medium px-1.5 py-0.5 rounded-[3px] border border-[var(--th-border)] shadow-[0_4px_12px_rgba(0,0,0,0.22)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity translate-y-0.5 group-hover:translate-y-0">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--th-surface)]/60 px-3 py-1.5 flex items-center justify-between text-[10px] text-[var(--th-text-dim)]/60 border-t border-[var(--th-border-subtle)]/10">
        <span className="hidden sm:inline">— {sections.reduce((a, s) => a + s.items.length, 0)} entries • icons only • hover for name</span>
        <span className="sm:hidden">— {sections.reduce((a, s) => a + s.items.length, 0)} icons</span>
        <span className="text-[var(--th-text-dim)]/40 hidden sm:inline">∷ ls</span>
      </div>
    </Card>
  );
}
