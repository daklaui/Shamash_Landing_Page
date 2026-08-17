"use client";

import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Fingerprint,
  FolderClosed,
  Gauge,
  Landmark,
  LockKeyhole,
  PackageSearch,
  ReceiptText,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { ProductLogo } from "@/components/ui/ProductLogo";
import { ProductCTA } from "@/components/xpertfactor/EnterpriseSections";
import { rawMessage } from "@/i18n/raw";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const dashboardMetrics = [
  { id: "balance", value: "45 820 TND", icon: Landmark },
  { id: "collected", value: "+ 32 500 TND", icon: CircleDollarSign },
  { id: "expenses", value: "− 18 300 TND", icon: WalletCards }
] as const;

const navIds = ["overview", "invoicing", "einvoice", "payments", "cash", "automation", "treasury"] as const;
const overviewIds = ["invoicing", "payments", "cash", "treasury"] as const;
const automationIds = ["matching", "reminders", "expense", "recurring", "advance", "digest"] as const;

const capabilityIcons: Record<string, LucideIcon> = {
  clients: UsersRound,
  quotes: FileCheck2,
  catalog: PackageSearch,
  documents: FolderClosed,
  reports: Gauge,
  search: Search,
  notifications: BellRing,
  suppliers: Building2
};

type OverviewItem = {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
};

type AutomationItem = {
  label: string;
  title: string;
  description: string;
  trigger: string;
  steps: string[];
  result: string;
};

type CapabilityItem = { id: string; title: string; description: string };

function moveTabFocus<T extends string>(event: KeyboardEvent<HTMLButtonElement>, ids: readonly T[], active: T, select: (id: T) => void, prefix: string) {
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = ids.indexOf(active);
  const rtl = document.documentElement.dir === "rtl";
  const forward = event.key === "ArrowRight" ? !rtl : event.key === "ArrowLeft" ? rtl : false;
  const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? ids.length - 1 : forward ? (current + 1) % ids.length : (current - 1 + ids.length) % ids.length;
  const next = ids[nextIndex];
  select(next);
  requestAnimationFrame(() => document.getElementById(`${prefix}-${next}`)?.focus());
}

function SectionHeading({ eyebrow, title, description, center = false }: { eyebrow: string; title: string; description?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className="text-xs font-black uppercase tracking-[0.17em] text-shamash-indigo">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.75rem)] font-black leading-[1.03] tracking-[-0.035em] text-shamash-navy text-balance">{title}</h2>
      {description ? <p className={cn("mt-5 max-w-[65ch] text-base font-medium leading-7 text-slate-600 md:text-lg", center && "mx-auto")}>{description}</p> : null}
    </div>
  );
}

function FlowArrow() {
  return <ChevronRight aria-hidden="true" className="hidden size-5 shrink-0 text-shamash-blue md:block rtl:rotate-180" />;
}

