import { MISSION } from "#/content/about";
import Eyebrow from "./eyebrow";

export default function AboutMission() {
  return (
    <section className="bg-[#E9F0E3] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <img
            src={MISSION.image.src}
            alt={MISSION.image.alt}
            loading="lazy"
            decoding="async"
            className="aspect-4/3 w-full object-cover"
          />

          <div>
            <Eyebrow>Mission &amp; vision</Eyebrow>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
              What we’re here to do.
            </h2>

            <h3 className="mt-8 text-[26px] leading-8 text-[#19382B]">Our mission</h3>
            <p className="mt-3 font-montserrat text-base leading-7 text-[#647466]">
              {MISSION.mission}
            </p>

            <h3 className="mt-8 text-[26px] leading-8 text-[#19382B]">Our vision</h3>
            <p className="mt-3 font-montserrat text-base leading-7 text-[#647466]">
              {MISSION.vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}