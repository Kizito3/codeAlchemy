import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "#/components/about/eyebrow";
import { ORG } from "#/content/about";
import type { Solution } from "#/content/solutions";

export default function SolutionHero({ solution }: { solution: Solution }) {
  const facts = [
    { label: "Built for", value: solution.audience },
    { label: "What’s included", value: solution.scope },
    {
      label: "Based in",
      value: `${ORG.location.locality}, ${ORG.location.region}, ${ORG.location.country}`,
    },
    { label: "We reply", value: ORG.replyTime },
  ];

  return (
    <section className="bg-[#E9F0E3] pb-12 pt-8 lg:pb-16 lg:pt-12">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-montserrat text-[13px] text-[#647466]">
            <li>
              <Link to="/" className="transition-colors hover:text-[#19382B]">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/solutions" className="transition-colors hover:text-[#19382B]">
                Solutions
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[#19382B]">{solution.label}</li>
          </ol>
        </nav>

        <Eyebrow className="mt-8 lg:mt-9">Solutions / {solution.label}</Eyebrow>

        <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:mt-7 lg:text-[80px] lg:leading-22">
          {solution.h1}
        </h1>

        <p className="mt-6 max-w-3xl font-montserrat text-lg leading-7 text-[#123D2B] lg:mt-8 lg:text-[22px] lg:leading-8">
          {solution.lede}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            to="/"
            hash="contact"
            className="inline-flex h-13 items-center gap-8 rounded-[3px] bg-[#123D2B] pl-5.75 pr-6 font-montserrat text-[13px] text-[#F5F7EF] transition-colors hover:bg-[#19382B]"
          >
            Start a project
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
          <Link
            to="/work"
            className="border-b border-[#197044] pb-0.5 font-montserrat text-[13px] text-[#197044] transition-opacity hover:opacity-70"
          >
            See our work
          </Link>
        </div>

        <dl className="mt-10 grid gap-6 border-y border-[#CFDAC8] py-6 font-montserrat sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[11px] uppercase tracking-[1px] text-[#647466]">{fact.label}</dt>
              <dd className="mt-1.5 text-sm leading-5 text-[#123D2B]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}