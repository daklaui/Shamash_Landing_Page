import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutionIdentity, type SolutionIdentityId } from "@/data/preparedInformation";
import type { VisualType } from "@/data/solutions";
import { cn } from "@/lib/cn";
import { ProductLogo } from "./ProductLogo";
import { useTranslations } from "next-intl";
import { rawMessage } from "@/i18n/raw";

const interfaceMetrics = {
  "factoring-dashboard": {
    metric: "92%",
  },
  "erp-dashboard": {
    metric: "38k",
  },
  "document-workflow": {
    metric: "6m",
  },
  "automation-orchestration": {
    metric: "41%",
  },
  "web-mobile-architecture": {
    metric: "99.9%",
  }
} satisfies Record<VisualType, {
  metric: string;
}>;

export function InterfaceTheater({
  type,
  solutionId,
  size = "default",
  className
}: {
  type: VisualType;
  solutionId: SolutionIdentityId;
  size?: "default" | "hero";
  className?: string;
}) {
  const t = useTranslations("common");
  const types = rawMessage<Record<VisualType, { leftTitle: string; rightTitle: string; line: string; rows: string[]; chips: string[] }>>(t, "visuals.types");
  const translated = types[type];
  const content = { ...translated, ...interfaceMetrics[type] };
  const identity = solutionIdentity[solutionId];
  const isHero = size === "hero";

  return (
    <div
      className={cn(
        "interface-theater relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium",
        isHero ? "p-3 sm:p-4 lg:p-5" : "p-4",
        className
      )}
    >
      <div className="theater-glow absolute inset-0" />
      <div className={cn("relative rounded-xl border border-slate-200 bg-slate-50/80", isHero ? "p-2.5 sm:p-3.5" : "p-3")}>
        <div className={cn("flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white", isHero ? "px-4 py-3.5 sm:px-5" : "px-4 py-3")}>
          <ProductLogo id={solutionId} className={cn(isHero ? "h-12 max-w-72 sm:h-14" : "h-12 max-w-64")} />
          <span className="motion-node rounded-full bg-shamash-blue/10 px-3 py-1 text-xs font-black text-shamash-navy">
            {t("visuals.liveWorkspace", { code: identity.code })}
          </span>
        </div>

        <div className={cn("mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]", isHero && "lg:gap-4")}>
          <div className={cn("rounded-lg border border-slate-200 bg-white", isHero ? "p-4 sm:p-5" : "p-4")}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase text-shamash-indigo">{content.leftTitle}</p>
              <span className="h-2.5 w-2.5 rounded-full bg-shamash-gold" />
            </div>
            <p className={cn("mt-3 font-black text-shamash-navy", isHero ? "text-6xl" : "text-5xl")}>{content.metric}</p>
            <p className="mt-1 text-sm font-semibold text-neutral-text">{content.line}</p>
            <div className={cn("mt-6 space-y-2", isHero && "sm:mt-8")}>
              {[82, 58, 74, 46].map((width, index) => (
                <div key={width} className={cn("overflow-hidden rounded-full bg-slate-100", isHero ? "h-3.5" : "h-3")}>
                  <span
                    className="animate-load-bar block h-full rounded-full bg-gradient-to-r from-shamash-blue to-shamash-indigo"
                    style={{ width: `${width}%`, animationDelay: `${index * 140}ms` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={cn("rounded-lg border border-slate-200 bg-white", isHero ? "p-4 sm:p-5" : "p-4")}>
            <p className="text-xs font-black uppercase text-shamash-indigo">{content.rightTitle}</p>
            <div className="relative mt-5 grid gap-3">
              <span className="animate-flow-line absolute left-4 top-5 h-[calc(100%-40px)] w-px bg-gradient-to-b from-shamash-blue via-shamash-indigo to-shamash-gold" />
              {content.rows.map((row, index) => (
                <div key={row} className={cn("relative flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3", isHero ? "py-3.5" : "py-3")}>
                  <span className="motion-node grid h-8 w-8 place-items-center rounded-md bg-white text-shamash-blue shadow-sm">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-shamash-navy">{row}</span>
                  {index < content.rows.length - 1 ? (
                    <ArrowRight aria-hidden="true" className="ms-auto h-4 w-4 text-shamash-indigo rtl:rotate-180" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {content.chips.map((chip) => (
            <div key={chip} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-xs font-black text-shamash-navy">
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
