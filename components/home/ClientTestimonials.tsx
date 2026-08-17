"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedTestimonials } from "@/data/localized";
import { MotionGroup, MotionItem, MotionSection } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";
import { motionTokens } from "@/lib/designTokens";

const ROTATION_INTERVAL = 12_000;

export function ClientTestimonials() {
  const t = useTranslations("home");
  const locale = useLocale();
  const testimonials = useLocalizedTestimonials();
  const reducedMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(() => {
    const featuredIndex = testimonials.findIndex((testimonial) => testimonial.featured);
    return featuredIndex >= 0 ? featuredIndex : 0;
  });
  const [paused, setPaused] = useState(false);
  const active = testimonials[activeIndex];

  useEffect(() => {
    if (reducedMotion || paused || testimonials.length < 2) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, testimonials.length]);

  const selectTestimonial = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
    setPaused(true);
  };

  return (
    <MotionSection className="testimonials-section bg-neutral-page" aria-labelledby="testimonials-title">
      <div className="container-shell">
        <MotionGroup className="testimonials-heading">
          <MotionItem>
            <p className="eyebrow-text">{t("testimonials.eyebrow")}</p>
          </MotionItem>
          <MotionItem>
            <h2 id="testimonials-title" className="testimonials-title">
              {t("testimonials.title")}
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="testimonials-copy">
              {t("testimonials.description")}
            </p>
          </MotionItem>
        </MotionGroup>

        <MotionItem
          className="testimonials-experience"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") move(locale === "ar" ? 1 : -1);
            if (event.key === "ArrowRight") move(locale === "ar" ? -1 : 1);
          }}
        >
          <div className="testimonial-stage" role="region" aria-live="polite" aria-label={t("testimonials.selectedLabel")}>
            <span className="testimonial-stage__quote-mark" aria-hidden="true"><Quote /></span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.id}
                id={`testimonial-panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`testimonial-tab-${active.id}`}
                data-content-status={active.status}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0.01 : motionTokens.duration.standard, ease: motionTokens.curve }}
                className="testimonial-stage__content"
              >
                <p className="testimonial-stage__organization">{active.organization}</p>
                <blockquote>“{active.copy}”</blockquote>
                <div className="testimonial-stage__footer">
                  <div className="testimonial-stage__person">
                    <span aria-hidden="true">{getInitials(active.name)}</span>
                    <div>
                      <h3>{active.name}</h3>
                      <p>{[active.role, active.organization].filter(Boolean).join(" · ")}</p>
                    </div>
                  </div>
                  <ul aria-label={t("testimonials.themesLabel")}>
                    {active.theme.slice(0, 3).map((theme) => (
                      <li key={theme}>{theme}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="testimonials-navigation">
            <div className="testimonials-tabs" role="tablist" aria-label={t("testimonials.chooseLabel")}>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  id={`testimonial-tab-${testimonial.id}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls={`testimonial-panel-${testimonial.id}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => selectTestimonial(index)}
                  className={cn("testimonial-tab", index === activeIndex && "is-active")}
                >
                  <span className="testimonial-tab__initials" aria-hidden="true">{getInitials(testimonial.name)}</span>
                  <span>
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.organization}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="testimonials-arrows" aria-label={t("testimonials.navigationLabel")}>
              <button type="button" onClick={() => move(-1)} aria-label={t("testimonials.previous")}><ArrowLeft className="rtl:rotate-180" /></button>
              <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => move(1)} aria-label={t("testimonials.next")}><ArrowRight className="rtl:rotate-180" /></button>
            </div>
          </div>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
