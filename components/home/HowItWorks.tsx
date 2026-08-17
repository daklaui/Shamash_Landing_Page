"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Cable, Headset, PencilRuler, SearchCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import type { DeliveryStep } from "@/data/howItWorks";
import { useDeliverySteps } from "@/data/localized";
import { MotionGroup, MotionItem, MotionSection } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";
import { motionTokens } from "@/lib/designTokens";

const iconMap = {
  understand: SearchCheck,
  design: PencilRuler,
  integrate: Cable,
  support: Headset
} satisfies Record<DeliveryStep["id"], typeof SearchCheck>;

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.reveal,
      delay: index * 0.16,
      ease: motionTokens.curve
    }
  })
};

const connectorVariants: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: (index: number) => ({
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: motionTokens.duration.standard,
      delay: index * 0.16 + 0.12,
      ease: motionTokens.curve
    }
  })
};

export function HowItWorks() {
  const t = useTranslations("home");
  const deliverySteps = useDeliverySteps();
  const reducedMotion = Boolean(useReducedMotion());
  const [activeStep, setActiveStep] = useState<DeliveryStep["id"]>("understand");

  return (
    <MotionSection className="how-it-works-section bg-neutral-page" aria-labelledby="how-it-works-title">
      <div className="container-shell">
        <MotionGroup className="how-it-works-heading">
          <div>
            <MotionItem>
              <p className="eyebrow-text">{t("how.eyebrow")}</p>
            </MotionItem>
            <MotionItem>
              <h2 id="how-it-works-title" className="how-it-works-title">
                {t("how.title")}
              </h2>
            </MotionItem>
          </div>
          <MotionItem>
            <p className="how-it-works-copy">
              {t("how.description")}
            </p>
          </MotionItem>
        </MotionGroup>

        <motion.ol
          className="how-it-works-steps"
          aria-label={t("how.processLabel")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          {deliverySteps.map((step, index) => {
            const Icon = iconMap[step.id];
            const isActive = activeStep === step.id;

            return (
              <motion.li
                key={step.id}
                custom={index}
                variants={reducedMotion ? undefined : stepVariants}
                initial={reducedMotion ? { opacity: 1 } : undefined}
                className={cn("how-it-works-step", isActive && "is-active")}
              >
                <motion.article
                  tabIndex={0}
                  aria-current={isActive ? "step" : undefined}
                  onPointerEnter={() => setActiveStep(step.id)}
                  onFocus={() => setActiveStep(step.id)}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                  transition={motionTokens.spring}
                >
                  <div className="how-it-works-step__marker" aria-hidden="true">
                    <span>{step.number}</span>
                    <span className="how-it-works-step__icon">
                      <Icon />
                    </span>
                  </div>
                  <div className="how-it-works-step__body">
                    <p className="how-it-works-step__verb">{t("how.stepLabel", { number: index + 1 })}</p>
                    <h3>{step.title}</h3>
                    <p>{step.summary}</p>
                  </div>
                  <span className="how-it-works-step__signal" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </motion.article>

                {index < deliverySteps.length - 1 ? (
                  <motion.span
                    custom={index}
                    variants={reducedMotion ? undefined : connectorVariants}
                    initial={reducedMotion ? { scaleX: 1, scaleY: 1 } : undefined}
                    className="how-it-works-connector"
                    aria-hidden="true"
                  >
                    <span />
                  </motion.span>
                ) : null}
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </MotionSection>
  );
}
