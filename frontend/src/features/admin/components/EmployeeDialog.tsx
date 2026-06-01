import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EmployeeDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (employeeData: any) => Promise<void>
  employee?: any // If provided, we are editing
  roles: any[] // Available roles in the system
}

const AVATAR_COLORS = [
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Amber", value: "bg-amber-500" },
  { name: "Violet", value: "bg-violet-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Sky", value: "bg-sky-500" }
]

export function EmployeeDialog({ isOpen, onClose, onSave, employee, roles }: EmployeeDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [status, setStatus] = useState("Actif")
  const [color, setColor] = useState("bg-indigo-500")
  const [roleId, setRoleId] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (employee) {
      setName(employee.name || "")
      setEmail(employee.email || "")
      setPhone(employee.phone || "")
      setBio(employee.bio || "")
      setStatus(employee.status || "Actif")
      setColor(employee.color || "bg-indigo-500")
      setRoleId(employee.roleId ? String(employee.roleId) : "")
    } else {
      setName("")
      setEmail("")
      setPhone("")
      setBio("")
      setStatus("Actif")
      setColor("bg-indigo-500")
      setRoleId(roles.length > 0 ? String(roles[0].id) : "")
    }
    setError(null)
  }, [employee, isOpen, roles])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) return setError("Le nom est obligatoire.")
    if (!email.trim()) return setError("L'email est obligatoire.")
    if (!roleId) return setError("Veuillez sélectionner un rôle.")

    setLoading(true)
    try {
      await onSave({
        name,
        email,
        phone,
        bio,
        status,
        color,
        roleId: Number(roleId)
      })
      onClose()
    } catch (err: any) {
      setError(err.message || "Impossible d'enregistrer l'employé.")
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
                {employee ? "Modifier la fiche employé" : "Ajouter un nouvel employé"}
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
                  {error}
                </div>
              )}

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Nom Complet *
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="rounded-xl border border-border"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Adresse Email *
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@explorile.mg"
                    className="rounded-xl border border-border"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Téléphone
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+261 34 00 000 00"
                    className="rounded-xl border border-border"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Statut de l'activité
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Actif">Actif</option>
                    <option value="En congé">En congé</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Rôle & Permissions Associées *
                  </label>
                  <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="" disabled>Choisir un rôle...</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Biographie courte / Présentation
                </label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Présentation de l'employé..."
                  className="rounded-xl border border-border h-20"
                />
              </div>

              {/* Avatar Color */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Couleur d'Avatar Dynamique
                </label>
                <div className="flex gap-3">
                  {AVATAR_COLORS.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setColor(col.value)}
                      className={`w-8 h-8 rounded-full ${col.value} flex items-center justify-center transition-all cursor-pointer ${
                        color === col.value ? "ring-4 ring-offset-2 ring-violet-500" : "hover:scale-110"
                      }`}
                      title={col.name}
                    >
                      {color === col.value && <User className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="rounded-xl px-5"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl px-5 bg-[#0B2527] text-white hover:bg-[#0B2527]/90"
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
