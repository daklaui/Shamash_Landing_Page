"use client";

import { useId, useState } from "react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  FileWarning,
  Landmark,
  ReceiptText,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ProductFrame } from "./ProductFrame";
import type { ModuleGroup, PlatformView } from "./types";

const moduleIcons = {
  receivables: ReceiptText,
  financing: CircleDollarSign,
  collections: BriefcaseBusiness,
  risk: ShieldCheck,
  disputes: FileWarning,
  accounting: BookOpenCheck,
  bank: Landmark
} as const;

export function ModuleExplorer({
  groups,
  ariaLabel,
  illustrative
}: {
  groups: ModuleGroup[];
  ariaLabel: string;
  illustrative: string;
}) {
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");
  const id = useId();
  const active = groups.find((item) => item.id === activeId) ?? groups[0];
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = document.documentElement.dir === "rtl";
    const direction = event.key === "ArrowRight" ? (rtl ? -1 : 1) : event.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!direction) return;
    event.preventDefault();
    const next = (index + direction + groups.length) % groups.length;
    setActiveId(groups[next].id);
    document.getElementById(`${id}-tab-${groups[next].id}`)?.focus();
  };

  return (
    <div className="xf-explorer">
      <div className="xf-explorer__tabs" role="tablist" aria-label={ariaLabel}>
        {groups.map((group, index) => {
          const Icon = moduleIcons[group.id as keyof typeof moduleIcons] ?? ReceiptText;
          const selected = group.id === active.id;
          return (
            <button
              key={group.id}
              id={`${id}-tab-${group.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn("xf-explorer__tab", selected && "is-active")}
            >
              <Icon aria-hidden="true" />
              <span>{group.label}</span>
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        id={`${id}-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active.id}`}
        className="xf-explorer__panel"
      >
        <div className="p-6 sm:p-8 lg:p-10">
          <span className="inline-flex rounded-full bg-shamash-blue/10 px-3 py-1 text-xs font-black text-shamash-indigo">{active.label}</span>
          <h3 className="mt-5 max-w-xl text-2xl font-black leading-tight text-shamash-navy sm:text-3xl">{active.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-text sm:text-base">{active.description}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {active.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm font-bold text-shamash-navy">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-shamash-blue/10 text-shamash-blue"><Check aria-hidden="true" className="size-3.5" /></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="xf-explorer__visual">
          <ProductFrame title={active.title} eyebrow={active.label} rows={active.features.slice(0, 4)} note={illustrative} compact />
        </div>
      </div>
    </div>
  );
}

export function PlatformExplorer({
  views,
  ariaLabel,
  illustrative
}: {
  views: PlatformView[];
  ariaLabel: string;
  illustrative: string;
}) {
  const [activeId, setActiveId] = useState(views[0]?.id ?? "");
  const id = useId();
  const active = views.find((view) => view.id === activeId) ?? views[0];
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = document.documentElement.dir === "rtl";
    const direction = event.key === "ArrowRight" ? (rtl ? -1 : 1) : event.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!direction) return;
    event.preventDefault();
    const next = (index + direction + views.length) % views.length;
    setActiveId(views[next].id);
    document.getElementById(`${id}-tab-${views[next].id}`)?.focus();
  };

  return (
    <div className="mt-12">
      <div className="xf-platform-tabs" role="tablist" aria-label={ariaLabel}>
        {views.map((view, index) => {
          const selected = view.id === active.id;
          return (
            <button
              key={view.id}
              id={`${id}-tab-${view.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel-${view.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(view.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn("xf-platform-tab", selected && "is-active")}
            >
              {view.label}
            </button>
          );
        })}
      </div>
      <div key={active.id} id={`${id}-panel-${active.id}`} role="tabpanel" aria-labelledby={`${id}-tab-${active.id}`} className="xf-platform-stage">
        <div className="max-w-xl lg:py-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-shamash-indigo">{active.label}</p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-shamash-navy">{active.title}</h3>
          <p className="mt-4 text-base leading-7 text-neutral-text">{active.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {active.rows.map((row) => <span key={row} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-shamash-navy">{row}</span>)}
          </div>
        </div>
        <ProductFrame title={active.title} eyebrow={active.label} rows={active.rows} note={illustrative} />
      </div>
    </div>
  );
}
