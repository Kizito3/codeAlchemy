import {
  boolean, integer, pgTable, serial, text, timestamp,jsonb
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // markdown
  category: text("category").notNull(),
  coverImage: text("cover_image"),
  coverCaption: text("cover_caption"),
sectionLabel: text("section_label"),
  readTime: integer("read_time").notNull().default(5),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  image: text("image"), // desktop preview
  mobileImage: text("mobile_image"),
  url: text("url"), // live site, optional
  bgColor: text("bg_color").notNull().default("#D8DDD0"),
  featured: boolean("featured").notNull().default(false), // spans the full row on desktop
  published: boolean("published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
    // case study
  caseStudyPublished: boolean("case_study_published").notNull().default(false),
  summary: text("summary"),
  client: text("client"),
  year: integer("year"),
  servicesProvided: text("services_provided").array().notNull().default([]),
  coverImage: text("cover_image"),
  results: jsonb("results")
    .$type<{ value: string; label: string }[]>()
    .notNull()
    .default([]),
  content: text("content"),
  gallery: text("gallery").array().notNull().default([]),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});