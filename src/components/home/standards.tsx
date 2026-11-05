import { Accessibility, Sprout, Zap } from "lucide-react";

const standards = [
  {
    icon: Accessibility,
    title: "For real people",
    description:
      "Clear navigation, readable type and inclusive interactions. Accessibility is part of the craft, not an afterthought.",
  },
  {
    icon: Zap,
    title: "Light on its feet",
    description:
      "Lean builds, considered motion and optimized assets. Because a beautiful website shouldn’t keep anyone waiting.",
  },
  {
    icon: Sprout,
    title: "Ready for what’s next",
    description:
      "Flexible systems and a CMS that feels natural. Your website should grow with you, not hold you back.",
  },
] as const;

export default function StandardsSection() {
  return (
    <section className="bg-[#DCE6D2] py-16 lg:py-22">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[620fr_660fr] lg:gap-0">
          {/* Left: intro */}
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
                05 / Beyond the beautiful
              </p>
            </div>

            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:mt-7 lg:text-[60px] lg:leading-16">
              Built to feel right. And work hard.
            </h2>

            <p className="mt-6 max-w-130 font-montserrat text-base leading-6.75 text-[#647466] lg:mt-7">
              A website should do more than make a first impression. Our
              measure of good design is how well it serves the people who use
              it.
            </p>
          </div>

          {/* Right: standards */}
          <ul className="flex flex-col gap-8 lg:gap-7.5">
            {standards.map((item) => (
              <li key={item.title} className="flex items-start gap-5.5">
                <span className="flex size-11 shrink-0 items-center justify-center border border-[#C5D2BA] bg-[#E3ECDA] text-[#197044]">
                  <item.icon className="size-5" strokeWidth={1.25} />
                </span>
                <div>
                  <h3 className="text-[26px] leading-9 text-[#19382B] lg:text-[28px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-montserrat text-[13px] leading-5.25 text-[#647466]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}