import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Allow images from the TMDB domain
  },
};

export default nextConfig;
