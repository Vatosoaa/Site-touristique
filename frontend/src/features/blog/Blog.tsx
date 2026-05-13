import { BlogHero } from "./components/BlogHero"
import { BlogList } from "./components/BlogList"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BlogHero />
      
      <BlogList />

      <Footer hideQuestionSection={true} />
    </main>
  )
}
