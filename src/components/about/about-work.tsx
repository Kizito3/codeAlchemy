import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import CaseStudyCard from "#/components/work/casestudy-card";
import type { CaseStudyCardData } from "#/components/work/types";
import Eyebrow from "./eyebrow";

export default function AboutWork({ projects }: { projects: CaseStudyCardData[] }) {
  const shown = projects.slice(0, 2);
  if (shown.length === 0) return null;

  return (
    <section className="bg-[#F5F7EF] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
              See the thinking in practice.
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 border-b border-[#197044] pb-0.5 font-montserrat text-sm text-[#197044] transition-opacity hover:opacity-70 lg:mb-1"
          >
            View all work
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {shown.map((project) => (
            <li key={project.id}>
              <CaseStudyCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}