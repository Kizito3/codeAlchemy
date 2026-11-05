import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Who do you work best with?",
    answer:
      "We work best with thoughtful founders and ambitious teams who value design, are open to collaboration and want to build something with purpose. From a new idea to an established brand’s next chapter, a shared mindset matters more than your industry.",
  },
  {
    question: "Can you redesign our existing website?",
    answer:
      "Absolutely. We start by understanding what’s working and what isn’t, then rebuild the experience around your goals, keeping the content, structure and SEO equity that already serve you well.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects take between four and eight weeks, depending on scope, content readiness and how quickly feedback comes back. We’ll agree a clear timeline with you before we begin.",
  },
  {
    question: "What should we budget for a website?",
    answer:
      "Every project is different, so we don’t believe in one-size-fits-all pricing. After a first conversation about your goals and scope, we’ll share a clear, honest range with no surprises.",
  },
  {
    question: "Will we be able to update the site ourselves?",
    answer:
      "Yes. We build on flexible systems and a CMS that feels natural to use, and we walk your team through it at handover so you can confidently manage your own content.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch is a beginning, not a goodbye. We offer ongoing care, performance reviews and continuous improvement, so your website stays healthy and evolves alongside your business.",
  },
] as const;

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#E9F0E3] py-16 lg:py-24">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[520fr_760fr] lg:gap-0">
          {/* Left: intro */}
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
                07 / A little clarity
              </p>
            </div>

            <h2 className="mt-6 text-[44px] leading-12 text-[#19382B] lg:mt-5 lg:text-[60px] lg:leading-16">
              Good questions. Honest answers.
            </h2>

            <p className="mt-6 max-w-100 font-montserrat text-base leading-6.75 text-[#647466] lg:mt-7">
              Every project is different. Here are a few things you might be
              wondering before we start a conversation.
            </p>

            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 border-b border-[#197044] pb-0.5 font-montserrat text-sm text-[#197044] transition-opacity hover:opacity-70"
            >
              Ask us something else
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Right: accordion */}
          <ul>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={faq.question} className="border-t border-[#CFDAC8]">
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-6.5 text-left font-montserrat text-base text-[#19382B] lg:py-6.5"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <Minus
                          className="size-4.5 shrink-0 text-[#197044]"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <Plus
                          className="size-4.5 shrink-0 text-[#197044]"
                          strokeWidth={1.5}
                        />
                      )}
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 font-montserrat text-sm leading-6.25 text-[#647466]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}