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
      contentClassName="space-y-3 font-mono text-[#c0caf5]"
    >
      <div className="p-4 bg-[#1a1b26] border border-[#3b4261] rounded-[3px] space-y-2 text-xs md:text-sm text-[#a9b1d6] leading-relaxed">
        <div className="flex items-center gap-2 text-xs text-[#7dcfff] font-bold border-b border-[#3b4261] pb-1.5 mb-2">
          <span>❯</span>
          <span>whoami.txt</span>
        </div>
        <div className="prose max-w-none text-[#c0caf5] font-mono leading-relaxed">
          <ReactMarkdown>{aboutMeContent}</ReactMarkdown>
        </div>
      </div>
    </GlassCard>
  );
}