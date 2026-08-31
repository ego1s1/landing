import { Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getWorkExperience } from "@/lib/content";
import { NvimWindow } from "@/components/ui/nvim-window";

const workExperienceContent = getWorkExperience();

export default function WorkExperienceSection() {
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
