import { CloudCog, Headphones, ShieldCheck, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocalizedServices, useSupportingServices } from "@/data/localized";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, MotionSection } from "@/components/ui/Motion";

const icons = [Workflow, Workflow, ShieldCheck, Headphones, CloudCog];

export function ServicePillars() {
  const t = useTranslations("services");
  const common = useTranslations("common");
  const servicePillars = useLocalizedServices();
  const supportingServices = useSupportingServices();
  return (
    <MotionSection className="section-standard bg-white" aria-labelledby="services-title">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeader
            eyebrow={t("section.eyebrow")}
            title={t("section.title")}
            description={t("section.description")}
          />
          <MotionItem className="rounded-lg bg-shamash-navy p-6 text-white shadow-premium md:p-8">
            <p className="eyebrow-text text-shamash-blue">{t("section.coreEyebrow")}</p>
            <p className="mt-3 text-2xl font-bold leading-snug">
              {t("section.coreMessage")}
            </p>
          </MotionItem>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {servicePillars.map((service, index) => {
            const Icon = icons[index] ?? CloudCog;
            return (
              <MotionItem as="article" key={service.id} className="card-base interactive-lift hover:shadow-premium">
                <span className="motion-node grid h-12 w-12 place-items-center rounded-md bg-gradient-to-br from-shamash-blue to-shamash-indigo text-white">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold leading-7 text-shamash-navy">{service.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-shamash-indigo">{service.result}</p>
                <p className="mt-4 text-sm leading-6 text-neutral-text">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {service.capabilities.slice(0, 4).map((capability) => (
                    <li key={capability} className="text-sm text-neutral-text">
                      <span className="me-2 text-shamash-blue">•</span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </MotionItem>
            );
          })}
        </div>

        <MotionItem className="mt-8 flex flex-col gap-5 rounded-lg border border-slate-200 bg-neutral-page p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {supportingServices.map((service) => (
              <span key={service} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-text">
                {service}
              </span>
            ))}
          </div>
          <Button href="/services" variant="secondary" className="shrink-0">
            {common("actions.viewServices")}
          </Button>
        </MotionItem>
      </div>
    </MotionSection>
  );
}
