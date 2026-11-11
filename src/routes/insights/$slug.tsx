import { createFileRoute, Link } from "@tanstack/react-router";
import ArticleBody from "#/components/insights/article-body";
import ArticleHero from "#/components/insights/article-hero";
import RelatedInsights from "#/components/insights/related-insights";
import { getPostPage } from "#/functions/posts";
import { articleJsonLd, clamp, seoHead, SITE_NAME } from "#/lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => getPostPage({ data: params.slug }),
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { post } = loaderData;

    const path = `/insights/${params.slug}`;
    const withBrand = `${post.title} | ${SITE_NAME}`;
    const title = withBrand.length <= 60 ? withBrand : post.title;
    const description = clamp(post.excerpt, 160);

    // social platforms don't support SVG, so fall back to the default image
    const image =
      post.coverImage && !/\.svg$/i.test(post.coverImage) ? post.coverImage : null;

    const published = new Date(post.createdAt).toISOString();
    const wordCount = post.content.trim().split(/\s+/).length;

    return seoHead({
      title,
      description,
      path,
      image,
      type: "article",
      extraMeta: [
        { property: "article:published_time", content: published },
        { property: "article:section", content: post.category },
      ],
      jsonLd: articleJsonLd({
        title: post.title,
        description,
        path,
        image,
        datePublished: published,
        dateModified: published,
        section: post.category,
        wordCount,
      }),
    });
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-5xl text-[#123D2B]">Story not found.</h1>
      <Link to="/insights" className="mt-6 inline-block text-[#197044] underline">
        Back to all insights
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <>
      <ArticleHero post={post} />
      <ArticleBody post={post} />
      <RelatedInsights posts={related} />
    </>
  );
}