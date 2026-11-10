import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Plus } from "lucide-react";
import { deletePost, getAllPosts, setPublished } from "@/functions/posts";
import PageHeader from "#/components/dashboard/page-header";
import PostsSkeleton from "#/components/loader";

export const Route = createFileRoute("/dashboard/posts/")({
  loader: () => getAllPosts(),
  pendingComponent: PostsSkeleton,
  pendingMs: 200,
  errorComponent: ({ error }) => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2">
      <p className="font-montserrat text-sm text-[#B3261E]">
        Failed to load posts.
      </p>
      <p className="font-montserrat text-xs text-[#647466]">
        {error instanceof Error ? error.message : "An unexpected error occurred."}
      </p>
    </div>
  ),
  component: PostsAdmin,
});

const filters = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
] as const;

type Filter = (typeof filters)[number]["key"];

function PostsAdmin() {
  const posts = Route.useLoaderData();
  const router = useRouter();
  const remove = useServerFn(deletePost);
  const publish = useServerFn(setPublished);

  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const visible = posts.filter((p) =>
    filter === "all"
      ? true
      : filter === "published"
        ? p.published
        : !p.published,
  );

  const run = async (id: number, action: () => Promise<unknown>) => {
    setError("");
    setBusyId(id);
    try {
      await action();
      await router.invalidate();
    } catch {
      setError("That didn't work. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Posts"
        description="Create, edit and publish your insights."
        action={
          <Link
            to="/dashboard/posts/new"
            className="inline-flex h-12 items-center gap-2 rounded-[3px] bg-[#123D2B] px-5 font-montserrat text-sm text-[#F5F7EF] transition-colors hover:bg-[#19382B]"
          >
            <Plus className="size-4" strokeWidth={1.5} />
            New post
          </Link>
        }
      />

      <div className="mt-6 flex gap-2 font-montserrat text-xs">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`cursor-pointer px-4 py-2 transition-colors ${
              filter === f.key
                ? "bg-[#123D2B] text-[#F5F7EF]"
                : "border border-[#CCD7C6] bg-white text-[#647466] hover:border-[#197044]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 font-montserrat text-sm text-[#B3261E]">
          {error}
        </p>
      )}

      <div className="mt-6 border border-[#CFDAC8] bg-white">
        {visible.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="font-montserrat text-sm text-[#647466]">
              {posts.length === 0 ? "No posts yet." : "No posts in this view."}
            </p>
            {posts.length === 0 && (
              <Link
                to="/dashboard/posts/new"
                className="mt-4 inline-block font-montserrat text-sm text-[#197044] underline underline-offset-4"
              >
                Write your first post
              </Link>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-[#E3EADD]">
            {visible.map((post) => {
              const busy = busyId === post.id;
              return (
                <li
                  key={post.id}
                  className={`flex flex-col gap-4 px-5 py-5 transition-opacity lg:flex-row lg:items-center lg:justify-between ${
                    busy ? "opacity-50" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <Link
                      to="/dashboard/posts/$id"
                      params={{ id: String(post.id) }}
                      className="block truncate font-montserrat text-[15px] text-[#19382B] transition-colors hover:text-[#197044]"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 font-montserrat text-xs text-[#647466]">
                      {post.category} · {post.readTime} min read ·{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-montserrat text-xs">
                    <span
                      className={`px-2.5 py-1 text-[11px] ${
                        post.published
                          ? "bg-[#DCE6D2] text-[#197044]"
                          : "bg-[#EFEFEA] text-[#647466]"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>

                    <Link
                      to="/dashboard/posts/$id"
                      params={{ id: String(post.id) }}
                      className="text-[#197044] transition-opacity hover:opacity-70"
                    >
                      Edit
                    </Link>

                    {post.published && (
                      <a
                        href={`/insights/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#197044] transition-opacity hover:opacity-70"
                      >
                        View
                      </a>
                    )}

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        run(post.id, () =>
                          publish({
                            data: { id: post.id, published: !post.published },
                          }),
                        )
                      }
                      className="cursor-pointer text-[#647466] transition-colors hover:text-[#19382B] disabled:cursor-not-allowed"
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        if (
                          !confirm(
                            `Delete "${post.title}"? This can't be undone.`,
                          )
                        )
                          return;
                        run(post.id, () => remove({ data: post.id }));
                      }}
                      className="cursor-pointer text-[#B3261E] transition-opacity hover:opacity-70 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
