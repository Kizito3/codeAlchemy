import { useMemo, useState } from "react";
import FeaturedInsight from "./FeaturedInsight";
import InsightCard from "./InsightCard";
import type { ListPost } from "./types";

export default function InsightsFeed({ posts }: { posts: ListPost[] }) {
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [posts]);

  if (posts.length === 0) {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-360 px-6 text-center lg:px-20">
          <p className="font-montserrat text-base text-[#647466]">
            New insights are on the way. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  const filtered =
    category === "All" ? posts : posts.filter((p) => p.category === category);
  const featured = category === "All" ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  const chip = (active: boolean) =>
    `cursor-pointer px-4 py-2 font-montserrat text-xs transition-colors ${
      active
        ? "bg-[#123D2B] text-[#F5F7EF]"
        : "border border-[#CCD7C6] bg-white text-[#647466] hover:border-[#197044]"
    }`;

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        {categories.length > 1 && (
          <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={category === "All"}
              onClick={() => setCategory("All")}
              className={chip(category === "All")}
            >
              All ({posts.length})
            </button>
            {categories.map(([name, count]) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
                className={chip(category === name)}
              >
                {name} ({count})
              </button>
            ))}
          </div>
        )}

        {featured && (
          <div className="mt-10 border-b border-[#E3EADD] pb-12 lg:mt-12 lg:pb-16">
            <FeaturedInsight post={featured} />
          </div>
        )}

        {rest.length > 0 && (
          <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.id}>
                <InsightCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}