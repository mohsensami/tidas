import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "localhost:3000",
      "res.cloudinary.com",
      "192.168.0.218",
      "online-grocery-store-strapi-cms.onrender.com",
      "picsum.photos",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
