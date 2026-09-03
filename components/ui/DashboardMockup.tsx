import { CheckCircle2, FileCheck2, GitBranch, Layers3, ShieldCheck } from "lucide-react";
import type { VisualType } from "@/data/solutions";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { rawMessage } from "@/i18n/raw";

const variants = {
  "factoring-dashboard": {
    metric: "92%",
    chart: [46, 62, 54, 76, 68],
    icon: ShieldCheck
  },
  "erp-dashboard": {
    metric: "38k",
    chart: [34, 58, 72, 49, 81],
    icon: Layers3
  },
  "collection-management": {
    metric: "87%",
    chart: [38, 52, 61, 74, 82],
    icon: ShieldCheck
  },
  "document-workflow": {
    metric: "6m",
    chart: [76, 66, 84, 58, 91],
    icon: FileCheck2
  },
  "automation-orchestration": {
    metric: "41%",
    chart: [52, 74, 61, 86, 78],
    icon: GitBranch
  },
  "web-mobile-architecture": {
    metric: "99.9%",
    chart: [42, 64, 69, 82, 73],
    icon: CheckCircle2
  }
} satisfies Record<VisualType, {
  metric: string;
  chart: number[];
  icon: typeof CheckCircle2;
}>;

export function DashboardMockup({
  type,
  compact = false,
  className
}: {
  type: VisualType;
  compact?: boolean;
  className?: string;
}) {
  const t = useTranslations("common");
  const types = rawMessage<Record<VisualType, { title: string; metricLabel: string; rows: string[] }>>(t, "visuals.types");
  const translated = types[type];
  const visual = { ...variants[type], ...translated };
  const Icon = visual.icon;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-premium",
        className
      )}
    >
      <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-shamash-blue/10 blur-2xl" />
      <div className="relative rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-shamash-blue/12 text-shamash-indigo">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-shamash-navy">{visual.title}</p>
              <p className="text-xs text-neutral-muted">{t("visuals.secureWorkspace")}</p>
            </div>
          </div>
          <span className="rounded-full bg-shamash-gold/15 px-2.5 py-1 text-xs font-bold text-shamash-navy">
            {t("visuals.live")}
          </span>
        </div>

        <div className={cn("grid gap-4 p-4", compact ? "md:grid-cols-1" : "md:grid-cols-[0.85fr_1.15fr]")}>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase text-neutral-muted">{t("visuals.keyResult")}</p>
            <p className="mt-2 text-4xl font-bold text-shamash-navy">{visual.metric}</p>
            <p className="mt-1 text-sm text-neutral-text">{visual.metricLabel}</p>
            <div className="mt-5 flex h-24 items-end gap-2">
              {visual.chart.map((height, index) => (
                <span
                  key={index}
                  className="w-full rounded-t bg-gradient-to-t from-shamash-indigo to-shamash-blue"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {visual.rows.map((row, index) => (
              <div
                key={row}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-shamash-blue/10 text-shamash-blue">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-shamash-navy">{row}</span>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-shamash-blue" />
              </div>
            ))}
            {!compact ? (
              <div className="rounded-lg border border-shamash-indigo/20 bg-gradient-to-br from-white to-slate-100 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-muted">
                  <span>{t("visuals.integratedSystems")}</span>
                  <span>{t("visuals.verified")}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["ERP", "API", "BI"].map((label) => (
                    <span
                      key={label}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-xs font-bold text-shamash-navy"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
