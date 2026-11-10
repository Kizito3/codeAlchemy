import { INTRO } from "#/content/about";
import Eyebrow from "./eyebrow";

export default function AboutIntro() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-[5fr_11fr] lg:gap-0">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:mt-7 lg:text-[60px] lg:leading-16">
              Who we are.
            </h2>
          </div>

          <div className="max-w-190 font-montserrat">
            {INTRO.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl leading-8 text-[#19382B] lg:text-[22px]"
                    : "mt-6 text-base leading-7 text-[#647466]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}