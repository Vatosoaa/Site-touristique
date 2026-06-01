import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, Image as ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"

interface ServiceDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (serviceData: any) => Promise<void>
  onSuccess?: (message: string) => void
  onError?: (message: string) => void
  service?: any
}

export function ServiceDialog({ isOpen, onClose, onSave, onSuccess, onError, service }: ServiceDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [distance, setDistance] = useState("")
  const [price, setPrice] = useState("")
  const [rating, setRating] = useState("5")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (service) {
      setTitle(service.title || "")
      setDescription(service.description || "")
      setLocation(service.location || "")
      setDistance(service.distance || "")
      setPrice(service.price || "")
      setRating(String(service.rating || 5))
      setImage(service.image || "")
      setImageFile(null)
      setImagePreview(service.image || "")
    } else {
      setTitle("")
      setDescription("")
      setLocation("")
      setDistance("")
      setPrice("")
      setRating("5")
      setImage("")
      setImageFile(null)
      setImagePreview("")
    }
    setError(null)
  }, [service, isOpen])

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Veuillez choisir un fichier image.")
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      let uploadedImage = image
      if (imageFile) {
        const dataUrl = await readFileAsDataUrl(imageFile)
        const upload = await api.uploadServiceImage(imageFile.name, dataUrl)
        uploadedImage = upload.image
        setImage(upload.image)
      }

      await onSave({
        title,
        description,
        location,
        distance,
        price,
        rating: Number(rating),
        image: uploadedImage
      })
      onSuccess?.(service ? "Service mis à jour." : "Service créé.")
      onClose()
    } catch (err: any) {
      const message = err.message || "Failed to save service."
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 text-foreground font-sans transition-colors duration-300"
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-border">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-500" />
                {service ? "Modifier le service" : "Ajouter un nouveau service"}
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground p-3 rounded-xl text-xs font-semibold text-red-400">
                  {error === "Failed to save service." ? "Echec de l'enregistrement du service." : error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Nom du service
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="Ex. Autotour a Madagascar"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Lieu / categorie
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex. Le Grand Sud"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Description
                </label>
                <Textarea
                  rows={4}
                  required
                  placeholder="Entrez une description detaillee..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Duree / sous-titre
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex. 12 jours / 11 nuits"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Prix / mention
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex. 250 000 Ar/pers"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Note
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Image
                </label>
                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-stretch">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Apercu du service"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                    )}
                  </div>
                  <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center transition-colors hover:bg-muted/40">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm font-bold text-foreground">
                      Choisir une image
                    </span>
                    <span className="text-xs text-muted-foreground">
                      JPG, PNG, WEBP ou GIF
                    </span>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

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
