import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: "мандруй / мрій / дій",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/web-app-manifest-512x512.png",
        type: "image/png",
      },
    ],
    name: "Mandrii",
    short_name: "Mandrii",
    start_url: "/",
    theme_color: "#000000",
  };
}
