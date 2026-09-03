import {
  BadgeCheck,
  FileText,
  Landmark,
  ReceiptText,
  Smartphone,
  Workflow
} from "lucide-react";
import Image from "next/image";
import { solutionIdentity, type SolutionIdentityId } from "@/data/preparedInformation";
import { cn } from "@/lib/cn";
import { useLocalizedSolution } from "@/data/localized";

const iconMap = {
  xpertfactor: Landmark,
  factorix: ReceiptText,
  "recouvrement-creances": Landmark,
  "document-management": FileText,
  "ai-automation": Workflow,
  "web-mobile-development": Smartphone
} satisfies Record<SolutionIdentityId, typeof BadgeCheck>;

export function SolutionMark({
  id,
  size = "md",
  showLabel = false,
  className
}: {
  id: SolutionIdentityId;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const identity = solutionIdentity[id];
  const localized = useLocalizedSolution(id);
  const Icon = iconMap[id];
  const dimension = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const iconSize = size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("solution-mark relative grid shrink-0 place-items-center rounded-xl bg-white shadow-panel", dimension)}>
        <span className="absolute inset-0 rounded-xl border border-shamash-blue/25" />
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-shamash-gold shadow-sm" />
        {identity.logo ? (
          <Image
            src={identity.logo}
            alt=""
            fill
            sizes={size === "lg" ? "64px" : size === "sm" ? "40px" : "48px"}
            className="relative object-contain p-1.5"
          />
        ) : (
          <Icon aria-hidden="true" className={cn("relative text-shamash-indigo", iconSize)} />
        )}
        <span className="sr-only">{localized.name}</span>
      </span>
      {showLabel ? (
        <span>
          <span className="block text-sm font-black text-shamash-navy">{localized.name}</span>
          <span className="block text-xs font-semibold text-neutral-muted">{localized.headline}</span>
        </span>
      ) : null}
    </div>
  );
}
