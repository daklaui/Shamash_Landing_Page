"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { interestIds, type Interest } from "@/lib/contact-schema";

export function ContactForm({ initialInterest = "" }: { initialInterest?: Interest | "" }) {
  const [status, setStatus] = useState<"idle" | "pending" | "accepted" | "failed">("idle");
  const [errorKey, setErrorKey] = useState<"failure" | "rateLimited">("failure");
  const pending = useRef(false);
  const attempt = useRef<{ payload: string; key: string } | null>(null);
  const locale = useLocale();
  const t = useTranslations("contact");

  return (
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel md:p-6" aria-busy={status === "pending"} onSubmit={async (event) => {
      event.preventDefault();
      if (pending.current || status === "accepted") return;
      const form = event.currentTarget;
      const payload = JSON.stringify({ ...Object.fromEntries(new FormData(form)), locale });
      if (attempt.current?.payload !== payload) attempt.current = { payload, key: crypto.randomUUID() };
      pending.current = true;
      setStatus("pending");
      try {
        const response = await fetch("/api/contact", { method: "POST", signal: AbortSignal.timeout(15_000), headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.current.key }, body: payload });
        const result = await response.json();
        if (!response.ok || result.accepted !== true) {
          setErrorKey(response.status === 429 ? "rateLimited" : "failure");
          setStatus("failed");
          return;
        }
        setStatus("accepted");
      } catch { setErrorKey("failure"); setStatus("failed"); }
      finally { pending.current = false; }
    }}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("form.fullName")} id="name" required maxLength={120} autoComplete="name" />
        <Field label={t("form.workEmail")} id="email" type="email" required maxLength={254} autoComplete="email" />
        <Field label={t("form.organization")} id="organization" required maxLength={160} autoComplete="organization" />
        <Field label={t("form.role")} id="role" maxLength={120} autoComplete="organization-title" />
      </div>

      <label htmlFor="interest" className="mt-5 block text-sm font-semibold text-shamash-navy">
        {t("form.mainInterest")} <RequiredMark label={t("form.required")} />
      </label>
      <select id="interest" name="interest" required className="mt-2 min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-base leading-relaxed text-neutral-text" defaultValue={initialInterest}>
        <option value="" disabled>{t("form.selectArea")}</option>
        {interestIds.map((interest) => <option key={interest} value={interest}>{t(`form.interests.${interest}`)}</option>)}
      </select>

      <label htmlFor="message" className="mt-5 block text-sm font-semibold text-shamash-navy">
        {t("form.messageLabel")} <RequiredMark label={t("form.required")} />
      </label>
      <textarea id="message" name="message" required maxLength={4000} rows={5} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-base leading-relaxed text-neutral-text" placeholder={t("form.messagePlaceholder")} />
      <div hidden aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>

      <Button type="submit" className="mt-6" disabled={status === "pending" || status === "accepted"}>{t(status === "pending" ? "form.sending" : "form.submit")}</Button>
      <div aria-live="polite" aria-atomic="true">
        {status === "accepted" ? <p role="status" className="mt-4 rounded-md bg-shamash-blue/10 px-4 py-3 text-sm font-semibold text-shamash-navy">{t("form.success")}</p> : null}
        {status === "failed" ? <p role="alert" className="mt-4 text-sm font-semibold text-shamash-navy">{t(`form.${errorKey}`)}</p> : null}
      </div>
    </form>
  );
}

function RequiredMark({ label }: { label: string }) {
  return <span className="text-shamash-indigo" aria-label={label}>*</span>;
}

function Field({ label, id, type = "text", required = false, maxLength, autoComplete }: { label: string; id: string; type?: string; required?: boolean; maxLength: number; autoComplete: string }) {
  const t = useTranslations("contact");
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-shamash-navy">
        {label} {required ? <RequiredMark label={t("form.required")} /> : null}
      </label>
      <input id={id} name={id} type={type} required={required} maxLength={maxLength} autoComplete={autoComplete} className="mt-2 min-h-12 w-full rounded-md border border-slate-300 px-3 text-base leading-relaxed text-neutral-text" />
    </div>
  );
}
