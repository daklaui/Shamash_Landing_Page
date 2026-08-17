import { Button } from "@/components/ui/Button";
import { MotionItem, MotionSection } from "@/components/ui/Motion";
import { useTranslations } from "next-intl";

export function FinalCTA({
  title,
  description
}: {
  title?: string;
  description?: string;
}) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("finalCta.title");
  const resolvedDescription = description ?? t("finalCta.description");
  return (
    <MotionSection className="section-standard bg-white">
      <MotionItem className="container-shell overflow-hidden rounded-lg bg-shamash-navy p-6 text-white shadow-premium md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow-text text-shamash-blue">{t("finalCta.eyebrow")}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{resolvedTitle}</h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75 md:text-lg">{resolvedDescription}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">
              {t("actions.bookDemo")}
            </Button>
            <Button href="/services" variant="secondary">
              {t("actions.viewServices")}
            </Button>
          </div>
        </div>
      </MotionItem>
    </MotionSection>
  );
}
