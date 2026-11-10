import { createFileRoute } from "@tanstack/react-router";
import { getCaseStudyList } from "#/functions/projects";
import { aboutJsonLd, seoHead } from "#/lib/seo";
import { ABOUT_FAQS, ABOUT_META, ORG, TEAM } from "#/content/about";
import FaqSection from "#/components/home/faq";
import AboutCta from "#/components/about/about-cta";
import AboutHero from "#/components/about/about-hero";
import AboutIntro from "#/components/about/about-intro";
import AboutMission from "#/components/about/about-mission";
import AboutPrinciples from "#/components/about/about-principles";
import AboutWhy from "#/components/about/about-why";
import AboutWork from "#/components/about/about-work";

export const Route = createFileRoute("/about")({
  loader: () => getCaseStudyList(),
  head: () =>
    seoHead({
      title: ABOUT_META.title,
      description: ABOUT_META.description,
      path: "/about",
      image: "/og-image.png",
      jsonLd: aboutJsonLd({
        title: ABOUT_META.title,
        description: ABOUT_META.description,
        path: "/about",
        dateModified: ABOUT_META.updated,
        org: ORG,
        team: TEAM,
        faqs: ABOUT_FAQS,
      }),
    }),
  component: AboutPage,
});

function AboutPage() {
  const caseStudies = Route.useLoaderData();

  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutMission />
      <AboutPrinciples />
      <AboutWhy />
      <AboutWork projects={caseStudies} />
      <FaqSection faqs={ABOUT_FAQS} />
      <AboutCta />
    </>
  );
}