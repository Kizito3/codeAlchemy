import AboutSection from "#/components/home/about";
import FaqSection from "#/components/home/faq";
import HeroSection from "#/components/home/hero-section";
import ProcessSection from "#/components/home/how-we-work";
import InsightsSection from "#/components/home/insights";
import ServicesSection from "#/components/home/service";
import StandardsSection from "#/components/home/standards";
import WorkSection from "#/components/home/works";
import { getLatestPosts } from "#/functions/posts";
import { getPublishedProjects } from "#/functions/projects";
import { homeJsonLd, seoHead } from "#/lib/seo";
import { createFileRoute } from "@tanstack/react-router";

// Edit these four lines
const TITLE = "Web Design & Development Studio | codeAlchemy";
const DESCRIPTION =
  "An independent web design and development studio crafting distinctive, fast websites for founders and growing teams. Strategy, design, build and care.";
const AREA_SERVED = "Owerri, Imo State, Abia, umuahia, adamawa, yola, akwaibom, uyo, anambra, awka, Nigeria, Africa, Worldwide";
const SOCIALS: string[] = [
  // "https://www.instagram.com/yourhandle",
  // "https://www.linkedin.com/company/yourcompany",
  // "https://www.behance.net/yourhandle",
];

export const Route = createFileRoute("/")({
  loader: async () => {
    const [latestPosts, projects] = await Promise.all([
      getLatestPosts(),
      getPublishedProjects(),
    ]);
    return { latestPosts, projects };
  },
  head: () =>
    seoHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/",
      image: "/og-image.png",
      jsonLd: homeJsonLd({
        description: DESCRIPTION,
        email: "hello@codealchemy.studio",
        areaServed: AREA_SERVED,
        sameAs: SOCIALS,
        services: [
          "Web design",
          "Web development",
          "Brand and digital identity",
          "Website care and maintenance",
        ],
      }),
    }),
  component: Home,
});

function Home() {
  const { latestPosts, projects } = Route.useLoaderData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection projects={projects} />
      <ProcessSection />
      <StandardsSection />
      <InsightsSection posts={latestPosts} />
      <FaqSection />
      {/* <ContactSection /> */}
    </>
  );
}