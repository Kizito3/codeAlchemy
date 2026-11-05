import AboutSection from '#/components/home/about'
import ContactSection from '#/components/home/contact'
import FaqSection from '#/components/home/faq'
import HeroSection from '#/components/home/hero-section'
import ProcessSection from '#/components/home/how-we-work'
import InsightsSection from '#/components/home/insights'
import ServicesSection from '#/components/home/service'
import StandardsSection from '#/components/home/standards'
import WorkSection from '#/components/home/works'
import { getLatestPosts } from '#/functions/posts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/")({
  loader: () => getLatestPosts(),
  component: Home,
});

function Home() {
  const latestPosts = Route.useLoaderData();
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <StandardsSection />
      <InsightsSection posts={latestPosts} />
      <FaqSection />
      <ContactSection />
    </div>
  )
}
