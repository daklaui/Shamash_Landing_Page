import type { ReactNode } from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  children
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl md:mb-12",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="heading-section">
        {title}
      </h2>
      {description ? (
        <p className="body-copy mt-5">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
