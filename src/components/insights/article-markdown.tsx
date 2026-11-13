import Markdown, { type Components } from "react-markdown";
import { getText, slugify, type Heading } from "@/lib/article";
import remarkGfm from "remark-gfm";

function Takeaways({ raw }: { raw: string }) {
  const [title, ...rest] = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const items = rest.map((line) => {
    const [question, ...hint] = line.split("|");
    return { question: question.trim(), hint: hint.join("|").trim() };
  });

  return (
    <section className="my-12 bg-[#E9F0E3] px-6 py-9 lg:my-14 lg:px-9 lg:py-10">
      <div className="flex items-center gap-2.5 font-montserrat">
        <span className="size-1.5 bg-[#197044]"></span>
        <p className="text-[10px] uppercase tracking-[1px] text-[#197044]">
          Take this into your next conversation
        </p>
      </div>
      <h2 className="mt-4 text-[30px] leading-9 text-[#19382B] lg:text-[36px] lg:leading-10">
        {title}
      </h2>
      <ol className="mt-6">
        {items.map((item, i) => (
          <li key={item.question} className="border-t border-[#CFDAC8] py-5">
            <p className="flex gap-3 font-montserrat text-[15px] leading-6 text-[#19382B]">
              <span className="shrink-0">{String(i + 1).padStart(2, "0")}</span>
              {item.question}
            </p>
            {item.hint && (
              <p className="mt-2 font-montserrat text-[13px] leading-5 text-[#647466]">
                {item.hint}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ArticleMarkdown({
  content,
  headings,
  sectionLabel,
}: {
  content: string;
  headings: Heading[];
  sectionLabel: string;
}) {
  const components: Components = {
    // "# " becomes the large intro statement
    h1: ({ children }) => (
      <h2 className="text-[26px] leading-8.5 text-[#19382B] lg:text-[32px] lg:leading-10">
        {children}
      </h2>
    ),

    // "## " becomes a numbered section
    h2: ({ children }) => {
      const id = slugify(getText(children));
      const index = headings.findIndex((h) => h.id === id);
      return (
        <div id={id} className="mt-12 scroll-mt-28 lg:mt-14">
          <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-[#197044]">
            {String(index + 1).padStart(2, "0")} / {sectionLabel}
          </p>
          <h2 className="mt-4 text-[30px] leading-9 text-[#19382B] lg:text-[36px] lg:leading-10">
            {children}
          </h2>
        </div>
      );
    },

    // "### " becomes an unnumbered closing heading
    h3: ({ children }) => (
      <h2 className="mt-12 text-[30px] leading-9 text-[#19382B] lg:mt-14 lg:text-[36px] lg:leading-10">
        {children}
      </h2>
    ),

    p: ({ children }) => (
      <p className="mt-6 font-montserrat text-[15px] leading-7 text-[#647466] lg:text-base">
        {children}
      </p>
    ),

    // "> " becomes the pull-quote card
    blockquote: ({ children }) => (
      <figure className="my-12 bg-[#DCE6D2] px-6 py-9 lg:my-14 lg:px-12 lg:py-12">
        <span
          aria-hidden
          className="block font-serif text-6xl leading-none text-[#197044]"
        >
          “
        </span>
        <blockquote className="mt-2 font-serif text-[28px] leading-9 text-[#19382B] lg:text-[36px] lg:leading-10">
          {getText(children)}
        </blockquote>
        <figcaption className="mt-6 font-montserrat text-[11px] uppercase tracking-[1px] text-[#197044]">
          A note from the studio
        </figcaption>
      </figure>
    ),

    ul: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-5 font-montserrat text-[15px] leading-7 text-[#647466] lg:text-base">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-5 font-montserrat text-[15px] leading-7 text-[#647466] lg:text-base">
        {children}
      </ol>
    ),
        // GFM tables: wrapper scrolls sideways on small screens
    table: ({ children }) => (
      <div className="my-10 overflow-x-auto border border-[#CFDAC8]">
        <table className="w-full min-w-140 border-collapse text-left font-montserrat">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-[#E9F0E3]">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-t border-[#CFDAC8] first:border-t-0">{children}</tr>
    ),
    th: ({ children, style }) => (
      <th
        style={style}
        className="px-4 py-3 text-[11px] font-normal uppercase tracking-[1px] text-[#197044] lg:px-5"
      >
        {children}
      </th>
    ),
    td: ({ children, style }) => (
      <td
        style={style}
        className="px-4 py-4 align-top text-[14px] leading-6 text-[#647466] first:font-medium first:text-[#19382B] lg:px-5 lg:text-[15px]"
      >
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-[#19382B]">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#197044] underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <img src={src} alt={alt ?? ""} className="my-10 w-full" />
    ),

    // fenced blocks: ```questions becomes the callout, other languages become code
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children }) => {
      if (className?.includes("language-questions")) {
        return <Takeaways raw={String(children)} />;
      }
      if (className?.startsWith("language-")) {
        return (
          <pre className="my-8 overflow-x-auto bg-[#0A2B20] p-5 text-sm text-[#F5F7EF]">
            <code>{children}</code>
          </pre>
        );
      }
      return (
        <code className="rounded-sm bg-[#E9F0E3] px-1.5 py-0.5 text-[0.9em]">
          {children}
        </code>
      );
    },
  };

  return (
    <div className="[&>*:first-child]:mt-0">
      <Markdown components={components} remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}