import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["exports/**", ".next-stale-i18n/**"] },
  ...nextVitals,
  ...nextTs
];

export default eslintConfig;