function FactorixHero({ t }: { t: ReturnType<typeof useTranslations<"factorix">> }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#f5fbff_52%,#f7f7fc_100%)]">
      <div aria-hidden="true" className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-shamash-blue/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-shamash-indigo/10 blur-3xl" />
      <div className="container-shell relative grid min-h-[calc(100svh-var(--header-height))] items-center gap-10 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-10">
        <div className="max-w-[42rem]">
          <ProductLogo id="factorix" priority className="h-12 max-w-56" />
          <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-shamash-indigo">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 max-w-[16ch] text-[clamp(2.3rem,4vw,4rem)] font-black leading-[0.98] tracking-[-0.045em] text-shamash-navy">
            {t("hero.title")} <span className="text-[#0865d8]">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-4 max-w-[61ch] text-[clamp(0.98rem,1.15vw,1.15rem)] font-medium leading-7 text-slate-600">{t("hero.description")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">{t("hero.primaryCta")}</Button>
            <Button href="#overview" variant="secondary" showIcon={false}>{t("hero.secondaryCta")} <ArrowDown aria-hidden="true" className="size-4" /></Button>
          </div>
          <p className="mt-4 text-sm font-bold text-slate-500">{t("hero.reassurance")}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[61rem] lg:mx-0">
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-shamash-blue/15 via-white to-shamash-indigo/15 blur-2xl" />
          <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-2.5 shadow-[0_34px_90px_rgba(36,40,80,0.16)] sm:p-3.5">
            <div className="overflow-hidden rounded-[1rem] border border-slate-200 bg-[#f7f9fc]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-shamash-blue/12 text-shamash-indigo"><ReceiptText className="size-5" /></span><div><p className="text-sm font-black text-shamash-navy">{t("dashboard.title")}</p><p className="text-xs font-semibold text-slate-500">{t("dashboard.period")}</p></div></div>
                <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />{t("dashboard.live")}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 sm:gap-3 sm:p-4">
                {dashboardMetrics.map(({ id, value, icon: Icon }) => <article key={id} className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-4"><div className="flex items-start justify-between gap-1"><p className="text-[0.6rem] font-bold leading-4 text-slate-500 sm:text-xs">{t(`dashboard.metrics.${id}`)}</p><Icon className="hidden size-4 shrink-0 text-shamash-blue sm:block" /></div><p dir="ltr" className="mt-2 text-[0.72rem] font-black leading-4 text-shamash-navy sm:mt-3 sm:text-[clamp(1rem,1.5vw,1.35rem)]">{value}</p></article>)}
              </div>
              <div className="grid gap-3 px-3 pb-3 sm:px-4 sm:pb-4 md:grid-cols-[1.35fr_0.65fr]">
                <article className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex items-center justify-between"><div><p className="text-sm font-black text-shamash-navy">{t("dashboard.cashflow")}</p><p className="mt-1 text-xs font-semibold text-slate-500">{t("dashboard.cashflowHint")}</p></div><span className="text-xs font-black text-emerald-600">+14,8%</span></div>
                  <div className="mt-4 flex h-24 items-end gap-1.5 sm:mt-6 sm:h-40 sm:gap-2">{[38, 52, 45, 68, 58, 74, 63, 82, 76, 91].map((height, index) => <span key={index} className="relative h-full flex-1 rounded-t bg-slate-100"><span className="absolute inset-x-0 bottom-0 rounded-t bg-gradient-to-t from-shamash-indigo to-shamash-blue" style={{ height: `${height}%` }} /></span>)}</div>
                </article>
                <article className="hidden rounded-xl bg-shamash-navy p-4 text-white sm:p-5 md:block">
                  <div className="flex items-center justify-between"><p className="text-sm font-black">{t("dashboard.actions")}</p><BellRing className="size-4 text-shamash-gold" /></div>
                  <div className="mt-4 space-y-2.5">{(["matched", "validated", "reminder"] as const).map((id) => <div key={id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] p-3"><CheckCircle2 className="size-4 shrink-0 text-shamash-blue" /><span className="text-xs font-bold text-white/85">{t(`dashboard.events.${id}`)}</span></div>)}</div>
                </article>
              </div>
            </div>
          </div>
          <div className="animate-float-panel absolute -right-2 top-[18%] hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-panel xl:flex xl:items-center xl:gap-3"><span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="size-4" /></span><span className="text-xs font-black text-shamash-navy">{t("dashboard.floatStatus")}</span></div>
        </div>
      </div>
    </section>
  );
}

export function FactorixPage() {
  const t = useTranslations("factorix");
  const [activeOverview, setActiveOverview] = useState<(typeof overviewIds)[number]>("invoicing");
  const [activeAutomation, setActiveAutomation] = useState<(typeof automationIds)[number]>("matching");
  const painPoints = rawMessage<string[]>(t, "problem.items");
  const flow = rawMessage<{ title: string; description: string }[]>(t, "flow.steps");
  const overview = rawMessage<Record<(typeof overviewIds)[number], OverviewItem>>(t, "overview.tabs");
  const invoiceFeatures = rawMessage<string[]>(t, "invoicing.features");
  const einvoiceFlow = rawMessage<string[]>(t, "einvoice.steps");
  const approvalFlow = rawMessage<string[]>(t, "cash.approvalSteps");
  const automations = rawMessage<Record<(typeof automationIds)[number], AutomationItem>>(t, "automation.items");
  const capabilities = rawMessage<CapabilityItem[]>(t, "operations.items");
  const trustItems = rawMessage<{ title: string; description: string }[]>(t, "trust.items");
  const auditItems = rawMessage<string[]>(t, "trust.audit");
  const tunisiaChips = rawMessage<string[]>(t, "tunisia.chips");
  const activeOverviewItem = overview[activeOverview];
  const activeAutomationItem = automations[activeAutomation];

  return (
    <div className="factorix-page bg-white text-neutral-text">
      <FactorixHero t={t} />

      <nav aria-label={t("subnav.label")} className="sticky top-[var(--header-height)] z-30 hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl lg:block">
        <div className="container-shell flex items-center justify-between gap-4 py-3">
          <span className="text-sm font-black text-shamash-navy">Factorix</span>
          <div className="flex items-center gap-1">{navIds.map((id) => <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-shamash-blue/10 hover:text-shamash-navy">{t(`subnav.items.${id}`)}</a>)}</div>
          <Link href="/contact" className="rounded-full bg-[#0865d8] px-4 py-2 text-xs font-black text-white">{t("subnav.demo")}</Link>
        </div>
      </nav>

      <MotionSection id="overview" className="section-standard overflow-hidden bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow={t("problem.eyebrow")} title={t("problem.title")} description={t("problem.description")} center />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {painPoints.map((item, index) => <MotionItem key={item} className={cn("flex min-h-24 items-center gap-3 rounded-xl border p-4", index < 5 ? "border-rose-100 bg-rose-50/55" : "border-amber-100 bg-amber-50/55")}><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-xs font-black text-slate-500 shadow-sm">{String(index + 1).padStart(2, "0")}</span><p className="text-sm font-bold leading-5 text-slate-700">{item}</p></MotionItem>)}
          </div>
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-shamash-navy px-6 py-8 text-white shadow-premium md:px-10">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(53,168,222,.32),transparent_28%)]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-shamash-blue">{t("problem.bridgeEyebrow")}</p><p className="mt-2 max-w-4xl text-[clamp(1.4rem,2.5vw,2.35rem)] font-black leading-tight">{t("problem.bridge")}</p></div><Workflow className="size-12 shrink-0 text-shamash-gold" /></div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell">
          <SectionHeading eyebrow={t("flow.eyebrow")} title={t("flow.title")} description={t("flow.description")} />
          <div className="mt-10 grid gap-3 md:grid-cols-[repeat(6,minmax(0,1fr))]">
            {flow.map((step, index) => <MotionItem key={step.title} className="relative flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:block md:min-h-48"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-shamash-blue/12 text-sm font-black text-shamash-indigo">{String(index + 1).padStart(2, "0")}</span><div><h3 className="mt-0 text-base font-black text-shamash-navy md:mt-6">{step.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{step.description}</p></div>{index < flow.length - 1 ? <span aria-hidden="true" className="absolute -right-2.5 top-8 z-10 hidden size-5 place-items-center rounded-full bg-shamash-blue text-white md:grid rtl:-left-2.5 rtl:right-auto"><ChevronRight className="size-3 rtl:rotate-180" /></span> : null}</MotionItem>)}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+5.5rem)]">
            <SectionHeading eyebrow={t("overview.eyebrow")} title={t("overview.title")} description={t("overview.description")} />
            <div role="tablist" aria-label={t("overview.tabLabel")} className="mt-8 flex flex-wrap gap-2 lg:grid lg:grid-cols-2">
              {overviewIds.map((id) => <button key={id} id={`factorix-overview-tab-${id}`} type="button" role="tab" aria-selected={activeOverview === id} aria-controls="factorix-overview-panel" tabIndex={activeOverview === id ? 0 : -1} onClick={() => setActiveOverview(id)} onKeyDown={(event) => moveTabFocus(event, overviewIds, activeOverview, setActiveOverview, "factorix-overview-tab")} className={cn("rounded-full border px-4 py-2.5 text-sm font-black transition", activeOverview === id ? "border-shamash-blue bg-shamash-blue text-white shadow-[0_12px_28px_rgba(53,168,222,.22)]" : "border-slate-200 bg-white text-slate-600 hover:border-shamash-blue/50")}>{overview[id].label}</button>)}
            </div>
          </div>
          <div id="factorix-overview-panel" role="tabpanel" aria-labelledby={`factorix-overview-tab-${activeOverview}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f6f8fc] p-3 shadow-premium sm:p-5">
            <div key={activeOverview} className="animate-rise-in overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-shamash-indigo">{activeOverviewItem.label}</p><h3 className="mt-1 text-xl font-black text-shamash-navy">{activeOverviewItem.title}</h3></div><span className="grid size-10 place-items-center rounded-xl bg-shamash-blue/10 text-shamash-indigo"><Gauge className="size-5" /></span></div>
              <div className="grid gap-5 p-5 md:grid-cols-[0.9fr_1.1fr]">
                <div><p className="text-sm font-semibold leading-6 text-slate-600">{activeOverviewItem.description}</p><ul className="mt-5 space-y-3">{activeOverviewItem.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm font-bold text-slate-700"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-shamash-blue" />{bullet}</li>)}</ul></div>
                <div className="grid gap-3 sm:grid-cols-2">{activeOverviewItem.metrics.map((metric, index) => <div key={metric.label} className={cn("rounded-xl border p-4", index === 0 ? "border-shamash-indigo/20 bg-shamash-navy text-white sm:col-span-2" : "border-slate-200 bg-neutral-page")}><p className={cn("text-xs font-bold", index === 0 ? "text-white/65" : "text-slate-500")}>{metric.label}</p><p dir="ltr" className={cn("mt-2 text-2xl font-black", index === 0 ? "text-white" : "text-shamash-navy")}>{metric.value}</p>{index === 0 ? <div className="mt-5 flex h-16 items-end gap-1.5">{[38, 52, 44, 67, 63, 78, 72, 90].map((height, itemIndex) => <span key={itemIndex} className="flex-1 rounded-t bg-gradient-to-t from-shamash-indigo to-shamash-blue" style={{ height: `${height}%` }} />)}</div> : null}</div>)}</div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="invoicing" className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t("invoicing.eyebrow")} title={t("invoicing.title")} description={t("invoicing.description")} />
            <div className="mt-7 flex flex-wrap gap-2">{invoiceFeatures.map((feature) => <span key={feature} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">{feature}</span>)}</div>
            <div className="mt-8 rounded-xl border border-shamash-blue/20 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("invoicing.recurringEyebrow")}</p><h3 className="mt-2 text-lg font-black text-shamash-navy">{t("invoicing.recurringTitle")}</h3></div><RefreshCw className="size-5 text-shamash-blue" /></div><p className="mt-3 text-sm font-semibold text-slate-600">{t("invoicing.recurringExample")}</p><div className="mt-4 grid grid-cols-4 gap-2">{rawMessage<string[]>(t, "invoicing.months").map((month, index) => <span key={month} className={cn("rounded-lg px-2 py-2 text-center text-xs font-black", index < 3 ? "bg-emerald-50 text-emerald-700" : "bg-shamash-blue/10 text-shamash-indigo")}>{month}</span>)}</div></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-premium sm:p-5">
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"><div><p className="text-xs font-black text-slate-500">FAC-2026-0184</p><p className="mt-1 text-2xl font-black text-shamash-navy">{t("invoicing.preview.invoice")}</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">{t("invoicing.preview.status")}</span></div>
              <div className="grid gap-6 p-5 sm:grid-cols-2"><div><p className="text-xs font-bold uppercase text-slate-400">{t("invoicing.preview.customer")}</p><p className="mt-2 text-sm font-black text-shamash-navy">Société ABC</p><p className="mt-1 text-xs font-semibold text-slate-500">MF 1234567/A/M/000</p></div><div className="sm:text-end"><p className="text-xs font-bold uppercase text-slate-400">{t("invoicing.preview.due")}</p><p className="mt-2 text-sm font-black text-shamash-navy">30/08/2026</p></div></div>
              <div className="mx-5 overflow-hidden rounded-lg border border-slate-200"><div className="grid grid-cols-[1fr_auto] bg-slate-50 px-4 py-3 text-xs font-black text-slate-500"><span>{t("invoicing.preview.service")}</span><span>{t("invoicing.preview.amount")}</span></div>{rawMessage<{ name: string; value: string }[]>(t, "invoicing.preview.lines").map((line) => <div key={line.name} className="grid grid-cols-[1fr_auto] border-t border-slate-100 px-4 py-3 text-sm font-bold text-slate-700"><span>{line.name}</span><span className="text-shamash-navy">{line.value}</span></div>)}</div>
              <div className="flex items-end justify-between gap-4 p-5"><div className="flex gap-2"><span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">PDF</span><span className="rounded-lg bg-shamash-blue/10 px-3 py-2 text-xs font-black text-shamash-indigo">{t("invoicing.preview.send")}</span></div><div className="text-end"><p className="text-xs font-bold text-slate-500">{t("invoicing.preview.total")}</p><p className="mt-1 text-2xl font-black text-shamash-navy">4 760 TND</p></div></div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="einvoice" className="section-standard overflow-hidden bg-shamash-navy text-white [&_h2]:text-white [&_.text-slate-600]:text-white/68">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeading eyebrow={t("einvoice.eyebrow")} title={t("einvoice.title")} description={t("einvoice.description")} />
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-7">
              <div className="grid gap-3 md:grid-cols-[repeat(6,minmax(0,1fr))]">{einvoiceFlow.map((step, index) => <div key={step} className="flex items-center md:block"><div className="rounded-xl border border-white/12 bg-white/[0.07] p-4 md:min-h-32"><span className="text-xs font-black text-shamash-blue">0{index + 1}</span><p className="mt-3 text-sm font-black leading-5 text-white">{step}</p></div>{index < einvoiceFlow.length - 1 ? <FlowArrow /> : null}</div>)}</div>
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-white p-4 text-shamash-navy"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-shamash-indigo" /><p className="text-sm font-bold leading-6">{t("einvoice.disclaimer")}</p></div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="payments" className="section-standard bg-white">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div><SectionHeading eyebrow={t("reconciliation.eyebrow")} title={t("reconciliation.title")} description={t("reconciliation.description")} /><ul className="mt-7 grid gap-3 sm:grid-cols-2">{rawMessage<string[]>(t, "reconciliation.features").map((feature) => <li key={feature} className="flex gap-3 text-sm font-bold text-slate-700"><CheckCircle2 className="size-4 shrink-0 text-shamash-blue" />{feature}</li>)}</ul></div>
            <div className="rounded-2xl border border-slate-200 bg-neutral-page p-3 shadow-premium sm:p-5">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{t("reconciliation.transaction")}</p><p dir="ltr" className="mt-2 text-2xl font-black text-emerald-600">+ 3 570 TND</p><p dir="ltr" className="mt-1 text-sm font-bold text-slate-600">VIR SOCIETE ABC / 18082026</p></div><Landmark className="size-8 text-shamash-indigo" /></div>
                <div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-slate-200" /><span className="flex items-center gap-2 text-xs font-black text-shamash-indigo"><Sparkles className="size-4 text-shamash-gold" />{t("reconciliation.analysis")}</span><span className="h-px flex-1 bg-slate-200" /></div>
                <div className="rounded-xl border-2 border-shamash-blue/35 bg-shamash-blue/[0.05] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700">98% {t("reconciliation.confidence")}</span><h3 className="mt-3 text-lg font-black text-shamash-navy">FAC-2026-00142</h3><p dir="ltr" className="mt-1 text-sm font-bold text-slate-600">Société ABC • 3 570 TND</p></div><button type="button" className="rounded-full bg-[#0865d8] px-4 py-2.5 text-sm font-black text-white">{t("reconciliation.action")}</button></div></div>
                <div className="mt-4 grid gap-2 sm:grid-cols-4">{rawMessage<string[]>(t, "reconciliation.result").map((item) => <div key={item} className="rounded-lg bg-slate-50 p-3 text-center text-xs font-bold text-slate-600">{item}</div>)}</div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-shamash-blue/10 text-shamash-indigo"><CircleDollarSign className="size-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("payments.eyebrow")}</p><h3 className="mt-1 text-xl font-black text-shamash-navy">{t("payments.title")}</h3></div></div><p className="mt-4 text-sm font-semibold leading-6 text-slate-600">{t("payments.description")}</p><div className="mt-5 flex flex-wrap gap-2">{rawMessage<string[]>(t, "payments.methods").map((method) => <span key={method} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">{method}</span>)}</div></article>
            <article className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#f4f8ff] p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("currency.eyebrow")}</p><h3 className="mt-1 text-xl font-black text-shamash-navy">{t("currency.title")}</h3></div><RefreshCw className="size-5 text-shamash-blue" /></div><div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-bold text-slate-500">{t("currency.invoice")}</p><p dir="ltr" className="mt-2 text-xl font-black text-shamash-navy">4 000 EUR</p></div><ArrowRight className="size-5 text-shamash-blue rtl:rotate-180" /><div className="rounded-xl bg-shamash-navy p-4 text-white"><p className="text-xs font-bold text-white/60">{t("currency.received")}</p><p dir="ltr" className="mt-2 text-xl font-black">13 620 TND</p></div></div><p className="mt-4 text-xs font-bold text-slate-500">{t("currency.note")}</p></article>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="cash" className="section-standard bg-neutral-page">
        <div className="container-shell">
          <SectionHeading eyebrow={t("cash.eyebrow")} title={t("cash.title")} description={t("cash.description")} />
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="overflow-hidden rounded-2xl bg-shamash-navy text-white shadow-premium"><div className="border-b border-white/10 p-6"><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-blue">{t("cash.balance")}</p><p dir="ltr" className="mt-3 text-4xl font-black">2 840,500 <span className="text-lg text-white/55">TND</span></p><p className="mt-2 text-sm font-bold text-white/60">{t("cash.updated")}</p></div><div className="p-6"><p className="text-sm font-black">{t("cash.today")}</p><div className="mt-4 space-y-2">{rawMessage<{ label: string; value: string; positive?: boolean }[]>(t, "cash.transactions").map((item) => <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/[0.07] px-4 py-3"><span className="text-sm font-bold text-white/75">{item.label}</span><span dir="ltr" className={cn("text-sm font-black", item.positive ? "text-emerald-300" : "text-white")}>{item.value}</span></div>)}</div></div></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-shamash-blue/10 text-shamash-indigo"><Workflow className="size-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("cash.workflowEyebrow")}</p><h3 className="mt-1 text-xl font-black text-shamash-navy">{t("cash.workflowTitle")}</h3></div></div><div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{approvalFlow.map((step, index) => <div key={step} className="relative rounded-xl border border-slate-200 bg-neutral-page p-4"><span className="text-xs font-black text-shamash-blue">0{index + 1}</span><p className="mt-2 text-sm font-black leading-5 text-shamash-navy">{step}</p></div>)}</div><div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800"><BadgeCheck className="size-5 shrink-0" /><p className="text-sm font-black">{t("cash.workflowResult")}</p></div></article>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2"><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("expenses.eyebrow")}</p><h3 className="mt-2 text-2xl font-black text-shamash-navy">{t("expenses.title")}</h3><p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600">{t("expenses.description")}</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{rawMessage<{ label: string; value: string }[]>(t, "expenses.cards").map((item) => <div key={item.label} className="rounded-xl bg-neutral-page p-4"><p className="text-xs font-bold text-slate-500">{item.label}</p><p className="mt-2 text-base font-black text-shamash-navy">{item.value}</p></div>)}</div></article>
            <article className="rounded-2xl border border-shamash-indigo/20 bg-gradient-to-br from-shamash-indigo to-shamash-navy p-6 text-white"><ReceiptText className="size-7 text-shamash-gold" /><p className="mt-5 text-xs font-black uppercase tracking-[0.12em] text-shamash-blue">{t("expenses.receiptEyebrow")}</p><h3 className="mt-2 text-xl font-black">{t("expenses.receiptTitle")}</h3><p className="mt-3 text-sm font-semibold leading-6 text-white/70">{t("expenses.receiptDescription")}</p></article>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="treasury" className="section-standard bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div><SectionHeading eyebrow={t("treasury.eyebrow")} title={t("treasury.title")} description={t("treasury.description")} /><div className="mt-7 rounded-xl border border-slate-200 bg-neutral-page p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("treasury.digestEyebrow")}</p><p className="mt-2 text-lg font-black text-shamash-navy">{t("treasury.digestTitle")}</p><p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{t("treasury.digestDescription")}</p></div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-premium sm:p-5"><div className="rounded-xl bg-shamash-navy p-5 text-white"><div className="flex items-center justify-between"><div><p className="text-xs font-black text-shamash-blue">{t("treasury.dashboardEyebrow")}</p><h3 className="mt-1 text-xl font-black">{t("treasury.dashboardTitle")}</h3></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black">30 {t("treasury.days")}</span></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{rawMessage<{ label: string; value: string; tone: string }[]>(t, "treasury.stats").map((item) => <div key={item.label} className="rounded-xl bg-white/[0.07] p-4"><p className="text-xs font-bold text-white/60">{item.label}</p><p dir="ltr" className={cn("mt-2 text-xl font-black", item.tone === "positive" && "text-emerald-300", item.tone === "negative" && "text-rose-300")}>{item.value}</p></div>)}</div><div className="mt-5 rounded-xl bg-white p-5"><div className="flex items-center justify-between"><p className="text-sm font-black text-shamash-navy">{t("treasury.chart")}</p><p dir="ltr" className="text-xs font-black text-emerald-600">+ 21 340 TND</p></div><div className="mt-6 flex h-40 items-end gap-2">{[28, 42, 38, 54, 48, 65, 60, 72, 69, 86, 81, 94].map((height, index) => <span key={index} className="flex-1 rounded-t bg-gradient-to-t from-shamash-indigo to-shamash-blue" style={{ height: `${height}%` }} />)}</div></div></div></div>
        </div>
      </MotionSection>

      <MotionSection id="automation" className="section-standard overflow-hidden bg-[linear-gradient(150deg,#f7faff_0%,#eef6fb_50%,#f6f4fb_100%)]">
        <div className="container-shell">
          <SectionHeading eyebrow={t("automation.eyebrow")} title={t("automation.title")} description={t("automation.description")} center />
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div role="tablist" aria-label={t("automation.tabLabel")} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{automationIds.map((id, index) => <button key={id} id={`factorix-automation-tab-${id}`} type="button" role="tab" aria-selected={activeAutomation === id} aria-controls="factorix-automation-panel" tabIndex={activeAutomation === id ? 0 : -1} onClick={() => setActiveAutomation(id)} onKeyDown={(event) => moveTabFocus(event, automationIds, activeAutomation, setActiveAutomation, "factorix-automation-tab")} className={cn("group flex min-h-16 items-center gap-4 rounded-xl border px-4 py-3 text-start transition", activeAutomation === id ? "border-shamash-blue bg-white shadow-panel" : "border-transparent bg-white/55 hover:border-slate-200 hover:bg-white")}><span className={cn("grid size-9 shrink-0 place-items-center rounded-lg text-xs font-black", activeAutomation === id ? "bg-shamash-blue text-white" : "bg-slate-100 text-slate-500")}>0{index + 1}</span><span className="text-sm font-black text-shamash-navy">{automations[id].label}</span><ChevronRight className="ms-auto size-4 text-slate-400 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" /></button>)}</div>
            <div id="factorix-automation-panel" role="tabpanel" aria-labelledby={`factorix-automation-tab-${activeAutomation}`} className="rounded-2xl bg-shamash-navy p-5 text-white shadow-premium sm:p-7"><div key={activeAutomation} className="animate-rise-in"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-shamash-blue"><Sparkles className="size-3.5 text-shamash-gold" />{activeAutomationItem.trigger}</span><h3 className="mt-4 text-[clamp(1.5rem,2.5vw,2.35rem)] font-black leading-tight">{activeAutomationItem.title}</h3><p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/68">{activeAutomationItem.description}</p></div><Workflow className="size-9 text-shamash-gold" /></div><div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{activeAutomationItem.steps.map((step, index) => <div key={step} className="rounded-xl border border-white/10 bg-white/[0.07] p-4"><span className="text-xs font-black text-shamash-blue">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 text-sm font-black leading-5">{step}</p></div>)}</div><div className="mt-5 flex items-center gap-3 rounded-xl bg-white p-4 text-shamash-navy"><CheckCircle2 className="size-5 shrink-0 text-emerald-600" /><p className="text-sm font-black">{activeAutomationItem.result}</p></div></div></div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow={t("operations.eyebrow")} title={t("operations.title")} description={t("operations.description")} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map((item) => { const Icon = capabilityIcons[item.id] ?? BriefcaseBusiness; return <MotionItem as="article" key={item.id} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-shamash-blue/40 hover:shadow-panel"><span className="grid size-11 place-items-center rounded-xl bg-shamash-blue/10 text-shamash-indigo transition group-hover:bg-shamash-blue group-hover:text-white"><Icon className="size-5" /></span><h3 className="mt-5 text-lg font-black text-shamash-navy">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p></MotionItem>; })}</div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-shamash-blue/10 text-shamash-indigo"><ShieldCheck className="size-6" /></span><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("trust.eyebrow")}</p><h2 className="mt-1 text-2xl font-black text-shamash-navy">{t("trust.title")}</h2></div></div><div className="mt-7 grid gap-4 sm:grid-cols-3">{trustItems.map((item, index) => { const Icon = [LockKeyhole, Fingerprint, BookOpenCheck][index]; return <div key={item.title} className="rounded-xl bg-neutral-page p-4"><Icon className="size-5 text-shamash-blue" /><h3 className="mt-3 text-sm font-black text-shamash-navy">{item.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{item.description}</p></div>; })}</div></div>
          <div className="rounded-2xl bg-shamash-navy p-6 text-white sm:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-blue">{t("trust.auditEyebrow")}</p><h3 className="mt-1 text-xl font-black">FAC-2026-0184</h3></div><Clock3 className="size-5 text-shamash-gold" /></div><div className="mt-6 space-y-0">{auditItems.map((item, index) => <div key={item} className="relative flex gap-3 pb-4 last:pb-0"><span className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-shamash-blue" />{index < auditItems.length - 1 ? <span className="absolute left-[4px] top-4 h-full w-px bg-white/15 rtl:left-auto rtl:right-[4px]" /> : null}<p className="text-sm font-bold text-white/72">{item}</p></div>)}</div></div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f3faff_60%,#f4f2fb_100%)] p-6 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><SectionHeading eyebrow={t("tunisia.eyebrow")} title={t("tunisia.title")} description={t("tunisia.description")} /><div className="flex flex-wrap gap-3">{tunisiaChips.map((chip, index) => <span key={chip} className={cn("rounded-full border px-4 py-2.5 text-sm font-black", index === 0 ? "border-shamash-gold/40 bg-shamash-gold/10 text-shamash-navy" : "border-shamash-blue/25 bg-white text-shamash-indigo")}>{chip}</span>)}</div></div>
        </div>
      </MotionSection>

      <ProductCTA
        productName="FACTORIX"
        content={{
          eyebrow: t("cta.eyebrow"),
          title: t("cta.title"),
          description: t("cta.description"),
          primary: t("cta.primary"),
          secondary: t("cta.secondary")
        }}
        scope={capabilities.slice(0, 4).map((item) => ({ label: item.title, detail: item.description }))}
      />
    </div>
  );
}
