import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyCardData } from "./types";
import CaseStudyCard from "./casestudy-card";

export default function CaseStudyFooter({ more }: { more: CaseStudyCardData[] }) {
  return (
    <>
      {more.length > 0 && (
        <section className="bg-[#E9F0E3] py-16 lg:py-24">
          <div className="mx-auto max-w-360 px-6 lg:px-20">
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">More work</p>
            </div>
            <h2 className="mt-6 text-[44px] leading-12 text-[#123D2B] lg:text-[56px] lg:leading-15">
              Explore more explorations.
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {more.map((project) => (
                <li key={project.id}>
                  <CaseStudyCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-[#0A2B20] py-16 lg:py-24">
        <div className="mx-auto max-w-360 px-6 lg:px-20">
          <h2 className="max-w-2xl text-[44px] leading-12 text-[#F5F7EF] lg:text-[64px] lg:leading-18">
            Have something like this in mind?
          </h2>
          <p className="mt-6 max-w-lg font-montserrat text-base leading-6.75 text-[#B8C4BB]">
            Tell us a little about it. We’ll take it from there.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex h-13 items-center gap-8 rounded-[3px] bg-[#D5E6B8] pl-5.75 pr-6 font-montserrat text-[13px] text-[#0A2B20] transition-colors hover:bg-[#E2EFCB]"
          >
            Start a project
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  );
}