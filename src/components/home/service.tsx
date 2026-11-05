import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Strategy & direction",
    description:
      "A clear foundation before the first pixel. We find what makes you different and turn it into a digital plan.",
    tags: ["Discovery workshops", "UX research", "Content strategy"],
  },
  {
    number: "02",
    title: "Web design & identity",
    description:
      "Distinctive websites with a point of view. We pair expressive visuals with intuitive journeys that feel effortless.",
    tags: ["Art direction", "UI & UX design", "Design systems"],
  },
  {
    number: "03",
    title: "Development & launch",
    description:
      "Beautiful on the surface. Considered underneath. Responsive, accessible websites your team can actually manage.",
    tags: ["Webflow & WordPress", "Custom development", "SEO foundations"],
  },
  {
    number: "04",
    title: "Care & evolution",
    description:
      "Launch is a beginning, not a goodbye. We keep your site healthy and help it evolve alongside your business.",
    tags: ["Website care", "Performance reviews", "Continuous improvement"],
  },
] as const;

export default function ServicesSection() {
  return (
    <section className="bg-[#092B20] py-16 lg:py-26 lg:pb-32">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid lg:grid-cols-[520fr_760fr]">
          {/* Left: intro */}
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#D5E6B8]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#D5E6B8]">
                02 / What we do
              </p>
            </div>

            <h2 className="mt-6 max-w-md text-[44px] leading-12 text-[#F5F7EF] lg:mt-7 lg:text-[64px] lg:leading-16.5">
              The right mix. From idea to impact.
            </h2>

            <p className="mt-7 max-w-sm font-montserrat text-base leading-6.75 text-[#B8C4BB] lg:mt-8">
              One connected team, from the big picture to the smallest
              interaction. Bring us in for a fresh start, a thoughtful
              refresh, or the next chapter.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex h-13 items-center gap-8 rounded-[3px] bg-[#D5E6B8] pl-5.75 pr-6 font-montserrat text-[13px] text-[#0A2B20] transition-colors hover:bg-[#E2EFCB]"
            >
              Find your starting point
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Right: services list */}
          <ul className="mt-8 lg:mt-0">
            {services.map((service) => (
              <li
                key={service.number}
                className="border-t border-[#25453A] pb-7 pt-7 lg:pb-8 lg:pt-6"
              >
                <div className="flex items-start gap-0">
                  <span className="-mt-0.5 w-12 shrink-0 font-montserrat text-xs leading-4 text-[#D5E6B8] lg:mt-3">
                    {service.number}
                  </span>
                  <h3 className="flex-1 text-[28px] leading-8.5 text-[#F5F7EF] lg:text-4xl lg:leading-10">
                    {service.title}
                  </h3>
                  <ArrowUpRight
                    className="-mt-0.5 size-4 shrink-0 text-[#F5F7EF] lg:mt-3"
                    strokeWidth={1.5}
                  />
                </div>

                <p className="mt-5 font-montserrat text-xs leading-6.25 text-[#B7C8BA] lg:mt-4 lg:text-sm lg:leading-5.75">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-1.5 font-montserrat text-xs text-[#D5E6B8] lg:mt-3.5 lg:gap-x-2.5 lg:text-[11px]">
                  {service.tags.map((tag, i) => (
                    <span key={tag} className="flex items-center gap-x-1.5 lg:gap-x-2.5">
                      {i > 0 && <span>/</span>}
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}