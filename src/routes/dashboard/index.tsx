import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getDashboardStats } from "@/functions/dashboard";
import PageHeader from "#/components/dashboard/page-header";
import OverviewSkeleton from "#/components/ui/loaders/OverviewSkeleton";

export const Route = createFileRoute("/dashboard/")({
  loader: async () => getDashboardStats(),
  pendingComponent: OverviewSkeleton,
  pendingMs: 200,
  component: Overview,
});

function Overview() {
  const stats = Route.useLoaderData();

  const cards = [
    { label: "Total posts", value: stats.totalPosts },
    { label: "Published", value: stats.publishedPosts },
    { label: "Drafts", value: stats.draftPosts },
    { label: "Projects", value: stats.projectCount },
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        description="A quick look at what's on the site."
      />

      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.label} className="border border-[#CFDAC8] bg-white p-5">
            <p className="font-montserrat text-xs text-[#647466]">
              {card.label}
            </p>
            <p className="mt-3 font-serif text-[40px] leading-none text-[#123D2B]">
              {card.value}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <section className="border border-[#CFDAC8] bg-white">
          <div className="flex items-center justify-between border-b border-[#CFDAC8] px-5 py-4">
            <h2 className="text-xl text-[#19382B]">Recent posts</h2>
            <Link
              to="/dashboard/posts"
              className="font-montserrat text-xs text-[#197044] transition-opacity hover:opacity-70"
            >
              View all
            </Link>
          </div>

          {stats.recent.length === 0 ? (
            <p className="px-5 py-8 font-montserrat text-sm text-[#647466]">
              No posts yet.
            </p>
          ) : (
            <ul className="divide-y divide-[#E3EADD]">
              {stats.recent.map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-montserrat text-sm text-[#19382B]">
                      {post.title}
                    </p>
                    <p className="mt-1 font-montserrat text-xs text-[#647466]">
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 font-montserrat text-[11px] ${
                      post.published
                        ? "bg-[#DCE6D2] text-[#197044]"
                        : "bg-[#EFEFEA] text-[#647466]"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="h-fit border border-[#CFDAC8] bg-white p-5">
          <h2 className="text-xl text-[#19382B]">Manage</h2>
          <ul className="mt-4 flex flex-col gap-3 font-montserrat text-sm">
            <li>
              <Link
                to="/dashboard/posts"
                className="inline-flex items-center gap-1.5 text-[#197044] transition-opacity hover:opacity-70"
              >
                Posts <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/projects"
                className="inline-flex items-center gap-1.5 text-[#197044] transition-opacity hover:opacity-70"
              >
                Projects <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
