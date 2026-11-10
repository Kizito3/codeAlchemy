import Eyebrow from "#/components/about/eyebrow";
import type { Solution } from "#/content/solutions";

export default function SolutionDiscovery({ solution }: { solution: Solution }) {
  return (
    <section className="bg-[#DCE6D2] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>How we begin</Eyebrow>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
              What we’ll ask first.
            </h2>
            <p className="mt-5 max-w-sm font-montserrat text-base leading-7 text-[#647466]">
              Every project starts with a conversation. Bring what you have, and we’ll help with the rest.
            </p>
          </div>

          <ol>
            {solution.discovery.map((question, i) => (
              <li key={question} className="flex gap-5 border-t border-[#C5D2BA] py-5">
                <span className="w-6 shrink-0 font-montserrat text-xs leading-6 text-[#197044]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-montserrat text-base leading-7 text-[#19382B]">{question}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}