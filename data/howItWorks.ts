export type DeliveryStep = {
  id: "understand" | "design" | "integrate" | "support";
  number: string;
  title: string;
  summary: string;
};
