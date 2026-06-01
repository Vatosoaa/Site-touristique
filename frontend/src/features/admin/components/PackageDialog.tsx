import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PackageDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (pkgData: any) => Promise<void>
  pkg?: any // If provided, we are editing
}

export function PackageDialog({ isOpen, onClose, onSave, pkg }: PackageDialogProps) {
  const [title, setTitle] = useState("")
  const [region, setRegion] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (pkg) {
      setTitle(pkg.title || "")
      setRegion(pkg.region || "")
      setPrice(pkg.price || "")
      setDescription(pkg.description || "")
      setImage(pkg.image || "")
    } else {
      setTitle("")
      setRegion("")
      setPrice("")
      setDescription("")
      setImage("/images/destination2.jpg")
    }
    setError(null)
  }, [pkg, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSave({
        title,
        region,
        price,
        description,
        image
      })
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to save package.")
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
                {pkg ? "Modifier la formule" : "Ajouter une nouvelle formule"}
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
                  {error === "Failed to save package." ? "Échec de l'enregistrement de la formule." : error}
                </div>
              )}

              {/* Title & Region */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Nom de la formule
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="Ex. Aventure Hivernale..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Région
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="Ex. Europe, Asie..."
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Prix
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Ex. 1200 €"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Chemin de l'image / URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/60">
                    <ImageIcon className="w-5 h-5" />
                  </span>
                  <Input
                    type="text"
                    required
                    placeholder="Ex. /images/destination3.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Description
                </label>
                <Textarea
                  rows={4}
                  required
                  placeholder="Détails de la formule..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
