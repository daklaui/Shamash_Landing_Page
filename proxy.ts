import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import type { NextRequest } from "next/server";
import { languageAlternates, siteIndexable } from "@/lib/site";

const localize = createMiddleware(routing);
export default function proxy(request: NextRequest) {
  const response = localize(request);
  const match = request.nextUrl.pathname.match(/^\/(fr|en|ar|tn)(\/.*)?$/);
  if (match && response.status === 200) {
    response.headers.set("Link", Object.entries(languageAlternates(match[2] || "")).map(([language, url]) => `<${url}>; rel="alternate"; hreflang="${language}"`).join(", "));
  }
  if (!siteIndexable) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
