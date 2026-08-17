export const locales = ["fr", "en", "ar", "tn"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "fr";
export const fallbackLocale: AppLocale = "fr";

export const localeConfig: Record<
  AppLocale,
  {
    label: string;
    shortLabel: string;
    htmlLang: string;
    intlLocale: string;
    direction: "ltr" | "rtl";
  }
> = {
  fr: { label: "Français", shortLabel: "FR", htmlLang: "fr", intlLocale: "fr-TN", direction: "ltr" },
  en: { label: "English", shortLabel: "EN", htmlLang: "en", intlLocale: "en", direction: "ltr" },
  ar: { label: "العربية", shortLabel: "العربية", htmlLang: "ar", intlLocale: "ar-TN", direction: "rtl" },
  tn: { label: "تونسي", shortLabel: "تونسي", htmlLang: "ar-TN", intlLocale: "ar-TN", direction: "ltr" }
};

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
