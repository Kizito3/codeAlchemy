import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "#/content/solutions";

export default function InsightsExplore() {
  return (
    <section className="bg-[#F5F7EF] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="flex items-center gap-2.5 font-montserrat">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
            Looking for something specific?
          </p>
        </div>
        <h2 className="mt-6 max-w-2xl text-[36px] leading-10 text-[#19382B] lg:text-[48px] lg:leading-13">
          Planning a website for your kind of business?
        </h2>

        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <li key={s.slug} className="border-t border-[#CFDAC8]">
              <Link
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="text-[22px] leading-7 text-[#19382B] transition-colors group-hover:text-[#197044]">
                  {s.label}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-[#19382B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}