import React, { useState, useEffect } from "react"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Clock,
  Users,
  Search,
  ClipboardList
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { api } from "@/lib/api"
import { TaskDialog } from "./TaskDialog"

interface AgendaTabProps {
  employees: any[]
}

type CalendarView = "month" | "week" | "day"

export default function AgendaTab({ employees }: AgendaTabProps) {
  const [view, setView] = useState<CalendarView>("month")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getTasks()
      setTasks(data)
    } catch (err: any) {
      setError("Erreur lors de la récupération des tâches.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTask = async (taskData: any) => {
    try {
      if (selectedTask) {
        await api.updateTask(selectedTask.id, taskData)
      } else {
        await api.createTask(taskData)
      }
      fetchTasks()
      setIsDialogOpen(false)
      setSelectedTask(null)
    } catch (err: any) {
      alert("Erreur lors de l'enregistrement de la tâche : " + err.message)
    }
  }

  const handleDeleteTask = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await api.deleteTask(id)
        fetchTasks()
      } catch (err) {
        alert("Erreur lors de la suppression.")
      }
    }
  }

  // --- Calendar Date Helpers ---

  const handlePrev = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (view === "week") {
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
    } else {
      setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))
    }
  }

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (view === "week") {
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))
    } else {
      setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // First day of the month
    const firstDayIndex = new Date(year, month, 1).getDay() // 0 = Sun, 1 = Mon...
    // Adjust for Monday start of week (0 = Mon, 6 = Sun)
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1
    
    // Total days in month
    const totalDays = new Date(year, month + 1, 0).getDate()
    
    // Previous month total days
    const prevTotalDays = new Date(year, month, 0).getDate()
    
    const days = []
    
    // Prev month padding
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevTotalDays - i),
        isCurrentMonth: false
      })
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }
    
    // Next month padding (fill grid to multiple of 7, max 42 cells)
    const remainingCells = 42 - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }
    
    return days
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Mon start
    startOfWeek.setDate(diff)
    startOfWeek.setHours(0, 0, 0, 0)
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek)
      d.setDate(startOfWeek.getDate() + i)
      days.push(d)
    }
    return days
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
  }

  const getPublicHoliday = (date: Date): string | null => {
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear()

    // 1. Fixed Holidays
    if (m === 0 && d === 1) return "Jour de l'An"
    if (m === 2 && d === 8) return "Journée de la Femme"
    if (m === 2 && d === 29) return "Martyrs 1947"
    if (m === 4 && d === 1) return "Fête du Travail"
    if (m === 4 && d === 8) return "Victoire 1945"
    if (m === 5 && d === 26) return "Fête nationale (Madagascar)"
    if (m === 6 && d === 14) return "Fête nationale (France)"
    if (m === 7 && d === 15) return "Assomption"
    if (m === 10 && d === 1) return "Toussaint"
    if (m === 10 && d === 11) return "Armistice 1918"
    if (m === 11 && d === 25) return "Noël"

    // 2. Movable Christian Holidays (Easter-based)
    const a = y % 19
    const b = Math.floor(y / 100)
    const c = y % 100
    const dev = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - dev - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const tempM = Math.floor((a + 11 * h + 22 * l) / 451)
    const easterMonth = Math.floor((h + l - 7 * tempM + 114) / 31) - 1
    const easterDay = ((h + l - 7 * tempM + 114) % 31) + 1

    const easter = new Date(y, easterMonth, easterDay)
    
    const addDays = (baseDate: Date, days: number) => {
      const result = new Date(baseDate)
      result.setDate(baseDate.getDate() + days)
      return result
    }

    const easterMonday = addDays(easter, 1)
    const ascension = addDays(easter, 39)
    const pentecost = addDays(easter, 49)
    const pentecostMonday = addDays(easter, 50)

    if (d === easter.getDate() && m === easter.getMonth()) return "Pâques"
    if (d === easterMonday.getDate() && m === easterMonday.getMonth()) return "Lundi de Pâques"
    if (d === ascension.getDate() && m === ascension.getMonth()) return "Ascension"
    if (d === pentecost.getDate() && m === pentecost.getMonth()) return "Pentecôte"
    if (d === pentecostMonday.getDate() && m === pentecostMonday.getMonth()) return "Lundi de Pentecôte"

    // 3. Movable Muslim Holidays (Predicted Lookup 2025-2030)
    // Aïd al-Fitr
    if (y === 2025 && m === 2 && d === 31) return "Aïd al-Fitr"
    if (y === 2026 && m === 2 && d === 20) return "Aïd al-Fitr"
    if (y === 2027 && m === 2 && d === 9) return "Aïd al-Fitr"
    if (y === 2028 && m === 1 && d === 26) return "Aïd al-Fitr"
    if (y === 2029 && m === 1 && d === 15) return "Aïd al-Fitr"
    if (y === 2030 && m === 1 && d === 4) return "Aïd al-Fitr"

    // Aïd al-Adha
    if (y === 2025 && m === 5 && d === 7) return "Aïd al-Adha"
    if (y === 2026 && m === 4 && d === 27) return "Aïd al-Adha"
    if (y === 2027 && m === 4 && d === 17) return "Aïd al-Adha"
    if (y === 2028 && m === 4 && d === 5) return "Aïd al-Adha"
    if (y === 2029 && m === 3 && d === 24) return "Aïd al-Adha"
    if (y === 2030 && m === 3 && d === 13) return "Aïd al-Adha"

    return null
  }

  // --- Filtering ---
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "All" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getTasksForDay = (date: Date) => {
    return filteredTasks.filter(task => isSameDay(new Date(task.date), date))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case "En cours":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
      case "Moyenne":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
    }
  }

  const getTaskColorStyles = (colorClass: string) => {
    switch (colorClass) {
      case "bg-indigo-500":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/15"
      case "bg-emerald-500":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15"
      case "bg-amber-500":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15"
      case "bg-rose-500":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/15"
      case "bg-sky-500":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/15"
      case "bg-orange-500":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/15"
      case "bg-teal-500":
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/15"
      case "bg-fuchsia-500":
        return "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/15"
      case "bg-red-500":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15"
      default:
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/15"
    }
  }

  const getBorderColorClass = (colorClass: string) => {
    switch (colorClass) {
      case "bg-indigo-500":
        return "border-l-indigo-500"
      case "bg-emerald-500":
        return "border-l-emerald-500"
      case "bg-amber-500":
        return "border-l-amber-500"
      case "bg-rose-500":
        return "border-l-rose-500"
      case "bg-sky-500":
        return "border-l-sky-500"
      case "bg-orange-500":
        return "border-l-orange-500"
      case "bg-teal-500":
        return "border-l-teal-500"
      case "bg-fuchsia-500":
        return "border-l-fuchsia-500"
      case "bg-red-500":
        return "border-l-red-500"
      default:
        return "border-l-violet-500"
    }
  }

  const getDayCellBgStyles = (dayTasks: any[], isTodayCell: boolean, holidayName: string | null) => {
    if (isTodayCell) {
      return "bg-violet-500/15 border-l-violet-500 ring-2 ring-violet-500/30"
    }
    if (dayTasks.length === 0) {
      if (holidayName) {
        return "bg-amber-500/5 dark:bg-amber-500/10 border-l-amber-500/50"
      }
      return "border-l-transparent"
    }
    
    // Choose styling based on first task's color
    const primaryColor = dayTasks[0].color || "bg-violet-500"
    
    switch (primaryColor) {
      case "bg-indigo-500":
        return "bg-indigo-500/10 dark:bg-indigo-500/20 border-l-indigo-500"
      case "bg-emerald-500":
        return "bg-emerald-500/10 dark:bg-emerald-500/20 border-l-emerald-500"
      case "bg-amber-500":
        return "bg-amber-500/10 dark:bg-amber-500/20 border-l-amber-500"
      case "bg-rose-500":
        return "bg-rose-500/10 dark:bg-rose-500/20 border-l-rose-500"
      case "bg-sky-500":
        return "bg-sky-500/10 dark:bg-sky-500/20 border-l-sky-500"
      case "bg-orange-500":
        return "bg-orange-500/10 dark:bg-orange-500/20 border-l-orange-500"
      case "bg-teal-500":
        return "bg-teal-500/10 dark:bg-teal-500/20 border-l-teal-500"
      case "bg-fuchsia-500":
        return "bg-fuchsia-500/10 dark:bg-fuchsia-500/20 border-l-fuchsia-500"
      case "bg-red-500":
        return "bg-red-500/10 dark:bg-red-500/20 border-l-red-500"
      default: // bg-violet-500
        return "bg-violet-500/10 dark:bg-violet-500/20 border-l-violet-500"
    }
  }

  // Formatting strings
  const getMonthLabel = () => {
    return currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" })
  }

  const getDayLabel = () => {
    return currentDate.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  }

  const getWeekRangeLabel = () => {
    const weekDays = getWeekDays()
    const start = weekDays[0]
    const end = weekDays[6]
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${start.toLocaleString("fr-FR", { month: "long", year: "numeric" })}`
    } else if (start.getFullYear() === end.getFullYear()) {
      return `${start.getDate()} ${start.toLocaleString("fr-FR", { month: "short" })} - ${end.getDate()} ${end.toLocaleString("fr-FR", { month: "short", year: "numeric" })}`
    } else {
      return `${start.getDate()} ${start.toLocaleString("fr-FR", { month: "short", year: "numeric" })} - ${end.getDate()} ${end.toLocaleString("fr-FR", { month: "short", year: "numeric" })}`
    }
  }

  // --- Rendering UI Panels ---

  // Timeline Hour Slots for Day View (from 07:00 to 21:00)
  const HOURS = Array.from({ length: 15 }, (_, i) => i + 7)

  return (
    <div className="space-y-6">
      {/* Calendar Control Panel */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center bg-card border border-border p-5 rounded-3xl shadow-sm transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-3">
          {/* Navigation Controls */}
          <div className="flex items-center bg-background border border-border rounded-2xl p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="h-9 w-9 rounded-xl hover:bg-muted/80 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={handleToday}
              className="px-3 h-9 text-xs font-bold hover:bg-muted/80 rounded-xl cursor-pointer"
            >
              Aujourd'hui
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="h-9 w-9 rounded-xl hover:bg-muted/80 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <h3 className="text-lg font-black text-foreground capitalize tracking-tight px-1">
            {view === "month" && getMonthLabel()}
            {view === "week" && getWeekRangeLabel()}
            {view === "day" && getDayLabel()}
          </h3>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-48">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="pl-9 h-10 rounded-2xl border border-border bg-background/50 text-xs"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-background border border-border rounded-2xl p-1">
            {["All", "À faire", "En cours", "Terminé"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#0B2527] text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st === "All" ? "Tous" : st}
              </button>
            ))}
          </div>

          {/* Day/Week/Month Segmented Control */}
          <div className="flex items-center bg-background border border-border rounded-2xl p-1 shrink-0">
            {([
              { id: "month", label: "Mois" },
              { id: "week", label: "Semaine" },
              { id: "day", label: "Jour" }
            ] as const).map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === v.id
                    ? "bg-[#0B2527] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Create Action */}
          <Button
            onClick={() => {
              setSelectedTask(null)
              setIsDialogOpen(true)
            }}
            className="bg-[#0B2527] hover:bg-[#0B2527]/90 text-white font-bold h-10 rounded-2xl px-4 flex items-center gap-2 cursor-pointer transition-transform active:scale-95 text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            Créer tâche
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive-foreground rounded-2xl text-xs font-semibold text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-20 bg-card border border-border rounded-3xl">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500 mx-auto" />
            <p className="text-xs text-muted-foreground font-semibold">Chargement du calendrier...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main Calendar View Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* MONTH VIEW */}
            {view === "month" && (
              <Card className="bg-card border border-border rounded-3xl overflow-hidden shadow-md transition-colors duration-300">
                <div className="grid grid-cols-7 border-b border-border bg-muted/30">
                  {["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."].map((d) => (
                    <div key={d} className="p-3 text-center text-xs font-black uppercase text-muted-foreground tracking-wider border-r border-border/40 last:border-r-0">
                      {d}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 grid-rows-6 divide-x divide-y divide-border/40">
                  {getMonthDays().map((dayCell, idx) => {
                    const dayTasks = getTasksForDay(dayCell.date)
                    const isTodayCell = isToday(dayCell.date)
                    const holidayName = getPublicHoliday(dayCell.date)
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setCurrentDate(dayCell.date)
                          setView("day")
                        }}
                        className={`min-h-[100px] p-2 hover:bg-muted/20 transition-all cursor-pointer flex flex-col justify-between group border-l-2 ${
                          !dayCell.isCurrentMonth ? "opacity-35" : ""
                        } ${getDayCellBgStyles(dayTasks, isTodayCell, holidayName)}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold leading-none ${
                            isTodayCell
                              ? "bg-violet-500 text-white font-black scale-110 shadow-sm"
                              : "text-foreground group-hover:bg-muted p-1"
                          }`}>
                            {dayCell.date.getDate()}
                          </span>
                          {dayTasks.length > 0 && (
                            <span className="text-[10px] font-black text-muted-foreground/80 bg-muted/80 px-2 py-0.5 rounded-full scale-90">
                              {dayTasks.length} {dayTasks.length === 1 ? "tâche" : "tâches"}
                            </span>
                          )}
                        </div>

                        {/* Public Holiday Badge */}
                        {holidayName && (
                          <div className="text-[7.5px] font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1 py-0.5 rounded truncate mb-1 text-center" title={holidayName}>
                            🎉 {holidayName}
                          </div>
                        )}
                        
                        {/* Tasks Indicator List */}
                        <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-16 no-scrollbar pr-0.5">
                          {dayTasks.slice(0, 3).map((t) => (
                            <div
                              key={t.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedTask(t)
                                setIsDialogOpen(true)
                              }}
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded border truncate transition-all hover:scale-[1.02] ${getTaskColorStyles(t.color)}`}
                            >
                              {new Date(t.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} - {t.title}
                            </div>
                          ))}
                          {dayTasks.length > 3 && (
                            <div className="text-[8px] font-bold text-muted-foreground/70 text-center italic">
                              + {dayTasks.length - 3} autres...
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {/* WEEK VIEW */}
            {view === "week" && (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {getWeekDays().map((dayDate, idx) => {
                  const dayTasks = getTasksForDay(dayDate)
                  const isTodayCell = isToday(dayDate)
                  
                  return (
                    <Card
                      key={idx}
                      className={`bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 ${
                        isTodayCell
                          ? "border-violet-500/40 bg-violet-500/10 shadow-md"
                          : dayTasks.length > 0
                          ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
                          : "border-border"
                      }`}
                    >
                      {/* Weekday Header */}
                      <div className={`p-3 text-center border-b border-border ${
                        isTodayCell ? "bg-violet-500/10" : "bg-muted/10"
                      }`}>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-0.5">
                          {dayDate.toLocaleString("fr-FR", { weekday: "short" })}
                        </span>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-sm mx-auto ${
                          isTodayCell ? "bg-violet-500 text-white" : "text-foreground"
                        }`}>
                          {dayDate.getDate()}
                        </span>
                        {getPublicHoliday(dayDate) && (
                          <span className="text-[7.5px] font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full inline-block mt-1 truncate max-w-full" title={getPublicHoliday(dayDate)!}>
                            🎉 {getPublicHoliday(dayDate)}
                          </span>
                        )}
                      </div>
                      
                      {/* Day Tasks List */}
                      <div className="p-3 flex-1 flex flex-col gap-2 min-h-[220px] max-h-[350px] overflow-y-auto no-scrollbar bg-card">
                        {dayTasks.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => {
                              setSelectedTask(t)
                              setIsDialogOpen(true)
                            }}
                            className={`p-2.5 rounded-2xl border bg-background/50 hover:bg-background transition-all cursor-pointer relative group flex flex-col justify-between gap-2 shadow-sm border-l-4 border-border/80 ${getBorderColorClass(t.color)}`}
                          >
                            <div>
                              <div className="flex justify-between items-start gap-1">
                                <h5 className="font-extrabold text-xs text-foreground tracking-tight line-clamp-2 leading-snug">{t.title}</h5>
                                <button
                                  onClick={(e) => handleDeleteTask(t.id, e)}
                                  className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-[9px] font-black text-muted-foreground/80 flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3 text-violet-500" />
                                {new Date(t.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 items-center">
                              <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold border ${getStatusColor(t.status)}`}>
                                {t.status}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold border ${getPriorityColor(t.priority)}`}>
                                {t.priority}
                              </span>
                            </div>

                            {/* Assigned Employees Avatars */}
                            {t.employees && t.employees.length > 0 && (
                              <div className="flex -space-x-1.5 overflow-hidden pt-1 shrink-0">
                                {t.employees.map((emp: any) => (
                                  <span
                                    key={emp.id}
                                    className={`flex shrink-0 h-5.5 w-5.5 rounded-full ring-2 ring-background ${emp.color || "bg-indigo-500"} text-white items-center justify-center text-[7px] font-black`}
                                    title={emp.name}
                                  >
                                    {emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {dayTasks.length === 0 && (
                          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 py-10">
                            <ClipboardList className="w-7 h-7 text-muted-foreground mb-1" />
                            <span className="text-[10px] font-bold text-muted-foreground">Vide</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Cell footer action */}
                      <div className="p-2 border-t border-border bg-muted/10 text-center">
                        <button
                          onClick={() => {
                            // Set select date but keep hour
                            const d = new Date(dayDate)
                            const now = new Date()
                            d.setHours(now.getHours() + 1, 0, 0, 0)
                            
                            setSelectedTask(null)
                            setIsDialogOpen(true)
                            // To pass the prefilled date, we can set selectedTask to a dummy task with just a date!
                            setSelectedTask({ date: d.toISOString() })
                          }}
                          className="text-[10px] font-black text-violet-500 hover:text-violet-600 transition-colors uppercase tracking-wider flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Ajouter
                        </button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* DAY VIEW */}
            {view === "day" && (
              <Card className="bg-card border border-border rounded-3xl overflow-hidden shadow-md transition-colors duration-300">
                <div className="p-4 border-b border-border bg-muted/10 flex justify-between items-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Planning journalier</span>
                  <span className="text-xs font-extrabold text-violet-500 bg-violet-500/10 px-3 py-1 rounded-full">
                    {getTasksForDay(currentDate).length} tâche(s) aujourd'hui
                  </span>
                </div>
                
                <div className="p-4 sm:p-6 divide-y divide-border/60 max-h-[600px] overflow-y-auto">
                  {getPublicHoliday(currentDate) && (
                    <div className="p-4 mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 rounded-2xl text-xs font-black flex items-center gap-2">
                      <span className="text-lg">🎉</span>
                      <span>Jour férié : <strong>{getPublicHoliday(currentDate)}</strong></span>
                    </div>
                  )}
                  {HOURS.map((hour) => {
                    const hourDate = new Date(currentDate)
                    hourDate.setHours(hour, 0, 0, 0)
                    
                    // Tasks that fall in this hour slot
                    const hourTasks = getTasksForDay(currentDate).filter((t) => {
                      const taskTime = new Date(t.date)
                      return taskTime.getHours() === hour
                    })
                    
                    return (
                      <div key={hour} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-start group">
                        {/* Hour marker */}
                        <div className="w-14 shrink-0 text-right pr-2">
                          <span className="text-xs font-black text-muted-foreground/80 tracking-tight block">
                            {String(hour).padStart(2, "0")}:00
                          </span>
                          <span className="text-[10px] font-bold text-muted-foreground/40 block mt-0.5">
                            {hour >= 12 ? "PM" : "AM"}
                          </span>
                        </div>
                        
                        {/* Vertical line indicator */}
                        <div className="w-0.5 h-12 bg-border relative self-stretch hidden sm:block">
                          {hourTasks.length > 0 && <span className={`absolute top-0 bottom-0 left-[-2px] w-[5px] rounded ${hourTasks[0].color || "bg-violet-500"}`} />}
                        </div>

                        {/* Task list container */}
                        <div className="flex-grow flex flex-col gap-3">
                          {hourTasks.map((t) => (
                            <div
                              key={t.id}
                              onClick={() => {
                                setSelectedTask(t)
                                setIsDialogOpen(true)
                              }}
                              className={`p-4 bg-muted/20 border border-border/80 border-l-4 rounded-2xl hover:bg-muted/40 hover:border-violet-500/20 hover:shadow-sm cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${getBorderColorClass(t.color)}`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-extrabold text-foreground tracking-tight leading-snug">{t.title}</h4>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${getPriorityColor(t.priority)}`}>
                                    {t.priority}
                                  </span>
                                </div>
                                {t.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {t.description}
                                  </p>
                                )}
                                
                                {/* Info Row */}
                                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground/80 font-semibold pt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-violet-500" />
                                    {new Date(t.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-md border ${getStatusColor(t.status)} font-bold`}>
                                    {t.status}
                                  </span>
                                  {t.employees && t.employees.length > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                                      {t.employees.length} assigné(s)
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Assigned & Action Bar */}
                              <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-border/40 sm:border-0 pt-3 sm:pt-0 shrink-0">
                                {/* Employee initials */}
                                <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                                  {t.employees?.map((emp: any) => (
                                    <span
                                      key={emp.id}
                                      className={`flex shrink-0 h-6 w-6 rounded-full ring-2 ring-background ${emp.color || "bg-indigo-500"} text-white items-center justify-center text-[8px] font-black`}
                                      title={emp.name}
                                    >
                                      {emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedTask(t)
                                      setIsDialogOpen(true)
                                    }}
                                    className="p-2 hover:bg-background rounded-lg border border-transparent hover:border-border text-foreground transition-all cursor-pointer"
                                    title="Modifier"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteTask(t.id, e)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-destructive dark:text-red-400 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
                                    title="Supprimer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          {hourTasks.length === 0 && (
                            <div className="h-6 flex items-center text-[10px] text-muted-foreground/45 italic select-none">
                              Aucune tâche
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

          </div>

          {/* Right Sidebar List panel (Smartphone lists style) */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card border border-border rounded-3xl overflow-hidden shadow-md p-5 transition-colors duration-300">
              <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-violet-500" />
                Liste des tâches
              </h4>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                {filteredTasks.map((t) => {
                  const taskDate = new Date(t.date)
                  
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        // Focus calendar to this date and switch to Day view
                        setCurrentDate(taskDate)
                        setView("day")
                      }}
                      className={`p-3 bg-muted/20 hover:bg-muted/40 border border-border/70 border-l-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-2 relative group ${getBorderColorClass(t.color)}`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="font-extrabold text-xs text-foreground tracking-tight line-clamp-2 leading-snug">{t.title}</h5>
                        <button
                          onClick={(e) => handleDeleteTask(t.id, e)}
                          className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 text-[8px] font-black uppercase text-muted-foreground/80 justify-between items-center">
                        <span className="flex items-center gap-0.5">
                          <CalendarIcon className="w-3 h-3 text-violet-500" />
                          {taskDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} à {taskDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-1 border-t border-border/20">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black border ${getStatusColor(t.status)}`}>
                          {t.status}
                        </span>
                        
                        <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                          {t.employees?.slice(0, 3).map((emp: any) => (
                            <span
                              key={emp.id}
                              className={`flex shrink-0 h-5 w-5 rounded-full ring-2 ring-background ${emp.color || "bg-indigo-500"} text-white items-center justify-center text-[7px] font-black`}
                              title={emp.name}
                            >
                              {emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                            </span>
                          ))}
                          {t.employees && t.employees.length > 3 && (
                            <span className="flex shrink-0 h-5 w-5 rounded-full ring-2 ring-background bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 items-center justify-center text-[7px] font-black">
                              +{t.employees.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {filteredTasks.length === 0 && (
                  <div className="text-center py-10 text-xs text-muted-foreground font-semibold">
                    Aucune tâche correspondante.
                  </div>
                )}
              </div>
              
              <Button
                onClick={() => {
                  setSelectedTask(null)
                  setIsDialogOpen(true)
                }}
                className="w-full mt-4 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-violet-500/10"
              >
                <Plus className="w-4 h-4" />
                Ajouter une tâche
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Task Creation & Modification Dialog */}
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setSelectedTask(null)
        }}
        onSave={handleSaveTask}
        task={selectedTask?.date && !selectedTask.id ? null : selectedTask} // Handle prefilled date vs existing task
        employees={employees}
      />
    </div>
  )
}
