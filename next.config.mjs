import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
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
