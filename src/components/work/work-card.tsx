import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyCardData } from "./types";

export type WorkCardData = CaseStudyCardData & {
  url: string | null;
  caseStudyPublished: boolean;
};

export default function WorkCard({ project }: { project: WorkCardData }) {
  const img = project.image ?? project.coverImage;

  const content: ReactNode = (
    <>
      <div className="p-3 lg:p-6" style={{ backgroundColor: project.bgColor }}>
        {img && (
          <img
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className="block aspect-568/318 w-full object-cover"
          />
        )}
      </div>

      <p className="mt-5 font-montserrat text-[11px] uppercase leading-4 tracking-[1px] text-[#647466]">
        {project.category}
      </p>

      <div className="mt-2.5 flex items-center justify-between gap-4">
        <h3 className="text-[30px] leading-9 text-[#19382B]">{project.title}</h3>
        {(project.caseStudyPublished || project.url) && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#CCD7C6] text-[#19382B] transition-colors group-hover:border-[#19382B]">
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        )}
      </div>

      {project.summary && (
        <p className="mt-3 line-clamp-2 font-montserrat text-[15px] leading-5.75 text-[#647466]">
          {project.summary}
        </p>
      )}

      {project.caseStudyPublished ? (
        <p className="mt-4 font-montserrat text-xs text-[#197044]">Read the case study</p>
      ) : project.url ? (
        <p className="mt-4 font-montserrat text-xs text-[#197044]">
          Visit website
          <span className="sr-only"> (opens in a new tab)</span>
        </p>
      ) : null}
    </>
  );

  // 1. has a case study: link to our own page
  if (project.caseStudyPublished) {
    return (
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="group flex h-full flex-col"
      >
        {content}
      </Link>
    );
  }

  // 2. no case study but a live site: link out
  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col"
      >
        {content}
      </a>
    );
  }

  // 3. neither: show the project without a link
  return <div className="group flex h-full flex-col">{content}</div>;
}