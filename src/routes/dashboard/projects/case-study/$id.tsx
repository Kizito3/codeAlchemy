import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getProjectById, saveCaseStudy } from "@/functions/projects";
import PageHeader from "#/components/dashboard/page-header";
import CaseStudyForm from "#/components/dashboard/casestudy-form";

export const Route = createFileRoute("/dashboard/projects/case-study/$id")({
  loader: ({ params }) => getProjectById({ data: Number(params.id) }),
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-4xl text-[#123D2B]">Project not found.</h1>
      <Link to="/dashboard/projects" className="mt-4 inline-block text-[#197044] underline">
        Back to projects
      </Link>
    </div>
  ),
  component: CaseStudyEditor,
});

function CaseStudyEditor() {
  const project = Route.useLoaderData();
  const navigate = useNavigate();
  const save = useServerFn(saveCaseStudy);

  return (
    <>
      <PageHeader
        title="Case study"
        description={project.title}
        action={
          project.caseStudyPublished ? (
            <a
              href={`/work/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat text-sm text-[#197044] underline underline-offset-4"
            >
              View live page
            </a>
          ) : undefined
        }
      />
      <div className="mt-8">
        <CaseStudyForm
          key={project.id}
          project={project}
          onSubmit={async (values) => {
            const res = await save({ data: { id: project.id, values } });
            if (!res.ok) return res;
            await navigate({ to: "/dashboard/projects" });
            return { ok: true };
          }}
        />
      </div>
    </>
  );
}