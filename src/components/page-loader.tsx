import { Asterisk } from "lucide-react";

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F5F7EF]"
    >
      <Asterisk
        className="size-10 animate-spin text-[#197044] animation-duration-[2s]"
        strokeWidth={1.5}
      />
      <p className="font-montserrat text-xs uppercase tracking-[1px] text-[#647466]">
        Loading
      </p>
    </div>
  );
}