import { PRINCIPLES } from "#/content/about";
import Eyebrow from "./eyebrow";

export default function AboutPrinciples() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <Eyebrow>What guides us</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-[44px] leading-12 text-[#19382B] lg:text-[56px] lg:leading-15">
          The principles behind the work.
        </h2>
        <p className="mt-5 max-w-xl font-montserrat text-base leading-7 text-[#647466]">
          The values that shape how we work, and what you can expect from us.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {PRINCIPLES.map((item) => (
            <li key={item.title} className="border border-[#CFDAC8] bg-[#F5F7EF] p-6 lg:p-8">
              <item.icon className="size-6 text-[#197044]" strokeWidth={1.25} />
              <h3 className="mt-6 text-[26px] leading-8 text-[#19382B]">{item.title}</h3>
              <p className="mt-3 font-montserrat text-[15px] leading-6.5 text-[#647466]">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}