"use client";

import {
  ArrowUpRight,
  ArrowDown,
  BellRing,
  BookOpenCheck,
  BrainCircuit,
  Building2,
  CalendarClock,
  ChartSpline,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CircleDollarSign,
  Fingerprint,
  LockKeyhole,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { ProductCTA } from "@/components/xpertfactor/EnterpriseSections";
import { rawMessage } from "@/i18n/raw";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const navIds = ["journey", "overview", "workflow", "timeline", "paymentPlan", "disputes", "buyer360", "reporting"] as const;

function SectionHeading({ eyebrow, title, description, center = false }: { eyebrow: string; title: string; description?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className="text-xs font-black uppercase tracking-[0.17em] text-shamash-indigo">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.75rem)] font-black leading-[1.03] tracking-[-0.035em] text-shamash-navy text-balance">{title}</h2>
      {description ? <p className={cn("mt-5 max-w-[65ch] text-base font-medium leading-7 text-slate-600 md:text-lg", center && "mx-auto")}>{description}</p> : null}
    </div>
  );
}

function CollectionDashboard({ t }: { t: ReturnType<typeof useTranslations<"recouvrementCreances">> }) {
  const metrics = [
    { label: t("dashboard.metrics.total"), value: "1,84 M TND", trend: "+8,4%", icon: WalletCards },
    { label: t("dashboard.metrics.overdue"), value: "428 k TND", trend: "−12,6%", icon: CalendarClock },
    { label: t("dashboard.metrics.rate"), value: "86,4%", trend: "+5,1%", icon: TrendingUp }
  ];
  const aging = [
    { label: "0–30", value: "58%", width: "58%", tone: "bg-shamash-blue" },
    { label: "31–60", value: "24%", width: "24%", tone: "bg-shamash-indigo" },
    { label: "61–90", value: "12%", width: "12%", tone: "bg-shamash-gold" },
    { label: "+90", value: "6%", width: "6%", tone: "bg-rose-400" }
  ];
  const events = [t("dashboard.events.email"), t("dashboard.events.response"), t("dashboard.events.payment")];

  return (
    <div className="relative mx-auto w-full max-w-[46rem] lg:mx-0" aria-label={t("dashboard.title")}>
      <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-gradient-to-br from-shamash-blue/20 via-white to-shamash-indigo/20 blur-2xl" />
      <div className="overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_32px_90px_rgba(36,40,80,0.16)]">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-shamash-navy">{t("dashboard.title")}</p>
            <p className="mt-0.5 text-[0.65rem] font-bold text-slate-400 sm:text-xs">{t("dashboard.period")}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[0.65rem] font-black text-emerald-700">
            <i aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
            {t("dashboard.live")}
          </span>
        </div>

        <div className="bg-[#f7f9fc] p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <article key={metric.label} className={cn("rounded-xl border p-3 sm:p-4", index === 0 ? "border-shamash-indigo/15 bg-shamash-navy text-white" : "border-slate-200 bg-white")}>
                  <div className="flex items-center justify-between gap-2">
                    <Icon aria-hidden="true" className={cn("size-4", index === 0 ? "text-shamash-blue" : "text-shamash-indigo")} />
                    <span className={cn("hidden text-[0.62rem] font-black sm:inline", index === 1 ? "text-emerald-600" : index === 0 ? "text-white/60" : "text-shamash-indigo")}>{metric.trend}</span>
                  </div>
                  <p className={cn("mt-3 truncate text-[0.6rem] font-bold sm:text-xs", index === 0 ? "text-white/55" : "text-slate-400")}>{metric.label}</p>
                  <p dir="ltr" className={cn("mt-1 whitespace-nowrap text-sm font-black sm:text-xl", index === 0 ? "text-white" : "text-shamash-navy")}>{metric.value}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black text-shamash-navy">{t("dashboard.aging")}</p>
                <span className="rounded-full bg-shamash-blue/10 px-2 py-1 text-[0.6rem] font-black text-shamash-indigo">TND</span>
              </div>
              <div className="mt-4 space-y-3">
                {aging.map((item) => (
                  <div key={item.label} className="grid grid-cols-[2.6rem_1fr_2.2rem] items-center gap-2 text-[0.64rem] font-bold text-slate-500">
                    <span>{item.label}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-slate-100"><i className={cn("block h-full rounded-full", item.tone)} style={{ width: item.width }} /></span>
                    <span className="text-end font-black text-shamash-navy">{item.value}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black text-shamash-navy">{t("dashboard.actions")}</p>
                <span className="grid size-6 place-items-center rounded-lg bg-shamash-blue/10 text-shamash-indigo"><ArrowUpRight aria-hidden="true" className="size-3.5" /></span>
              </div>
              <div className="mt-3 space-y-2">
                {events.map((event, index) => (
                  <div key={event} className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-2.5 py-2">
                    <span className={cn("grid size-6 shrink-0 place-items-center rounded-md", index === 2 ? "bg-emerald-100 text-emerald-700" : "bg-shamash-blue/10 text-shamash-indigo")}>
                      {index === 2 ? <CircleDollarSign aria-hidden="true" className="size-3.5" /> : index === 1 ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : <BellRing aria-hidden="true" className="size-3.5" />}
                    </span>
                    <p className="line-clamp-1 text-[0.62rem] font-bold text-slate-600 sm:text-[0.68rem]">{event}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-4 py-3 text-[0.66rem] font-black text-shamash-navy sm:px-5 sm:text-xs">
          <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-emerald-500" />
          {t("dashboard.floatStatus")}
        </div>
      </div>
    </div>
  );
}

function RecouvrementHero({ t }: { t: ReturnType<typeof useTranslations<"recouvrementCreances">> }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#f5fbff_52%,#f7f7fc_100%)]">
      <div aria-hidden="true" className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-shamash-blue/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-shamash-indigo/10 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.34] [background-image:linear-gradient(rgba(80,92,162,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(80,92,162,.05)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="container-shell relative grid items-center gap-10 py-[clamp(3rem,7vw,6rem)] lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[0.82fr_1.18fr] lg:py-10">
        <div className="max-w-[42rem]">
          <p className="inline-flex items-center gap-2 rounded-full border border-shamash-blue/20 bg-white/80 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-shamash-indigo shadow-sm backdrop-blur-sm"><span aria-hidden="true" className="size-1.5 rounded-full bg-shamash-gold" />{t("hero.eyebrow")}</p>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.3rem,4vw,4rem)] font-black leading-[0.98] tracking-[-0.045em] text-shamash-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-[61ch] text-[clamp(0.98rem,1.15vw,1.15rem)] font-medium leading-7 text-slate-600">{t("hero.description")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">{t("hero.primaryCta")}</Button>
            <Button href="#journey" variant="secondary" showIcon={false}>{t("hero.secondaryCta")} <ArrowDown aria-hidden="true" className="size-4" /></Button>
          </div>
          <p className="mt-5 border-s-2 border-shamash-blue ps-3 text-sm font-bold leading-6 text-slate-500">{t("hero.reassurance")}</p>
        </div>
        <CollectionDashboard t={t} />
      </div>
    </section>
  );
}

export function RecouvrementPage() {
  const t = useTranslations("recouvrementCreances");
  const journeySteps = rawMessage<{ title: string; description: string }[]>(t, "journey.steps");
  const overviewItems = rawMessage<Record<string, { title: string; description: string }>>(t, "overview.items");
  const overviewStatuses = rawMessage<string[]>(t, "overview.statuses");
  const overviewAging = rawMessage<string[]>(t, "overview.agingCategories");
  const intelligenceItems = rawMessage<{ title: string; description: string }[]>(t, "intelligence.items");
  const workflowScenarios = rawMessage<{ delay: string; action: string }[]>(t, "workflow.scenarios");
  const workflowFeatures = rawMessage<string[]>(t, "workflow.features");
  const timelineEvents = rawMessage<{ date: string; action: string }[]>(t, "timeline.events");
  const paymentNotifSteps = rawMessage<{ event: string; action: string }[]>(t, "paymentNotifications.steps");
  const disputeStatuses = rawMessage<string[]>(t, "disputes.statuses");
  const buyer360Identity = rawMessage<{ title: string; fields: string[] }>(t, "buyer360.identity");
  const buyer360Financial = rawMessage<{ title: string; fields: string[] }>(t, "buyer360.financial");
  const buyer360History = rawMessage<{ title: string; fields: string[] }>(t, "buyer360.history");
  const buyer360Risk = rawMessage<{ title: string; levels: string[] }>(t, "buyer360.risk");
  const riskIndicators = rawMessage<string[]>(t, "risk.indicators");
  const preLitWorkflow = rawMessage<{ step: string; description: string }[]>(t, "preLitigation.workflow");
  const preLitFeatures = rawMessage<string[]>(t, "preLitigation.features");
  const reportKpis = rawMessage<{ label: string; value: string }[]>(t, "reporting.kpis");
  const reportTypes = rawMessage<{ name: string; description: string }[]>(t, "reports.types");
  const reportFormats = rawMessage<string[]>(t, "reports.formats");
  const integrationCats = rawMessage<Record<string, { title: string; description: string }>>(t, "integrations.categories");
  const securityItems = rawMessage<{ title: string; description: string }[]>(t, "security.items");
  const customWorkflow = rawMessage<string[]>(t, "customWorkflow.example");
  const buyerPortalFeatures = rawMessage<string[]>(t, "buyerPortal.features");
  const beforeItems = rawMessage<string[]>(t, "beforeAfter.before.items");
  const afterItems = rawMessage<string[]>(t, "beforeAfter.after.items");
  const integrationKeys = Object.keys(integrationCats);

  return (
    <div className="recouvrement-page bg-white text-neutral-text">
      <RecouvrementHero t={t} />

      <nav aria-label={t("subnav.label")} className="sticky top-[var(--header-height)] z-30 hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl xl:block">
        <div className="container-shell flex items-center justify-between gap-3 py-2.5">
          <span className="text-sm font-black text-shamash-navy">Recouvrement</span>
          <div className="flex items-center gap-0.5">{navIds.map((id) => <a key={id} href={`#${id}`} className="rounded-full px-2.5 py-2 text-[0.68rem] font-black text-slate-600 transition hover:bg-shamash-blue/10 hover:text-shamash-navy min-[1440px]:px-3 min-[1440px]:text-xs">{t(`subnav.items.${id}`)}</a>)}</div>
          <Link href="/contact" className="rounded-full bg-[#0865d8] px-4 py-2 text-xs font-black text-white">{t("subnav.demo")}</Link>
        </div>
      </nav>

      <MotionSection id="journey" className="section-standard overflow-hidden bg-[linear-gradient(150deg,#f7faff_0%,#eef6fb_50%,#f6f4fb_100%)]">
        <div className="container-shell">
          <SectionHeading eyebrow={t("journey.eyebrow")} title={t("journey.title")} description={t("journey.description")} center />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
            {journeySteps.map((step, index) => <MotionItem key={step.title} className="relative flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:block sm:min-h-40"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-shamash-blue/12 text-sm font-black text-shamash-indigo">{String(index + 1).padStart(2, "0")}</span><div><h3 className="mt-0 text-base font-black text-shamash-navy sm:mt-4">{step.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{step.description}</p></div>{index < journeySteps.length - 1 ? <span aria-hidden="true" className="absolute -right-2.5 top-8 z-10 hidden size-5 place-items-center rounded-full bg-shamash-blue text-white 2xl:grid rtl:-left-2.5 rtl:right-auto"><ChevronRight className="size-3 rtl:rotate-180" /></span> : null}</MotionItem>)}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="overview" className="section-standard bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow={t("overview.eyebrow")} title={t("overview.title")} description={t("overview.description")} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(overviewItems).map(([key, item]) => <MotionItem key={key} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-shamash-blue/40 hover:shadow-panel"><h3 className="text-lg font-black text-shamash-navy">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</p></MotionItem>)}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-neutral-page p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("overview.eyebrow")}</p><p className="mt-3 text-sm font-bold text-slate-600">{t("overview.businessRule")}</p></div>
            <div className="rounded-xl border border-slate-200 bg-neutral-page p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">Aging</p><div className="mt-3 flex flex-wrap gap-2">{overviewAging.map((cat) => <span key={cat} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">{cat}</span>)}</div></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">{overviewStatuses.map((status) => <span key={status} className="rounded-full border border-shamash-blue/20 bg-shamash-blue/5 px-3 py-2 text-xs font-bold text-shamash-indigo">{status}</span>)}</div>
        </div>
      </MotionSection>

      <MotionSection id="intelligence" className="section-standard relative isolate overflow-hidden bg-[linear-gradient(145deg,#f7fbff_0%,#f2f4fb_58%,#ffffff_100%)]">
        <div aria-hidden="true" className="absolute -right-32 top-10 -z-10 size-80 rounded-full bg-shamash-blue/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-24 bottom-0 -z-10 size-72 rounded-full bg-shamash-indigo/10 blur-3xl" />
        <div className="container-shell">
          <SectionHeading eyebrow={t("intelligence.eyebrow")} title={t("intelligence.title")} center />
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {intelligenceItems.map((item, index) => {
              const icons = [BrainCircuit, MessageSquareText, Sparkles, Route, ChartSpline];
              const Icon = icons[index];
              const featured = index === 0;
              return (
                <MotionItem
                  key={item.title}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-6 transition duration-snappy ease-premium hover:-translate-y-1 hover:shadow-panel sm:p-7",
                    index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4",
                    featured ? "border-shamash-navy bg-shamash-navy text-white shadow-premium" : "border-slate-200 bg-white"
                  )}
                >
                  {featured ? <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-shamash-blue/20 blur-2xl" /> : null}
                  <div className="relative flex items-start justify-between gap-5">
                    <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl", featured ? "bg-white/10 text-shamash-blue" : "bg-shamash-blue/10 text-shamash-indigo")}>
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className={cn("text-xs font-black tracking-[0.12em]", featured ? "text-white/40" : "text-slate-300")}>0{index + 1}</span>
                  </div>
                  <h3 className={cn("relative mt-6 text-xl font-black leading-tight", featured ? "text-white" : "text-shamash-navy")}>{item.title}</h3>
                  <p className={cn("relative mt-3 text-sm font-semibold leading-6", featured ? "text-white/68" : "text-slate-600")}>{item.description}</p>
                  <div aria-hidden="true" className={cn("relative mt-6 h-1 w-12 rounded-full transition-all duration-snappy group-hover:w-20", featured ? "bg-shamash-gold" : "bg-shamash-blue")} />
                </MotionItem>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="workflow" className="section-standard overflow-hidden bg-shamash-navy text-white [&_h2]:text-white [&_.text-slate-600]:text-white/68">
        <div className="container-shell">
          <SectionHeading eyebrow={t("workflow.eyebrow")} title={t("workflow.title")} description={t("workflow.description")} />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-start">
            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="relative ml-4 border-l-2 border-white/15 pl-8 space-y-0 lg:ml-0 lg:border-l-0 lg:pl-0 lg:space-y-0"
            >
              {workflowScenarios.map((scenario, index) => (
                <motion.li
                  key={scenario.delay}
                  variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                  className="relative pb-10 last:pb-0"
                >
                  <span className="absolute -left-[41px] top-1 z-10 flex size-7 items-center justify-center rounded-full border-2 border-shamash-blue bg-shamash-navy text-[0.65rem] font-black text-shamash-blue lg:-left-[13px]">{String(index + 1).padStart(2, "0")}</span>
                  {index < workflowScenarios.length - 1 && <span className="absolute -left-[33px] top-8 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-shamash-blue/40 to-transparent lg:-left-[5px]" />}
                  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-shamash-blue/30 hover:bg-white/[0.1]">
                    <span className="inline-block rounded-full bg-shamash-blue/20 px-3 py-1 text-[0.65rem] font-black uppercase tracking-wider text-shamash-blue">{scenario.delay}</span>
                    <p className="mt-3 text-sm font-bold leading-6 text-white/85">{scenario.action}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-shamash-blue">{t("workflow.featuresLabel")}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">{workflowFeatures.map((feature) => <span key={feature} className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-xs font-bold text-white/75 transition-colors hover:bg-white/[0.12] hover:text-white">{feature}</span>)}</div>
            </motion.div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="timeline" className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t("timeline.eyebrow")} title={t("timeline.title")} description={t("timeline.description")} />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-premium sm:p-7">
            <div className="space-y-0">{timelineEvents.map((event, index) => <div key={event.date} className="relative flex gap-4 pb-6 last:pb-0"><span className="relative z-10 mt-1.5 size-3 shrink-0 rounded-full bg-shamash-blue" />{index < timelineEvents.length - 1 ? <span className="absolute left-[5px] top-4 h-full w-px bg-slate-200 rtl:left-auto rtl:right-[5px]" /> : null}<div className="flex-1"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-shamash-blue/10 px-2.5 py-1 text-xs font-black text-shamash-indigo">{event.date}</span><span className="text-sm font-bold text-shamash-navy">{event.action}</span></div></div></div>)}</div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="paymentPlan" className="section-standard bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t("paymentPlan.eyebrow")} title={t("paymentPlan.title")} description={t("paymentPlan.description")} />
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-neutral-page p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("paymentPlan.scenarioA.title")}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{t("paymentPlan.scenarioA.description")}</p>
                <div className="mt-4 rounded-lg border border-shamash-blue/20 bg-shamash-blue/5 p-3"><p dir="ltr" className="text-sm font-black text-shamash-navy">{t("paymentPlan.scenarioA.example")}</p></div>
              </article>
              <article className="rounded-xl border border-slate-200 bg-neutral-page p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("paymentPlan.scenarioB.title")}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{t("paymentPlan.scenarioB.description")}</p>
                <div className="mt-4 rounded-lg border border-shamash-blue/20 bg-shamash-blue/5 p-3"><p dir="ltr" className="text-sm font-black text-shamash-navy">{t("paymentPlan.scenarioB.example")}</p></div>
              </article>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">{rawMessage<string[]>(t, "paymentPlan.features").map((feature) => <span key={feature} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">{feature}</span>)}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#f6f8fc] p-3 shadow-premium sm:p-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("paymentNotifications.eyebrow")}</p><h3 className="mt-1 text-lg font-black text-shamash-navy">{t("paymentNotifications.title")}</h3></div><BellRing className="size-5 text-shamash-blue" /></div>
              <div className="mt-4 space-y-2">{paymentNotifSteps.map((step) => <div key={step.event} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-neutral-page px-4 py-3"><CheckCircle2 className="size-4 shrink-0 text-shamash-blue" /><div className="flex-1"><span className="text-xs font-black text-shamash-indigo">{step.event}</span><p className="text-sm font-bold text-slate-700">{step.action}</p></div></div>)}</div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="disputes" className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t("disputes.eyebrow")} title={t("disputes.title")} description={t("disputes.description")} />
            <div className="mt-6 flex flex-wrap gap-2">{disputeStatuses.map((status) => <span key={status} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">{status}</span>)}</div>
            <p className="mt-4 text-sm font-semibold text-slate-600">{t("disputes.note")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-premium sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("disputes.fields.reason")}</p><h3 className="mt-1 text-lg font-black text-shamash-navy">Facture FAC-2026-0218</h3></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">Ouvert</span></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(["buyer", "amount", "manager", "date"] as const).map((field) => <div key={field}><p className="text-xs font-bold text-slate-400">{t(`disputes.fields.${field}`)}</p><p className="mt-1 text-sm font-black text-shamash-navy">{field === "buyer" ? "Société XYZ" : field === "amount" ? "15 200 TND" : field === "manager" ? "Ahmed B." : "19/08/2026"}</p></div>)}
            </div>
            <div className="mt-5 rounded-xl border border-slate-200 bg-neutral-page p-4"><p className="text-xs font-black text-shamash-navy">{t("disputes.fields.comments")}</p><p className="mt-2 text-sm font-semibold text-slate-600">Litige lié à une divergence sur les quantités livrées. En attente de la confirmation du fournisseur.</p></div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="buyer360" className="section-standard bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow={t("buyer360.eyebrow")} title={t("buyer360.title")} description={t("buyer360.description")} />
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="overflow-hidden rounded-2xl bg-shamash-navy text-white shadow-premium">
              <div className="border-b border-white/10 p-6">
                <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white/10 text-shamash-blue"><Building2 className="size-5" /></span><div><p className="text-xs font-black text-shamash-blue">{buyer360Identity.title}</p><h3 className="mt-1 text-lg font-black">Société ABC</h3></div></div>
                <div className="mt-4 space-y-1.5">{buyer360Identity.fields.map((field) => <p key={field} className="text-sm font-bold text-white/65">{field}</p>)}</div>
              </div>
              <div className="p-6">
                <p className="text-xs font-black text-shamash-blue">{buyer360Risk.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">{buyer360Risk.levels.map((level, index) => <span key={level} className={cn("rounded-full px-3 py-1.5 text-xs font-black", index === 0 ? "bg-emerald-500/20 text-emerald-300" : index === 1 ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300")}>{level}</span>)}</div>
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2"><WalletCards className="size-5 text-shamash-blue" /><p className="text-sm font-black text-shamash-navy">{buyer360Financial.title}</p></div>
                <div className="mt-4 space-y-3">{buyer360Financial.fields.map((field, index) => <div key={field} className="flex items-center justify-between"><span className="text-xs font-bold text-slate-500">{field}</span><span dir="ltr" className={cn("text-sm font-black", index === 0 ? "text-shamash-navy" : "text-slate-700")}>{index === 0 ? "47 820 TND" : index === 1 ? "23 500 TND" : index === 2 ? "34 jours" : "12/06/2026"}</span></div>)}</div>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2"><Clock3 className="size-5 text-shamash-blue" /><p className="text-sm font-black text-shamash-navy">{buyer360History.title}</p></div>
                <div className="mt-4 space-y-2">{buyer360History.fields.map((field) => <div key={field} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-neutral-page px-3 py-2.5"><CheckCircle2 className="size-3.5 shrink-0 text-shamash-blue" /><span className="text-xs font-bold text-slate-700">{field}</span></div>)}</div>
              </article>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading eyebrow={t("risk.eyebrow")} title={t("risk.title")} description={t("risk.description")} />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">{riskIndicators.map((indicator, index) => <div key={indicator} className="flex items-start gap-3 rounded-xl bg-neutral-page p-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-shamash-blue/10 text-xs font-black text-shamash-indigo">{String(index + 1).padStart(2, "0")}</span><p className="text-sm font-bold leading-5 text-slate-700">{indicator}</p></div>)}</div>
            <p className="mt-5 text-xs font-semibold text-slate-500">{t("risk.note")}</p>
          </div>
          <div className="rounded-2xl bg-shamash-navy p-6 text-white sm:p-8">
            <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-blue">{t("preLitigation.eyebrow")}</p><h3 className="mt-1 text-xl font-black">{t("preLitigation.title")}</h3></div><ShieldCheck className="size-5 text-shamash-gold" /></div>
            <div className="mt-6 space-y-0">{preLitWorkflow.map((item, index) => <div key={item.step} className="relative flex gap-3 pb-4 last:pb-0"><span className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-shamash-blue" />{index < preLitWorkflow.length - 1 ? <span className="absolute left-[4px] top-4 h-full w-px bg-white/15 rtl:left-auto rtl:right-[4px]" /> : null}<div><p className="text-sm font-black text-white">{item.step}</p><p className="text-xs font-semibold text-white/60">{item.description}</p></div></div>)}</div>
            <div className="mt-5 flex flex-wrap gap-2">{preLitFeatures.map((feature) => <span key={feature} className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-bold text-white/70">{feature}</span>)}</div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="reporting" className="section-standard bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow={t("reporting.eyebrow")} title={t("reporting.title")} description={t("reporting.description")} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reportKpis.map((kpi, index) => <MotionItem key={kpi.label} className={cn("rounded-xl p-5", index === 0 ? "bg-shamash-navy text-white sm:col-span-2 lg:col-span-3" : index < 3 ? "border border-slate-200 bg-white shadow-sm" : "border border-slate-200 bg-neutral-page")}><p className={cn("text-xs font-bold", index === 0 ? "text-white/65" : "text-slate-500")}>{kpi.label}</p><p dir="ltr" className={cn("mt-2 font-black", index === 0 ? "text-4xl text-white" : "text-2xl text-shamash-navy")}>{kpi.value}</p>{index === 0 ? <div className="mt-6 flex h-20 items-end gap-1.5">{[38, 52, 45, 68, 58, 74, 63, 82, 76, 91].map((height, hIndex) => <span key={hIndex} className="flex-1 rounded-t bg-gradient-to-t from-shamash-indigo to-shamash-blue" style={{ height: `${height}%` }} />)}</div> : null}</MotionItem>)}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t("reports.eyebrow")} title={t("reports.title")} description={t("reports.description")} />
            <div className="mt-5 flex flex-wrap gap-2">{reportFormats.map((format) => <span key={format} className="rounded-full bg-shamash-blue/10 px-3 py-2 text-xs font-black text-shamash-indigo">{format}</span>)}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">{reportTypes.map((report) => <article key={report.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="text-base font-black text-shamash-navy">{report.name}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{report.description}</p></article>)}</div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f3faff_60%,#f4f2fb_100%)]">
        <div className="container-shell">
          <SectionHeading eyebrow={t("integrations.eyebrow")} title={t("integrations.title")} description={t("integrations.description")} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{integrationKeys.map((key) => { const cat = integrationCats[key]; return <MotionItem key={key} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-shamash-blue/40 hover:shadow-panel"><h3 className="text-lg font-black text-shamash-navy">{cat.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{cat.description}</p></MotionItem>; })}</div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-shamash-blue/10 text-shamash-indigo"><ShieldCheck className="size-6" /></span><div><p className="text-xs font-black uppercase tracking-[0.12em] text-shamash-indigo">{t("security.eyebrow")}</p><h2 className="mt-1 text-2xl font-black text-shamash-navy">{t("security.title")}</h2></div></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">{securityItems.map((item, index) => { const icons = [LockKeyhole, Fingerprint, BookOpenCheck, ShieldCheck]; const Icon = icons[index]; return <div key={item.title} className="rounded-xl bg-neutral-page p-4"><Icon className="size-5 text-shamash-blue" /><h3 className="mt-3 text-sm font-black text-shamash-navy">{item.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{item.description}</p></div>; })}</div>
            <p className="mt-5 text-xs font-semibold text-slate-500">{t("security.note")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#f4f8ff] p-6 shadow-sm sm:p-8">
            <SectionHeading eyebrow={t("customWorkflow.eyebrow")} title={t("customWorkflow.title")} description={t("customWorkflow.description")} />
            <div className="mt-6 flex flex-wrap gap-2">{customWorkflow.map((step, index) => <span key={step} className={cn("rounded-full border px-3 py-2 text-xs font-black", index === 0 ? "border-shamash-gold/40 bg-shamash-gold/10 text-shamash-navy" : "border-shamash-blue/25 bg-white text-shamash-indigo")}>{step}</span>)}</div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell">
          <SectionHeading eyebrow={t("buyerPortal.eyebrow")} title={t("buyerPortal.title")} description={t("buyerPortal.description")} />
          <div className="mt-7 flex flex-wrap gap-2">{buyerPortalFeatures.map((feature) => <span key={feature} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">{feature}</span>)}</div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-rose-500">{t("beforeAfter.before.title")}</p>
            <div className="mt-5 space-y-3">{beforeItems.map((item) => <div key={item} className="flex items-center gap-3"><span className="size-2 shrink-0 rounded-full bg-rose-300" /><span className="text-sm font-bold text-slate-700">{item}</span></div>)}</div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-600">{t("beforeAfter.after.title")}</p>
            <div className="mt-5 space-y-3">{afterItems.map((item) => <div key={item} className="flex items-center gap-3"><CheckCircle2 className="size-4 shrink-0 text-emerald-500" /><span className="text-sm font-bold text-slate-700">{item}</span></div>)}</div>
          </div>
        </div>
      </MotionSection>

      <ProductCTA
        productName="RECOUVREMENT"
        content={{
          eyebrow: t("cta.eyebrow"),
          title: t("cta.title"),
          description: t("cta.description"),
          primary: t("cta.primary"),
          secondary: t("cta.secondary")
        }}
        scope={reportKpis.slice(0, 4).map((item) => ({ label: item.label, detail: item.value }))}
      />
    </div>
  );
}
