/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: true,
    webpackBuildWorker: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        protocol: "https",
      },
      {
        hostname: "learningmole.com",
        pathname: "/wp-content/uploads/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
