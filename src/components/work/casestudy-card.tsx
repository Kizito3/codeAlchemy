import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyCardData } from "./types";

export default function CaseStudyCard({ project }: { project: CaseStudyCardData }) {
  const img = project.coverImage ?? project.image;

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className="group flex h-full flex-col">
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
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#CCD7C6] text-[#19382B] transition-colors group-hover:border-[#19382B]">
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </span>
      </div>
      {project.summary && (
        <p className="mt-3 line-clamp-2 font-montserrat text-[15px] leading-5.75 text-[#647466]">
          {project.summary}
        </p>
      )}
    </Link>
  );
}