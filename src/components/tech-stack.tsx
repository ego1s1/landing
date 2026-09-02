import { Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "EMBEDDED / FIRMWARE",
    prompt: "ls -la ~/stack/embedded/",
    items: [
      { name: "Embedded C", icon: "", color: "#7dcfff", url: "https://en.cppreference.com/w/c", lvl: 88, tag: "C" },
      { name: "Embedded C++", icon: "", color: "#7aa2f7", url: "https://en.cppreference.com/w/cpp", lvl: 82, tag: "C++" },
      { name: "ARM & MCUs", icon: "", color: "#e0af68", url: "https://www.arm.com/", lvl: 78, tag: "ARM" },
      { name: "ARM Assembly", icon: "", color: "#ff9e64", url: "https://developer.arm.com/documentation/dui0473/m/overview-of-arm-assembly-language", lvl: 72, tag: "ASM" },
      { name: "SPI / I2C / CAN", icon: "󰒋", color: "#9ece6a", url: "https://www.can-cia.org/", lvl: 80, tag: "BUS" },
      { name: "RTOS & Linux", icon: "", color: "#ff9e64", url: "https://www.freertos.org/", lvl: 75, tag: "OS" },
      { name: "GDB & Debug", icon: "", color: "#bb9af7", url: "https://www.sourceware.org/gdb/", lvl: 77, tag: "DBG" },
    ],
  },
  {
    title: "LANGUAGES / CS FUNDAMENTALS",
    prompt: "cat ~/stack/lang.txt",
    items: [
      { name: "C++", icon: "", color: "#7aa2f7", url: "https://en.cppreference.com/w/", lvl: 88, tag: "PL" },
      { name: "Java", icon: "", color: "#f7768e", url: "https://www.java.com/", lvl: 80, tag: "PL" },
      { name: "Python", icon: "", color: "#e0af68", url: "https://www.python.org/", lvl: 85, tag: "PL" },
      { name: "TypeScript", icon: "", color: "#7dcfff", url: "https://www.typescriptlang.org/", lvl: 84, tag: "PL" },
      { name: "Data Structures", icon: "󰈮", color: "#a7c080", url: "https://en.wikipedia.org/wiki/Data_structure", lvl: 86, tag: "CS" },
      { name: "OOPs", icon: "", color: "#e0af68", url: "https://en.wikipedia.org/wiki/Object-oriented_programming", lvl: 82, tag: "CS" },
      { name: "JavaScript", icon: "", color: "#ff9e64", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", lvl: 78, tag: "PL" },
      { name: "HTML/CSS", icon: "", color: "#bb9af7", url: "https://developer.mozilla.org/en-US/docs/Web", lvl: 76, tag: "WEB" },
    ],
  },
  {
    title: "BACKEND / DATA & AI",
    prompt: "psql -c '\\l' && nlp --help",
    items: [
      { name: "PostgreSQL", icon: "", color: "#7aa2f7", url: "https://www.postgresql.org/", lvl: 78, tag: "DB" },
      { name: "SQL", icon: "", color: "#7dcfff", url: "https://en.wikipedia.org/wiki/SQL", lvl: 80, tag: "DB" },
      { name: "Redis", icon: "", color: "#f7768e", url: "https://redis.io/", lvl: 72, tag: "DB" },
      { name: "Docker", icon: "", color: "#7dcfff", url: "https://www.docker.com/", lvl: 76, tag: "OPS" },
      { name: "NLP", icon: "󰧑", color: "#bb9af7", url: "https://en.wikipedia.org/wiki/Natural_language_processing", lvl: 70, tag: "AI" },
      { name: "Git", icon: "", color: "#f7768e", url: "https://git-scm.com/", lvl: 85, tag: "VCS" },
    ],
  },
  {
    title: "TOOLS / SYSTEMS",
    prompt: "echo $SHELL && vim --version | head -n1",
    items: [
      { name: "Vim / Neovim", icon: "", color: "#9ece6a", url: "https://www.vim.org/", lvl: 84, tag: "ED" },
      { name: "Linux Shell", icon: "", color: "#e0af68", url: "https://www.gnu.org/software/coreutils/", lvl: 82, tag: "SH" },
      { name: "Bash", icon: "", color: "#9ece6a", url: "https://www.gnu.org/software/bash/", lvl: 86, tag: "SH" },
      { name: "GDB & Debug", icon: "", color: "#bb9af7", url: "https://www.sourceware.org/gdb/", lvl: 74, tag: "DBG" },
    ],
  },
];

