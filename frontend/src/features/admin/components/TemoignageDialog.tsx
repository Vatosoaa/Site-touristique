import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TemoignageDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (temoignageData: any) => Promise<void>
  temoignage?: any // If provided, we are editing
}

export function TemoignageDialog({ isOpen, onClose, onSave, temoignage }: TemoignageDialogProps) {
  const [author, setAuthor] = useState("")
  const [rating, setRating] = useState(5)
  const [avatar, setAvatar] = useState("")
  const [trip, setTrip] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (temoignage) {
      setAuthor(temoignage.author || "")
      setRating(temoignage.rating || 5)
      setAvatar(temoignage.avatar || "")
      setTrip(temoignage.trip || "")
      setContent(temoignage.content || "")
    } else {
      setAuthor("")
      setRating(5)
      setAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop")
      setTrip("")
      setContent("")
    }
    setError(null)
  }, [temoignage, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSave({
        author,
        rating: Number(rating),
        avatar,
        trip,
        content
      })
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to save testimonial.")
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
            className="bg-card border border-border rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 text-foreground font-sans transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">
                {temoignage ? "Modifier le témoignage" : "Ajouter un témoignage"}
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
                  {error === "Failed to save testimonial." ? "Échec de l'enregistrement du témoignage." : error}
                </div>
              )}

              {/* Author */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Nom de l'auteur
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Ex. Marc & Julie"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                />
              </div>

              {/* Rating & Trip */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Note (1 à 5 étoiles)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-background border border-border text-foreground rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {"⭐".repeat(num)} ({num}/5)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Voyage / Circuit associé
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex. Séjours balnéaires à l'Est"
                    value={trip}
                    onChange={(e) => setTrip(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Avatar URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  URL de l'avatar (photo)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/60">
                    <User className="w-5 h-5" />
                  </span>
                  <Input
                    type="text"
                    placeholder="Ex. https://images.unsplash.com/..."
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Avis / Témoignage
                </label>
                <Textarea
                  rows={4}
                  required
                  placeholder="Écrivez le contenu du témoignage..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-3">
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
