"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Home, User, Briefcase, Layers, FolderOpen } from "lucide-react";
import { useGlassEffect } from "@/components/ui/use-glass-effect";

export interface FlatNavLinkData {
  href: string;
  text: string;
}

export function Navbar() {
  const links: FlatNavLinkData[] = useMemo(
    () => [
      { href: "#home", text: "Home" },
      { href: "#about", text: "About" },
      { href: "#experience", text: "Experience" },
      { href: "#stack", text: "Stack" },
      { href: "#projects", text: "Projects" },
    ],
    [],
  );

  const defaultHash = links[0]?.href ?? "#";
  const [activeHash, setActiveHash] = useState<string>(defaultHash);
  const { specularRef, handlePointerLeave, handlePointerMove } = useGlassEffect<HTMLDivElement>();

  const scrollToHash = useCallback(
    (hash: string) => {
      if (typeof window === "undefined") return;
      const id = hash.replace(/^#/, "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState(null, "", hash);
      setActiveHash(hash);
    },
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const hash = window.location.hash || defaultHash;
      setActiveHash(hash);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id) {
            setActiveHash(`#${id}`);
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    const targets = links
      .map((link) => link.href.replace(/^#/, ""))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    targets.forEach((element) => observer.observe(element));

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [defaultHash, links]);

  const iconMap: Record<string, ReactNode> = {
    Home: <Home className="size-4" />,
    About: <User className="size-4" />,
    Experience: <Briefcase className="size-4" />,
    Stack: <Layers className="size-4" />,
    Projects: <FolderOpen className="size-4" />,
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-5 pt-4">
      <nav
        className="glass-nav glass-nav-floating glass-nav-floating-active"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="glass-filter" />
        <div className="glass-overlay" />
        <div className="glass-distortion-overlay" />
        <div ref={specularRef} className="glass-specular" />
        <div className="glass-content flex items-center justify-center">
          <ul className="glass-nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`glass-nav-icon ${activeHash === link.href ? "glass-nav-icon-active" : ""}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToHash(link.href);
                  }}
                  aria-label={link.text}
                >
                  {iconMap[link.text]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
