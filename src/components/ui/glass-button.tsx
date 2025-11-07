"use client";

import { cn } from "@/lib/utils";
import { useGlassEffect } from "@/components/ui/use-glass-effect";
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
  const { specularRef, handlePointerLeave, handlePointerMove } = useGlassEffect<HTMLElement>();

  if ("href" in props && props.href) {
    const { className, children, href, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        href={href}
        className={cn("glass-button", className)}
        onPointerMove={(event) => {
          anchorProps.onPointerMove?.(event);
          handlePointerMove(event);
        }}
        onPointerLeave={(event) => {
          anchorProps.onPointerLeave?.(event);
          handlePointerLeave();
        }}
      >
        <div className="glass-filter" />
        <div className="glass-overlay" />
        <div className="glass-distortion-overlay" />
        <div ref={specularRef} className="glass-specular" />
        <span className="glass-content">{children}</span>
      </a>
    );
  }

  const { className, children, disabled, type, ...buttonProps } = props as GlassButtonButtonProps;

  return (
    <button
      {...buttonProps}
      type={type ?? "button"}
      className={cn("glass-button", disabled ? "pointer-events-none opacity-60" : "", className)}
      disabled={disabled}
      onPointerMove={(event) => {
        buttonProps.onPointerMove?.(event);
        if (disabled) return;
        handlePointerMove(event);
      }}
      onPointerLeave={(event) => {
        buttonProps.onPointerLeave?.(event);
        handlePointerLeave();
      }}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-distortion-overlay" />
      <div ref={specularRef} className="glass-specular" />
      <span className="glass-content">{children}</span>
    </button>
  );
}

