import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Heading } from "@/lib/article";

export default function ArticleSidebar({
  headings,
  title,
}: {
  headings: Heading[];
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked, ignore */
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      await copyLink();
    }
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        {headings.length > 0 && (
          <>
            <div className="flex items-center gap-2.5 font-montserrat">
              <span className="size-1.5 bg-[#197044]"></span>
              <p className="text-[10px] uppercase tracking-[1px] text-[#197044]">
                In this story
              </p>
            </div>

            <ol className="mt-6 flex flex-col gap-4 font-montserrat text-xs leading-4.5 text-[#647466]">
              {headings.map((heading, i) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="flex gap-2.5 transition-colors hover:text-[#19382B]"
                  >
                    <span className="shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{heading.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="mt-6 flex flex-col items-start gap-3 border-t border-[#D5DCCF] pt-6 font-montserrat text-xs text-[#197044]">
          <button
            type="button"
            onClick={share}
            className="inline-flex cursor-pointer items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            Share this insight
            <ArrowUpRight className="size-3" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex cursor-pointer items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            {copied ? (
              <>
                Link copied
                <Check className="size-3" strokeWidth={1.5} />
              </>
            ) : (
              <>
                Copy link
                <ArrowRight className="size-3" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}