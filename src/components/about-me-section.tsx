import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getAboutMe } from "@/lib/content";
import { NvimWindow } from "@/components/ui/nvim-window";

export default function AboutMeSection() {
  // Read per-render (not module top-level) so local markdown edits
  // show up on page refresh in dev without a server restart.
  const aboutMeContent = getAboutMe();

  return (
    <Card
      id="about"
      title="nvim about-me.md"
      shortTitle="ABOUT"
      nerdIcon="󰆍"
      icon={<User className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      <NvimWindow content={aboutMeContent} fileName="about-me.md" cursorLine={3} />
    </Card>
  );
}
