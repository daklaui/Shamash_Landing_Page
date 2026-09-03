import type common from "@/locales/fr/common.json";
import type home from "@/locales/fr/home.json";
import type services from "@/locales/fr/services.json";
import type solutions from "@/locales/fr/solutions.json";
import type xpertFactor from "@/locales/fr/xpertFactor.json";
import type factorix from "@/locales/fr/factorix.json";
import type recouvrementCreances from "@/locales/fr/recouvrementCreances.json";
import type about from "@/locales/fr/about.json";
import type contact from "@/locales/fr/contact.json";
import type industries from "@/locales/fr/industries.json";
import type resources from "@/locales/fr/resources.json";
import type { AppLocale } from "./config";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: {
      common: typeof common;
      home: typeof home;
      services: typeof services;
      solutions: typeof solutions;
      xpertFactor: typeof xpertFactor;
      factorix: typeof factorix;
      recouvrementCreances: typeof recouvrementCreances;
      about: typeof about;
      contact: typeof contact;
      industries: typeof industries;
      resources: typeof resources;
    };
  }
}
