import { useMemo } from "react";
import { extractHeadings } from "@/lib/article";
import type { CaseStudy } from "./types";
import ArticleSidebar from "../insights/article-sidebar";
import ArticleMarkdown from "../insights/article-markdown";

export default function CaseStudyBody({ project }: { project: CaseStudy }) {
  const content = project.content ?? "";
  const headings = useMemo(() => extractHeadings(content), [content]);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,800px)] lg:gap-x-20">
          <ArticleSidebar headings={headings} title={project.title} />
          <article className="min-w-0">
            <ArticleMarkdown content={content} headings={headings} sectionLabel="Case study" />
          </article>
        </div>
      </div>
    </section>
  );
}