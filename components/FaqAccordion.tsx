"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocalizedFaqs } from "@/data/localized";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items?: { question: string; answer: string }[] }) {
  const defaultItems = useLocalizedFaqs();
  const resolvedItems = items ?? defaultItems;
  const [openIndex, setOpenIndex] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <div className="space-y-3">
      {resolvedItems.map((faq, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={faq.question} className="rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-base font-bold leading-6 text-shamash-navy"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className={cn("h-5 w-5 shrink-0 transition", isOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: reducedMotion ? 0.16 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-base leading-relaxed text-neutral-text">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
