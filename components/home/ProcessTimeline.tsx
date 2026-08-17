import { useTranslations } from "next-intl";
import { useProcessSteps } from "@/data/localized";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, MotionSection } from "@/components/ui/Motion";

export function ProcessTimeline() {
  const t = useTranslations("services");
  const processSteps = useProcessSteps();
  return (
    <MotionSection className="section-standard bg-neutral-page" aria-labelledby="process-title">
      <div className="container-shell">
        <SectionHeader
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          description={t("process.description")}
        />
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <MotionItem as="article" key={step.title} className="card-base interactive-lift p-5 md:p-5">
              <span className="motion-node grid h-10 w-10 place-items-center rounded-md bg-shamash-navy text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-shamash-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-text">{step.description}</p>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
