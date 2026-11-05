import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    slug: "before-the-pixels",
    category: "Strategy",
    readTime: "6 min read",
    title: "Before the pixels: asking better questions.",
    excerpt:
      "The conversations that turn a website brief into a clear creative direction.",
    image: "/images/blog2.svg",
  },
  {
    slug: "a-quieter-web",
    category: "Design",
    readTime: "4 min read",
    title: "A quieter web can make a louder impression.",
    excerpt:
      "Why restraint, rhythm and a little breathing room help a brand stand apart.",
    image: "/images/blog1.svg",
  },
  {
    slug: "beautiful-is-only-the-beginning",
    category: "Development",
    readTime: "7 min read",
    title: "Beautiful is only the beginning.",
    excerpt:
      "What to look for beneath the surface of a well-built, future-ready website.",
    image: "/images/blog2.svg",
  },
] as const;

export default function InsightsSection() {
  return (
    <section className="bg-white py-16 lg:py-26">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
                06 / The journal
              </p>
            </div>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:mt-5 lg:text-[60px] lg:leading-16">
              Thoughts from the studio.
            </h2>
          </div>

          <Link
            to="/insights"
            className="inline-flex h-13 w-full items-center justify-between rounded-[3px] border border-[#CCD7C6] pl-5.75 pr-6 font-montserrat text-[13px] text-[#19382B] transition-colors hover:bg-[#F5F7EF] lg:mb-1 lg:w-auto lg:justify-start lg:gap-8"
          >
            All insights
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Posts */}
        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-11 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to="/insights" className="group flex h-full flex-col">
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="aspect-405/260 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5.5 flex items-center justify-between font-montserrat text-[11px]">
                  <p className="uppercase tracking-[1px] text-[#197044]">
                    {post.category}
                  </p>
                  <p className="text-[#647466]">{post.readTime}</p>
                </div>

                <h3 className="mt-5 max-w-90 text-[26px] leading-8.5 text-[#19382B] lg:text-[30px] lg:leading-8.5">
                  {post.title}
                </h3>

                <p className="mt-5 font-montserrat text-[15px] leading-5.75 text-[#647466]">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-[#D5DCCF] pt-3.5 font-montserrat text-xs text-[#197044]">
                  <span className="mt-0">Read the story</span>
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