function Bar({ lvl, color }: { lvl: number; color: string }) {
  return (
    <span className="flex-1 h-1.5 bg-[var(--th-bg)] border border-[var(--th-border-subtle)]/30 rounded-[1px] overflow-hidden flex">
      <span className="h-full transition-all" style={{ width: `${lvl}%`, backgroundColor: color, opacity: 0.95 }} />
    </span>
  );
}

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
      {/* btop header — nerdy, consistent with hero neofetch */}
      <div className="bg-[var(--th-surface)] border-b border-[var(--th-border-subtle)]/15 px-3 py-2 flex items-center justify-between text-[10px] tracking-wide">
        <span className="flex items-center gap-2">
          <span className="bg-[var(--th-green)] text-[var(--th-bg)] px-1.5 py-0.5 font-bold">STACK</span>
          <span className="text-[var(--th-text-dim)] hidden sm:inline">btop 1.3.2 | {sections.reduce((a, s) => a + s.items.length, 0)} procs | load avg: 1.42</span>
          <span className="text-[var(--th-text-dim)] sm:hidden">btop | {sections.reduce((a, s) => a + s.items.length, 0)} procs</span>
        </span>
        <span className="flex items-center gap-1.5 text-[var(--th-text-dim)]">
          <span className="hidden sm:inline">q: quit</span>
          <span className="size-1.5 rounded-full bg-[var(--th-green)] animate-pulse" />
          <span className="text-[var(--th-green)]">RUN</span>
        </span>
      </div>

      {/* htop-like column header */}
      <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-1 bg-[var(--th-surface-alt)]/60 border-b border-[var(--th-border-subtle)]/15 text-[9px] font-bold tracking-widest text-[var(--th-text-dim)]">
        <span className="col-span-1">PID</span>
        <span className="col-span-5">COMMAND</span>
        <span className="col-span-2 hidden lg:block">TYPE</span>
        <span className="col-span-3">LVL</span>
        <span className="col-span-1 text-right">%</span>
      </div>

      <div className="divide-y divide-[var(--th-border-subtle)]/10">
        {sections.map((section) => (
          <div key={section.title} className="bg-[var(--th-bg)]">
            {/* section prompt — nerdy terminal */}
            <div className="px-3 py-1.5 bg-[var(--th-surface)]/40 border-y border-[var(--th-border-subtle)]/10 flex items-center gap-2 text-[11px]">
              <span className="text-[var(--th-green)] font-bold">❯</span>
              <span className="text-[var(--th-cyan)] truncate">{section.prompt}</span>
              <span className="ml-auto hidden sm:inline text-[10px] text-[var(--th-text-dim)] border border-[var(--th-border-subtle)]/30 bg-[var(--th-bg)] px-1.5 py-0.5 rounded-[1px]">
                {section.title}
              </span>
              <span className="sm:hidden text-[10px] text-[var(--th-text-dim)]">{section.items.length} items</span>
            </div>
            {/* file-list header for mobile — ls style */}
            <div className="flex md:hidden items-center gap-2 px-3 py-1 bg-[var(--th-surface-alt)]/30 border-b border-[var(--th-border-subtle)]/10 text-[9px] tracking-widest text-[var(--th-text-dim)] font-bold">
              <span>MODE</span>
              <span className="flex-1">NAME</span>
              <span>LVL</span>
            </div>

            <div className="divide-y divide-[var(--th-border-subtle)]/10">
              {section.items.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-12 gap-2 items-center px-3 py-2 hover:bg-[var(--th-surface-alt)]/30 group transition-colors"
                >
                  {/* PID — nerdy */}
                  <span className="col-span-1 hidden md:block text-[11px] text-[var(--th-text-dim)] tabular-nums">
                    {(101 + idx).toString().padStart(3, "0")}
                  </span>
                  {/* MODE for mobile */}
                  <span className="col-span-1 md:hidden text-[10px] text-[var(--th-text-dim)]">
                    -rw-
                  </span>

                  {/* COMMAND — icon + name */}
                  <span className="col-span-6 md:col-span-5 flex items-center gap-2 min-w-0">
                    <span className="text-[14px] leading-none shrink-0" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                    <span className="text-[12px] font-semibold text-[var(--th-text)] group-hover:text-[var(--th-cyan)] truncate">
                      {item.name}
                    </span>
                    <span className="hidden sm:inline text-[9px] text-[var(--th-yellow)] border border-[var(--th-border-subtle)]/40 bg-[var(--th-bg)] px-1 py-0 rounded-[1px] shrink-0">
                      {item.tag}
                    </span>
                  </span>

                  {/* TYPE */}
                  <span className="col-span-2 hidden lg:block text-[10px] text-[var(--th-text-dim)] truncate">
                    {item.tag}
                  </span>

                  {/* LVL bar */}
                  <span className="col-span-4 md:col-span-3 flex items-center gap-2">
                    <Bar lvl={item.lvl} color={item.color} />
                    <span className="hidden sm:inline text-[10px] tabular-nums text-[var(--th-text-dim)] w-7 text-right">
                      {item.lvl}%
                    </span>
                  </span>

                  {/* % + arrow */}
                  <span className="col-span-1 flex items-center justify-end gap-1 text-[11px] text-[var(--th-text-dim)]">
                    <span className="hidden md:inline tabular-nums">{item.lvl}</span>
                    <span className="text-[var(--th-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* btop footer — consistent with hero vim statusline */}
      <div className="bg-[var(--th-surface-alt)]/80 px-3 py-1.5 flex items-center justify-between text-[10px] text-[var(--th-text-dim)] border-t border-[var(--th-border-subtle)]/15">
        <span className="flex items-center gap-2">
          <span className="bg-[var(--th-cyan)] text-[var(--th-bg)] px-1.5 py-0.5 font-bold hidden sm:inline">FILTER</span>
          <span className="hidden md:inline">Press `q` to quit • `dd` to kill • `F9` to sort</span>
          <span className="md:hidden">btop</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline">Tasks: {sections.reduce((a, s) => a + s.items.length, 0)}, thr: 42; 12:34:05</span>
          <span className="text-[var(--th-green)]">up 2 days</span>
        </span>
      </div>
    </Card>
  );
}
