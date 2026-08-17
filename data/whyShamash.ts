import type { LucideIcon } from "lucide-react";

export type JourneyVisual =
  | "integration"
  | "workflow"
  | "data"
  | "visibility"
  | "security"
  | "scale";

export type WhyShamashJourneyItem = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  supportingLabel: string;
  icon: LucideIcon;
  visual: JourneyVisual;
};
