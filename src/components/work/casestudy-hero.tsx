import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "./types";

export default function CaseStudyHero({ project }: { project: CaseStudy }) {
  const cover = project.coverImage ?? project.image;

  const meta = [
    project.client ? { label: "Client", value: project.client } : null,
    project.year ? { label: "Year", value: String(project.year) } : null,
    project.servicesProvided.length > 0
      ? { label: "What we did", value: project.servicesProvided.join(", ") }
      : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <section className="bg-[#E9F0E3] pb-10 pt-8 lg:pb-14 lg:pt-12">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-montserrat text-[13px] text-[#647466]">
            <li>
              <Link to="/" className="transition-colors hover:text-[#19382B]">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/work" className="transition-colors hover:text-[#19382B]">Work</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[#19382B]">{project.title}</li>
          </ol>
        </nav>

        <div className="mt-8 flex items-center gap-2.5 font-montserrat lg:mt-9">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
            Case study / {project.category}
          </p>
        </div>

        <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:mt-7 lg:text-[96px] lg:leading-26">
          {project.title}
        </h1>

        {project.summary && (
          <p className="mt-6 max-w-3xl font-montserrat text-lg leading-7 text-[#123D2B] lg:mt-8 lg:text-[22px] lg:leading-8">
            {project.summary}
          </p>
        )}

        {(meta.length > 0 || project.url) && (
          <dl className="mt-8 grid gap-6 border-y border-[#CFDAC8] py-5 font-montserrat sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] uppercase tracking-[1px] text-[#647466]">{item.label}</dt>
                <dd className="mt-1.5 text-sm text-[#123D2B]">{item.value}</dd>
              </div>
            ))}
            {project.url && (
              <div>
                <dt className="text-[11px] uppercase tracking-[1px] text-[#647466]">Live site</dt>
                <dd className="mt-1.5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#197044] transition-opacity hover:opacity-70"
                  >
                    Visit website
                    <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        )}

        {cover && (
          <figure className="mt-8">
            <img
              src={cover}
              alt={`${project.title} website design preview`}
              fetchPriority="high"
              decoding="async"
              className="aspect-4/3 w-full object-cover lg:aspect-1280/500"
            />
          </figure>
        )}
      </div>
    </section>
  );
}