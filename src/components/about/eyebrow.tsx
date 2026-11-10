import type { ReactNode } from "react";

export default function Eyebrow({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex items-center gap-2.5 font-montserrat ${className}`}>
      <span className={`size-1.5 ${dark ? "bg-[#D5E6B8]" : "bg-[#197044]"}`}></span>
      <p
        className={`text-[11px] uppercase tracking-[1px] ${
          dark ? "text-[#D5E6B8]" : "text-[#197044]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}