import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import {
  HeroBadge,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroSection,
  HeroTitle,
  HeroVisual
} from "@/components/ui/Hero";
import { createPageMetadata } from "@/lib/localizedMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return createPageMetadata((await params).locale, "contact", "/contact");
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  return (
    <HeroSection tone="neutral">
      <HeroContainer>
        <HeroContent>
          <HeroBadge>{t("hero.eyebrow")}</HeroBadge>
          <HeroTitle>
            {t("hero.title")}
          </HeroTitle>
          <HeroDescription>
            {t("hero.description")}
          </HeroDescription>
          <div className="mt-8 space-y-4 text-sm font-semibold text-shamash-navy">
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="h-5 w-5 text-shamash-blue" />
              {common("contactInfo.location")}
            </p>
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-5 w-5 text-shamash-blue" />
              {common("contactInfo.email")}
            </p>
            <p className="flex items-center gap-3">
              <Phone aria-hidden="true" className="h-5 w-5 text-shamash-blue" />
              {common("contactInfo.availability")}
            </p>
          </div>
        </HeroContent>
        <HeroVisual>
          <ContactForm />
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
}
