import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-360 px-6 md:px-10 xl:px-20">
        {/* Top: label + headline + copy */}
        <div className="grid gap-8 lg:grid-cols-[5fr_11fr] lg:gap-0">
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
                01 / About codeAlchemy
              </p>
            </div>
            <p className="mt-5.5 max-w-60 font-montserrat text-[13px] leading-5.25 text-[#647466]">
              Good chemistry makes great digital experiences.
            </p>
          </div>

          <div>
            <h2 className="text-[40px] leading-11 text-[#19382B] md:text-[52px] md:leading-14 lg:text-[60px] lg:leading-16.25">
              Creative minds. Technical souls. One shared obsession.
            </h2>

            <div className="mt-6 grid gap-6 font-montserrat text-[15px] leading-6.75 text-[#647466] md:grid-cols-2 md:gap-10">
              <p>
                We’re a close-knit web design studio bringing clarity,
                character and craft to the internet. We partner with founders
                and teams who believe their website should be as considered as
                their business.
              </p>
              <p>
                From the first conversation to the final line of code, we
                connect strategy with expression. No hand-off maze. No
                one-size-fits-all templates. Just good people making
                thoughtful things, together.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: image + quote */}
        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[45fr_32fr] lg:gap-12">
          <div className="overflow-hidden">
            <img
              src="/images/studio.svg"
              alt="The codeAlchemy studio workspace"
              className="aspect-4/3 w-full object-cover lg:aspect-72/31"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-[28px] leading-9 text-[#19382B] md:text-[34px] md:leading-10">
              “The best work happens when we become part of your team.”
            </h3>

            <div className="mt-6 border-t border-[#D5DCCF] pt-6">
              <div className="flex items-center justify-between font-montserrat text-xs text-[#647466]">
                <p>Direct collaboration</p>
                <p>Care in every detail</p>
              </div>

              <Link
                to="/about"
                className="mt-6 inline-flex h-13 items-center gap-8 rounded-[3px] border border-[#CCD7C6] pl-5.75 pr-6 font-montserrat text-[13px] text-[#19382B] transition-colors hover:bg-[#F5F7EF]"
              >
                Meet your creative partners
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}