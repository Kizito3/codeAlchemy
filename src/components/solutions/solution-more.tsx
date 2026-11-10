import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "#/components/about/eyebrow";
import CaseStudyCard from "#/components/work/casestudy-card";
import type { CaseStudyCardData } from "#/components/work/types";
import type { Solution } from "#/content/solutions";

export default function SolutionMore({
  related,
  others,
}: {
  related: CaseStudyCardData | null;
  others: Solution[];
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className={`grid gap-14 ${related ? "lg:grid-cols-2 lg:gap-20" : ""}`}>
          {related && (
            <div>
              <Eyebrow>Related work</Eyebrow>
              <h2 className="mt-6 text-[36px] leading-10 text-[#19382B] lg:text-[44px] lg:leading-12">
                See the thinking in practice.
              </h2>
              <div className="mt-8">
                <CaseStudyCard project={related} />
              </div>
            </div>
          )}

          <div>
            <Eyebrow>More solutions</Eyebrow>
            <h2 className="mt-6 text-[36px] leading-10 text-[#19382B] lg:text-[44px] lg:leading-12">
              Other ways we can help.
            </h2>
            <ul className="mt-8 divide-y divide-[#E3EADD] border-y border-[#E3EADD]">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: s.slug }}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block text-[24px] leading-8 text-[#19382B] transition-colors group-hover:text-[#197044]">
                        {s.label}
                      </span>
                      <span className="mt-1 block font-montserrat text-xs text-[#647466]">
                        For {s.audience.toLowerCase()}
                      </span>
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
        </div>
      </div>
    </section>
  );
}