// Use a plain JS (CommonJS) config so it loads on every Next.js version,
// including older ones that don't support a TypeScript `next.config.ts`.
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Nothing on the site is displayed wider than the detail-page hero (~600 CSS
    // px, so ~1200 device px on a retina screen). Dropping the 1920/2048/3840
    // steps stops phones with a 3× DPR from pulling a needlessly large variant,
    // and keeps the number of cached renditions per photo small.
    deviceSizes: [640, 750, 828, 1080, 1200],

    // Source photos are pre-compressed WebP (scripts/optimize-images.mjs), so
    // re-encoding is cheap. AVIF is left off on purpose: it costs ~50% more CPU
    // per render and doubles the cache for a few KB on already-small files.
    formats: ["image/webp"],

    // Product shots are stable assets and admin uploads get a unique filename
    // on every save, so nothing is served from a path that changes underneath a
    // cached response. Default is 4 hours, which re-optimizes far too often.
    minimumCacheTTL: 2678400, // 31 days
  },
};

module.exports = nextConfig;
