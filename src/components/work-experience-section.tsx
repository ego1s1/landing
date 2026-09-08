import { Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getWorkExperience } from "@/lib/content";
import { NvimWindow } from "@/components/ui/nvim-window";

export default function WorkExperienceSection() {
  // Read per-render (not module top-level) so local markdown edits
  // show up on page refresh in dev without a server restart.
  const workExperienceContent = getWorkExperience();
  return (
    <Card
      id="experience"
      title="nvim work-experience.md"
      shortTitle="EXP"
      nerdIcon="󰌢"
      icon={<Briefcase className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      <NvimWindow content={workExperienceContent} fileName="work-experience.md" cursorLine={7} />
    </Card>
  );
}
