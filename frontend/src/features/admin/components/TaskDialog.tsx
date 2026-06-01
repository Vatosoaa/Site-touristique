import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (taskData: any) => Promise<void>
  task?: any // If provided, we are editing
  employees: any[] // Available employees
}

const PRIORITIES = [
  { label: "Basse", value: "Basse", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800" },
  { label: "Moyenne", value: "Moyenne", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  { label: "Haute", value: "Haute", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800" }
]

const STATUSES = [
  { label: "À faire", value: "À faire", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  { label: "En cours", value: "En cours", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800" },
  { label: "Terminé", value: "Terminé", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" }
]

const TASK_COLORS = [
  { name: "Violet", value: "bg-violet-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Émeraude", value: "bg-emerald-500" },
  { name: "Ambre", value: "bg-amber-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Sky", value: "bg-sky-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Fuchsia", value: "bg-fuchsia-500" },
  { name: "Rouge", value: "bg-red-500" }
]

export function TaskDialog({ isOpen, onClose, onSave, task, employees }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("À faire")
  const [priority, setPriority] = useState("Moyenne")
  const [color, setColor] = useState("bg-violet-500")
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Format date to local datetime input string (YYYY-MM-DDTHH:MM)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return ""
    const d = new Date(dateString)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title || "")
      setDescription(task.description || "")
      setDate(formatDateForInput(task.date))
      setStatus(task.status || "À faire")
      setPriority(task.priority || "Moyenne")
      setColor(task.color || "bg-violet-500")
      setSelectedEmployeeIds(task.employees?.map((emp: any) => emp.id) || [])
    } else {
      setTitle("")
      setDescription("")
      
      // Default to today at the next hour
      const now = new Date()
      now.setHours(now.getHours() + 1, 0, 0, 0)
      setDate(formatDateForInput(now.toISOString()))
      
      setStatus("À faire")
      setPriority("Moyenne")
      setColor("bg-violet-500")
      setSelectedEmployeeIds([])
    }
    setError(null)
  }, [task, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) return setError("Le titre est obligatoire.")
    if (!date) return setError("La date et l'heure sont obligatoires.")

    setLoading(true)
    try {
      await onSave({
        title,
        description,
        date: new Date(date).toISOString(),
        status,
        priority,
        color,
        employeeIds: selectedEmployeeIds
      })
      onClose()
    } catch (err: any) {
      setError(err.message || "Impossible d'enregistrer l'événement.")
    } finally {
      setLoading(false)
    }
  }

  const toggleEmployee = (empId: number) => {
    setSelectedEmployeeIds(prev => 
      prev.includes(empId) ? prev.filter(id => id !== empId) : [...prev, empId]
    )
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
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-500" />
                {task ? "Modifier la tâche" : "Créer une tâche / événement"}
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
                <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground p-3 rounded-xl text-xs font-semibold text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Titre de l'événement *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Briefing équipe ou Accueil VIP Aéroport"
                  className="rounded-xl border border-border py-5"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Date & Heure de début *
                </label>
                <Input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-border py-5"
                  required
                />
              </div>

              {/* Grid 2 Columns for Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Statut de la tâche
                  </label>
                  <div className="flex flex-col gap-2">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {STATUSES.map(st => (
                        <option key={st.value} value={st.value}>{st.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Priorité
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {PRIORITIES.map(pr => (
                      <option key={pr.value} value={pr.value}>{pr.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Description / Notes additionnelles
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Accueil et accompagnement des clients de l'hôtel, distribution des documents..."
                  className="rounded-xl border border-border h-20"
                />
              </div>

              {/* Task Color Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Couleur de l'événement (Affichage calendrier)
                </label>
                <div className="flex gap-3">
                  {TASK_COLORS.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setColor(col.value)}
                      className={`w-8 h-8 rounded-full ${col.value} flex items-center justify-center transition-all cursor-pointer ${
                        color === col.value ? "ring-4 ring-offset-2 ring-violet-500" : "hover:scale-110"
                      }`}
                      title={col.name}
                    >
                      {color === col.value && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assign Employees */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Attribuer à (Employés concernés)
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1.5 border border-border rounded-2xl bg-muted/20">
                  {employees.map((emp) => {
                    const isSelected = selectedEmployeeIds.includes(emp.id)
                    const avatarColor = emp.color || "bg-indigo-500"
                    
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => toggleEmployee(emp.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-card border-violet-500 text-foreground ring-1 ring-violet-500 shadow-sm"
                            : "bg-background border-border text-muted-foreground hover:bg-muted/40"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full ${avatarColor} text-white flex items-center justify-center font-bold text-[8px]`}>
                          {emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                        </span>
                        <span>{emp.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-500" />}
                      </button>
                    )
                  })}
                  {employees.length === 0 && (
                    <span className="text-xs text-muted-foreground/80 p-2">Aucun employé à assigner. Veuillez en ajouter dans l'onglet Employés.</span>
                  )}
                </div>
              </div>

              {/* Email Alert Banner */}
              <div className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold leading-relaxed">
                <span className="text-base mt-0.5">📧</span>
                <div>
                  Un e-mail de rappel automatique sera envoyé à chaque employé assigné <strong>5 jours avant</strong> la date de la tâche.
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
