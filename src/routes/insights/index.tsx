import { createFileRoute } from "@tanstack/react-router";
import AboutCta from "#/components/about/about-cta";
import InsightsExplore from "#/components/insights/InsightsExplore";
import InsightsFeed from "#/components/insights/InsightsFeed";
import InsightsHero from "#/components/insights/InsightsHero";
import { getPublishedPosts } from "#/functions/posts";
import { insightsJsonLd, seoHead } from "#/lib/seo";

const TITLE = "Insights on Web Design & Development | codeAlchemy";
const DESCRIPTION =
  "Practical articles from the codeAlchemy studio on web design, development and strategy, for founders and teams planning a website that works.";

export const Route = createFileRoute("/insights/")({
  loader: () => getPublishedPosts(),
  head: ({ loaderData }) =>
    seoHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/insights",
      image: "/og-image.png",
      jsonLd: insightsJsonLd({
        title: TITLE,
        description: DESCRIPTION,
        path: "/insights",
        posts: loaderData ?? [],
      }),
    }),
  component: InsightsPage,
});

function InsightsPage() {
  const posts = Route.useLoaderData();

  return (
    <>
      <InsightsHero />
      <InsightsFeed posts={posts} />
      <InsightsExplore />
      <AboutCta />
    </>
  );
}