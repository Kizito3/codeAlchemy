import { createServerFn } from "@tanstack/react-start";

export const getSitemapData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadSitemapData } = await import("@/server/sitemap-data.server");
  return loadSitemapData();
});