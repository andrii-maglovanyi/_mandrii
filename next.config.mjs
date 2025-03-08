/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z9bwg0saanmopyjs.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
