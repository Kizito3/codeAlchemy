import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const explore = [
  { label: "Studio", to: "/about" },
  { label: "Services", to: "/", hash: "services" },
  { label: "Selected work", to: "/work" },
  { label: "Insights", to: "/insights" },
] as const;

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#E9F0E3] pb-8 pt-16 lg:pb-8 lg:pt-17.5">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        {/* Top */}
        <div className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-[553fr_244fr_244fr_239fr] lg:gap-x-0">
          {/* Tagline */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-[20px]  text-[#123D2B] lg:text-[36px] lg:leading-11">
              <span className="lg:block">Thoughtfully designed.</span>
              <span className="lg:block"> Beautifully engineered.</span>
            </h2>
            <p className="mt-5 font-montserrat text-sm text-[#647466] lg:mt-4 lg:text-xs">
              An independent studio. A world of possibility.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-[#647466] lg:text-[10px]">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-3.5 font-montserrat text-base text-[#123D2B] lg:mt-3.5 lg:gap-3 lg:text-sm">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={"hash" in item ? item.hash : undefined}
                    className="transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-[#647466] lg:text-[10px]">
              Find us elsewhere
            </p>
            <ul className="mt-4 flex flex-col gap-3.5 font-montserrat text-base text-[#123D2B] lg:mt-3.5 lg:gap-3 lg:text-sm">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-60"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Say hello */}
          <div className="col-span-2 lg:col-span-1">
            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-[#647466] lg:text-[10px]">
              Say hello
            </p>
            <div className="mt-4 flex flex-col items-start gap-3.5 font-montserrat text-base text-[#123D2B] lg:mt-3.5 lg:gap-3 lg:text-sm">
              <a
                href="mailto:hello@codealchemy.studio"
                className="transition-opacity hover:opacity-60"
              >
                hello@codealchemy.studio
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 border-b border-[#197044] pb-0.5 text-[#197044] transition-opacity hover:opacity-70"
              >
                Start a project
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Large logo */}
        <div className="mt-14 lg:mt-16">
          <img
            src="/images/Brand.svg"
            alt="codeAlchemy"
            className="h-auto w-[86%] lg:w-[74%]"
          />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[#CFDAC8] pt-7 font-montserrat text-xs text-[#647466] lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pt-6 lg:text-[11px]">
          <p>© 2026 codeAlchemy. Crafted with intention.</p>

          <div className="flex items-center gap-6 lg:gap-7">
            <a href="/privacy" className="transition-opacity hover:opacity-60">
              Privacy policy
            </a>
            <a href="/terms" className="transition-opacity hover:opacity-60">
              <span className="lg:hidden">Terms & conditions</span>
              <span className="hidden lg:inline">Terms of use</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex cursor-pointer items-center gap-1.5 self-start text-[#123D2B] transition-opacity hover:opacity-60 lg:self-auto"
          >
            Back to the beginning
            <ArrowUp className="size-3" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
