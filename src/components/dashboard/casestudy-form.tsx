import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, X } from "lucide-react";
import type { projects } from "@/db/schema";
import { extractHeadings } from "@/lib/article";
import { caseStudyInput, type CaseStudyInput } from "@/lib/case-study-schema";
import { clamp, SITE_NAME, SITE_URL } from "@/lib/seo";
import { Field, inputClass, Toggle } from "./form-ui";
import ArticleMarkdown from "../insights/article-markdown";

type Project = typeof projects.$inferSelect;
type SubmitResult = { ok: true } | { ok: false; error: string; field?: string };

const list = (value: string, separator: RegExp) =>
  value.split(separator).map((item) => item.trim()).filter(Boolean);

export default function CaseStudyForm({
  project,
  onSubmit,
}: {
  project: Project;
  onSubmit: (values: CaseStudyInput) => Promise<SubmitResult>;
}) {
  const [published, setPublished] = useState(project.caseStudyPublished);
  const [summary, setSummary] = useState(project.summary ?? "");
  const [client, setClient] = useState(project.client ?? "");
  const [year, setYear] = useState(project.year ? String(project.year) : "");
  const [services, setServices] = useState(project.servicesProvided.join(", "));
  const [coverImage, setCoverImage] = useState(project.coverImage ?? "");
  const [results, setResults] = useState(project.results);
  const [content, setContent] = useState(project.content ?? "");
  const [gallery, setGallery] = useState(project.gallery.join("\n"));
  const [metaTitle, setMetaTitle] = useState(project.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(project.metaDescription ?? "");
  const [ogImage, setOgImage] = useState(project.ogImage ?? "");

  const [tab, setTab] = useState<"write" | "preview">("write");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);

  const headings = useMemo(() => extractHeadings(content), [content]);
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const serpTitle = metaTitle.trim() || `${project.title} case study | ${SITE_NAME}`;
  const serpDescription = metaDescription.trim() || clamp(summary, 160);

  const updateResult = (index: number, key: "value" | "label", value: string) =>
    setResults((current) =>
      current.map((r, i) => (i === index ? { ...r, [key]: value } : r)),
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const parsed = caseStudyInput.safeParse({
      caseStudyPublished: published,
      summary: summary.trim() || null,
      client: client.trim() || null,
      year: year.trim() ? Number(year) : null,
      servicesProvided: list(services, /,/),
      coverImage: coverImage.trim() || null,
      results: results.filter((r) => r.value.trim() || r.label.trim()),
      content: content.trim() || null,
      gallery: list(gallery, /\n/),
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
      ogImage: ogImage.trim() || null,
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
          <Field
            label="Summary"
            htmlFor="summary"
            error={errors.summary}
            hint={`${summary.length}/300. Shows under the title and doubles as your fallback meta description.`}
          >
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              className={`${inputClass(errors.summary)} resize-y py-3.5 leading-6`}
            />
          </Field>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-montserrat text-[13px] text-[#19382B]">Case study (markdown)</p>
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
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={22}
                  spellCheck
                  placeholder={"# One sentence on what this project was really about.\n\n## The brief\n\n...\n\n## Our approach\n\n...\n\n## The outcome\n\n..."}
                  className={`${inputClass(errors.content)} resize-y py-4 font-mono text-[13px] leading-6`}
                />
                {errors.content && (
                  <p role="alert" className="mt-1.5 font-montserrat text-xs text-[#B3261E]">
                    {errors.content}
                  </p>
                )}
                <p className="mt-1.5 font-montserrat text-xs text-[#647466]">
                  {wordCount} words. Aim for 500+ of real substance: the brief, the decisions you made and why, and what came out of it. Use <code>##</code> headings, <code>&gt;</code> for a pull quote, and normal markdown links to link to related posts.
                </p>
              </>
            ) : (
              <div className="min-h-100 border border-[#CCD7C6] bg-white p-6 lg:p-10">
                {content.trim() ? (
                  <ArticleMarkdown content={content} headings={headings} sectionLabel="Case study" />
                ) : (
                  <p className="font-montserrat text-sm text-[#647466]">Nothing to preview yet.</p>
                )}
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <h2 className="text-xl text-[#19382B]">Search appearance</h2>

            <div className="border border-[#E3EADD] bg-[#FAFBF7] p-4">
              <p className="truncate font-montserrat text-xs text-[#4D5156]">
                {SITE_URL}/work/{project.slug}
              </p>
              <p className="mt-1 truncate font-sans text-[20px] leading-6 text-[#1A0DAB]">
                {serpTitle}
              </p>
              <p className="mt-1 line-clamp-2 font-sans text-sm leading-5.5 text-[#4D5156]">
                {serpDescription || "Add a summary or meta description to see it here."}
              </p>
            </div>

            <Field
              label="Meta title"
              htmlFor="metaTitle"
              error={errors.metaTitle}
              hint={`${metaTitle.length}/70. Aim for 50 to 60 characters. Put what people would search for first.`}
            >
              <input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={`${project.title} case study | ${SITE_NAME}`}
                className={`${inputClass(errors.metaTitle)} h-12`}
              />
            </Field>

            <Field
              label="Meta description"
              htmlFor="metaDescription"
              error={errors.metaDescription}
              hint={`${metaDescription.length}/170. Aim for 140 to 160 characters. Write it for a human deciding whether to click.`}
            >
              <textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className={`${inputClass(errors.metaDescription)} resize-y py-3.5 leading-6`}
              />
            </Field>

            <Field
              label="Social share image"
              htmlFor="ogImage"
              error={errors.ogImage}
              hint="1200×630 JPG or PNG. SVG isn't supported by most social platforms. Falls back to the cover image."
            >
              <input
                id="ogImage"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className={`${inputClass(errors.ogImage)} h-12`}
              />
            </Field>
          </div>
        </div>

        {/* Side column */}
        <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-8">
          <div className="border border-[#CFDAC8] bg-white p-5">
            <Toggle
              label="Publish case study"
              description={published ? "Live at /work/" + project.slug : "Not public yet"}
              checked={published}
              onChange={setPublished}
            />
          </div>

          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <Field label="Client" htmlFor="client" error={errors.client}>
              <input
                id="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className={`${inputClass(errors.client)} h-11`}
              />
            </Field>
            <Field label="Year" htmlFor="year" error={errors.year}>
              <input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`${inputClass(errors.year)} h-11 w-28`}
              />
            </Field>
            <Field
              label="What we did"
              htmlFor="services"
              error={errors.servicesProvided}
              hint="Separate with commas: Brand direction, Web design, Development"
            >
              <input
                id="services"
                value={services}
                onChange={(e) => setServices(e.target.value)}
                className={`${inputClass(errors.servicesProvided)} h-11`}
              />
            </Field>
          </div>

          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <Field
              label="Cover image"
              htmlFor="coverImage"
              error={errors.coverImage}
              hint="Large hero image. Falls back to the project's desktop preview."
            >
              <input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className={`${inputClass(errors.coverImage)} h-11`}
              />
              {coverImage.trim() && (
                <img
                  src={coverImage.trim()}
                  alt=""
                  className="mt-3 aspect-video w-full border border-[#CFDAC8] object-cover"
                />
              )}
            </Field>

            <Field
              label="Gallery"
              htmlFor="gallery"
              error={errors.gallery}
              hint="One image URL per line, up to 12."
            >
              <textarea
                id="gallery"
                value={gallery}
                onChange={(e) => setGallery(e.target.value)}
                rows={4}
                className={`${inputClass(errors.gallery)} resize-y py-3 font-mono text-xs leading-5`}
              />
            </Field>
          </div>

          <div className="border border-[#CFDAC8] bg-white p-5">
            <p className="font-montserrat text-[13px] text-[#19382B]">Results (optional)</p>
            <p className="mt-1 font-montserrat text-xs leading-5 text-[#647466]">
              Only add figures that are real and that you can stand behind.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {results.map((result, i) => (
                <div key={i} className="flex items-start gap-2">
                  <input
                    aria-label="Result value"
                    value={result.value}
                    onChange={(e) => updateResult(i, "value", e.target.value)}
                    placeholder="+42%"
                    className={`${inputClass()} h-10 w-20 px-3`}
                  />
                  <input
                    aria-label="Result label"
                    value={result.label}
                    onChange={(e) => updateResult(i, "label", e.target.value)}
                    placeholder="Enquiries in 3 months"
                    className={`${inputClass()} h-10 min-w-0 flex-1 px-3`}
                  />
                  <button
                    type="button"
                    aria-label="Remove result"
                    onClick={() => setResults((cur) => cur.filter((_, idx) => idx !== i))}
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-[#647466] transition-colors hover:text-[#B3261E]"
                  >
                    <X className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            {errors.results && (
              <p role="alert" className="mt-2 font-montserrat text-xs text-[#B3261E]">
                {errors.results}
              </p>
            )}

            {results.length < 4 && (
              <button
                type="button"
                onClick={() => setResults((cur) => [...cur, { value: "", label: "" }])}
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-montserrat text-xs text-[#197044] transition-opacity hover:opacity-70"
              >
                <Plus className="size-3.5" strokeWidth={1.5} />
                Add a result
              </button>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#CFDAC8] pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-13 cursor-pointer items-center gap-8 rounded-[3px] bg-[#123D2B] pl-5.75 pr-6 font-montserrat text-sm text-[#F5F7EF] transition-colors hover:bg-[#19382B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save case study"}
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </button>
        <Link
          to="/dashboard/projects"
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