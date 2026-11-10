import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "./InsightCard";
import type { ListPost } from "./types";

export default function FeaturedInsight({ post }: { post: ListPost }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: post.slug }}
      className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
    >
      <div className="overflow-hidden">
        <img
          src={post.coverImage ?? "/images/blog1.svg"}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div>
        <div className="flex items-center gap-2.5 font-montserrat">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
            Latest / {post.category}
          </p>
        </div>

        <h2 className="mt-5 text-[34px] leading-10 text-[#19382B] lg:text-[48px] lg:leading-13">
          {post.title}
        </h2>

        <p className="mt-5 max-w-lg font-montserrat text-base leading-7 text-[#647466]">
          {post.excerpt}
        </p>

        <p className="mt-5 font-montserrat text-xs text-[#647466]">
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {formatDate(post.createdAt)}
          </time>{" "}
          · {post.readTime} min read
        </p>

        <span className="mt-7 inline-flex items-center gap-2 border-b border-[#197044] pb-0.5 font-montserrat text-sm text-[#197044] transition-opacity group-hover:opacity-70">
          Read the story
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}