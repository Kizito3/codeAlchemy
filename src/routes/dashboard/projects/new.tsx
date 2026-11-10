import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createProject, getAllProjects } from "@/functions/projects";
import PageHeader from "#/components/dashboard/page-header";
import ProjectForm from "#/components/dashboard/project-form";

export const Route = createFileRoute("/dashboard/projects/new")({
  loader: () => getAllProjects(),
  component: NewProject,
});

function NewProject() {
  const existing = Route.useLoaderData();
  const navigate = useNavigate();
  const create = useServerFn(createProject);

  // new projects go to the end by default
  const nextOrder = Math.max(-1, ...existing.map((p) => p.sortOrder)) + 1;

  return (
    <>
      <PageHeader title="New project" description="Add a piece of work to the homepage." />
      <div className="mt-8">
        <ProjectForm
          submitLabel="Create project"
          defaultSortOrder={nextOrder}
          onSubmit={async (values) => {
            const res = await create({ data: values });
            if (!res.ok) return res;
            await navigate({ to: "/dashboard/projects" });
            return { ok: true };
          }}
        />
      </div>
    </>
  );
}