import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { projects } from "@/db/schema";
import { slugify } from "@/lib/article";
import { projectInput, type ProjectInput } from "@/lib/project-schema";
import { Field, inputClass, Toggle } from "./form-ui";

type Project = typeof projects.$inferSelect;
type SubmitResult = { ok: true } | { ok: false; error: string; field?: string };

type Props = {
  initial?: Project;
  defaultSortOrder?: number;
  submitLabel: string;
  onSubmit: (values: ProjectInput) => Promise<SubmitResult>;
};

const swatches = [
  { name: "Sage", value: "#D8DDD0" },
  { name: "Moss", value: "#D6DCC8" },
  { name: "Sand", value: "#D6CCBA" },
];

const isHex = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v);

function toSlug(text: string) {
  return slugify(text).replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

export default function ProjectForm({
  initial,
  defaultSortOrder = 0,
  submitLabel,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [mobileImage, setMobileImage] = useState(initial?.mobileImage ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [bgColor, setBgColor] = useState(initial?.bgColor ?? "#D8DDD0");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? false);
  const [sortOrder, setSortOrder] = useState(
    String(initial?.sortOrder ?? defaultSortOrder),
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(toSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const parsed = projectInput.safeParse({
      title,
      slug,
      category,
      description: description.trim() || null,
      image,
      mobileImage: mobileImage.trim() || null,
      url: url.trim() || null,
      bgColor,
      featured,
      published,
      sortOrder: Number(sortOrder),
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
              placeholder="Forma Studio"
              className={`${inputClass(errors.title)} h-13`}
            />
          </Field>

          <Field
            label="Category line"
            htmlFor="category"
            error={errors.category}
            hint="Shown above the title, e.g. Architecture / Brand direction, website design & development"
          >
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass(errors.category)} h-13`}
            />
          </Field>

          <Field
            label="Description (optional)"
            htmlFor="description"
            error={errors.description}
            hint={`${description.length}/500. Not shown on the homepage yet, but ready for a project page.`}
          >
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputClass(errors.description)} resize-y py-3.5 leading-6`}
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Desktop preview image"
              htmlFor="image"
              error={errors.image}
              hint="The site screenshot without the coloured frame. About 1192×458 for a featured card, 568×318 for a regular one."
            >
              <input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/work/forma-desktop.jpg"
                className={`${inputClass(errors.image)} h-13`}
              />
              {image.trim() && (
                <img
                  src={image.trim()}
                  alt=""
                  className="mt-3 aspect-video w-full border border-[#CFDAC8] object-cover"
                />
              )}
            </Field>

            <Field
              label="Mobile preview image (optional)"
              htmlFor="mobileImage"
              error={errors.mobileImage}
              hint="About 318px wide. Falls back to the desktop image if empty."
            >
              <input
                id="mobileImage"
                value={mobileImage}
                onChange={(e) => setMobileImage(e.target.value)}
                placeholder="/images/work/forma-mobile.jpg"
                className={`${inputClass(errors.mobileImage)} h-13`}
              />
              {mobileImage.trim() && (
                <img
                  src={mobileImage.trim()}
                  alt=""
                  className="mt-3 aspect-video w-full border border-[#CFDAC8] object-cover"
                />
              )}
            </Field>
          </div>

          <Field
            label="Live URL (optional)"
            htmlFor="url"
            error={errors.url}
            hint="If set, the homepage card links here in a new tab."
          >
            <input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className={`${inputClass(errors.url)} h-13`}
            />
          </Field>
        </div>

        {/* Side column */}
        <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-8">
          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <Toggle
              label="Published"
              description={published ? "Visible on the homepage" : "Saved as a draft"}
              checked={published}
              onChange={setPublished}
            />
            <div className="border-t border-[#E3EADD] pt-5">
              <Toggle
                label="Featured"
                description={
                  featured ? "Spans the full row on desktop" : "Sits in a half-width card"
                }
                checked={featured}
                onChange={setFeatured}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 border border-[#CFDAC8] bg-white p-5">
            <Field
              label="Slug"
              htmlFor="slug"
              error={errors.slug}
              hint="For a future project page: /work/your-slug"
            >
              <input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className={`${inputClass(errors.slug)} h-11`}
              />
            </Field>

            <Field
              label="Display order"
              htmlFor="sortOrder"
              error={errors.sortOrder}
              hint="Lower numbers show first."
            >
              <input
                id="sortOrder"
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`${inputClass(errors.sortOrder)} h-11 w-28`}
              />
            </Field>
          </div>

          <div className="flex flex-col gap-4 border border-[#CFDAC8] bg-white p-5">
            <Field label="Card colour" error={errors.bgColor}>
              <div className="flex flex-wrap items-center gap-2.5">
                {swatches.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    title={s.name}
                    aria-label={s.name}
                    onClick={() => setBgColor(s.value)}
                    style={{ backgroundColor: s.value }}
                    className={`size-9 cursor-pointer border transition-shadow ${
                      bgColor.toLowerCase() === s.value.toLowerCase()
                        ? "border-[#19382B] ring-2 ring-[#197044]"
                        : "border-[#CCD7C6]"
                    }`}
                  />
                ))}
                <input
                  type="color"
                  aria-label="Pick a custom colour"
                  value={isHex(bgColor) ? bgColor : "#D8DDD0"}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="size-9 cursor-pointer border border-[#CCD7C6] bg-white p-0.5"
                />
                <input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  spellCheck={false}
                  className={`${inputClass(errors.bgColor)} h-9 w-28 px-3 font-mono text-xs`}
                />
              </div>
            </Field>

            <div>
              <p className="mb-2 font-montserrat text-xs text-[#647466]">Card preview</p>
              <div
                className="p-4"
                style={{ backgroundColor: isHex(bgColor) ? bgColor : "#D8DDD0" }}
              >
                {image.trim() ? (
                  <img src={image.trim()} alt="" className="block aspect-video w-full object-cover" />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-white/60 font-montserrat text-xs text-[#647466]">
                    No image yet
                  </div>
                )}
              </div>
              <p className="mt-3 font-montserrat text-[10px] uppercase leading-4 tracking-[1px] text-[#647466]">
                {category || "Category line"}
              </p>
              <p className="mt-1 text-2xl leading-8 text-[#19382B]">{title || "Project title"}</p>
            </div>
          </div>
        </aside>
      </div>

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