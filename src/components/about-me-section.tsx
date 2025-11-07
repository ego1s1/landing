import { User } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/glass-card";

const aboutMeContent = readFileSync(join(process.cwd(), "public", "about-me.md"), "utf8");

export default function AboutMeSection() {
  return (
    <GlassCard
      title="ABOUT-ME.md"
      icon={<User className="size-4" />}
      contentClassName="prose max-w-none prose-invert font-[var(--font-serif)] leading-relaxed prose-headings:font-[var(--font-serif)] prose-strong:font-[var(--font-serif)]"
    >
      <ReactMarkdown>{aboutMeContent}</ReactMarkdown>
    </GlassCard>
  );
} 