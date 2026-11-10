import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Plus } from "lucide-react";
import {
  deleteProject,
  getAllProjects,
  setProjectPublished,
} from "@/functions/projects";
import PageHeader from "#/components/dashboard/page-header";

export const Route = createFileRoute("/dashboard/projects/")({
  loader: () => getAllProjects(),
  // pendingComponent: ListSkeleton,
  // pendingMs: 200,
  component: ProjectsAdmin,
});

const filters = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
] as const;

type Filter = (typeof filters)[number]["key"];

function ProjectsAdmin() {
  const projects = Route.useLoaderData();
  const router = useRouter();
  const remove = useServerFn(deleteProject);
  const publish = useServerFn(setProjectPublished);

  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const visible = projects.filter((p) =>
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
        title="Projects"
        description="Manage the work shown on the homepage."
        action={
          <Link
            to="/dashboard/projects/new"
            className="inline-flex h-12 items-center gap-2 rounded-[3px] bg-[#123D2B] px-5 font-montserrat text-sm text-[#F5F7EF] transition-colors hover:bg-[#19382B]"
          >
            <Plus className="size-4" strokeWidth={1.5} />
            New project
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
              {projects.length === 0
                ? "No projects yet."
                : "No projects in this view."}
            </p>
            {projects.length === 0 && (
              <Link
                to="/dashboard/projects/new"
                className="mt-4 inline-block font-montserrat text-sm text-[#197044] underline underline-offset-4"
              >
                Add your first project
              </Link>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-[#E3EADD]">
            {visible.map((project) => {
              const busy = busyId === project.id;
              return (
                <li
                  key={project.id}
                  className={`flex flex-col gap-4 px-5 py-5 transition-opacity lg:flex-row lg:items-center lg:justify-between ${
                    busy ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="h-14 w-24 shrink-0 border border-[#CFDAC8] object-cover"
                      />
                    ) : (
                      <div className="h-14 w-24 shrink-0 bg-[#EFEFEA]" />
                    )}
                    <div className="min-w-0">
                      <Link
                        to="/dashboard/projects/$id"
                        params={{ id: String(project.id) }}
                        className="block truncate font-montserrat text-[15px] text-[#19382B] transition-colors hover:text-[#197044]"
                      >
                        {project.title}
                      </Link>
                      <p className="mt-1 truncate font-montserrat text-xs text-[#647466]">
                        Order {project.sortOrder} · {project.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-montserrat text-xs">
                    {project.featured && (
                      <span className="border border-[#CCD7C6] px-2.5 py-1 text-[11px] text-[#197044]">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-1 text-[11px] ${
                        project.published
                          ? "bg-[#DCE6D2] text-[#197044]"
                          : "bg-[#EFEFEA] text-[#647466]"
                      }`}
                    >
                      {project.published ? "Published" : "Draft"}
                    </span>

                    <Link
                      to="/dashboard/projects/$id"
                      params={{ id: String(project.id) }}
                      className="text-[#197044] transition-opacity hover:opacity-70"
                    >
                      Edit
                    </Link>
                    <Link
                      to="/dashboard/projects/case-study/$id"
                      params={{ id: String(project.id) }}
                      className="text-[#197044] transition-opacity hover:opacity-70"
                    >
                      Case study{project.caseStudyPublished ? " ✓" : ""}
                    </Link>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#197044] transition-opacity hover:opacity-70"
                      >
                        Visit
                      </a>
                    )}

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        run(project.id, () =>
                          publish({
                            data: {
                              id: project.id,
                              published: !project.published,
                            },
                          }),
                        )
                      }
                      className="cursor-pointer text-[#647466] transition-colors hover:text-[#19382B] disabled:cursor-not-allowed"
                    >
                      {project.published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        if (
                          !confirm(
                            `Delete "${project.title}"? This can't be undone.`,
                          )
                        )
                          return;
                        run(project.id, () => remove({ data: project.id }));
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
