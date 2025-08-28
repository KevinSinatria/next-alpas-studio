import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["bmgeuqxyshumafaxsauc.supabase.co"], // GANTI sesuai domain Supabase kamu
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;  