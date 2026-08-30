"use client";

import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("w-full max-w-3xl mx-auto p-5 font-mono", className)}>
      <div className="bg-[#1f2335] border border-[#414868] shadow-[3px_3px_0px_#101014] rounded-[4px] p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-[#a9b1d6]">
          <span className="text-[#7dcfff]">user@ego1s1:~$</span>
          <span>Built with ❤️ by Priyanshu Sharma</span>
        </div>
        <div className="mt-2 text-[10px] text-[#565f89] flex items-center justify-center gap-3">
          <span>PROCESS: EXIT 0</span>
          <span>•</span>
          <span>TTY: /dev/pts/0</span>
          <span>•</span>
          <span>TOKYONIGHT STORM</span>
        </div>
      </div>
    </footer>
  );
}
