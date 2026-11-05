import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

const ENDPOINT = "/api/contact"; // change to your PHP/Node endpoint

const services = [
  "New website",
  "Website redesign",
  "Development",
  "Ongoing care",
] as const;

const budgets = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3+ months",
  "Just exploring",
];

const steps = [
  "We read every inquiry with care.",
  "We reply within 2 working days.",
  "We arrange a relaxed, no-pressure introduction.",
] as const;

const labelClass =
  "mb-2.5 block font-montserrat text-[13px] text-[#F5F7EF]";

const fieldClass =
  "w-full border border-[#2F5244] bg-[#1A3A2E] px-4 font-montserrat text-sm text-[#F5F7EF] placeholder:text-[#7E9A8B] transition-colors focus:border-[#D5E6B8] focus:outline-none";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selected, setSelected] = useState<string[]>(["New website"]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (selected.length === 0) {
      setError("Please choose at least one thing we can help you with.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          services: selected,
          budget,
          timeline,
          message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setCompany("");
      setSelected(["New website"]);
      setBudget("");
      setTimeline("");
      setMessage("");
      setAgreed(false);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section className="bg-[#0A2B20] py-16 lg:py-26">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[448px_1fr] lg:gap-x-28">
          {/* Left: intro */}
          <div>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#D5E6B8]"></span>
              <p className="text-[11px] uppercase tracking-[1px] text-[#D5E6B8]">
                08 / Let’s make something matter
              </p>
            </div>

            <h2 className="mt-6 text-[44px] leading-12 text-[#F5F7EF] lg:mt-7 lg:text-[64px] lg:leading-18.5">
              Your next chapter starts with hello.
            </h2>

            <p className="mt-6 font-montserrat text-base leading-6.75 text-[#B8C4BB] lg:mt-8">
              Have a new idea, an ambitious brief, or a website that no longer
              feels like you? Tell us a little about it. We’ll take it from
              there.
            </p>

            <div className="mt-8 border-y border-[#25453A] py-6 lg:mt-10">
              <p className="font-montserrat text-[11px] uppercase text-[#B8C4BB]">
                Prefer a good old-fashioned email?
              </p>
              <a
                href="mailto:hello@codealchemy.studio"
                className="mt-3 inline-flex items-center gap-3 text-2xl leading-8 text-[#D5E6B8] transition-opacity hover:opacity-70 lg:text-[28px]"
              >
                hello@codealchemy.studio
                <ArrowUpRight className="size-4 text-[#F5F7EF]" strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-8">
              <p className="font-montserrat text-xs uppercase tracking-[0.5px] text-[#F5F7EF]">
                What happens next
              </p>
              <ol className="mt-5 flex flex-col gap-4 font-montserrat text-sm text-[#B8C4BB] lg:gap-3.5">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3.5">
                    <span className="w-4 shrink-0 text-xs leading-5 text-[#D5E6B8]">
                      0{i + 1}
                    </span>
                    <span className="leading-5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} noValidate={false}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="text-[36px] leading-9 text-[#F5F7EF]">
                Tell us what you’re imagining.
              </h3>
              <p className="font-montserrat text-[11px] text-[#B8C4BB]">
                * Required
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:mt-7 lg:gap-8">
              {/* Name + email */}
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className={`${fieldClass} h-13`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={`${fieldClass} h-13`}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className={labelClass}>
                  Company / website
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name or current website"
                  className={`${fieldClass} h-13`}
                />
              </div>

              {/* Services chips */}
              <div>
                <p className={labelClass}>What can we help you with? *</p>
                <div className="flex flex-wrap gap-2.5 lg:gap-2">
                  {services.map((service) => {
                    const active = selected.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleService(service)}
                        className={`inline-flex h-10 cursor-pointer items-center gap-2 border px-3.5 font-montserrat text-xs transition-colors lg:h-9.5 ${
                          active
                            ? "border-[#D5E6B8] bg-[#D5E6B8] text-[#0A2B20]"
                            : "border-[#2F5244] bg-[#1A3A2E] text-[#B8C4BB] hover:border-[#D5E6B8]"
                        }`}
                      >
                        {active && <Check className="size-3.5" strokeWidth={2} />}
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget + timeline */}
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-5">
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Estimated budget *
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={`${fieldClass} h-13 cursor-pointer appearance-none pr-11 [color-scheme:dark] ${
                        budget === "" ? "text-[#7E9A8B]" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#B8C4BB]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="timeline" className={labelClass}>
                    Ideal timeline
                  </label>
                  <div className="relative">
                    <select
                      id="timeline"
                      name="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={`${fieldClass} h-13 cursor-pointer appearance-none pr-11 [color-scheme:dark] ${
                        timeline === "" ? "text-[#7E9A8B]" : ""
                      }`}
                    >
                      <option value="" disabled>
                        When are you hoping to launch?
                      </option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#B8C4BB]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  A little about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your vision, your goals, what’s keeping you up at night…"
                  className={`${fieldClass} min-h-31 resize-y py-4 leading-5.5 lg:min-h-29`}
                />
              </div>

              {/* Consent */}
              <label className="flex cursor-pointer items-start gap-3 font-montserrat text-xs leading-4.5 text-[#B8C4BB] lg:items-center">
                <span className="relative mt-0.5 size-4 shrink-0 lg:mt-0">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer size-4 cursor-pointer appearance-none border border-[#7E9A8B] bg-transparent transition-colors checked:border-[#D5E6B8] checked:bg-[#D5E6B8] focus:outline-none focus-visible:border-[#D5E6B8]"
                  />
                  <Check
                    className="pointer-events-none absolute left-0.5 top-0.5 hidden size-3 text-[#0A2B20] peer-checked:block"
                    strokeWidth={3}
                  />
                </span>
                <span>
                  I agree to the privacy policy and consent to codeAlchemy
                  contacting me about my inquiry.
                </span>
              </label>
            </div>

            {/* Submit row */}
            <div className="mt-8 flex flex-col gap-5 lg:mt-7 lg:flex-row lg:items-center lg:justify-between">
              <Button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-13 w-fit cursor-pointer items-center gap-8 rounded-[3px] bg-[#D5E6B8] pl-5.75 pr-6 font-montserrat text-sm text-[#0A2B20] transition-colors hover:bg-[#E2EFCB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send your inquiry"}
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Button>
              <p className="font-montserrat text-[11px] text-[#B8C4BB]">
                A conversation, not a commitment.
              </p>
            </div>

            {/* Feedback */}
            <div aria-live="polite" className="mt-5 font-montserrat text-sm">
              {status === "sent" && (
                <p className="text-[#D5E6B8]">
                  Thank you. We’ve got your inquiry and will reply within 2
                  working days.
                </p>
              )}
              {error && <p className="text-[#F0A4A4]">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}