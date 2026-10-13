"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { motionTokens } from "@/lib/designTokens";

const sectionVariants = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion
      ? { duration: 0.2 }
      : {
          duration: motionTokens.duration.reveal,
          ease: motionTokens.curve,
          when: "beforeChildren",
          staggerChildren: motionTokens.stagger
        }
  }
});

const itemVariants = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
  visible: reducedMotion
    ? { opacity: 1, transition: { duration: 0.18 } }
    : {
        opacity: 1,
        y: 0,
        transition: {
          duration: motionTokens.duration.reveal,
          ease: motionTokens.curve
        }
      }
});

export const sharedMotion = {
  section: sectionVariants,
  item: itemVariants,
  tokens: motionTokens
} as const;

export function MotionSection({
  className,
  children,
  ...props
}: HTMLMotionProps<"section">) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      variants={sectionVariants(reducedMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

type MotionBoxProps = {
  as?: "div" | "article";
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function MotionGroup({
  as = "div",
  className,
  children,
  ...props
}: MotionBoxProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const Component = as === "article" ? motion.article : motion.div;

  return (
    <Component
      variants={sectionVariants(reducedMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function MotionItem({
  as = "div",
  className,
  children,
  ...props
}: MotionBoxProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const Component = as === "article" ? motion.article : motion.div;

  return (
    <Component variants={itemVariants(reducedMotion)} className={cn(className)} {...props}>
      {children}
    </Component>
  );
}

export function MotionListItem({ children, className, ...props }: HTMLMotionProps<"li">) {
  const reducedMotion = Boolean(useReducedMotion());
  return <motion.li variants={itemVariants(reducedMotion)} className={cn(className)} {...props}>{children}</motion.li>;
}
