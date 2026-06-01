import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface BlogDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (blogData: any) => Promise<void>
  blog?: any // If provided, we are editing
}

export function BlogDialog({ isOpen, onClose, onSave, blog }: BlogDialogProps) {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [image, setImage] = useState("")
  const [categories, setCategories] = useState("")
  const [tags, setTags] = useState("")
  const [authorQuote, setAuthorQuote] = useState("")
  const [paragraphs, setParagraphs] = useState("")
  const [contentImages, setContentImages] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "")
      setExcerpt(blog.excerpt || "")
      setImage(blog.image || "")
      setCategories(Array.isArray(blog.categories) ? blog.categories.join(", ") : "")
      setTags(Array.isArray(blog.tags) ? blog.tags.join(", ") : "")
      setAuthorQuote(blog.authorQuote || "")
      setParagraphs(Array.isArray(blog.contentParagraphs) ? blog.contentParagraphs.join("\n\n") : "")
      setContentImages(Array.isArray(blog.contentImages) ? blog.contentImages.join(", ") : "")
    } else {
      setTitle("")
      setExcerpt("")
      setImage("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop")
      setCategories("Travel, Tips")
      setTags("Adventure, Vacation")
      setAuthorQuote("")
      setParagraphs("")
      setContentImages("")
    }
    setError(null)
  }, [blog, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Split category, tags, paragraphs and images
    const categoriesArray = categories.split(",").map(c => c.trim()).filter(Boolean)
    const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean)
    const contentImagesArray = contentImages.split(",").map(i => i.trim()).filter(Boolean)
    const paragraphsArray = paragraphs.split("\n\n").map(p => p.trim()).filter(Boolean)

    // Generate readable date
    const dateStr = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })

    try {
      await onSave({
        title,
        excerpt,
        image,
        date: blog ? blog.date : dateStr, // Preserve original date or use current
        categories: categoriesArray,
        tags: tagsArray,
        authorQuote: authorQuote || null,
        contentParagraphs: paragraphsArray,
        contentImages: contentImagesArray
      })
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to save blog post.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-foreground font-sans scrollbar-thin transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="text-xl font-bold text-foreground">
                {blog ? "Modifier l'article" : "Ajouter un nouvel article"}
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground p-3 rounded-xl text-xs font-semibold text-red-400">
                  {error === "Failed to save blog post." ? "Échec de l'enregistrement de l'article." : error}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Titre de l'article
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Ex. Conseils pour voyages en famille..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Bref extrait
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Un court extrait qui apparaît sur la page liste..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                />
              </div>

              {/* Main Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  URL de l'image de couverture
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/60">
                    <ImageIcon className="w-5 h-5" />
                  </span>
                  <Input
                    type="text"
                    required
                    placeholder="https://unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Categories & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Catégories (séparées par des virgules)
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="Voyage, Astuces..."
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Tags (séparés par des virgules)
                  </label>
                  <Input
                    type="text"
                    placeholder="Aventure, Nature..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Author Quote */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Citation de l'auteur (Optionnel)
                </label>
                <Input
                  type="text"
                  placeholder="Ex. Voyager en dit long sur nous..."
                  value={authorQuote}
                  onChange={(e) => setAuthorQuote(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                />
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Corps de l'article (Paragraphes)
                </label>
                <span className="text-[10px] text-muted-foreground/80 block mb-1">
                  💡 Séparez chaque paragraphe par une ligne vide (double Entrée)
                </span>
                <Textarea
                  rows={8}
                  required
                  placeholder="Entrez le contenu complet de l'article ici. Structurez votre texte..."
                  value={paragraphs}
                  onChange={(e) => setParagraphs(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl resize-none font-sans"
                />
              </div>

              {/* Additional Content Images */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Images supplémentaires (séparées par des virgules)
                </label>
                <span className="text-[10px] text-muted-foreground/80 block mb-1">
                  Optionnellement, ajoutez jusqu'à 2 images à afficher au sein de l'article
                </span>
                <Input
                  type="text"
                  placeholder="url1, url2..."
                  value={contentImages}
                  onChange={(e) => setContentImages(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-3 sticky bottom-0 bg-card py-3 mt-4 border-t border-border">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-5 bg-muted hover:bg-accent text-foreground hover:text-accent-foreground font-bold rounded-xl cursor-pointer"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-5 bg-orange-yellow hover:bg-orange-yellow/90 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
