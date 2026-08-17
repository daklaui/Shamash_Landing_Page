"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { referenceLogos } from "@/data/references";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const revealItem = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
  visible: reducedMotion
    ? { opacity: 1, transition: { duration: 0.18 } }
    : { opacity: 1, y: 0, transition: { duration: 0.6, ease: REVEAL_EASE } }
});

const revealCarousel = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.99 },
  visible: reducedMotion
    ? { opacity: 1, transition: { duration: 0.18 } }
    : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.72, ease: REVEAL_EASE } }
});

const revealGlow = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86 },
  visible: reducedMotion
    ? { opacity: 1, transition: { duration: 0.16 } }
    : { opacity: 1, scale: 1, transition: { duration: 1.2, ease: REVEAL_EASE } }
});

type CarouselConfig = {
  slidesPerView: number;
  gap: number;
};

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width >= 1700) return { slidesPerView: 6, gap: 32 };
  if (width >= 1050) return { slidesPerView: 5, gap: 26 };
  if (width >= 820) return { slidesPerView: 4, gap: 24 };
  if (width >= 620) return { slidesPerView: 3, gap: 20 };
  if (width >= 380) return { slidesPerView: 2.15, gap: 16 };
  if (width >= 330) return { slidesPerView: 2.05, gap: 14 };
  if (width >= 300) return { slidesPerView: 1.85, gap: 14 };
  return { slidesPerView: 1.28, gap: 14 };
};

export function ClientReferences() {
  const t = useTranslations("home");
  const locale = useLocale();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const dragStartRef = useRef<number | null>(null);

  const config = useMemo(() => getCarouselConfig(viewportWidth), [viewportWidth]);
  const slideWidth = viewportWidth
    ? Math.max(128, (viewportWidth - config.gap * (config.slidesPerView - 1)) / config.slidesPerView)
    : 180;
  const stepSize = slideWidth + config.gap;
  const maxIndex = Math.max(0, referenceLogos.length - Math.ceil(config.slidesPerView));
  const visibleIndex = Math.min(activeIndex, maxIndex);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(() => {
        if (index < 0) return maxIndex;
        if (index > maxIndex) return 0;
        return index;
      });
    },
    [maxIndex]
  );

  const goNext = useCallback(() => goTo(visibleIndex + 1), [goTo, visibleIndex]);
  const goPrevious = useCallback(() => goTo(visibleIndex - 1), [goTo, visibleIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => setViewportWidth(viewport.clientWidth);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || maxIndex === 0) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index >= maxIndex ? 0 : index + 1));
    }, 2800);
    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex, prefersReducedMotion]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientX;
    setIsPaused(true);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;
    dragStartRef.current = null;
    setIsPaused(false);
    if (dragStart === null) return;

    const dragDistance = event.clientX - dragStart;
    if (Math.abs(dragDistance) < 36) return;
    if ((dragDistance < 0) !== (locale === "ar")) {
      goNext();
    } else {
      goPrevious();
    }
  };

  return (
    <motion.section
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={prefersReducedMotion ? { duration: 0.18 } : { duration: 0.7, ease: REVEAL_EASE }}
      className="references-section relative isolate block overflow-clip border-y border-slate-100 bg-white"
      aria-labelledby="references-title"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-shamash-navy" />
      <motion.div
        aria-hidden="true"
        variants={revealGlow(prefersReducedMotion)}
        className="references-accent references-accent--corner"
      />
      <motion.div
        aria-hidden="true"
        variants={revealGlow(prefersReducedMotion)}
        className="references-accent references-accent--glow-right"
      />
      <motion.div
        aria-hidden="true"
        variants={revealGlow(prefersReducedMotion)}
        className="references-accent references-accent--glow-center"
      />

      <div className="container-shell relative">
        <div className="references-header">
          <motion.p variants={revealItem(prefersReducedMotion)} className="eyebrow-text">
            {t("references.eyebrow")}
          </motion.p>
          <motion.span
            aria-hidden="true"
            variants={revealItem(prefersReducedMotion)}
            className="references-rule"
          />
          <motion.h2 id="references-title" variants={revealItem(prefersReducedMotion)} className="references-title">
            {t("references.title")}
          </motion.h2>
          <motion.p variants={revealItem(prefersReducedMotion)} className="references-description">
            {t("references.description")}
          </motion.p>
        </div>

        <motion.div
          variants={revealCarousel(prefersReducedMotion)}
          className="references-panel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="references-carousel" aria-label={t("references.carouselLabel")}>
            <button className="references-arrow" type="button" aria-label={t("references.previous")} onClick={goPrevious}>
              <ChevronLeft aria-hidden="true" className="h-5 w-5 rtl:rotate-180" />
            </button>

            <div
              ref={viewportRef}
              className="references-carousel-viewport"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                dragStartRef.current = null;
                setIsPaused(false);
              }}
            >
              <motion.div
                className="references-track"
                style={{
                  gap: `${config.gap}px`,
                  transform: `translate3d(${(locale === "ar" ? 1 : -1) * visibleIndex * stepSize}px, 0, 0)`
                }}
              >
                {referenceLogos.map((reference) => (
                  <motion.article
                    variants={revealItem(prefersReducedMotion)}
                    key={reference.id}
                    className="reference-card reference-slide"
                    aria-label={reference.name}
                    style={{ flexBasis: `${slideWidth}px` }}
                  >
                    <div className="reference-logo-box">
                      <Image
                        src={reference.logo}
                        alt={t("references.logoAlt", { name: reference.name })}
                        width={260}
                        height={120}
                        className="reference-logo-image"
                        sizes="(min-width: 1920px) 150px, (min-width: 1536px) 140px, (min-width: 1024px) 128px, (min-width: 640px) 24vw, 52vw"
                        draggable={false}
                      />
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>

            <button className="references-arrow" type="button" aria-label={t("references.next")} onClick={goNext}>
              <ChevronRight aria-hidden="true" className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
