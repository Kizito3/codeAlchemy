import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ListPost } from "./types";

export const formatDate = (value: Date | string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function InsightCard({ post }: { post: ListPost }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={post.coverImage ?? "/images/blog1.svg"}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-405/260 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5.5 flex items-center justify-between gap-4 font-montserrat text-[11px]">
        <p className="uppercase tracking-[1px] text-[#197044]">{post.category}</p>
        <p className="text-[#647466]">
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {formatDate(post.createdAt)}
          </time>{" "}
          · {post.readTime} min read
        </p>
      </div>

      <h3 className="mt-5 max-w-90 text-[26px] leading-8.5 text-[#19382B] lg:text-[30px]">
        {post.title}
      </h3>

      <p className="mt-5 font-montserrat text-[15px] leading-5.75 text-[#647466] line-clamp-2">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-[#D5DCCF] pt-3.5 font-montserrat text-xs text-[#197044]">
        <span>Read the story</span>
        <ArrowUpRight
          className="size-3.5 text-[#19382B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}