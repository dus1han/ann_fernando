import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first — typically 25–35% smaller than WebP on photographic content,
    // which is all this site serves. Next falls back automatically.
    formats: ["image/avif", "image/webp"],

    // Trimmed ladder. No source image here is wider than 2000px, so generating
    // 2048/3840 variants only wastes transform budget and cache entries.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 2000],
    // Small fixed sizes: the social icons, thumbnail rail, and avatars.
    imageSizes: [56, 64, 96, 128, 256, 384],

    // Images are content-addressed by filename and never change in place.
    minimumCacheTTL: 31_536_000, // 1 year
  },

  // Pulls only the used exports out of the motion bundle rather than the
  // whole package — the largest JS dependency on the site.
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
