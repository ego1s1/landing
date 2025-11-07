import { User } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

function getAboutMeContent() {
  const filePath = join(process.cwd(), "public", "about-me.md");
  const content = readFileSync(filePath, "utf8");
  return content;
}

export default function AboutMeSection() {
  const content = getAboutMeContent();

  return (
    <GlassCard
      title="ABOUT-ME.md"
      icon={<User className="size-4" />}
      contentClassName="prose max-w-none dark:prose-invert"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </GlassCard>
  );
} 