import AboutSection from '#/components/home/about'
import ContactSection from '#/components/home/contact'
import FaqSection from '#/components/home/faq'
import HeroSection from '#/components/home/hero-section'
import ProcessSection from '#/components/home/how-we-work'
import InsightsSection from '#/components/home/insights'
import ServicesSection from '#/components/home/service'
import StandardsSection from '#/components/home/standards'
import WorkSection from '#/components/home/works'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <StandardsSection />
      <InsightsSection />
      <FaqSection />
      <ContactSection />
    </div>
  )
}
