import { createFileRoute } from "@tanstack/react-router";
import { getPublishedProjects } from "@/functions/projects";
import { seoHead } from "@/lib/seo";
import WorkCard from "#/components/work/work-card";

export const Route = createFileRoute("/work/")({
  loader: () => getPublishedProjects(),
  head: () =>
    seoHead({
      title: "Selected work & case studies | codeAlchemy",
      description:
        "Selected projects and case studies from codeAlchemy: thoughtfully designed, carefully built websites across architecture, wellness and hospitality.",
      path: "/work",
    }),
  component: WorkPage,
});

function WorkPage() {
  const projects = Route.useLoaderData();

  return (
    <section className="bg-[#E9F0E3] pb-16 pt-12 lg:pb-26 lg:pt-20">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="flex items-center gap-2.5 font-montserrat">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">Selected work</p>
        </div>
        <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:text-[96px] lg:leading-26">
          Made with intention.
        </h1>
        <p className="mt-6 max-w-2xl font-montserrat text-base leading-7 text-[#647466] lg:text-lg">
          A closer look at how we think, design and build.
        </p>

        {projects.length === 0 ? (
          <p className="mt-12 font-montserrat text-sm text-[#647466]">Projects are coming soon.</p>
        ) : (
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <WorkCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}