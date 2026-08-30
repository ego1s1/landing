"use client";

import { cn } from "@/lib/utils";

interface TextScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
  textClassName?: string;
}

export function TextScroll({
  text,
  className,
  textClassName,
}: TextScrollProps) {
  return (
    <section className={cn("w-full py-8 px-4 font-mono select-none", className)}>
      <div className="max-w-3xl mx-auto border border-[#414868] bg-[#1f2335] shadow-[3px_3px_0px_#101014] rounded-[4px] p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-[#565f89] mb-2 uppercase tracking-widest">
          <span className="text-[#7dcfff]">❯</span>
          <span>SYSTEM_QUOTE.LOG</span>
          <span className="text-[#7dcfff]">❮</span>
        </div>
        <p className={cn("text-[#c0caf5] font-mono text-base md:text-lg font-medium leading-relaxed", textClassName)}>
          &quot;{text.trim()}&quot;
        </p>
      </div>
    </section>
  );
}
