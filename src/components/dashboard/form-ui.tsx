import type { ReactNode } from "react";

export const inputClass = (error?: string) =>
  `w-full border bg-white px-4 font-montserrat text-sm text-[#19382B] placeholder:text-[#7E9A8B] transition-colors focus:outline-none ${
    error ? "border-[#B3261E]" : "border-[#CCD7C6] focus:border-[#197044]"
  }`;

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-montserrat text-[13px] text-[#19382B]">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 font-montserrat text-xs text-[#B3261E]">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 font-montserrat text-xs text-[#647466]">{hint}</p>
      ) : null}
    </div>
  );
}

export function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span>
        <span className="block font-montserrat text-sm text-[#19382B]">{label}</span>
        <span className="mt-0.5 block font-montserrat text-xs text-[#647466]">{description}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-[#CCD7C6] transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-[#197044] peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-[#197044]" />
    </label>
  );
}