/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Source art is JPEG; serve modern formats with responsive sizes.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920, 2048],
    imageSizes: [128, 192, 256, 384, 512],
  },
};

export default nextConfig;
