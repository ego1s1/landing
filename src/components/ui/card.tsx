"use client";

import { WindowFrame } from "./window-frame";

interface CardProps {
  id?: string;
  title?: string;
  shortTitle?: string;
  nerdIcon?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function Card(props: CardProps) {
  if (!props.id || !props.title) {
    return <WindowFrame id={props.id ?? "card"} title={props.title ?? ""} {...props} />;
  }
  return <WindowFrame {...(props as Required<Pick<CardProps, "id" | "title">> & CardProps)} />;
}


