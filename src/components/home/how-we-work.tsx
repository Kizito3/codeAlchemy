const steps = [
  {
    number: "01",
    title: "Find the essence",
    description:
      "We ask, listen and get curious. Together, we define your audience, ambition and what success should look like.",
    tag: "Discovery & strategy",
  },
  {
    number: "02",
    title: "Shape the story",
    description:
      "We explore visual directions, map the journey and design an experience that feels unmistakably you.",
    tag: "Structure & design",
  },
  {
    number: "03",
    title: "Bring it to life",
    description:
      "We turn the design into a fast, flexible website, with care for every screen size and interaction.",
    tag: "Build & refine",
  },
  {
    number: "04",
    title: "Launch & nurture",
    description:
      "We test the details, equip your team and launch with confidence. Then we stay close as you grow.",
    tag: "Handover & support",
  },
] as const;

export default function ProcessSection() {
  return (
    <section className="bg-white py-16 lg:py-26">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="lg:max-w-175">
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
                04 / How we work
              </p>
            </div>
            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:mt-5 lg:text-[60px] lg:leading-16">
              Good things don’t happen by accident.
            </h2>
          </div>

          <p className="font-montserrat text-base leading-6.75 text-[#647466] lg:w-110 lg:pb-1">
            A clear process. An open conversation. Room for the unexpected.
            You’ll always know where we are, and what comes next.
          </p>
        </div>

        {/* Steps */}
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="border-t border-[#D5DCCF] pt-8">
              <span className="block text-[44px] leading-12 text-[#197044] lg:text-5xl">
                {step.number}
              </span>
              <h3 className="mt-6 text-[26px] leading-9 text-[#19382B] lg:mt-7 lg:text-[28px]">
                {step.title}
              </h3>
              <p className="mt-5 font-montserrat text-sm leading-6 text-[#647466]">
                {step.description}
              </p>
              <p className="mt-5 font-montserrat text-[11px] uppercase tracking-[1px] text-[#197044]">
                {step.tag}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}