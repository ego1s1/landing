import { Briefcase } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";

function getWorkExperienceContent() {
  const filePath = join(process.cwd(), "public", "work-experience.md");
  const content = readFileSync(filePath, "utf8");
  return content;
}

export default function WorkExperienceSection() {
  const content = getWorkExperienceContent();

  return (
    <div className="w-full bg-background rounded-lg border border-border">
      <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
        <Briefcase className="size-4" />
        <span className="text-sm font-mono">WORK-EXPERIENCE.md</span>
      </h2>
      <div className="prose prose-invert px-5 py-3">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
