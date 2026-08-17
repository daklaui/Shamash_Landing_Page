import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-shamash-blue/20 bg-shamash-blue/10 px-3 py-1 eyebrow-text text-shamash-navy",
        className
      )}
    >
      {children}
    </span>
  );
}
