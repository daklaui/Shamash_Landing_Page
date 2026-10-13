import { readJsonBody, RequestBodyError } from "@/lib/request-body";
let reportWindow = 0;
let reportCount = 0;

export async function POST(request: Request) {
  if (!["application/csp-report", "application/reports+json"].includes(request.headers.get("content-type")?.split(";")[0].trim() || "")) return new Response(null, { status: 415 });
  try {
    const report = await readJsonBody(request, 8192);
    if (!report || typeof report !== "object" || (!("csp-report" in report) && !Array.isArray(report))) return new Response(null, { status: 400 });
    // Record only a count; URLs and source samples may contain personal data.
    if (Date.now() > reportWindow) { reportWindow = Date.now() + 60_000; reportCount = 0; }
    if (++reportCount <= 20) console.info("CSP report received");
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch (error) { return new Response(null, { status: error instanceof RequestBodyError ? error.status : 400 }); }
}
