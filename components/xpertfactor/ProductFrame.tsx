import {
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  Landmark,
  Search,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/cn";

const iconSet = [FileCheck2, CircleDollarSign, ShieldCheck];

export function ProductFrame({
  title,
  eyebrow,
  rows,
  note,
  compact = false,
  className
}: {
  title: string;
  eyebrow: string;
  rows: string[];
  note: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("xf-product-frame", compact && "xf-product-frame--compact", className)}>
      <div className="xf-product-frame__topbar">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#ff6b6b]" />
          <span className="size-2 rounded-full bg-shamash-gold" />
          <span className="size-2 rounded-full bg-[#43c58a]" />
        </div>
        <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/72 sm:block">
          {note}
        </span>
        <Search aria-hidden="true" className="size-4 text-white/60" />
      </div>

      <div className="xf-product-frame__body">
        <aside className="xf-product-frame__rail" aria-hidden="true">
          {[Landmark, BarChart3, FileCheck2, CircleDollarSign, ShieldCheck].map((Icon, index) => (
            <span key={index} className={cn(index === 1 && "is-active")}><Icon /></span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-3 sm:p-4 lg:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-shamash-indigo">{eyebrow}</p>
              <h3 className="mt-1.5 text-base font-black text-shamash-navy sm:text-lg">{title}</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {note}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {rows.slice(0, 3).map((row, index) => {
              const Icon = iconSet[index];
              return (
                <div key={row} className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
                  <Icon aria-hidden="true" className={cn("size-4", index === 2 ? "text-shamash-gold" : "text-shamash-blue")} />
                  <p className="mt-2 truncate text-[10px] font-extrabold text-shamash-navy sm:text-xs">{row}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <span className="xf-frame-bar block h-full rounded-full bg-shamash-blue" style={{ width: `${72 - index * 13}%`, animationDelay: `${index * 180}ms` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{rows[0]}</p>
                <BarChart3 aria-hidden="true" className="size-4 text-shamash-indigo" />
              </div>
              <div className="mt-4 flex h-20 items-end gap-1.5 sm:h-24 sm:gap-2">
                {[38, 54, 46, 73, 61, 86, 70, 92].map((height, index) => (
                  <span key={index} className="xf-frame-chart flex-1 rounded-t bg-gradient-to-t from-shamash-indigo to-shamash-blue" style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }} />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{rows.at(-1)}</p>
              <div className="mt-3 space-y-2">
                {rows.slice(0, 4).map((row, index) => (
                  <div key={row} className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-2">
                    <CheckCircle2 aria-hidden="true" className={cn("size-3.5 shrink-0", index === 3 ? "text-shamash-gold" : "text-shamash-blue")} />
                    <span className="min-w-0 truncate text-[9px] font-bold text-slate-600 sm:text-[10px]">{row}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
