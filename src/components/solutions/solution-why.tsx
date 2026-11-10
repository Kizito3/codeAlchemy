import Eyebrow from "#/components/about/eyebrow";
import type { Solution } from "#/content/solutions";

export default function SolutionWhy({ solution }: { solution: Solution }) {
  return (
    <section className="bg-[#0A2B20] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <Eyebrow tone="dark">Why codeAlchemy</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-[44px] leading-12 text-[#F5F7EF] lg:text-[56px] lg:leading-15">
          Why codeAlchemy for {solution.label.toLowerCase()}.
        </h2>

        <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:mt-12">
          {solution.why.map((item, i) => (
            <li key={item.title} className="border-t border-[#25453A] pt-6">
              <span className="font-montserrat text-xs text-[#D5E6B8]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[26px] leading-8 text-[#F5F7EF]">{item.title}</h3>
              <p className="mt-3 font-montserrat text-[15px] leading-6.5 text-[#B8C4BB]">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}