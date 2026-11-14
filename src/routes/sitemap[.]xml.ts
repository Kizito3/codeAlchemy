import { createFileRoute } from "@tanstack/react-router";
import { getSitemapData } from "@/functions/seo";
import { SITE_URL } from "@/lib/seo";
import { SOLUTIONS } from "@/content/solutions";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const day = (d: Date | string) => new Date(d).toISOString().slice(0, 10);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
     GET: async () => {
  let posts, projects;
  try {
    ({ posts, projects } = await getSitemapData());
  } catch (err) {
    console.error("sitemap: getSitemapData failed", err);
    return new Response("Sitemap data error", { status: 500 });
  }

        // remove any page you haven't built
        const staticPages = ["/", "/about", "/work", "/insights", "/solutions", "/contact"];

        const urls = [
          ...staticPages.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: null as string | null })),
          ...projects.map((p) => ({ loc: `${SITE_URL}/work/${p.slug}`, lastmod: day(p.updatedAt) })),
          ...posts.map((p) => ({ loc: `${SITE_URL}/insights/${p.slug}`, lastmod: day(p.updatedAt) })),
          ...SOLUTIONS.map((s) => ({
  loc: `${SITE_URL}/solutions/${s.slug}`,
  lastmod: s.updated}))
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});