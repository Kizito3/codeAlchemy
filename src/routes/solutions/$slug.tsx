import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import FaqSection from "#/components/home/faq";
import AboutCta from "#/components/about/about-cta";
import SolutionDiscovery from "#/components/solutions/solution-discovery";
import SolutionFeatures from "#/components/solutions/solution-features";
import SolutionHero from "#/components/solutions/solution-hero";
import SolutionMore from "#/components/solutions/solution-more";
import SolutionNeeds from "#/components/solutions/solution-needs";
import SolutionWhy from "#/components/solutions/solution-why";
import { getSolution, SOLUTIONS } from "#/content/solutions";
import { getCaseStudyList } from "#/functions/projects";
import { seoHead, serviceJsonLd } from "#/lib/seo";

export const Route = createFileRoute("/solutions/$slug")({
  loader: async ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();

    const cases = await getCaseStudyList();
    const related = cases.find((c) => c.slug === solution.relatedCaseSlug) ?? null;
    return { solution, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { solution } = loaderData;
    const path = `/solutions/${solution.slug}`;

    return seoHead({
      title: solution.title,
      description: solution.description,
      path,
      image: "/og-image.png",
      jsonLd: serviceJsonLd({
        name: solution.title.split(" | ")[0],
        label: solution.label,
        description: solution.description,
        path,
        audience: solution.audience,
        dateModified: solution.updated,
        areaServed: "Nigeria",
        faqs: solution.faqs,
      }),
    });
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-5xl text-[#123D2B]">Page not found.</h1>
      <Link to="/solutions" className="mt-6 inline-block text-[#197044] underline">
        See all solutions
      </Link>
    </div>
  ),
  component: SolutionPage,
});

function SolutionPage() {
  const { solution, related } = Route.useLoaderData();
  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug);

  return (
    <>
      <SolutionHero solution={solution} />
      <SolutionNeeds solution={solution} />
      <SolutionFeatures solution={solution} />
      <SolutionWhy solution={solution} />
      <SolutionDiscovery solution={solution} />
      <SolutionMore related={related} others={others} />
      <FaqSection faqs={solution.faqs} />
      <AboutCta />
    </>
  );
}