import { Link } from "@tanstack/react-router";

export default function InsightsHero() {
  return (
    <section className="bg-[#E9F0E3] pb-12 pt-8 lg:pb-16 lg:pt-12">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-montserrat text-[13px] text-[#647466]">
            <li>
              <Link to="/" className="transition-colors hover:text-[#19382B]">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[#19382B]">Insights</li>
          </ol>
        </nav>

        <div className="mt-8 flex items-center gap-2.5 font-montserrat lg:mt-9">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">The journal</p>
        </div>

        <h1 className="mt-6 max-w-250 text-[44px] leading-12 text-[#123D2B] lg:mt-7 lg:text-[88px] lg:leading-24">
          Insights on web design, development and strategy.
        </h1>

        <p className="mt-6 max-w-2xl font-montserrat text-lg leading-7 text-[#123D2B] lg:mt-8 lg:text-[22px] lg:leading-8">
          Practical thinking from the codeAlchemy studio, written for founders and teams
          planning a website that works.
        </p>
      </div>
    </section>
  );
}