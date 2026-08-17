import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { loadMessages } from "./messages";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (!hasLocale(routing.locales, paramValue)) notFound();
    locale = paramValue;
  }

  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    messages: await loadMessages(locale),
    onError(error) {
      if (process.env.NODE_ENV !== "production") console.warn("[i18n]", error.message);
    },
    getMessageFallback({ namespace, key }) {
      if (process.env.NODE_ENV !== "production") return `[missing: ${namespace}.${key}]`;
      return "";
    }
  };
});
