import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gift_Flat_Icon_Vector.svg/2048px-Gift_Flat_Icon_Vector.svg.png",
      ),
    ],
  },
};

export default nextConfig;
