import { acceptEnquiry } from "@/lib/contact-delivery";
import { validateEnquiry } from "@/lib/contact-schema";
import { readJsonBody, RequestBodyError } from "@/lib/request-body";
import { siteOrigin } from "@/lib/site";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const reply = (status: number, accepted = false) => Response.json({ accepted }, { status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "600" } : {}) } });
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin && origin !== siteOrigin) return reply(403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return reply(415);
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(key)) return reply(400);
  try {
    const enquiry = validateEnquiry(await readJsonBody(request));
    if (!enquiry) return reply(400);
    // Trust only the hosting provider's client address, never arbitrary forwarding headers.
    const client = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown" : "local";
    const result = await acceptEnquiry(enquiry, key, client);
    return reply(result.status, result.accepted);
  } catch (error) { return reply(error instanceof RequestBodyError ? error.status : 500); }
}
