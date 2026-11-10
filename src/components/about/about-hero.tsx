import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DEFINITION, ORG } from "#/content/about";
import Eyebrow from "./eyebrow";

export default function AboutHero() {
  const facts = [
    {
      label: "Based in",
      value: `${ORG.location.locality}, ${ORG.location.region}, ${ORG.location.country}`,
    },
    ORG.founded ? { label: "Founded", value: String(ORG.founded) } : null,
    { label: "What we do", value: ORG.services.join(", ") },
    { label: "Works with", value: ORG.audience },
    { label: "We reply", value: ORG.replyTime },
  ].filter((f): f is { label: string; value: string } => f !== null);

  return (
    <section className="bg-[#E9F0E3] pb-12 pt-8 lg:pb-16 lg:pt-12">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-montserrat text-[13px] text-[#647466]">
            <li>
              <Link to="/" className="transition-colors hover:text-[#19382B]">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[#19382B]">About</li>
          </ol>
        </nav>

        <Eyebrow className="mt-8 lg:mt-9">About codeAlchemy</Eyebrow>

        <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:mt-7 lg:text-[88px] lg:leading-24">
          A web design studio built on clarity, craft and care.
        </h1>

        <p className="mt-6 max-w-3xl font-montserrat text-lg leading-7 text-[#123D2B] lg:mt-8 lg:text-[22px] lg:leading-8">
          {DEFINITION}
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

        <dl className="mt-10 grid gap-6 border-y border-[#CFDAC8] py-6 font-montserrat sm:grid-cols-2 lg:mt-14 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
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