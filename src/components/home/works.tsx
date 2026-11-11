import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type WorkProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string | null;
  mobileImage: string | null;
  url: string | null;
  bgColor: string;
  featured: boolean;
  caseStudyPublished: boolean;
};

function CardShell({
  project,
  children,
}: {
  project: WorkProject;
  children: ReactNode;
}) {
  if (project.caseStudyPublished) {
    return (
      <Link to="/work/$slug" params={{ slug: project.slug }} className="group block">
        {children}
      </Link>
    );
  }
  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
        {children}
      </a>
    );
  }
  return <div className="group block">{children}</div>;
}

export default function WorkSection({ projects }: { projects: WorkProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="bg-[#E9F0E3] pb-16 pt-16 lg:pb-26 lg:pt-26">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
                03 / Selected explorations
              </p>
            </div>
            <h2 className="mt-8 text-[44px] leading-12 text-[#19382B] lg:mt-6 lg:text-[56px] lg:leading-15">
              Made with intention.
            </h2>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-87.5 lg:pb-1">
            <p className="font-montserrat text-base leading-7 text-[#647466]">
              Different worlds. The same attention to detail.
            </p>
            <p className="mt-8.5 font-montserrat text-xs leading-4 text-[#197044] lg:mt-2.5">
              Independent concepts · Imagined brands, real craft
            </p>
          </div>
        </div>

        {/* Projects */}
        <ul className="mt-8 grid gap-y-8.5 lg:mt-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12.5">
          {projects.map((project) => {
            const desktopSrc = project.image ?? project.mobileImage;
            const mobileSrc = project.mobileImage ?? project.image;

            return (
              <li key={project.id} className={project.featured ? "lg:col-span-2" : ""}>
                <CardShell project={project}>
                  {/* Coloured frame */}
                  <div
                    className={`p-3 ${project.featured ? "lg:p-11" : "lg:p-7"}`}
                    style={{ backgroundColor: project.bgColor }}
                  >
                    {mobileSrc && desktopSrc && (
                      <picture>
                        <source media="(min-width: 1024px)" srcSet={desktopSrc} />
                        <img
                          src={mobileSrc}
                          alt={`${project.title} website preview`}
                          className={`block h-auto w-full lg:object-cover ${
                            project.featured ? "lg:aspect-1192/458" : "lg:aspect-568/318"
                          }`}
                        />
                      </picture>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-x-4">
                    <p className="col-span-2 font-montserrat text-[11px] uppercase leading-4 tracking-[1px] text-[#647466] lg:col-span-1">
                      {project.category}
                    </p>
                    <h3 className="mt-5.5 text-[32px] leading-10 text-[#19382B] lg:mt-2.5 lg:text-[30px] lg:leading-9">
                      {project.title}
                    </h3>
                    <span className="mt-5.5 flex size-11 items-center justify-center rounded-full border border-[#CCD7C6] text-[#19382B] transition-colors group-hover:border-[#19382B] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </CardShell>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="mt-8.5 flex justify-center lg:mt-12.5">
          <Link
            to="/contact"
            className="flex h-13 w-full items-center justify-between rounded-[3px] border border-[#CCD7C6] pl-5.75 pr-6 font-montserrat text-[13px] text-[#19382B] transition-colors hover:bg-[#F5F7EF] lg:w-auto lg:gap-8"
          >
            Have something in mind? Let’s make it.
            <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}