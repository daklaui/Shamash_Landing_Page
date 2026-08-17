import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  Landmark,
  Network,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  UsersRound,
  WalletCards
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";
import { ProductFrame } from "./ProductFrame";
import { SectionIntro } from "./SectionIntro";
import type { LabeledDetail, WorkflowStep } from "./types";

export function BankOperations({ content }: { content: { eyebrow: string; title: string; description: string; stages: string[]; controls: string[] } }) {
  const icons = [Building2, UsersRound, Landmark, ShieldCheck, BookOpenCheck, BarChart3];
  return (
    <MotionSection className="section-standard bg-neutral-page">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <div className="mt-8 flex flex-wrap gap-2">
            {content.controls.map((control) => <span key={control} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-shamash-navy shadow-sm">{control}</span>)}
          </div>
        </div>
        <div className="xf-bank-model">
          <div className="xf-bank-model__line" aria-hidden="true" />
          {content.stages.map((stage, index) => {
            const Icon = icons[index];
            return (
              <MotionItem key={stage} className="xf-bank-model__stage">
                <span><Icon aria-hidden="true" /></span><strong>{stage}</strong>
                {index < content.stages.length - 1 ? <ArrowDown aria-hidden="true" className="xf-bank-model__arrow" /> : null}
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

export function Ecosystem({ content, ariaLabel }: { content: { eyebrow: string; title: string; description: string; center: string; entities: string[] }; ariaLabel: string }) {
  const entityIcons = [Landmark, Building2, UsersRound, ShieldCheck, CircleDollarSign, BookOpenCheck, Network, RefreshCcw];

  return (
    <MotionSection className="section-standard overflow-hidden bg-white">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" />
        <figure className="xf-ecosystem-art">
          <div className="xf-ecosystem-art__stage">
            <div className="xf-ecosystem-art__grid" aria-hidden="true" />
            <Image
              src="/images/xpert-factor-ecosystem.png"
              alt={ariaLabel}
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 100vw, 1120px"
              className="xf-ecosystem-art__image"
            />
            <div className="xf-ecosystem-art__label"><Network aria-hidden="true" /><strong>{content.center}</strong></div>
          </div>
          <figcaption>
            <ol className="xf-ecosystem-art__legend">
              {content.entities.map((entity, index) => {
                const Icon = entityIcons[index];
                return (
                  <li key={entity} className="xf-ecosystem-art__legend-item">
                    <span className="xf-ecosystem-art__legend-icon"><Icon aria-hidden="true" /></span>
                    <strong>{entity}</strong>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </li>
                );
              })}
            </ol>
          </figcaption>
        </figure>
      </div>
    </MotionSection>
  );
}

export function Visibility({ content }: { content: { eyebrow: string; title: string; description: string; items: LabeledDetail[]; demo: string } }) {
  return (
    <MotionSection className="xf-visibility">
      <div className="xf-visibility__grid" aria-hidden="true" />
      <div className="container-shell relative z-10 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} inverse />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.items.map((item, index) => (
              <MotionItem key={item.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-md bg-shamash-blue/15 text-shamash-blue">{index % 2 ? <CircleDollarSign aria-hidden="true" /> : <CheckCircle2 aria-hidden="true" />}</span><strong className="text-sm text-white">{item.label}</strong></div>
                <p className="mt-2 text-xs leading-5 text-white/55">{item.detail}</p>
              </MotionItem>
            ))}
          </div>
        </div>
        <ProductFrame title={content.title} eyebrow={content.eyebrow} rows={content.items.slice(0, 4).map((item) => item.label)} note={content.demo} />
      </div>
    </MotionSection>
  );
}

const workflowIcons = [FileCheck2, ReceiptText, CircleDollarSign, WalletCards, RefreshCcw, BarChart3];

export function ContractToCash({ content }: { content: { eyebrow: string; title: string; description: string; steps: WorkflowStep[] } }) {
  return (
    <MotionSection className="section-standard bg-white">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" />
        <div className="xf-cash-story">
          <div className="xf-cash-story__spine" aria-hidden="true" />
          {content.steps.map((step, index) => {
            const Icon = workflowIcons[index];
            const rows = content.steps.slice(Math.max(0, index - 1), index + 3).map((item) => item.title);
            return (
              <MotionItem key={step.title} className={cn("xf-cash-story__step", index % 2 === 1 && "xf-cash-story__step--reverse")}>
                <div className="xf-cash-story__copy">
                  <span><Icon aria-hidden="true" /></span>
                  <p>{String(index + 1).padStart(2, "0")}</p>
                  <h3>{step.title}</h3>
                  <div>{step.description}</div>
                </div>
                <ProductFrame title={step.title} eyebrow={content.eyebrow} rows={rows.length === 4 ? rows : [...rows, ...content.steps.slice(0, 4 - rows.length).map((item) => item.title)]} note={content.eyebrow} compact />
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

export function Flexibility({ content }: { content: { eyebrow: string; title: string; description: string; core: string; layers: string[] } }) {
  const layerIcons = [Network, RefreshCcw, BarChart3, UsersRound, Building2, FileCheck2];

  const renderLayer = (layer: string, index: number) => {
    const Icon = layerIcons[index];

    return (
      <MotionItem as="article" key={layer} className="xf-flexibility__layer">
        <span className="xf-flexibility__layer-icon"><Icon aria-hidden="true" /></span>
        <div>
          <span className="xf-flexibility__layer-index">{String(index + 1).padStart(2, "0")}</span>
          <strong>{layer}</strong>
        </div>
        <span className="xf-flexibility__layer-port" aria-hidden="true" />
      </MotionItem>
    );
  };

  return (
    <MotionSection className="section-standard bg-neutral-page">
      <div className="container-shell">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" />
        <div className="xf-flexibility" role="group" aria-label={content.title}>
          <div className="xf-flexibility__row xf-flexibility__row--top">
            {content.layers.slice(0, 3).map((layer, index) => renderLayer(layer, index))}
          </div>
          <div className="xf-flexibility__connector xf-flexibility__connector--top" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="xf-flexibility__core">
            <div className="xf-flexibility__core-mark"><Landmark aria-hidden="true" /></div>
            <div className="xf-flexibility__core-copy">
              <span>XPERT FACTOR</span>
              <strong>{content.core}</strong>
            </div>
            <div className="xf-flexibility__core-signal" aria-hidden="true">
              <i /><i /><i />
            </div>
            <span className="xf-flexibility__core-count" aria-hidden="true">{String(content.layers.length).padStart(2, "0")}</span>
          </div>
          <div className="xf-flexibility__connector xf-flexibility__connector--bottom" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="xf-flexibility__row xf-flexibility__row--bottom">
            {content.layers.slice(3).map((layer, index) => renderLayer(layer, index + 3))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function Deployment({ content }: { content: { eyebrow: string; title: string; description: string; highlight: string; disclaimer: string; steps: string[] } }) {
  return (
    <MotionSection className="section-standard bg-white">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <div className="rounded-lg border border-shamash-gold/30 bg-amber-50 px-6 py-5 lg:max-w-sm"><strong className="text-lg text-shamash-navy">{content.highlight}</strong></div>
        </div>
        <ol className="xf-deployment">
          {content.steps.map((step, index) => (
            <MotionItem as="article" key={step} className="xf-deployment__step"><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3>{index < content.steps.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</MotionItem>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-xs leading-5 text-neutral-muted">{content.disclaimer}</p>
      </div>
    </MotionSection>
  );
}

export function Experience({ content }: { content: { eyebrow: string; title: string; description: string; stages: string[] } }) {
  return (
    <MotionSection className="border-y border-slate-200 bg-neutral-page py-16 sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <div className="grid gap-3 sm:grid-cols-2">
          {content.stages.map((stage, index) => (
            <MotionItem key={stage} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><span className="text-sm font-black text-shamash-blue">{String(index + 1).padStart(2, "0")}</span><ArrowRight aria-hidden="true" className="size-4 text-slate-300 rtl:rotate-180" /><strong className="text-sm text-shamash-navy">{stage}</strong></MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export function ProductCTA({ content, scope, productName = "XPERT FACTOR" }: { content: { eyebrow: string; title: string; description: string; primary: string; secondary: string }; scope: LabeledDetail[]; productName?: string }) {
  const scopeIcons = [FileCheck2, WalletCards, ShieldCheck, CircleDollarSign];

  return (
    <section className="xf-cta">
      <div className="container-shell">
        <div className="xf-cta__panel">
          <div className="xf-cta__grid" aria-hidden="true" />
          <div className="xf-cta__orb xf-cta__orb--one" aria-hidden="true" />
          <div className="xf-cta__orb xf-cta__orb--two" aria-hidden="true" />
          <div className="xf-cta__copy">
            <p className="xf-cta__eyebrow"><span aria-hidden="true" />{content.eyebrow}</p>
            <h2>{content.title}</h2>
            <p className="xf-cta__description">{content.description}</p>
            <div className="xf-cta__actions">
              <Button href="/contact">{content.primary}</Button>
              <Button href="/contact" variant="secondary">{content.secondary}</Button>
            </div>
          </div>
          <div className="xf-cta__preview">
            <div className="xf-cta__preview-bar">
              <span className="xf-cta__preview-mark"><Landmark aria-hidden="true" /></span>
              <div><strong>{productName}</strong><span>{content.eyebrow}</span></div>
              <span className="xf-cta__preview-status" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="xf-cta__scope">
              {scope.slice(0, 4).map((item, index) => {
                const Icon = scopeIcons[index];
                return (
                  <article key={item.label} className="xf-cta__scope-item">
                    <span><Icon aria-hidden="true" /></span>
                    <div><strong>{item.label}</strong><p>{item.detail}</p></div>
                    <i aria-hidden="true" />
                  </article>
                );
              })}
            </div>
            <div className="xf-cta__preview-flow" aria-hidden="true"><span /><i /><span /><i /><span /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
