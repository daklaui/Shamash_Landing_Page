import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "card-base interactive-lift border-neutral-border",
        className
      )}
    >
      {children}
    </article>
  );
}
