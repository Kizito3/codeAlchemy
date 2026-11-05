import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    slug: "vote-naija",
    title: "VoteNaija",
    category: "Architecture / Brand direction, website design & development",
    bg: "bg-[#D8DDD0]",
    frame: "lg:p-11",
    span: "lg:col-span-2",
    desktopImg: "/images/vn2.png",
    mobileImg: "/images/vn2.png",
  },
  {
    slug: "stella-sync",
    title: "StellaSync",
    category: "Wellness / E-commerce & digital identity",
    bg: "bg-[#D6DCC8]",
    frame: "lg:p-7",
    span: "",
    desktopImg: "/images/stellasync.png",
    mobileImg: "/images/stellasync.png",
  },
  {
    slug: "klinsheet-consulting",
    title: "Klinsheet Consulting",
    category: "Dependable Background check company",
    bg: "bg-[#D6CCBA]",
    frame: "lg:p-7",
    span: "",
    desktopImg: "/images/klinsheet.png",
    mobileImg: "/images/klinsheet.png",
  },
] as const;

export default function WorkSection() {
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
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:mt-5 lg:text-[56px] lg:leading-15">
              Made with intention.
            </h2>
          </div>

          <div className="mt-6 lg:mt-0 lg:w-87.5 lg:pb-1">
            <p className="font-montserrat text-base leading-7 text-[#647466]">
              Different worlds. The same attention to detail.
            </p>
            <p className="mt-9 font-montserrat text-xs text-[#197044] lg:mt-2.5">
              Independent concepts · Imagined brands, real craft
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-8 grid gap-y-8 lg:mt-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-14">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/work"
              className={`group block ${project.span}`}
            >
              <div className={`${project.bg} p-3 ${project.frame}`}>
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={project.desktopImg}
                  />
                  <img
                    src={project.mobileImg}
                    alt={`${project.title} website preview`}
                    className="block h-auto w-full"
                  />
                </picture>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-x-4 lg:mt-5">
                <p className="col-span-2 font-montserrat text-[11px] uppercase leading-4 tracking-[1px] text-[#647466] lg:col-span-1">
                  {project.category}
                </p>
                <h3 className="mt-3 text-[32px] leading-10 text-[#19382B] lg:mt-1 lg:text-[30px] lg:leading-9">
                  {project.title}
                </h3>
                <span className="mt-3 flex size-11 items-center justify-center rounded-full border border-[#CCD7C6] text-[#19382B] transition-colors group-hover:border-[#123D2B] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center lg:mt-14">
          <Link
            to="/about"
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