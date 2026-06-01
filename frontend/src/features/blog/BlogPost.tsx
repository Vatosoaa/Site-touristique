import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Clock, Tag, ChevronLeft, Facebook, Twitter, Loader2 } from "lucide-react"
import { Link, useParams, Navigate } from "react-router-dom"
import { blogPosts } from "@/data/blogPosts"
import { api } from "@/lib/api"

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState<any | null>(null)
  const [prevPost, setPrevPost] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    
    const fetchPostData = async () => {
      try {
        // Try fetching single post from backend
        const dbPost = await api.getBlogPost(Number(id))
        setPost(dbPost)

        // Find prev post in backend list
        const allPosts = await api.getBlogPosts()
        const currentIndex = allPosts.findIndex((p: any) => p.id === dbPost.id)
        if (currentIndex !== -1 && allPosts.length > 1) {
          const prev = allPosts[(currentIndex + 1) % allPosts.length]
          setPrevPost(prev)
        }
        setLoading(false)
      } catch (error) {
        console.log("Failed to fetch blog post from backend, checking fallback data...", error)
        // Fallback to static mock data
        const localPost = blogPosts.find(p => p.id === Number(id))
        if (localPost) {
          setPost(localPost)
          const localPrev = blogPosts.find(p => p.id === (localPost.id === 1 ? blogPosts.length : localPost.id - 1))
          setPrevPost(localPrev || null)
          setLoading(false)
        } else {
          setNotFound(true)
          setLoading(false)
        }
      }
    }

    fetchPostData()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="min-h-[80vh] w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-orange-yellow animate-spin" />
            <span className="text-sm font-semibold text-slate-500">Loading article...</span>
          </div>
        </div>
        <Footer hideQuestionSection={true} />
      </main>
    )
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      {/* Post Hero */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay to make text pop */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-orange-yellow mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium"
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-20 px-6 md:px-12 w-full flex justify-center">
        <div className="max-w-4xl w-full flex flex-col gap-12">
          
          <p className="text-slate-600 text-lg leading-relaxed">
            {post.contentParagraphs[0]}
          </p>

          {post.contentImages[0] && (
            <img 
              src={post.contentImages[0]} 
              alt="Article visualization" 
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
          )}

          {/* Date and Categories */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Clock className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-3">
              {post.categories.map((cat: string, idx: number) => (
                <span key={idx} className="px-4 py-1.5 rounded-full bg-forest-green/10 text-forest-green text-sm font-semibold">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {post.contentParagraphs[1] && (
            <p className="text-slate-600 text-lg leading-relaxed">
              {post.contentParagraphs[1]}
            </p>
          )}

          {post.contentImages[1] && (
            <img 
              src={post.contentImages[1]} 
              alt="Additional context" 
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
          )}

          {/* Tags and Social Share */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-200 mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-orange-yellow font-bold">
                <Tag className="w-5 h-5" />
                <span>Tags:</span>
              </div>
              <div className="flex items-center gap-2">
                {post.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded bg-slate-200 text-slate-700 text-xs font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-500 hover:text-[#1877F2] transition-colors font-semibold">
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-[#1DA1F2] transition-colors font-semibold">
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </button>
            </div>
          </div>

          {/* Previous Post Link */}
          {prevPost && (
            <div className="pt-12 mt-4">
              <Link to={`/blog/${prevPost.id}`} className="inline-flex items-center gap-3 text-slate-800 hover:text-forest-green font-bold text-lg transition-colors group">
                <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-forest-green transition-colors" />
                {prevPost.title}
              </Link>
            </div>
          )}

        </div>
      </section>

      <Footer hideQuestionSection={true} />
    </main>
  )
}
