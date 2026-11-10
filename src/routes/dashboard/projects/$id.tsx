import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { getProjectById, updateProject } from "@/functions/projects";
import PageHeader from "#/components/dashboard/page-header";
import ProjectForm from "#/components/dashboard/project-form";

export const Route = createFileRoute("/dashboard/projects/$id")({
  loader: ({ params }) => getProjectById({ data: Number(params.id) }),
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-4xl text-[#123D2B]">Project not found.</h1>
      <Link to="/dashboard/projects" className="mt-4 inline-block text-[#197044] underline">
        Back to projects
      </Link>
    </div>
  ),
  component: EditProject,
});

function EditProject() {
  const project = Route.useLoaderData();
  const navigate = useNavigate();
  const update = useServerFn(updateProject);

  return (
    <>
      <PageHeader title="Edit project" description={project.title} />
      <div className="mt-8">
        <ProjectForm
          key={project.id}
          initial={project}
          submitLabel="Save changes"
          onSubmit={async (values) => {
            const res = await update({ data: { id: project.id, values } });
            if (!res.ok) return res;
            await navigate({ to: "/dashboard/projects" });
            return { ok: true };
          }}
        />
      </div>
    </>
  );
}