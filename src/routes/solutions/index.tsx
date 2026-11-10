import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "#/components/about/eyebrow";
import AboutCta from "#/components/about/about-cta";
import { SOLUTIONS } from "#/content/solutions";
import { seoHead } from "#/lib/seo";

export const Route = createFileRoute("/solutions/")({
  head: () =>
    seoHead({
      title: "Web Design Solutions for Businesses in Nigeria | codeAlchemy",
      description:
        "Website and software solutions from codeAlchemy for real estate, interior decor, e-commerce, hotels and portfolios in Nigeria.",
      path: "/solutions",
      image: "/og-image.png",
    }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <section className="bg-[#E9F0E3] pb-16 pt-12 lg:pb-26 lg:pt-20">
        <div className="mx-auto max-w-360 px-6 lg:px-20">
          <Eyebrow>Solutions</Eyebrow>
          <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:text-[80px] lg:leading-22">
            Websites and systems for your kind of business.
          </h1>
          <p className="mt-6 max-w-2xl font-montserrat text-base leading-7 text-[#647466] lg:text-lg">
            Every industry has its own audience, its own questions and its own way of
            turning visitors into customers. Choose yours to see how we’d approach it.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SOLUTIONS.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col border border-[#CFDAC8] bg-white p-6 transition-colors hover:border-[#197044] lg:p-8"
                >
                  <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-[#197044]">
                    {s.label}
                  </p>
                  <h2 className="mt-4 text-[28px] leading-9 text-[#19382B]">{s.h1}</h2>
                  <p className="mt-4 font-montserrat text-[15px] leading-6.5 text-[#647466]">
                    {s.description}
                  </p>
                  <span className="mt-auto flex items-center justify-between pt-6 font-montserrat text-xs text-[#197044]">
                    Learn more
                    <ArrowUpRight
                      className="size-4 text-[#19382B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <AboutCta />
    </>
  );
}