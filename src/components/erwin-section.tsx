import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getErwin } from "@/lib/content";
import { NvimWindow } from "@/components/ui/nvim-window";

export default function ErwinSection() {
  // Read per-render (not module top-level) so local markdown edits
  // show up on page refresh in dev without a server restart.
  const erwinContent = getErwin();

  return (
    <Card
      id="erwin"
      title="nvim erwin.md"
      shortTitle="ERWIN"
      nerdIcon=""
      icon={<Quote className="size-4" />}
      contentClassName="!p-0 font-mono overflow-hidden"
    >
      <NvimWindow content={erwinContent} fileName="erwin.md" cursorLine={3} />
    </Card>
  );
}
