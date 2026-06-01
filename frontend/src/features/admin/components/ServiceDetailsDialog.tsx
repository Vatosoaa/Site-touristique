import { motion, AnimatePresence } from "framer-motion"
import { X, Star, MapPin, Clock3, Coins, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  service?: any
}

export function ServiceDetailsDialog({ isOpen, onClose, service }: ServiceDetailsDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card text-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Détail du service
                </p>
                <h3 className="text-lg font-bold leading-tight">{service.title}</h3>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-border md:border-b-0 md:border-r">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover max-h-[320px]"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>

              <div className="space-y-4 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      Lieu
                    </div>
                    <div className="mt-1 text-sm font-semibold">{service.location || "Service"}</div>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Star className="h-3.5 w-3.5" />
                      Note
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {Number(service.rating || 5).toFixed(1)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      Durée
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {service.distance || "-"}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Coins className="h-3.5 w-3.5" />
                      Prix
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {service.price || "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
