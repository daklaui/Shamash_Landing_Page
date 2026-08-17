import {
  ArrowDown,
  ArrowRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Landmark,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { ProductLogo } from "@/components/ui/ProductLogo";
import { cn } from "@/lib/cn";
import { ModuleExplorer, PlatformExplorer } from "./ProductExplorers";
import { ProductFrame } from "./ProductFrame";
import { SectionIntro } from "./SectionIntro";
import type { LifecycleItem, ModuleGroup, PlatformView } from "./types";

type Hero = {
  eyebrow: string; title: string; description: string; primary: string; secondary: string; trust: string;
  workspace: string; illustrative: string; metrics: { label: string; value: string }[]; queue: string; queueItems: string[];
};
type Problem = { eyebrow: string; title: string; description: string; steps: string[]; solution: string };
type Flow = { eyebrow: string; title: string; description: string; nodes: { label: string; detail: string }[] };
type Lifecycle = { eyebrow: string; title: string; description: string; items: LifecycleItem[] };

export function XpertHero({ content }: { content: Hero }) {
  return (
    <section className="xf-hero">
      <div className="xf-hero__grid" aria-hidden="true" />
      <div className="container-shell relative z-10 grid items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20 xl:gap-16">
        <div className="max-w-2xl">
          <ProductLogo id="xpertfactor" priority className="h-14 max-w-72 sm:h-16" />
          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-shamash-indigo">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-[13ch] text-[clamp(2.5rem,5.1vw,5.3rem)] font-black leading-[0.98] tracking-[-0.045em] text-shamash-navy">{content.title}</h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-neutral-text sm:text-lg">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">{content.primary}</Button>
            <Button href="#xpert-lifecycle" variant="secondary">{content.secondary}</Button>
          </div>
          <div className="mt-7 flex items-center gap-3 text-sm font-bold text-shamash-navy">
            <span className="h-px w-8 bg-shamash-gold" />
            {content.trust}
          </div>
        </div>

        <div className="xf-hero-console">
          <div className="xf-hero-console__glow" />
          <ProductFrame title={content.workspace} eyebrow={content.eyebrow} rows={content.queueItems} note={content.illustrative} />
          <div className="xf-hero-console__metric xf-hero-console__metric--top">
            <ShieldCheck aria-hidden="true" />
            <span>{content.metrics[1].label}</span><strong>{content.metrics[1].value}</strong>
          </div>
          <div className="xf-hero-console__metric xf-hero-console__metric--bottom">
            <RefreshCcw aria-hidden="true" />
            <span>{content.metrics[2].label}</span><strong>{content.metrics[2].value}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section className="border-y border-slate-200 bg-white" aria-label="XPERT FACTOR proof points">
      <div className="container-shell grid grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={item.label} className={cn("px-4 py-6 sm:px-6", index > 0 && "border-s border-slate-200", index === items.length - 1 && "col-span-2 border-t border-slate-200 lg:col-span-1 lg:border-t-0")}>
            <strong className="block text-base font-black text-shamash-navy sm:text-lg">{item.value}</strong>
            <span className="mt-1 block text-xs font-semibold leading-5 text-neutral-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProblemSection({ content }: { content: Problem }) {
  return (
    <MotionSection className="section-standard bg-neutral-page">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <div className="xf-problem-flow">
          {content.steps.map((step, index) => (
            <MotionItem key={step} className="xf-problem-flow__step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
              {index < content.steps.length - 1 ? <ArrowDown aria-hidden="true" /> : null}
            </MotionItem>
          ))}
          <MotionItem className="xf-problem-flow__solution"><ShieldCheck aria-hidden="true" /><strong>{content.solution}</strong></MotionItem>
        </div>
      </div>
    </MotionSection>
  );
}

const flowIcons = [ReceiptText, Landmark, WalletCards, RefreshCcw];

export function FactoringFlow({ content, ariaLabel }: { content: Flow; ariaLabel: string }) {
  return (
    <MotionSection className="section-standard bg-white">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" />
        <div className="xf-flow" aria-label={ariaLabel}>
          {content.nodes.map((node, index) => {
            const Icon = flowIcons[index];
            return (
              <div key={node.label} className="contents">
                <MotionItem className="xf-flow__node"><span><Icon aria-hidden="true" /></span><h3>{node.label}</h3><p>{node.detail}</p></MotionItem>
                {index < content.nodes.length - 1 ? <div className="xf-flow__connector" aria-hidden="true"><span /><ArrowRight /></div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

const lifecycleIcons = [Landmark, FileText, ReceiptText, ShieldCheck, CircleDollarSign, Clock3, WalletCards, RefreshCcw, FileText, Landmark];

export function LifecycleSection({ content, ariaLabel }: { content: Lifecycle; ariaLabel: string }) {
  return (
    <MotionSection id="xpert-lifecycle" className="xf-lifecycle-section">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} inverse />
        <ol className="xf-lifecycle" aria-label={ariaLabel}>
          {content.items.map((item, index) => {
            const Icon = lifecycleIcons[index];
            return (
              <MotionItem as="article" key={item.title} className="xf-lifecycle__item">
                <div className="xf-lifecycle__index"><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
              </MotionItem>
            );
          })}
        </ol>
      </div>
    </MotionSection>
  );
}

export function ModulesSection({ content, ariaLabel, illustrative }: { content: { eyebrow: string; title: string; description: string; groups: ModuleGroup[] }; ariaLabel: string; illustrative: string }) {
  return (
    <MotionSection className="section-standard bg-neutral-page">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <div className="mt-10"><ModuleExplorer groups={content.groups} ariaLabel={ariaLabel} illustrative={illustrative} /></div>
      </div>
    </MotionSection>
  );
}

export function PlatformSection({ content, ariaLabel }: { content: { eyebrow: string; title: string; description: string; views: PlatformView[]; illustrative: string }; ariaLabel: string }) {
  return (
    <MotionSection className="section-standard bg-white">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <PlatformExplorer views={content.views} ariaLabel={ariaLabel} illustrative={content.illustrative} />
      </div>
    </MotionSection>
  );
}
