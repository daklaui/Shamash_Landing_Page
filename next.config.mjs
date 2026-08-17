import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev }) {
    if (dev) {
      // Avoid Windows file-lock races in Webpack's persistent pack cache.
      // Development still benefits from an in-memory cache; production keeps
      // Next.js's default filesystem cache behavior.
      config.cache = { type: "memory" };
    }

    return config;
  }
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
