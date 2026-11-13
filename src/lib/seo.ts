export const SITE_NAME = "codeAlchemy";
const DEFAULT_OG_IMAGE = "/images/blog1.svg";
export const SITE_URL = String(
  import.meta.env.VITE_SITE_URL ?? "https://thecodealchemy.com.ng",
).replace(/\/$/, "");

export function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

export function clamp(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  jsonLd?: object;
  extraMeta?: { property: string; content: string }[];
};

export function seoHead({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
  extraMeta = [],
}: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const img = absoluteUrl(image || DEFAULT_OG_IMAGE);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      ...extraMeta,
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          },
        ]
      : [],
  };
}

export function caseStudyJsonLd(p: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
          { "@type": "ListItem", position: 3, name: p.title, item: p.url },
        ],
      },
      {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: p.url,
        ...(p.image ? { image: absoluteUrl(p.image) } : {}),
        dateModified: p.dateModified,
        creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
    ],
  };
}

export function homeJsonLd(p: {
  description: string;
  email: string;
  areaServed: string;
  sameAs: string[];
  services: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/logo.png"),
        image: absoluteUrl("/og-image.png"),
        description: p.description,
        email: p.email,
        areaServed: p.areaServed,
        serviceType: p.services,
        ...(p.sameAs.length > 0 ? { sameAs: p.sameAs } : {}),
      },
    ],
  };
}

type AboutJsonLdInput = {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  org: {
    name: string;
    email: string;
    founded: number | null;
    sameAs: readonly string[];
    location: { locality: string; region: string; countryCode: string };
  };
  team: readonly {
    name: string;
    role: string;
    image?: string;
    links: readonly { label: string; url: string }[];
  }[];
  faqs: readonly { question: string; answer: string }[];
};

export function aboutJsonLd(p: AboutJsonLdInput) {
  const url = `${SITE_URL}${p.path}`;
  const orgId = `${SITE_URL}/#organization`;
  const personId = (name: string) =>
    `${url}#person-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: p.title,
        description: p.description,
        dateModified: p.dateModified,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgId },
        mainEntity: { "@id": orgId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About", item: url },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: p.org.name,
        url: SITE_URL,
        email: p.org.email,
        logo: absoluteUrl("/logo.png"),
        ...(p.org.founded ? { foundingDate: String(p.org.founded) } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: p.org.location.locality,
          addressRegion: p.org.location.region,
          addressCountry: p.org.location.countryCode,
        },
        ...(p.org.sameAs.length > 0 ? { sameAs: [...p.org.sameAs] } : {}),
        ...(p.team.length > 0
          ? { employee: p.team.map((m) => ({ "@id": personId(m.name) })) }
          : {}),
      },
      ...p.team.map((m) => ({
        "@type": "Person",
        "@id": personId(m.name),
        name: m.name,
        jobTitle: m.role,
        worksFor: { "@id": orgId },
        ...(m.image ? { image: absoluteUrl(m.image) } : {}),
        ...(m.links.length > 0 ? { sameAs: m.links.map((l) => l.url) } : {}),
      })),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export function serviceJsonLd(p: {
  name: string;
  label: string;
  description: string;
  path: string;
  audience: string;
  dateModified: string;
  areaServed: string;
  faqs: readonly { question: string; answer: string }[];
}) {
  const url = `${SITE_URL}${p.path}`;
  const orgId = `${SITE_URL}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: p.name,
        description: p.description,
        dateModified: p.dateModified,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
          { "@type": "ListItem", position: 3, name: p.label, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: p.name,
        description: p.description,
        url,
        serviceType: p.name,
        provider: { "@id": orgId },
        areaServed: { "@type": "Country", name: p.areaServed },
        audience: { "@type": "Audience", audienceType: p.audience },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export function insightsJsonLd(p: {
  title: string;
  description: string;
  path: string;
  posts: readonly { slug: string; title: string }[];
}) {
  const url = `${SITE_URL}${p.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: p.title,
        description: p.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#list` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Insights", item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: p.posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/insights/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };
}

export function articleJsonLd(p: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished: string;
  dateModified: string;
  section: string;
  wordCount: number;
}) {
  const url = `${SITE_URL}${p.path}`;
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: p.title.slice(0, 110),
        description: p.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: [absoluteUrl(p.image || DEFAULT_OG_IMAGE)],
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        articleSection: p.section,
        wordCount: p.wordCount,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
}

export function contactJsonLd(p: {
  title: string;
  description: string;
  path: string;
  email: string;
}) {
  const url = `${SITE_URL}${p.path}`;
  const orgId = `${SITE_URL}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: p.title,
        description: p.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Contact", item: url },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        email: p.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: p.email,
          availableLanguage: "English",
        },
      },
    ],
  };
}