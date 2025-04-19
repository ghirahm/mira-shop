import type { NextConfig } from "next";

  /** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "encrypted-tbn0.gstatic.com"]
  },
};

export default nextConfig;
