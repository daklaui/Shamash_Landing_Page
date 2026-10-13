import { createHash } from "node:crypto";
import { open, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Enquiry } from "./contact-schema";
import { readJsonBody } from "./request-body";

type Result = { status: number; accepted: boolean };
type Entry = { fingerprint: string; expires: number; promise: Promise<Result> };
const state = globalThis as typeof globalThis & { enquiryRequests?: Map<string, Entry>; enquiryLimits?: Map<string, { count: number; expires: number }> };
const requests = state.enquiryRequests ??= new Map();
const limits = state.enquiryLimits ??= new Map();
const WINDOW = 10 * 60_000;

async function deliver(enquiry: Enquiry, id: string): Promise<Result> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const directory = process.env.CONTACT_STORAGE_DIR;
  try {
    if (webhook) {
      const url = new URL(webhook);
      if (url.protocol !== "https:" || url.username || url.password) return { status: 503, accepted: false };
      const response = await fetch(url, {
        method: "POST", redirect: "error", signal: AbortSignal.timeout(10_000),
        headers: { "Content-Type": "application/json", "Idempotency-Key": id, ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) },
        body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...enquiry })
      });
      if (!response.ok) { await response.body?.cancel(); return { status: 502, accepted: false }; }
      // The destination contract must explicitly acknowledge durable acceptance.
      const ack = await readJsonBody(response, 4096) as { accepted?: boolean };
      return ack.accepted === true ? { status: 200, accepted: true } : { status: 502, accepted: false };
    }
    if (directory) {
      if (!path.isAbsolute(directory)) return { status: 503, accepted: false };
      const target = path.resolve(directory);
      const publicRoot = path.resolve(process.cwd(), "public");
      const comparableTarget = process.platform === "win32" ? target.toLowerCase() : target;
      const comparablePublic = process.platform === "win32" ? publicRoot.toLowerCase() : publicRoot;
      if (comparableTarget === comparablePublic || comparableTarget.startsWith(comparablePublic + path.sep)) return { status: 503, accepted: false };
      await mkdir(target, { recursive: true, mode: 0o700 });
      const filename = path.join(target, `${id}.json`);
      const file = await open(filename, "wx", 0o600).catch(async (error: NodeJS.ErrnoException) => {
        if (error.code !== "EEXIST") throw error;
        const stored = JSON.parse(await readFile(filename, "utf8"));
        if (!Object.entries(enquiry).every(([key, value]) => stored[key] === value)) throw new Error("Duplicate key conflict");
        return null;
      });
      if (!file) return { status: 200, accepted: true };
      try { await file.writeFile(JSON.stringify({ id, receivedAt: new Date().toISOString(), ...enquiry })); await file.sync(); }
      finally { await file.close(); }
      return { status: 200, accepted: true };
    }
    return { status: 503, accepted: false };
  } catch {
    // Delivery may be uncertain after a timeout: retain the same destination id for retries.
    return { status: 502, accepted: false };
  }
}

export async function acceptEnquiry(enquiry: Enquiry, key: string, client: string): Promise<Result> {
  const now = Date.now();
  for (const [id, entry] of requests) if (entry.expires < now) requests.delete(id);
  for (const [id, entry] of limits) if (entry.expires < now) limits.delete(id);
  const fingerprint = createHash("sha256").update(JSON.stringify(enquiry)).digest("hex");
  const existing = requests.get(key);
  if (existing) return existing.fingerprint === fingerprint ? existing.promise : { status: 409, accepted: false };
  const rate = limits.get(client) ?? { count: 0, expires: now + WINDOW };
  if (rate.count >= 5 || limits.size >= 2000 || requests.size >= 2000) return { status: 429, accepted: false };
  rate.count += 1;
  limits.set(client, rate);
  const promise = deliver(enquiry, key);
  requests.set(key, { fingerprint, expires: now + WINDOW, promise });
  const result = await promise;
  if (!result.accepted) requests.delete(key);
  return result;
}
