import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-3 relative",
        className,
      )}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-distortion-overlay" />
      <p className="text-center text-sm text-muted-foreground relative z-10">
        Built with ❤️ by Priyanshu Sharma
      </p>
    </footer>
  );
}
