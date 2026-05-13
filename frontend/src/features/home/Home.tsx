import { Hero } from "./components/Hero"
import { Featured } from "./components/Featured"
import { AboutSection } from "./components/AboutSection"
import { WhyResort } from "./components/WhyResort"
import { TrustBanner } from "./components/TrustBanner"
import { ResortStyle } from "./components/ResortStyle"
import { Testimonials } from "./components/Testimonials"
import { ReservationPolicy } from "./components/ReservationPolicy"
import { FAQ } from "./components/FAQ"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Featured />
      <AboutSection />
      <WhyResort />
      <TrustBanner />
      <ResortStyle />
      <Testimonials />
      <ReservationPolicy />
      <FAQ />
      <Footer />
    </main>
  )
}
