import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "objectstorage.us-phoenix-1.oraclecloud.com",
        pathname: "/**",
      },
    ],
  },
};

const withPWA = withPWAInit({
  dest: "public",                // Destination directory for the service worker files
  disable: process.env.NODE_ENV === "development", // Disable in development to avoid caching issues
  register: true,               // Automatically register the service worker
  // skipWaiting: true,            // Activate service worker immediately
});

export default withPWA(nextConfig);
