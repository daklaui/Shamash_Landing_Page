export const interestIds = ["xpertFactor", "factorix", "recouvrement", "xpertArchive", "aiAutomation", "webMobile", "managedIt"] as const;
export type Interest = (typeof interestIds)[number];
export type Enquiry = { name: string; email: string; organization: string; role: string; interest: Interest; message: string; locale: string };
export function isInterest(value: unknown): value is Interest {
  return typeof value === "string" && interestIds.includes(value as Interest);
}
export function validateEnquiry(value: unknown): Enquiry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const limits: Record<string, number> = { name: 120, email: 254, organization: 160, role: 120, message: 4000 };
  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const item = input[key] ?? (key === "role" ? "" : undefined);
    if (typeof item !== "string" || item.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(item)) return null;
    fields[key] = item.trim();
    if (key !== "role" && !fields[key]) return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || /[\r\n]/.test(fields.email)) return null;
  if (!isInterest(input.interest) || !["fr", "en", "ar", "tn"].includes(String(input.locale))) return null;
  if (input.website) return null;
  return { ...fields, interest: input.interest, locale: String(input.locale) } as Enquiry;
}
