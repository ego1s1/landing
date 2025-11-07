import { Briefcase } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

function getWorkExperienceContent() {
  const filePath = join(process.cwd(), "public", "work-experience.md");
  const content = readFileSync(filePath, "utf8");
  return content;
}

export default function WorkExperienceSection() {
  const content = getWorkExperienceContent();

  return (
    <GlassCard
      title="WORK-EXPERIENCE.md"
      icon={<Briefcase className="size-4" />}
      contentClassName="prose max-w-none dark:prose-invert"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </GlassCard>
  );
}
