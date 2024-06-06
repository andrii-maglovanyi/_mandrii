/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:topic",
        destination: "/api/ref?topic=:topic",
        basePath: false,
        has: [{ type: "host", value: "ref.mandrii.com" }],
      },
    ];
  },
};

export default nextConfig;
