import { createFileRoute, Link } from "@tanstack/react-router";
import { getCaseStudy } from "@/functions/projects";
import { caseStudyJsonLd, clamp, seoHead, SITE_NAME, SITE_URL } from "@/lib/seo";
import CaseStudyHero from "#/components/work/casestudy-hero";
import CaseStudyResults from "#/components/work/casestudy-results";
import CaseStudyBody from "#/components/work/casestudy-body";
import CaseStudyGallery from "#/components/work/casestudy-gallery";
import CaseStudyFooter from "#/components/work/casestudy-footer";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => getCaseStudy({ data: params.slug }),
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { project } = loaderData;

    const title = project.metaTitle || `${project.title} case study | ${SITE_NAME}`;
    const description =
      project.metaDescription || clamp(project.summary ?? project.description ?? "", 160);
    const path = `/work/${params.slug}`;
    const image = project.ogImage ?? project.coverImage ?? project.image;

    return seoHead({
      title,
      description,
      path,
      image,
      jsonLd: caseStudyJsonLd({
        title: project.title,
        description,
        url: `${SITE_URL}${path}`,
        image,
        dateModified: new Date(project.updatedAt).toISOString(),
      }),
    });
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-5xl text-[#123D2B]">Case study not found.</h1>
      <Link to="/work" className="mt-6 inline-block text-[#197044] underline">
        Back to all work
      </Link>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { project, more } = Route.useLoaderData();

  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyResults results={project.results} />
      <CaseStudyBody project={project} />
      <CaseStudyGallery images={project.gallery} title={project.title} />
      <CaseStudyFooter more={more} />
    </>
  );
}