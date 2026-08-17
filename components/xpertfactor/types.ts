export type LabeledDetail = { label: string; detail: string };
export type LifecycleItem = { title: string; detail: string };
export type ModuleGroup = {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
};
export type PlatformView = {
  id: string;
  label: string;
  title: string;
  description: string;
  rows: string[];
};
export type WorkflowStep = { title: string; description: string };

