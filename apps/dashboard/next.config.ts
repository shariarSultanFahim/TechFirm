import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/types", "@repo/validators"]
};

export default nextConfig;
