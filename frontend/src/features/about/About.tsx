import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AboutHero } from "./components/AboutHero"
import { AboutTeam } from "./components/AboutTeam"
import { TravelExperts } from "./components/TravelExperts"
import { StatsSection } from "./components/StatsSection"
import { PopularToursSection } from "./components/PopularToursSection"
import { AboutTestimonials } from "./components/AboutTestimonials"

export default function About() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <AboutHero />
      <AboutTeam />
      <TravelExperts />
      <StatsSection />
      <PopularToursSection />
      <AboutTestimonials />
      <Footer hideQuestionSection={true} />
    </main>
  )
}
