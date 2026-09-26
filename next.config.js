/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // Allows next/image to serve the locally-authored SVG illustrations
    // under public/k8s/. These are hand-authored, not user-uploaded, so the
    // usual SVG/XSS risk next/image guards against doesn't apply here.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
