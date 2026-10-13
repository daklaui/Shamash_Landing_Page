"use client";

import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import type { ReactNode } from "react";

export function LocalizedMessages({ messages, children }: { messages: Record<string, unknown>; children: ReactNode }) {
  const inherited = useMessages();
  const locale = useLocale();
  return <NextIntlClientProvider locale={locale} messages={{ ...inherited, ...messages }}>{children}</NextIntlClientProvider>;
}
