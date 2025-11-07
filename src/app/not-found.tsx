import { GlassButton } from "@/components/ui/glass-button";
import { Undo } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto p-5 gap-3 flex flex-col justify-center items-center min-h-[72vh]">
      <h2 className="text-7xl font-bold dark:font-semibold">404</h2>
      <p>There&apos;s literally nothing but homepage</p>
      <GlassButton href="/" className="flex items-center gap-3">
        <Undo className="size-5" />
        <span className="glass-button-label">Return to Homepage</span>
      </GlassButton>
    </div>
  );
}
