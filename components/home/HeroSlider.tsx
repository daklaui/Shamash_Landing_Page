"use client";

import { AnimatePresence, motion, useIsPresent, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { HTMLMotionProps } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedHeroSlides } from "@/data/localized";
import { Button } from "@/components/ui/Button";
import { CarouselToggle } from "@/components/ui/CarouselToggle";

const AUTOPLAY_MS = 7200;
const RESUME_AFTER_MS = 3200;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;

const imageScaleBySlide: Record<string, string> = {
  xpertfactor: "scale-[1.07]",
  factorix: "scale-[1.07]",
  "recouvrement-creances": "scale-[1.07]",
  "document-management": "scale-[1.07]",
  "ai-automation": "scale-[1.12]",
  "web-mobile-development": "scale-[1.04]"
};

export function HeroSlider() {
  const t = useTranslations("home");
  const locale = useLocale();
  const heroSlides = useLocalizedHeroSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [pageHidden, setPageHidden] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const progress = useMotionValue(0);
  const [manualPaused, setManualPaused] = useState(false);
  const indicatorFocus = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const activeSlide = heroSlides[activeIndex];
  const reducedMotion = Boolean(useReducedMotion());
  const isPaused = manualPaused || pageHidden || hoverPaused || focusPaused || interactionPaused || reducedMotion;
  const isAutoplaying = !isPaused;
  const motionDirection = locale === "ar" ? -slideDirection : slideDirection;

  const resetAutoplayClock = useCallback(() => {
    elapsedRef.current = 0;
    lastFrameRef.current = null;
    progress.set(0);
  }, [progress]);

  const holdAutoplay = useCallback((delay = RESUME_AFTER_MS) => {
    setInteractionPaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setInteractionPaused(false);
      resumeTimerRef.current = null;
    }, delay);
  }, []);

  const goToSlide = useCallback(
    (index: number, resumeDelay = RESUME_AFTER_MS) => {
      holdAutoplay(resumeDelay);
      if (index === activeIndex) {
        return;
      }
      indicatorFocus.current = true;
      resetAutoplayClock();
      setSlideDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex, holdAutoplay, resetAutoplayClock]
  );

  const next = useCallback(() => {
    holdAutoplay();
    resetAutoplayClock();
    setSlideDirection(1);
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  }, [heroSlides.length, holdAutoplay, resetAutoplayClock]);

  const previous = useCallback(() => {
    holdAutoplay();
    resetAutoplayClock();
    setSlideDirection(-1);
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length, holdAutoplay, resetAutoplayClock]);

  useEffect(() => {
    if (!isAutoplaying) {
      lastFrameRef.current = null;
      return;
    }

    let frame = 0;

    const tick = (timestamp: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
      }

      const delta = timestamp - lastFrameRef.current;
      lastFrameRef.current = timestamp;
      elapsedRef.current += delta;

      if (elapsedRef.current >= AUTOPLAY_MS) {
        resetAutoplayClock();
        setSlideDirection(1);
        setActiveIndex((current) => (current + 1) % heroSlides.length);
      } else {
        progress.set(elapsedRef.current / AUTOPLAY_MS);
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [heroSlides.length, isAutoplaying, progress, resetAutoplayClock]);

  useEffect(() => {
    if (indicatorFocus.current) {
      const target = Array.from(sectionRef.current?.querySelectorAll<HTMLButtonElement>("button[aria-current='true']") || []).find(button => !button.closest("[inert]"));
      target?.focus({ preventScroll: true });
      indicatorFocus.current = false;
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const indicatorLabel = useMemo(
    () => t("hero.slideStatus", { current: activeIndex + 1, total: heroSlides.length, title: activeSlide.title }),
    [activeIndex, activeSlide.title, heroSlides.length, t]
  );

  const contentVariants = {
    initial: (direction: number) =>
      reducedMotion
        ? { opacity: 0 }
        : { opacity: 0, y: direction * 18, scale: 0.99 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reducedMotion
        ? { duration: 0.22 }
        : {
            duration: 0.82,
            ease: EASE_OUT,
            when: "beforeChildren",
            staggerChildren: 0.09,
            delayChildren: 0.18
          }
    },
    exit: (direction: number) =>
      reducedMotion
        ? { opacity: 0, transition: { duration: 0.18 } }
        : {
            opacity: 0,
            y: direction * -14,
            scale: 0.99,
            transition: { duration: 0.38, ease: EASE_IN }
          }
  };

  const itemVariants = {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: reducedMotion
      ? { opacity: 1, transition: { duration: 0.2 } }
      : { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE_OUT } }
  };

  const visualVariants = {
    initial: (direction: number) =>
      reducedMotion
        ? { opacity: 0 }
        : { opacity: 0, y: direction * 24, scale: 0.965 },
    animate: reducedMotion
      ? { opacity: 1, transition: { duration: 0.24 } }
      : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.95, ease: EASE_OUT, delay: 0.18 } },
    exit: (direction: number) =>
      reducedMotion
        ? { opacity: 0, transition: { duration: 0.2 } }
        : {
            opacity: 0,
            y: direction * -18,
            scale: 0.975,
            transition: { duration: 0.42, ease: EASE_IN }
          }
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={t("hero.regionLabel")}
      className="relative isolate overflow-hidden bg-white"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => {
        setHoverPaused(false);
        holdAutoplay(2200);
      }}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setFocusPaused(false);
        holdAutoplay(2200);
      }}
      onKeyDown={(event) => {
        if (!(event.target instanceof Element) || !event.target.closest("[data-hero-progress]")) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goToSlide((activeIndex + (locale === "ar" ? -1 : 1) + heroSlides.length) % heroSlides.length);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToSlide((activeIndex + (locale === "ar" ? 1 : -1) + heroSlides.length) % heroSlides.length);
        }
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) {
          return;
        }
        const delta = touchStart.current - (event.changedTouches[0]?.clientX ?? touchStart.current);
        if (Math.abs(delta) > 40) {
          if ((delta > 0) !== (locale === "ar")) {
            next();
          } else {
            previous();
          }
        }
        touchStart.current = null;
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_68%,#ffffff_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(53,168,222,0.06)_0%,transparent_28%,rgba(80,92,162,0.055)_78%,transparent_100%)]" />
      <div className="subtle-grid absolute inset-0 -z-10 opacity-[0.32]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-slate-200" />

      <div className="hero-slider-shell">
        <div className="hero-slider-copy">
          <AnimatePresence initial={false} custom={motionDirection} mode="popLayout">
            <SlideContent
              key={activeSlide.id}
              custom={motionDirection}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative flex min-h-[inherit] flex-col justify-center"
            >
              <motion.h1
                variants={itemVariants}
                className="hero-slider-title text-balance"
              >
                {activeSlide.headline}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="hero-slider-description"
              >
                {activeSlide.description}
              </motion.p>

              <motion.div variants={itemVariants} className="hero-slider-actions">
                <Button
                  href={activeSlide.primaryCta.href}
                  onClick={() => holdAutoplay()}
                >
                  {activeSlide.primaryCta.label}
                </Button>
                <Button
                  href={activeSlide.secondaryCta.href}
                  variant="secondary"
                  onClick={() => holdAutoplay()}
                >
                  {activeSlide.secondaryCta.label}
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                data-hero-progress
                className="hero-slider-progress flex w-full max-w-[720px] items-center gap-2"
                aria-label={indicatorLabel}
              >
                {heroSlides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  const targetScale = index < activeIndex ? 1 : isActive ? (reducedMotion ? 1 : progress) : 0;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={t("hero.showSlide", { title: slide.title })}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goToSlide(index)}
                      className="group h-8 flex-1 rounded-full p-1 focus-visible:outline-shamash-blue"
                    >
                      <span className="block h-2 overflow-hidden rounded-full bg-slate-200/90 transition duration-snappy ease-premium group-hover:bg-slate-300/90">
                        <motion.span
                          className="block h-full origin-left rounded-full bg-gradient-to-r from-shamash-blue to-shamash-indigo"
                          style={{ scaleX: targetScale }}
                        />
                      </span>
                      <span className="sr-only">{slide.title}</span>
                    </button>
                  );
                })}
                <CarouselToggle paused={manualPaused} disabled={reducedMotion} onToggle={() => setManualPaused(current => !current)} />
                <p className="sr-only" aria-live={isPaused ? "polite" : "off"}>
                  {indicatorLabel}
                </p>
              </motion.div>
            </SlideContent>
          </AnimatePresence>
        </div>

        <div className="hero-slider-visual-stage">
          <div aria-hidden="true" className="absolute inset-x-6 top-1/2 h-[58%] -translate-y-1/2 rounded-full bg-shamash-blue/12 blur-3xl" />
          <div aria-hidden="true" className="absolute bottom-20 right-6 h-56 w-72 rounded-full bg-shamash-indigo/12 blur-3xl" />
          <div aria-hidden="true" className="absolute left-8 top-20 h-44 w-64 rounded-full bg-shamash-gold/10 blur-3xl" />

          <AnimatePresence initial={false} custom={motionDirection}>
            <SlideContent
              key={activeSlide.id}
              custom={motionDirection}
              variants={visualVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="relative mx-auto flex h-full max-w-[1180px] items-center justify-center overflow-visible px-0 sm:px-4">
                <div className="hero-slider-image-shell">
                  <Image
                    src={activeSlide.image.src}
                    alt={activeSlide.image.alt}
                    fill
                    sizes="(max-width: 1023px) 94vw, (max-width: 1365px) 64vw, (max-width: 1840px) 66vw, 1216px"
                    className={`object-contain drop-shadow-[0_36px_58px_rgba(36,40,80,0.18)] ${imageScaleBySlide[activeSlide.id] ?? "scale-100"}`}
                    preload={activeIndex === 0}
                  />
                </div>
              </div>
            </SlideContent>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function SlideContent(props: HTMLMotionProps<"div">) {
  const present = useIsPresent();
  return <motion.div {...props} aria-hidden={!present || undefined} inert={!present || undefined} />;
}
