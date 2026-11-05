import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Works" },
  { to: "/insights", label: "Insights" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape, and when the viewport grows to desktop size
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#CCD7C6] bg-[#E9F0E3] md:bg-[#F5F7EF]">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-4">
        {/* Logo */}
        <Link to="/" className="">
          <img src="/images/Brand.svg" alt="Logo" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex font-montserrat">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 data-[status=active]:text-[#19382B] data-[status=active]:font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/about" className="cursor-pointer">
              <Button
                variant="app"
                className="h-13 cursor-pointer px-5.75 font-montserrat"
              >
                Let's talk{" "}
                <div>
                  <ArrowUpRight className="size-5 ml-5" />
                </div>
              </Button>
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex items-center gap-3 font-montserrat text-[13px] text-[#19382B] md:hidden"
        >
          Menu
          <Menu className="size-6" strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile menu: full width, slides in from the left */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-white transition-[transform,visibility] duration-300 ease-out md:hidden ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        {/* Top bar */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#CCD7C6] px-6">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src="/images/Brand.svg" alt="Logo" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex items-center gap-3 font-montserrat text-[13px] text-[#19382B]"
          >
            Close
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-1 flex-col overflow-y-auto px-6 pt-4 font-montserrat">
          {links.map((link) => (
            <li key={link.to} className="border-b border-[#E3EADD]">
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 text-2xl text-neutral-500 transition-colors data-[status=active]:font-medium data-[status=active]:text-[#19382B]"
              >
                {link.label}
                <ArrowUpRight className="size-5" strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA pinned to the bottom */}
        <div className="shrink-0 px-6 pb-8 pt-4">
          <Link to="/about" onClick={() => setOpen(false)}>
            <Button
              variant="app"
              className="h-13 w-full cursor-pointer px-5.75 font-montserrat"
            >
              Let's talk{" "}
              <div>
                <ArrowUpRight className="size-5 ml-5" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}