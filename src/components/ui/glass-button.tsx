"use client";

import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonBaseProps {
  className?: string;
  children: ReactNode;
}

type GlassButtonButtonProps = GlassButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type GlassButtonLinkProps = GlassButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type GlassButtonProps = GlassButtonButtonProps | GlassButtonLinkProps;

export function GlassButton(props: GlassButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center bg-[#24283b] hover:bg-[#292e42] text-[#c0caf5] hover:text-[#7dcfff] border border-[#414868] hover:border-[#7aa2f7] shadow-[2px_2px_0px_#101014] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-[4px] px-3 py-1.5 text-xs font-mono select-none cursor-pointer";

  if ("href" in props && props.href) {
    const { className, children, href, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        href={href}
        className={cn(baseClasses, className)}
      >
        <span className="inline-flex items-center justify-center gap-1.5 font-mono">{children}</span>
      </a>
    );
  }

  const { className, children, disabled, type, ...buttonProps } = props as GlassButtonButtonProps;

  return (
    <button
      {...buttonProps}
      type={type ?? "button"}
      className={cn(baseClasses, disabled ? "opacity-50 cursor-not-allowed" : "", className)}
      disabled={disabled}
    >
      <span className="inline-flex items-center justify-center gap-1.5 font-mono">{children}</span>
    </button>
  );
}
