import { Check } from "lucide-react";
import { WHY } from "#/content/about";
import Eyebrow from "./eyebrow";

export default function AboutWhy() {
  return (
    <section className="bg-[#DCE6D2] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>Why codeAlchemy</Eyebrow>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
              Why work with us.
            </h2>
          </div>

          <ul className="flex flex-col gap-7">
            {WHY.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#197044] text-[#F5F7EF]">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <p className="font-montserrat text-base leading-7 text-[#647466]">
                  <strong className="font-medium text-[#19382B]">{item.title}</strong>{" "}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}