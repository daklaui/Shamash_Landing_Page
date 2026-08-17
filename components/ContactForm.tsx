"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const interestIds = ["xpertFactor", "factorix", "xpertArchive", "aiAutomation", "webMobile", "managedIt"] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact");

  return (
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel md:p-6" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("form.fullName")} id="name" required />
        <Field label={t("form.workEmail")} id="email" type="email" required />
        <Field label={t("form.organization")} id="organization" required />
        <Field label={t("form.role")} id="role" />
      </div>

      <label htmlFor="interest" className="mt-5 block text-sm font-semibold text-shamash-navy">
        {t("form.mainInterest")} <RequiredMark label={t("form.required")} />
      </label>
      <select id="interest" name="interest" required className="mt-2 min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-base leading-relaxed text-neutral-text" defaultValue="">
        <option value="" disabled>{t("form.selectArea")}</option>
        {interestIds.map((interest) => <option key={interest} value={interest}>{t(`form.interests.${interest}`)}</option>)}
      </select>

      <label htmlFor="message" className="mt-5 block text-sm font-semibold text-shamash-navy">
        {t("form.messageLabel")} <RequiredMark label={t("form.required")} />
      </label>
      <textarea id="message" name="message" required rows={5} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-base leading-relaxed text-neutral-text" placeholder={t("form.messagePlaceholder")} />

      <Button type="submit" className="mt-6">{t("form.submit")}</Button>
      {submitted ? <p role="status" className="mt-4 rounded-md bg-shamash-blue/10 px-4 py-3 text-sm font-semibold text-shamash-navy">{t("form.success")}</p> : null}
    </form>
  );
}

function RequiredMark({ label }: { label: string }) {
  return <span className="text-shamash-indigo" aria-label={label}>*</span>;
}

function Field({ label, id, type = "text", required = false }: { label: string; id: string; type?: string; required?: boolean }) {
  const t = useTranslations("contact");
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-shamash-navy">
        {label} {required ? <RequiredMark label={t("form.required")} /> : null}
      </label>
      <input id={id} name={id} type={type} required={required} className="mt-2 min-h-12 w-full rounded-md border border-slate-300 px-3 text-base leading-relaxed text-neutral-text" />
    </div>
  );
}
