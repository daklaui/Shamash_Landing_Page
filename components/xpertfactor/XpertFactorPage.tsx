"use client";

import { useMessages } from "next-intl";
import {
  FactoringFlow,
  LifecycleSection,
  ModulesSection,
  PlatformSection,
  ProblemSection,
  ProofStrip,
  XpertHero
} from "./CoreSections";
import {
  BankOperations,
  ContractToCash,
  Deployment,
  Ecosystem,
  Experience,
  Flexibility,
  ProductCTA,
  Visibility
} from "./EnterpriseSections";
import type { LabeledDetail, LifecycleItem, ModuleGroup, PlatformView, WorkflowStep } from "./types";

type Content = {
  metadata: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string; primary: string; secondary: string; trust: string; workspace: string; illustrative: string; metrics: { label: string; value: string }[]; queue: string; queueItems: string[] };
  proof: { value: string; label: string }[];
  problem: { eyebrow: string; title: string; description: string; steps: string[]; solution: string };
  factoringFlow: { eyebrow: string; title: string; description: string; nodes: LabeledDetail[] };
  lifecycle: { eyebrow: string; title: string; description: string; items: LifecycleItem[] };
  modules: { eyebrow: string; title: string; description: string; groups: ModuleGroup[] };
  platform: { eyebrow: string; title: string; description: string; views: PlatformView[]; illustrative: string };
  bankOperations: { eyebrow: string; title: string; description: string; stages: string[]; controls: string[] };
  ecosystem: { eyebrow: string; title: string; description: string; center: string; entities: string[] };
  visibility: { eyebrow: string; title: string; description: string; items: LabeledDetail[]; demo: string };
  workflow: { eyebrow: string; title: string; description: string; steps: WorkflowStep[] };
  flexibility: { eyebrow: string; title: string; description: string; core: string; layers: string[] };
  deployment: { eyebrow: string; title: string; description: string; highlight: string; disclaimer: string; steps: string[] };
  experience: { eyebrow: string; title: string; description: string; stages: string[] };
  cta: { eyebrow: string; title: string; description: string; primary: string; secondary: string };
  accessibility: { moduleTabs: string; platformTabs: string; flowLabel: string; lifecycleLabel: string; ecosystemLabel: string };
};

export function XpertFactorPage() {
  const content = (useMessages() as { xpertFactor: Content }).xpertFactor;
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "XPERT FACTOR",
    applicationCategory: "BusinessApplication",
    description: content.metadata.description,
    provider: { "@type": "Organization", name: "Shamash IT" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c") }} />
      <XpertHero content={content.hero} />
      <ProofStrip items={content.proof} />
      <ProblemSection content={content.problem} />
      <FactoringFlow content={content.factoringFlow} ariaLabel={content.accessibility.flowLabel} />
      <LifecycleSection content={content.lifecycle} ariaLabel={content.accessibility.lifecycleLabel} />
      <ModulesSection content={content.modules} ariaLabel={content.accessibility.moduleTabs} illustrative={content.platform.illustrative} />
      <PlatformSection content={content.platform} ariaLabel={content.accessibility.platformTabs} />
      <BankOperations content={content.bankOperations} />
      <Ecosystem content={content.ecosystem} ariaLabel={content.accessibility.ecosystemLabel} />
      <Visibility content={content.visibility} />
      <ContractToCash content={content.workflow} />
      <Flexibility content={content.flexibility} />
      <Deployment content={content.deployment} />
      <Experience content={content.experience} />
      <ProductCTA content={content.cta} scope={content.visibility.items} />
    </>
  );
}
