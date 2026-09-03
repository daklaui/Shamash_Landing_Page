import type { AppLocale } from "./config";

type MessageObject = Record<string, unknown>;

const namespaceLoaders = {
  common: {
    fr: () => import("@/locales/fr/common.json"),
    en: () => import("@/locales/en/common.json"),
    ar: () => import("@/locales/ar/common.json"),
    tn: () => import("@/locales/tn/common.json")
  },
  home: {
    fr: () => import("@/locales/fr/home.json"),
    en: () => import("@/locales/en/home.json"),
    ar: () => import("@/locales/ar/home.json"),
    tn: () => import("@/locales/tn/home.json")
  },
  services: {
    fr: () => import("@/locales/fr/services.json"),
    en: () => import("@/locales/en/services.json"),
    ar: () => import("@/locales/ar/services.json"),
    tn: () => import("@/locales/tn/services.json")
  },
  solutions: {
    fr: () => import("@/locales/fr/solutions.json"),
    en: () => import("@/locales/en/solutions.json"),
    ar: () => import("@/locales/ar/solutions.json"),
    tn: () => import("@/locales/tn/solutions.json")
  },
  xpertFactor: {
    fr: () => import("@/locales/fr/xpertFactor.json"),
    en: () => import("@/locales/en/xpertFactor.json"),
    ar: () => import("@/locales/ar/xpertFactor.json"),
    tn: () => import("@/locales/tn/xpertFactor.json")
  },
  factorix: {
    fr: () => import("@/locales/fr/factorix.json"),
    en: () => import("@/locales/en/factorix.json"),
    ar: () => import("@/locales/ar/factorix.json"),
    tn: () => import("@/locales/tn/factorix.json")
  },
  recouvrementCreances: {
    fr: () => import("@/locales/fr/recouvrementCreances.json"),
    en: () => import("@/locales/en/recouvrementCreances.json"),
    ar: () => import("@/locales/ar/recouvrementCreances.json"),
    tn: () => import("@/locales/tn/recouvrementCreances.json")
  },
  about: {
    fr: () => import("@/locales/fr/about.json"),
    en: () => import("@/locales/en/about.json"),
    ar: () => import("@/locales/ar/about.json"),
    tn: () => import("@/locales/tn/about.json")
  },
  contact: {
    fr: () => import("@/locales/fr/contact.json"),
    en: () => import("@/locales/en/contact.json"),
    ar: () => import("@/locales/ar/contact.json"),
    tn: () => import("@/locales/tn/contact.json")
  },
  industries: {
    fr: () => import("@/locales/fr/industries.json"),
    en: () => import("@/locales/en/industries.json"),
    ar: () => import("@/locales/ar/industries.json"),
    tn: () => import("@/locales/tn/industries.json")
  },
  resources: {
    fr: () => import("@/locales/fr/resources.json"),
    en: () => import("@/locales/en/resources.json"),
    ar: () => import("@/locales/ar/resources.json"),
    tn: () => import("@/locales/tn/resources.json")
  }
} as const;

function mergeFallback(base: MessageObject, translated: MessageObject): MessageObject {
  const merged: MessageObject = { ...base };

  for (const [key, value] of Object.entries(translated)) {
    const baseValue = base[key];
    merged[key] =
      value && typeof value === "object" && !Array.isArray(value) && baseValue && typeof baseValue === "object" && !Array.isArray(baseValue)
        ? mergeFallback(baseValue as MessageObject, value as MessageObject)
        : value;
  }

  return merged;
}

export async function loadMessages(locale: AppLocale) {
  const entries = await Promise.all(
    Object.entries(namespaceLoaders).map(async ([namespace, loaders]) => {
      const fallbackLoader = (namespace === "factorix" || namespace === "recouvrementCreances") && locale === "tn" ? loaders.ar : loaders.fr;
      const [fallbackModule, localeModule] = await Promise.all([fallbackLoader(), loaders[locale]()]);
      return [
        namespace,
        locale === "fr"
          ? fallbackModule.default
          : mergeFallback(fallbackModule.default, localeModule.default)
      ] as const;
    })
  );

  return Object.fromEntries(entries);
}
