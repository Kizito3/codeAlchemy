import { createFileRoute, Link } from "@tanstack/react-router";
import { getPostPage } from "@/functions/posts";
import ArticleHero from "#/components/insights/article-hero";
import ArticleBody from "#/components/insights/article-body";
import RelatedInsights from "#/components/insights/related-insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => getPostPage({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | codeAlchemy` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        ...(post.coverImage
          ? [{ property: "og:image", content: post.coverImage }]
          : []),
      ],
    };
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