import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { RelatedPost } from "./types";

export default function RelatedInsights({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-white pb-16 pt-4 lg:pb-26 lg:pt-12">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="flex items-center gap-2.5 font-montserrat">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
            Keep thinking / Related insights
          </p>
        </div>

        <h2 className="mt-6 text-[44px] leading-12 text-[#123D2B] lg:mt-8 lg:text-[60px] lg:leading-16">
          A little more perspective.
        </h2>

        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to="/insights/$slug"
                params={{ slug: post.slug }}
                className="group flex h-full flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.coverImage ?? "/images/blog1.svg"}
                    alt=""
                    className="aspect-624/340 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between font-montserrat text-[11px]">
                  <p className="uppercase tracking-[1px] text-[#197044]">
                    {post.category}
                  </p>
                  <p className="text-[#647466]">{post.readTime} min read</p>
                </div>

                <h3 className="mt-5 text-[26px] leading-8.5 text-[#19382B] lg:text-[30px]">
                  {post.title}
                </h3>

                <p className="mt-4 font-montserrat text-[15px] leading-5.75 text-[#647466]">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}