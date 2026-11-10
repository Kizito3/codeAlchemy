import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/components/insights/types";
import { extractHeadings, slugify } from "@/lib/article";
import { postInput, type PostInput } from "@/lib/post-schema";
import ArticleMarkdown from "../insights/article-markdown";

type SubmitResult = { ok: true } | { ok: false; error: string; field?: string };

type Props = {
  initial?: Post;
  submitLabel: string;
  onSubmit: (values: PostInput) => Promise<SubmitResult>;
};

const base =
  "w-full border bg-white px-4 font-montserrat text-sm text-[#19382B] placeholder:text-[#7E9A8B] transition-colors focus:outline-none";

const input = (error?: string) =>
  `${base} ${error ? "border-[#B3261E]" : "border-[#CCD7C6] focus:border-[#197044]"}`;

const snippets = {
  section: "\n\n## Section heading\n\nWrite your section here.\n",
  quote: "\n\n> A short line worth pulling out.\n",
  questions:
    "\n\n```questions\nTitle of the callout.\nFirst question? | A short hint.\nSecond question? | Another hint.\n```\n",
};

function toSlug(text: string) {
  return slugify(text).replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function Field({
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
  children: React.ReactNode;
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

export default function PostForm({ initial, submitLabel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [sectionLabel, setSectionLabel] = useState(initial?.sectionLabel ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [coverCaption, setCoverCaption] = useState(initial?.coverCaption ?? "");
  const [readTime, setReadTime] = useState(String(initial?.readTime ?? 5));
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);

  const [tab, setTab] = useState<"write" | "preview">("write");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);

  const headings = useMemo(() => extractHeadings(content), [content]);
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimate = Math.max(1, Math.round(wordCount / 200));

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(toSlug(value));
  };

  const addSnippet = (snippet: string) => {
    setContent((current) => (current.trimEnd() + snippet).trimStart());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const parsed = postInput.safeParse({
      title,
      slug,
      excerpt,
      content,
      category,
      sectionLabel: sectionLabel.trim() || null,
      coverImage: coverImage.trim() || null,
      coverCaption: coverCaption.trim() || null,
      readTime: Number(readTime),
      published,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setFormError("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setPending(true);
    try {
      const res = await onSubmit(parsed.data);
      if (!res.ok) {
        setErrors(res.field ? { [res.field]: res.error } : {});
        setFormError(res.error);
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-6">
          <Field label="Title" htmlFor="title" error={errors.title}>
            <input
              id="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Before the pixels: asking better questions."
              className={`${input(errors.title)} h-13`}
            />
          </Field>

          <Field
            label="Excerpt"
            htmlFor="excerpt"
            error={errors.excerpt}
            hint={`${excerpt.length}/300. Shows on cards and under the title.`}
          >
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className={`${input(errors.excerpt)} resize-y py-3.5 leading-6`}
            />
          </Field>

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <p className="font-montserrat text-[13px] text-[#19382B]">Content (markdown)</p>
              <div className="flex gap-1 font-montserrat text-xs">
                {(["write", "preview"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`cursor-pointer px-3.5 py-1.5 capitalize transition-colors ${
                      tab === t
                        ? "bg-[#123D2B] text-[#F5F7EF]"
                        : "border border-[#CCD7C6] text-[#647466] hover:border-[#197044]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {tab === "write" ? (
              <>
                <div className="mb-2 flex flex-wrap gap-2 font-montserrat text-xs">
                  {(
                    [
                      ["+ Section", snippets.section],
                      ["+ Pull quote", snippets.quote],
                      ["+ Questions block", snippets.questions],
                    ] as const
                  ).map(([label, snippet]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => addSnippet(snippet)}
                      className="cursor-pointer border border-[#CCD7C6] bg-white px-3 py-1.5 text-[#197044] transition-colors hover:border-[#197044]"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={24}
                  spellCheck
                  className={`${input(errors.content)} resize-y py-4 font-mono text-[13px] leading-6`}
                  placeholder={"# The big opening statement\n\nIntro paragraph...\n\n## First section\n\nBody text..."}
                />
                {errors.content && (
                  <p role="alert" className="mt-1.5 font-montserrat text-xs text-[#B3261E]">
                    {errors.content}
                  </p>
                )}
                <p className="mt-1.5 font-montserrat text-xs text-[#647466]">
                  {wordCount} words
                </p>

                <details className="mt-4 border border-[#CFDAC8] bg-white px-4 py-3 font-montserrat text-xs text-[#647466]">
                  <summary className="cursor-pointer text-[#19382B]">Markdown guide</summary>
                  <ul className="mt-3 flex flex-col gap-1.5 leading-5">
                    <li><code># Heading</code> is the large intro statement at the top.</li>
                    <li><code>## Heading</code> is a numbered section (also listed in the sidebar).</li>
                    <li><code>### Heading</code> is an unnumbered heading, good for the closing block.</li>
                    <li><code>&gt; text</code> becomes the green pull quote.</li>
                    <li>A <code>```questions</code> block becomes the callout: first line is the title, then one <code>question | hint</code> per line.</li>
                    <li>Keep <code>##</code> headings as plain text, with no bold or links.</li>
                  </ul>
                </details>
              </>
            ) : (
              <div className="min-h-100 border border-[#CCD7C6] bg-white p-6 lg:p-10">
                {content.trim() ? (
                  <ArticleMarkdown
                    content={content}
                    headings={headings}
                    sectionLabel={sectionLabel.trim() || category || "Insight"}
                  />
                ) : (
                  <p className="font-montserrat text-sm text-[#647466]">
                    Nothing to preview yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Side column */}
        <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-8">
          <div className="border border-[#CFDAC8] bg-white p-5">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block font-montserrat text-sm text-[#19382B]">Published</span>
                <span className="mt-0.5 block font-montserrat text-xs text-[#647466]">
                  {published ? "Visible on the site" : "Saved as a draft"}
                </span>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="peer sr-only"
              />
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-[#CCD7C6] transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-[#197044] peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-[#197044]" />
            </label>
          </div>

          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <Field
              label="Slug"
              htmlFor="slug"
              error={errors.slug}
              hint="The URL: /insights/your-slug"
            >
              <input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className={`${input(errors.slug)} h-11`}
              />
            </Field>

            <Field label="Category" htmlFor="category" error={errors.category}>
              <input
                id="category"
                list="category-options"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${input(errors.category)} h-11`}
              />
              <datalist id="category-options">
                <option value="Strategy" />
                <option value="Design" />
                <option value="Development" />
              </datalist>
            </Field>

            <Field
              label="Section label"
              htmlFor="sectionLabel"
              error={errors.sectionLabel}
              hint="Shown as “01 / DISCOVERY FIRST” above each section. Defaults to the category."
            >
              <input
                id="sectionLabel"
                value={sectionLabel}
                onChange={(e) => setSectionLabel(e.target.value)}
                placeholder="Discovery first"
                className={`${input(errors.sectionLabel)} h-11`}
              />
            </Field>

            <Field label="Read time (minutes)" htmlFor="readTime" error={errors.readTime}>
              <div className="flex items-center gap-3">
                <input
                  id="readTime"
                  type="number"
                  min={1}
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className={`${input(errors.readTime)} h-11 w-24`}
                />
                <button
                  type="button"
                  onClick={() => setReadTime(String(estimate))}
                  className="cursor-pointer font-montserrat text-xs text-[#197044] transition-opacity hover:opacity-70"
                >
                  Use estimate ({estimate} min)
                </button>
              </div>
            </Field>
          </div>

          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <Field
              label="Cover image"
              htmlFor="coverImage"
              error={errors.coverImage}
              hint="A URL or a path like /images/blog1.svg"
            >
              <input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className={`${input(errors.coverImage)} h-11`}
              />
              {coverImage.trim() && (
                <img
                  src={coverImage.trim()}
                  alt=""
                  className="mt-3 aspect-video w-full border border-[#CFDAC8] object-cover"
                />
              )}
            </Field>

            <Field label="Cover caption" htmlFor="coverCaption" error={errors.coverCaption}>
              <input
                id="coverCaption"
                value={coverCaption}
                onChange={(e) => setCoverCaption(e.target.value)}
                className={`${input(errors.coverCaption)} h-11`}
              />
            </Field>
          </div>
        </aside>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#CFDAC8] pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-13 cursor-pointer items-center gap-8 rounded-[3px] bg-[#123D2B] pl-5.75 pr-6 font-montserrat text-sm text-[#F5F7EF] transition-colors hover:bg-[#19382B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </button>
        <Link
          to="/dashboard/posts"
          className="font-montserrat text-sm text-[#647466] transition-colors hover:text-[#19382B]"
        >
          Cancel
        </Link>
        {formError && (
          <p role="alert" className="font-montserrat text-sm text-[#B3261E]">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
}