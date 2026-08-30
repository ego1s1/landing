import { Briefcase } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

const workExperienceContent = readFileSync(join(process.cwd(), "public", "work-experience.md"), "utf8");

export default function WorkExperienceSection() {
  return (
    <GlassCard
      id="experience"
      title="cat WORK-EXPERIENCE.md"
      shortTitle="EXP"
      nerdIcon="󰌢"
      icon={<Briefcase className="size-4" />}
      contentClassName="prose max-w-none font-mono text-[#c0caf5]"
    >
      <ReactMarkdown>{workExperienceContent}</ReactMarkdown>
    </GlassCard>
  );
}
