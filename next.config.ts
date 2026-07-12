import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site has no server logic and is served as static
  // files by Caddy (see Dockerfile). `next build` emits to `out/`.
  output: "export",
};

export default nextConfig;
