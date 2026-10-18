import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

const nextConfig = {
  async headers() {
    // Only content-hashed files are safe to cache immutably across deployments.
    return ["assets", "business"].flatMap((directory) =>
      readdirSync(new URL(`./public/${directory}/`, import.meta.url))
        .filter((name) => /\.[a-f0-9]{12}\.webp$/.test(name))
        .map((name) => ({
          source: `/${directory}/${name}`,
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        }))
    );
  },
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
};

export default nextConfig;
