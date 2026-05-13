import { DestinationsHero } from "./components/DestinationsHero"
import { SearchHoliday } from "./components/SearchHoliday"
import { OurPackages } from "./components/OurPackages"
import { OurPopularTours } from "./components/OurPopularTours"
import { OurServices } from "./components/OurServices"
import { DestinationsCarousel } from "./components/DestinationsCarousel"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function Destinations() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <DestinationsHero />
      
      <SearchHoliday />
      <OurPackages />
      <OurPopularTours />
      <OurServices />
      <DestinationsCarousel />

      <Footer hideQuestionSection={true} />
    </main>
  )
}
