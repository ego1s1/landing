import { Briefcase } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

const workExperienceContent = readFileSync(join(process.cwd(), "public", "work-experience.md"), "utf8");

export default function WorkExperienceSection() {
  return (
    <GlassCard
      title="WORK-EXPERIENCE.md"
      icon={<Briefcase className="size-4" />}
      contentClassName="prose max-w-none dark:prose-invert font-[var(--font-serif)] leading-relaxed prose-headings:font-[var(--font-serif)] prose-strong:font-[var(--font-serif)]"
    >
      <ReactMarkdown>{workExperienceContent}</ReactMarkdown>
    </GlassCard>
  );
}
