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
      {/* btop header — minimal */}
      <div className="bg-[var(--th-surface)] border-b border-[var(--th-border-subtle)]/15 px-3 py-2 flex items-center justify-between text-[10px] tracking-wide">
        <span className="flex items-center gap-2">
          <span className="bg-[var(--th-green)] text-[var(--th-bg)] px-1.5 py-0.5 font-bold leading-none">STACK</span>
          <span className="text-[var(--th-text-dim)]">— {sections.reduce((a, s) => a + s.items.length, 0)} skills</span>
        </span>
        <span className="text-[var(--th-text-dim)] hidden sm:inline text-[10px]">sorted by freq • q: quit</span>
      </div>

      <div className="p-3 sm:p-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2.5">
            <div className="flex items-baseline gap-2 border-b border-[var(--th-border-subtle)]/10 pb-1">
              <span className="text-[11px] font-bold tracking-widest text-[var(--th-cyan)]">{section.title}</span>
              <span className="text-[10px] text-[var(--th-text-dim)]/70 truncate hidden sm:inline">— {section.prompt}</span>
              <span className="ml-auto text-[10px] tabular-nums text-[var(--th-text-dim)]/60">{section.items.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-3 py-2.5 bg-[var(--th-surface)] hover:bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/20 hover:border-[var(--th-cyan)]/30 rounded-[4px] transition-all hover:translate-y-[-1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                >
                  <span
                    className="size-8 rounded-[4px] bg-[var(--th-bg)] border border-[var(--th-border-subtle)]/15 flex items-center justify-center text-[15px] leading-none shrink-0 group-hover:border-[var(--th-cyan)]/20 transition-colors"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[12px] font-semibold leading-none text-[var(--th-text)] group-hover:text-[var(--th-cyan)] truncate">
                      {item.name}
                    </span>
                    <span className="block text-[10px] leading-none text-[var(--th-text-dim)] mt-1 tracking-wide">
                      {item.tag} • {item.name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 8)}
                    </span>
                  </span>
                  <span className="text-[var(--th-text-dim)]/40 group-hover:text-[var(--th-cyan)] group-hover:translate-x-0.5 transition-all text-[11px] shrink-0">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--th-surface)] px-3 py-2 flex items-center justify-between text-[10px] text-[var(--th-text-dim)] border-t border-[var(--th-border-subtle)]/15">
        <span>— {sections.reduce((a, s) => a + s.items.length, 0)} skills indexed</span>
        <span className="text-[var(--th-cyan)]/70">∴ btop</span>
      </div>
    </Card>
  );
}
