import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Protocol used by Cloudinary
        hostname: 'res.cloudinary.com', // The Cloudinary hostname from the error
        port: '', // Default port (usually empty for https)
        pathname: `/${process.env.CLOUDINARY_NAME}/**`, // Optional: Restrict to your cloud name's path pattern

      }]
  }
};

export default nextConfig;
