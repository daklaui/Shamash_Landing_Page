import { CheckCircle2 } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  HeroActions,
  HeroBadge,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroSection,
  HeroTitle,
  HeroVisual
} from "@/components/ui/Hero";
import { InterfaceTheater } from "@/components/ui/InterfaceTheater";
import { ProductLogo } from "@/components/ui/ProductLogo";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { useTranslations } from "next-intl";
import { useLocalizedSolution, type SolutionId } from "@/data/localized";
import type { SolutionIdentityId } from "@/data/preparedInformation";

export function SolutionPage({ solutionId }: { solutionId: SolutionId }) {
  const solution = useLocalizedSolution(solutionId);
  const t = useTranslations("solutions");
  const common = useTranslations("common");
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <ProductLogo id={solution.id as SolutionIdentityId} priority />
            <HeroBadge className="mt-6">{solution.audience}</HeroBadge>
            <HeroTitle>{solution.name}</HeroTitle>
            <p className="hero-subtitle">
              {solution.headline}
            </p>
            <HeroDescription>{solution.summary}</HeroDescription>
            <HeroActions>
              <Button href="/contact">{solution.ctaLabel}</Button>
              <Button href="/services" variant="secondary">
                {common("actions.viewSupportingServices")}
              </Button>
            </HeroActions>
          </HeroContent>
          <HeroVisual bleed>
            <InterfaceTheater
              type={solution.visualType}
              solutionId={solution.id as SolutionIdentityId}
              size="hero"
              className="hero-interface"
            />
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell">
          <SectionHeader
            eyebrow={t("page.outcomesEyebrow")}
            title={t("page.outcomesTitle", { name: solution.name })}
            description={t("page.outcomesDescription")}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {solution.outcomes.map((outcome) => (
              <MotionItem as="article" key={outcome} className="card-base p-5 md:p-5">
                <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-shamash-blue" />
                <h2 className="mt-4 text-base font-bold leading-6 text-shamash-navy">{outcome}</h2>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow={t("page.capabilitiesEyebrow")}
            title={t("page.capabilitiesTitle")}
            description={t("page.capabilitiesDescription")}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {solution.features.map((feature) => (
              <MotionItem as="article" key={feature.title} className="card-base bg-neutral-page">
                <h2 className="text-xl font-bold text-shamash-navy">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-text">{feature.description}</p>
              </MotionItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-neutral-page">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <MotionItem className="rounded-lg bg-shamash-navy p-6 text-white shadow-premium md:p-8">
            <p className="eyebrow-text text-shamash-blue">{t("page.workflowEyebrow")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">{t("page.workflowTitle")}</h2>
            <div className="mt-8 grid gap-3">
              {solution.workflow.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-lg bg-white/8 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-sm font-bold text-shamash-navy">
                    {index + 1}
                  </span>
                  <span className="font-semibold">{step}</span>
                </div>
              ))}
            </div>
          </MotionItem>

          <MotionItem className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="eyebrow-text">{t("page.reliabilityEyebrow")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-shamash-navy">
              {t("page.reliabilityTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-text">
              {t("page.reliabilityDescription")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {solution.integrations.map((integration) => (
                <span key={integration} className="rounded-full bg-shamash-blue/10 px-3 py-1.5 text-sm font-semibold text-shamash-navy">
                  {integration}
                </span>
              ))}
            </div>
          </MotionItem>
        </div>
      </MotionSection>

      <MotionSection className="section-standard bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow={t("page.faqEyebrow")}
            title={t("page.faqTitle", { name: solution.name })}
            description={t("page.faqDescription")}
          />
          <FaqAccordion />
        </div>
      </MotionSection>

      <FinalCTA
        title={t("page.ctaTitle", { name: solution.name })}
        description={t("page.ctaDescription")}
      />
    </>
  );
}
