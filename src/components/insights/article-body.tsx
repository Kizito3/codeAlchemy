import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { extractHeadings } from "@/lib/article";
import type { Post } from "./types";
import ArticleSidebar from "./article-sidebar";
import ArticleMarkdown from "./article-markdown";

export default function ArticleBody({ post }: { post: Post }) {
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,800px)] lg:gap-x-20">
          <ArticleSidebar headings={headings} title={post.title} />

          <article className="min-w-0">
            <ArticleMarkdown
              content={post.content}
              headings={headings}
              sectionLabel={post.sectionLabel ?? post.category}
            />

            <footer className="mt-14 border-y border-[#D5DCCF] py-7">
              <h3 className="text-[22px] leading-7 text-[#19382B]">
                From the codeAlchemy studio
              </h3>
              <p className="mt-2 max-w-130 font-montserrat text-[13px] leading-5 text-[#647466]">
                Independent minds, connecting strategy, design and development.
                We share the thinking behind thoughtful digital experiences.
              </p>
              <Link
                to="/insights"
                className="mt-3 inline-flex items-center gap-1.5 font-montserrat text-xs text-[#197044] transition-opacity hover:opacity-70"
              >
                <ArrowLeft className="size-3" strokeWidth={1.5} />
                Back to all insights
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}