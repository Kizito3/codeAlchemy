import Eyebrow from "#/components/about/eyebrow";
import type { Solution } from "#/content/solutions";

export default function SolutionNeeds({ solution }: { solution: Solution }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <Eyebrow>The brief</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
          {solution.needsHeading}
        </h2>

        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {solution.needs.map((need, i) => (
            <li key={need.title} className="border border-[#CFDAC8] bg-[#F5F7EF] p-6 lg:p-8">
              <span className="font-serif text-2xl text-[#197044]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[26px] leading-8 text-[#19382B]">{need.title}</h3>
              <p className="mt-3 font-montserrat text-[15px] leading-6.5 text-[#647466]">
                {need.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}