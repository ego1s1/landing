import { User } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

const aboutMeContent = readFileSync(join(process.cwd(), "public", "about-me.md"), "utf8");

export default function AboutMeSection() {
  return (
    <GlassCard
      id="about"
      title="cat ABOUT-ME.md"
      shortTitle="ABOUT"
      nerdIcon="󰆍"
      icon={<User className="size-4" />}
      contentClassName="space-y-3 font-mono text-[var(--th-text)]"
    >
      <div className="p-4 bg-[var(--th-bg)] border border-[var(--th-border-subtle)] rounded-[3px] space-y-2 text-xs md:text-sm text-[var(--th-text-muted)] leading-relaxed">
        <div className="flex items-center gap-2 text-xs text-[var(--th-cyan)] font-bold border-b border-[var(--th-border-subtle)] pb-1.5 mb-2">
          <span>❯</span>
          <span>whoami.txt</span>
        </div>
        <div className="prose max-w-none text-[var(--th-text)] font-mono leading-relaxed">
          <ReactMarkdown>{aboutMeContent}</ReactMarkdown>
        </div>
      </div>
    </GlassCard>
  );
}
