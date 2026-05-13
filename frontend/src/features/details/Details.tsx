import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { DetailHero } from "./components/DetailHero"
import { DetailTabs } from "./components/DetailTabs"
import { DetailBottom } from "./components/DetailBottom"
import { BookingForm } from "./components/BookingForm"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function Details() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <DetailHero />
      
      <section className="py-12 px-12 max-w-7xl mx-auto">
        <DetailTabs />
      </section>

      <BookingForm />

      <DetailBottom />

      <Footer hideQuestionSection={true} />
    </main>
  )
}
