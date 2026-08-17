import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
  localeCookie: {
    name: "shamash_locale",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  }
});
