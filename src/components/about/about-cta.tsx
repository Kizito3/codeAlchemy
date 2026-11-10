import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ORG } from "#/content/about";

export default function AboutCta() {
  return (
    <section className="bg-[#0A2B20] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <h2 className="max-w-3xl text-[44px] leading-12 text-[#F5F7EF] lg:text-[64px] lg:leading-18">
          Have a project in mind? Let’s talk it through.
        </h2>
        <p className="mt-6 max-w-lg font-montserrat text-base leading-6.75 text-[#B8C4BB]">
          Tell us a little about it. We reply within 2 working days.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Link
            to="/"
            hash="contact"
            className="inline-flex h-13 items-center gap-8 rounded-[3px] bg-[#D5E6B8] pl-5.75 pr-6 font-montserrat text-[13px] text-[#0A2B20] transition-colors hover:bg-[#E2EFCB]"
          >
            Start a project
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
          <a
            href={`mailto:${ORG.email}`}
            className="border-b border-[#D5E6B8] pb-0.5 font-montserrat text-sm text-[#D5E6B8] transition-opacity hover:opacity-70"
          >
            {ORG.email}
          </a>
        </div>
      </div>
    </section>
  );
}