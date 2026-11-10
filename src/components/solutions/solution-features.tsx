import { Check } from "lucide-react";
import Eyebrow from "#/components/about/eyebrow";
import type { Solution } from "#/content/solutions";

export default function SolutionFeatures({ solution }: { solution: Solution }) {
  return (
    <section className="bg-[#F5F7EF] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
              What we build for you.
            </h2>
            <p className="mt-5 max-w-sm font-montserrat text-base leading-7 text-[#647466]">
              The exact scope depends on your goals. This is what we typically include.
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {solution.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3.5 border-t border-[#CFDAC8] pt-5"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#197044] text-[#F5F7EF]">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                <p className="font-montserrat text-[15px] leading-6.5 text-[#19382B]">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}