import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getAboutMe } from "@/lib/content";
import { NvimWindow } from "@/components/ui/nvim-window";

const aboutMeContent = getAboutMe();

export default function AboutMeSection() {
  return (
    <Card
      id="about"
      title="nvim whoami.txt"
      shortTitle="ABOUT"
      nerdIcon="󰆍"
      icon={<User className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      <NvimWindow content={aboutMeContent} fileName="whoami.txt" cursorLine={3} />
    </Card>
  );
}
