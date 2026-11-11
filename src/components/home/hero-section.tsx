import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Hero from "../../../public/images/hero.svg";
import { Link } from "@tanstack/react-router";

export default function HeroSection() {
  return (
    <section className="bg-[#E9F0E3] px-6 pt-10 pb-10 lg:bg-[#F5F7EF] lg:p-6 lg:pt-12">
      <div className="mx-auto max-w-7xl lg:px-10">
        <div className="flex items-center gap-2 text-[13px] font-montserrat text-[#19382B]">
          <p className="h-2 w-2 bg-[#19382B]"></p>
          <p className="uppercase text-[#197044] text-[9px] tracking-[1px] lg:text-xs">
            {" "}
            Independent web design & development studio
          </p>
        </div>

        <div className="mt-8 mb-7 flex flex-col gap-6 lg:my-8 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
          <div className="lg:w-223">
            <h1 className="text-[56px] leading-14.25 text-[#123D2B] lg:text-[91px] lg:leading-25">
              <span className="lg:block">A little alchemy.</span>{" "}
              <span className="lg:block">A lasting impression.</span>
            </h1>
          </div>
          <div className="lg:w-97">
            <p className="font-montserrat text-base leading-7 text-[#647466] lg:leading-6">
              We turn ambitious ideas into distinctive digital experiences.
              Beautifully designed. Thoughtfully built. Ready to grow.
            </p>
            <Link to="/work" >
            <Button
              variant="app"
              className="h-13 cursor-pointer px-5.75 font-montserrat mt-6.5 lg:mt-5.5"
            >
              Explore our work{" "}
              <div>
                <ArrowUpRight className="size-5 ml-5" />
              </div>
            </Button></Link>
          </div>
        </div>

        <div>
          <img
            src={Hero}
            alt=""
            className="aspect-342/330 w-full object-cover lg:aspect-auto"
          />
        </div>

        {/* Mobile-only caption block */}
        <div className="lg:hidden">
          <div className="mt-4 flex items-center gap-1.5 font-montserrat text-[13px] text-[#197044]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#197044]"></span>
            <p>Where imagination takes shape.</p>
          </div>
          <p className="mt-3 font-montserrat text-[11px] uppercase tracking-[1px] text-[#123D2B]">
            Design × Technology
          </p>
          <div className="mt-6.5 border-t border-[#CFDAC8]"></div>
        </div>

        <div className="mt-7.5 flex flex-col gap-7 lg:my-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-montserrat text-[13px] text-[#647466] lg:text-xs lg:text-[#123D2B]">
              Small by design. Ambitious by nature.
            </p>
          </div>
          <div className="font-montserrat text-[11px] text-[#123D2B] flex w-full items-center justify-between lg:w-auto lg:justify-start lg:gap-2 lg:text-xs">
            <p>Strategy</p>
            <p>Design</p>
            <p>Development</p>
            <p>Partnership</p>
          </div>
          <div className="-mt-1 lg:mt-0">
            <p className="font-montserrat text-[13px] text-[#123D2B] lg:text-xs">
              Discover the studio ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}