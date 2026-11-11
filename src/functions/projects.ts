import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { and, asc, eq, ne } from "drizzle-orm";
import { caseStudyInput } from "../lib/case-study-schema";
import { z } from "zod";
import { db } from "../db";
import { projects } from "../db/schema";
import { projectInput } from "../lib/project-schema";
import { authMiddleware } from "../server/middleware";

const duplicateSlug = {
  ok: false as const,
  field: "slug",
  error: "That slug is already used by another project.",
};

const caseStudyCard = {
  id: projects.id,
  slug: projects.slug,
  title: projects.title,
  category: projects.category,
  image: projects.image,
  coverImage: projects.coverImage,
  bgColor: projects.bgColor,
  summary: projects.summary,
};

// ---------- Public ----------
export const getPublishedProjects = createServerFn({ method: "GET" }).handler(() =>
  db
    .select({
      id: projects.id,
      slug: projects.slug,
      title: projects.title,
      category: projects.category,
      image: projects.image,
      mobileImage: projects.mobileImage,
      coverImage: projects.coverImage,
      summary: projects.summary,
      url: projects.url,
      bgColor: projects.bgColor,
      featured: projects.featured,
      caseStudyPublished: projects.caseStudyPublished,
    })
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.sortOrder), asc(projects.id)),
);

// ---------- Admin (auth required) ----------
export const getAllProjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(() =>
    db
      .select({
        id: projects.id,
        slug: projects.slug,
        title: projects.title,
        category: projects.category,
        image: projects.image,
        url: projects.url,
        featured: projects.featured,
        published: projects.published,
         caseStudyPublished: projects.caseStudyPublished,
        sortOrder: projects.sortOrder,
        createdAt: projects.createdAt,
      })
      .from(projects)
      .orderBy(asc(projects.sortOrder), asc(projects.id)),
  );

export const getProjectById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ data: id }) => {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    if (!project) throw notFound();
    return project;
  });

export const createProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(projectInput)
  .handler(async ({ data }) => {
    try {
      const [row] = await db.insert(projects).values(data).returning({ id: projects.id });
      return { ok: true as const, id: row.id };
    } catch (e: any) {
      if (e?.cause?.code === "23505") return duplicateSlug;
      throw e;
    }
  });

export const updateProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), values: projectInput }))
  .handler(async ({ data }) => {
    try {
      await db.update(projects).set(data.values).where(eq(projects.id, data.id));
      return { ok: true as const };
    } catch (e: any) {
      if (e?.cause?.code === "23505") return duplicateSlug;
      throw e;
    }
  });

export const setProjectPublished = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), published: z.boolean() }))
  .handler(async ({ data }) => {
    await db
      .update(projects)
      .set({ published: data.published })
      .where(eq(projects.id, data.id));
    return { ok: true as const };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ data: id }) => {
    await db.delete(projects).where(eq(projects.id, id));
    return { ok: true as const };
  });



  // ---------- Public CASE STUDY----------
export const getCaseStudyList = createServerFn({ method: "GET" }).handler(() =>
  db
    .select(caseStudyCard)
    .from(projects)
    .where(eq(projects.caseStudyPublished, true))
    .orderBy(asc(projects.sortOrder), asc(projects.id)),
);

export const getCaseStudy = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: slug }) => {
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.caseStudyPublished, true)));
    if (!project) throw notFound();

    const more = await db
      .select(caseStudyCard)
      .from(projects)
      .where(and(eq(projects.caseStudyPublished, true), ne(projects.id, project.id)))
      .orderBy(asc(projects.sortOrder))
      .limit(2);

    return { project, more };
  });

// ---------- Admin ----------
export const saveCaseStudy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), values: caseStudyInput }))
  .handler(async ({ data }) => {
    await db
      .update(projects)
      .set({ ...data.values, updatedAt: new Date() })
      .where(eq(projects.id, data.id));
    return { ok: true as const };
  });