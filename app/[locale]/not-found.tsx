import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  const t = useTranslations("common");
  return (
    <section className="section-standard bg-neutral-page">
      <div className="container-shell mx-auto max-w-3xl text-center">
        <p className="eyebrow-text">{t("notFound.eyebrow")}</p>
        <h1 className="heading-display mt-4 text-shamash-navy">{t("notFound.title")}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-text">{t("notFound.description")}</p>
        <Button href="/" className="mt-8">{t("notFound.homeAction")}</Button>
      </div>
    </section>
  );
}
