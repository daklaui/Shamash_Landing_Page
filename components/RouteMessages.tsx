import { getMessages } from "next-intl/server";
import { LocalizedMessages } from "./LocalizedMessages";
import type { ReactNode } from "react";

export async function RouteMessages({ namespace, children }: { namespace: keyof Awaited<ReturnType<typeof getMessages>>; children: ReactNode }) {
  const messages = await getMessages();
  return <LocalizedMessages messages={{ [namespace]: messages[namespace] }}>{children}</LocalizedMessages>;
}
