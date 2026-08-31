"use client";

import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonBaseProps {
  className?: string;
  children: ReactNode;
}

type ButtonButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonButtonProps | ButtonLinkProps;

export function Button(props: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center bg-[var(--th-surface-alt)] hover:bg-[var(--th-surface)] text-[var(--th-text)] hover:text-[var(--th-cyan)] border border-[var(--th-border)] hover:border-[var(--th-accent)] shadow-[2px_2px_0px_var(--th-shadow)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-[4px] px-3 py-1.5 text-xs font-mono select-none cursor-pointer";

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

  const { className, children, disabled, type, ...buttonProps } = props as ButtonButtonProps;

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


