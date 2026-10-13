"use client";

import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function CarouselToggle({ paused, onToggle, disabled = false }: { paused: boolean; onToggle: () => void; disabled?: boolean }) {
  const t = useTranslations("common");
  return <button type="button" onClick={onToggle} disabled={disabled} aria-label={t(disabled ? "accessibility.motionDisabled" : paused ? "accessibility.resumeCarousel" : "accessibility.pauseCarousel")} aria-pressed={paused || disabled} className="inline-grid size-8 shrink-0 place-items-center rounded-full text-shamash-navy focus-visible:outline-shamash-blue">
    {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
  </button>;
}
