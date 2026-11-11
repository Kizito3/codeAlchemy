const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'");

const tags = (html: string, name: "meta" | "link") =>
  [...html.matchAll(new RegExp(`<${name}\\s[^>]*>`, "gi"))].map((m) => m[0]);

const attr = (tag: string, key: string) =>
  new RegExp(`${key}="([^"]*)"`, "i").exec(tag)?.[1] ?? "";

const meta = (html: string, key: string) =>
  attr(tags(html, "meta").find((t) => t.includes(`"${key}"`)) ?? "", "content");

async function main() {
  const sitemap = await fetch(`${BASE}/sitemap.xml`);
  if (!sitemap.ok) throw new Error(`sitemap.xml returned ${sitemap.status}`);
  const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const robots = await fetch(`${BASE}/robots.txt`);
  console.log(`robots.txt: ${robots.status}\n`);

  let failing = 0;

  for (const loc of urls) {
    const path = new URL(loc).pathname;
    const res = await fetch(`${BASE}${path}`);
    const html = await res.text();
    const issues: string[] = [];

    if (res.status !== 200) issues.push(`status ${res.status}`);

    const title = decode(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? "");
    if (!title) issues.push("missing title");
    else if (title.length > 60) issues.push(`title ${title.length} chars (max 60)`);

    const desc = decode(meta(html, "description"));
    if (!desc) issues.push("missing meta description");
    else if (desc.length < 70 || desc.length > 160) issues.push(`description ${desc.length} chars (aim 120-160)`);

    const canonical = attr(tags(html, "link").find((t) => t.includes('rel="canonical"')) ?? "", "href");
    if (!canonical) issues.push("missing canonical");
    else if (canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "")) issues.push(`canonical is ${canonical}`);

    const h1s = (html.match(/<h1[\s>]/gi) ?? []).length;
    if (h1s !== 1) issues.push(`${h1s} h1 tags (need exactly 1)`);

    if (!meta(html, "og:image")) issues.push("missing og:image");
    if (!meta(html, "og:title")) issues.push("missing og:title");
    if (/noindex/i.test(meta(html, "robots"))) issues.push("has noindex");

    const noAlt = [...html.matchAll(/<img\s[^>]*>/gi)].filter((m) => !/\salt=/.test(m[0])).length;
    if (noAlt > 0) issues.push(`${noAlt} image(s) without alt`);

    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(m[1]);
      } catch {
        issues.push("invalid JSON-LD");
      }
    }

    if (issues.length > 0) failing++;
    console.log(`${issues.length === 0 ? "PASS" : "FAIL"}  ${path}`);
    for (const issue of issues) console.log(`        - ${issue}`);
  }

  console.log(`\n${urls.length - failing}/${urls.length} pages passed`);
  process.exit(failing > 0 ? 1 : 0);
}

main();