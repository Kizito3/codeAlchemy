import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { Post } from "./types";

export default function ArticleHero({ post }: { post: Post }) {
  return (
    <section className="bg-[#E9F0E3] pb-10 pt-8 lg:pb-12 lg:pt-12">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <Link
          to="/insights"
          className="inline-flex items-center gap-1.5 font-montserrat text-[13px] text-[#197044] transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          All insights
        </Link>

        <div className="mt-8 flex items-center gap-2.5 font-montserrat lg:mt-9">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
            {post.category} / {post.readTime} min read
          </p>
        </div>

        <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:mt-7 lg:text-[96px] lg:leading-26">
          {post.title}
        </h1>

        <p className="mt-6 max-w-3xl font-montserrat text-lg leading-7 text-[#123D2B] lg:mt-8 lg:text-[22px] lg:leading-8">
          {post.excerpt}
        </p>

        <div className="mt-8 flex items-center justify-between border-y border-[#CFDAC8] py-4.5 font-montserrat text-xs lg:mt-10">
          <p className="text-[#123D2B]">By the codeAlchemy studio</p>
          <p className="text-[#647466]">Studio notes</p>
        </div>

        <figure className="mt-8">
          <img
            src={post.coverImage ?? "/images/blog1.svg"}
            alt=""
            className="aspect-4/3 w-full object-cover lg:aspect-1280/500"
          />
          {post.coverCaption && (
            <figcaption className="mt-5 font-montserrat text-xs text-[#647466]">
              {post.coverCaption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}