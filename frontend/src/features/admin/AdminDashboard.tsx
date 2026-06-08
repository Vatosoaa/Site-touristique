import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  LayoutDashboard,
  Compass,
  Package,
  BookOpen,
  MessageSquare,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Mail,
  User,
  ExternalLink,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Briefcase,
  Bell,
  Map,
  ShoppingCart,
  Users,
  Sliders,
  PlusCircle,
  Shield,
  ShieldAlert,
  Search,
  Eye,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { api } from "@/lib/api"
import { TourDialog } from "./components/TourDialog"
import { PackageDialog } from "./components/PackageDialog"
import { BlogDialog } from "./components/BlogDialog"
import { EmployeeDialog } from "./components/EmployeeDialog"
import { ServiceDialog } from "./components/ServiceDialog"
import { ServiceDetailsDialog } from "./components/ServiceDetailsDialog"
import { TemoignageDialog } from "./components/TemoignageDialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { DashboardChart } from "./components/DashboardChart"
import AgendaTab from "./components/AgendaTab"


type TabType =
  | "overview"
  | "tours"
  | "packages"
  | "blog"
  | "messages"
  | "employes"
  | "services"
  | "reservations"
  | "equipe"
  | "temoignages"
  | "slides_hero"
  | "nouvelle_destination"
  | "agenda"

export default function AdminDashboard() {
  const { tab } = useParams<{ tab: string }>()
  const activeTab = ((tab?.toLowerCase() === "agenda" ? "agenda" : tab) as TabType) || "overview"
  const [tours, setTours] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [temoignages, setTemoignages] = useState<any[]>([])
  const [username, setUsername] = useState("Admin")
  
  // Loading & Error States
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dialog States
  const [isTourDialogOpen, setIsTourDialogOpen] = useState(false)
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false)
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false)
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false)
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false)
  const [isTemoignageDialogOpen, setIsTemoignageDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<any>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [toasts, setToasts] = useState<Array<{ id: number; title: string; message?: string; variant: "success" | "error" | "info" }>>([])
  const toastTimers = useRef<number[]>([])

  // Employees & Roles sub-states
  const [employeeSubTab, setEmployeeSubTab] = useState<"list" | "roles">("list")
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
  const [searchEmployeeQuery, setSearchEmployeeQuery] = useState("")


  const navigate = useNavigate()

  const pushToast = (title: string, message?: string, variant: "success" | "error" | "info" = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((current) => [...current, { id, title, message, variant }])
    const timer = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3500)
    toastTimers.current.push(timer)
  }

  useEffect(() => {
    return () => {
      toastTimers.current.forEach((timer) => window.clearTimeout(timer))
      toastTimers.current = []
    }
  }, [])

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate("/admin/login")
      return
    }
    setUsername(localStorage.getItem("admin_username") || "Admin")
    fetchData()
  }, [navigate])

  const handleApiCall = async <T,>(
    apiCall: () => Promise<T>,
    successCallback?: (data: T) => void,
    errorTitle = "Erreur"
  ) => {
    try {
      const res = await apiCall()
      if (successCallback) successCallback(res)
      return res
    } catch (err: any) {
      if (err.message?.includes("Unauthorized") || err.message?.includes("token") || err.message?.includes("denied")) {
        pushToast("Session expirée", "Veuillez vous reconnecter.", "error")
        api.logout()
        navigate("/admin/login")
      } else {
        pushToast(errorTitle, err.message || "Une erreur est survenue.", "error")
      }
      throw err
    }
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch public endpoints (we can catch them so one failure doesn't block the page)
      const [toursData, packagesData, blogData, servicesData, temoignagesData] = await Promise.all([
        api.getTours().catch(() => []),
        api.getPackages().catch(() => []),
        api.getBlogPosts().catch(() => []),
        api.getServices().catch(() => []),
        api.getTemoignages().catch(() => [])
      ])

      // Fetch admin endpoints (do NOT catch so token errors propagate to the catch block)
      const [messagesData, employeesData, rolesData] = await Promise.all([
        api.getMessages(),
        api.getEmployees(),
        api.getRoles()
      ])

      setTours(toursData)
      setPackages(packagesData)
      setBlogPosts(blogData)
      setMessages(messagesData)
      setEmployees(employeesData)
      setRoles(rolesData)
      setServices(servicesData)
      setTemoignages(temoignagesData)
      if (rolesData.length > 0 && !selectedRoleId) {
        setSelectedRoleId(rolesData[0].id)
      }
    } catch (err: any) {
      if (err.message?.includes("Unauthorized") || err.message?.includes("token") || err.message?.includes("denied")) {
        api.logout()
        navigate("/admin/login")
      } else {
        setError("Failed to fetch dashboard data. Please verify your backend server is running.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    api.logout()
    navigate("/admin/login")
  }

  // --- Tour Operations ---
  const handleSaveTour = async (tourData: any) => {
    await handleApiCall(async () => {
      if (selectedItem) {
        const updated = await api.updateTour(selectedItem.id, tourData)
        setTours(tours.map(t => t.id === selectedItem.id ? updated : t))
      } else {
        const created = await api.createTour(tourData)
        setTours([...tours, created])
      }
    }, () => {
      fetchData()
      pushToast("Succès", "Circuit enregistré avec succès.", "success")
    }, "Erreur d'enregistrement")
  }

  const handleDeleteTour = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce circuit ?")) {
      await handleApiCall(async () => {
        await api.deleteTour(id)
        setTours(tours.filter(t => t.id !== id))
      }, () => {
        fetchData()
        pushToast("Succès", "Circuit supprimé.", "success")
      }, "Erreur de suppression")
    }
  }

  // --- Package Operations ---
  const handleSavePackage = async (pkgData: any) => {
    await handleApiCall(async () => {
      if (selectedItem) {
        const updated = await api.updatePackage(selectedItem.id, pkgData)
        setPackages(packages.map(p => p.id === selectedItem.id ? updated : p))
      } else {
        const created = await api.createPackage(pkgData)
        setPackages([...packages, created])
      }
    }, () => {
      fetchData()
      pushToast("Succès", "Formule enregistrée avec succès.", "success")
    }, "Erreur d'enregistrement")
  }

  const handleDeletePackage = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formule ?")) {
      await handleApiCall(async () => {
        await api.deletePackage(id)
        setPackages(packages.filter(p => p.id !== id))
      }, () => {
        fetchData()
        pushToast("Succès", "Formule supprimée.", "success")
      }, "Erreur de suppression")
    }
  }

  // --- Blog Operations ---
  const handleSaveBlog = async (blogData: any) => {
    await handleApiCall(async () => {
      if (selectedItem) {
        const updated = await api.updateBlogPost(selectedItem.id, blogData)
        setBlogPosts(blogPosts.map(b => b.id === selectedItem.id ? updated : b))
      } else {
        const created = await api.createBlogPost(blogData)
        setBlogPosts([created, ...blogPosts])
      }
    }, () => {
      fetchData()
      pushToast("Succès", "Article de blog enregistré.", "success")
    }, "Erreur d'enregistrement")
  }

  const handleDeleteBlog = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article de blog ?")) {
      await handleApiCall(async () => {
        await api.deleteBlogPost(id)
        setBlogPosts(blogPosts.filter(b => b.id !== id))
      }, () => {
        fetchData()
        pushToast("Succès", "Article supprimé.", "success")
      }, "Erreur de suppression")
    }
  }

  // --- Message Operations ---
  const handleDeleteMessage = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      await handleApiCall(async () => {
        await api.deleteMessage(id)
        setMessages(messages.filter(m => m.id !== id))
      }, () => {
        pushToast("Succès", "Message supprimé.", "success")
      }, "Erreur de suppression")
    }
  }

  // --- Service Operations ---
  const handleSaveService = async (serviceData: any) => {
    await handleApiCall(async () => {
      if (selectedItem) {
        const updated = await api.updateService(selectedItem.id, serviceData)
        setServices(services.map(s => s.id === selectedItem.id ? updated : s))
        setSelectedItem(null)
      } else {
        const created = await api.createService(serviceData)
        setServices([...services, created])
      }
    }, () => {
      fetchData()
      pushToast("Succès", "Service enregistré.", "success")
    }, "Erreur d'enregistrement")
  }

  const handleDeleteService = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      await handleApiCall(async () => {
        await api.deleteService(id)
        setServices(services.filter(s => s.id !== id))
      }, () => {
        fetchData()
        pushToast("Service supprimé", "L'élément a été retiré du tableau.", "success")
      }, "Suppression impossible")
    }
  }

  const handleOpenServiceDetails = (service: any) => {
    setSelectedServiceDetail(service)
    setIsServiceDetailsOpen(true)
  }

  // --- Employee Operations ---
  const handleSaveEmployee = async (employeeData: any) => {
    await handleApiCall(async () => {
      if (selectedEmployee) {
        await api.updateEmployee(selectedEmployee.id, employeeData)
        setSelectedEmployee(null)
      } else {
        await api.createEmployee(employeeData)
      }
    }, () => {
      fetchData()
      pushToast("Succès", "Employé enregistré.", "success")
    }, "Erreur d'enregistrement")
  }

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      await handleApiCall(async () => {
        await api.deleteEmployee(id)
      }, () => {
        fetchData()
        pushToast("Succès", "Employé supprimé.", "success")
      }, "Erreur de suppression")
    }
  }

  // --- Role & Permission Operations ---
  const handleTogglePermission = async (roleId: number, permissionKey: string) => {
    const roleObj = roles.find(r => r.id === roleId)
    if (!roleObj) return

    let newPermissions = [...roleObj.permissions]
    if (newPermissions.includes(permissionKey)) {
      newPermissions = newPermissions.filter(p => p !== permissionKey)
    } else {
      newPermissions.push(permissionKey)
    }

    await handleApiCall(async () => {
      await api.updateRole(roleId, { permissions: newPermissions })
    }, () => {
      fetchData()
      pushToast("Succès", "Permissions mises à jour.", "success")
    }, "Erreur de mise à jour")
  }

  const handleCreateRole = async () => {
    const name = window.prompt("Nom du nouveau rôle (ex: Agent de Voyage) :")
    if (!name?.trim()) return

    const description = window.prompt("Description du rôle :") || ""

    await handleApiCall(async () => {
      await api.createRole({ name, description, permissions: [] })
    }, () => {
      fetchData()
      pushToast("Succès", "Rôle créé.", "success")
    }, "Erreur de création")
  }

  const handleDeleteRole = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rôle ?")) {
      await handleApiCall(async () => {
        await api.deleteRole(id)
        setSelectedRoleId(null)
      }, () => {
        fetchData()
        pushToast("Succès", "Rôle supprimé.", "success")
      }, "Erreur de suppression")
    }
  }

  // --- Testimonial Operations ---
  const handleSaveTemoignage = async (temoignageData: any) => {
    await handleApiCall(async () => {
      if (selectedItem) {
        const updated = await api.updateTemoignage(selectedItem.id, temoignageData)
        setTemoignages(temoignages.map(t => t.id === selectedItem.id ? updated : t))
        setSelectedItem(null)
      } else {
        const created = await api.createTemoignage(temoignageData)
        setTemoignages([...temoignages, created])
      }
    }, () => {
      fetchData()
      pushToast("Succès", "Témoignage enregistré.", "success")
    }, "Erreur d'enregistrement")
  }

  const handleDeleteTemoignage = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      await handleApiCall(async () => {
        await api.deleteTemoignage(id)
        setTemoignages(temoignages.filter(t => t.id !== id))
      }, () => {
        fetchData()
        pushToast("Témoignage supprimé", "L'avis a bien été supprimé.", "success")
      }, "Impossible de supprimer")
    }
  }

  return (

    <div className="min-h-screen bg-background text-foreground flex font-sans transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 text-slate-100">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange-yellow rounded-xl flex items-center justify-center font-black text-slate-950 text-xl animate-bounce">
              V
            </div>
            <div>
              <span className="font-bold text-white text-lg block leading-none">Vatosoaa</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Espace Admin</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] px-4 block">
                Performance
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => navigate("/admin/overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer group ${
                    activeTab === "overview"
                      ? "bg-[#0B2527] text-white border-l-4 border-emerald-400 rounded-l-none"
                      : "text-[#82929e] hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <LayoutDashboard className={`w-5 h-5 shrink-0 ${activeTab === "overview" ? "text-emerald-400" : "text-[#82929e] group-hover:text-white"}`} />
                  Vue d'ensemble
                </button>
              </div>
            </div>

            {[
              {
                title: "OPERATIONS",
                items: [
                  { id: "agenda", label: "Agenda", icon: Calendar },
                  { id: "employes", label: "Employés", icon: Briefcase },
                  { id: "services", label: "Service", icon: Bell },
                  { id: "tours", label: "Destinations", icon: Map },
                  { id: "reservations", label: "Réservations", icon: ShoppingCart },
                  { id: "messages", label: "Messages", icon: Mail }
                ]
              },
              {
                title: "CONTENU",
                items: [
                  { id: "equipe", label: "Équipe", icon: Users },
                  { id: "temoignages", label: "Témoignages", icon: MessageSquare },
                  { id: "blog", label: "Articles", icon: BookOpen },
                  { id: "slides_hero", label: "Slides Hero", icon: Sliders },
                  { id: "nouvelle_destination", label: "Nouvelle destination", icon: PlusCircle, isAction: true }
                ]
              }
            ].map(cat => (
              <div key={cat.title} className="space-y-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] px-4 block">
                  {cat.title}
                </span>
                <div className="space-y-1">
                  {cat.items.map(item => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.isAction) {
                            setSelectedItem(null)
                            setIsTourDialogOpen(true)
                          } else {
                            navigate("/admin/" + (item.id === "agenda" ? "Agenda" : item.id))
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer group ${
                          isActive
                            ? "bg-[#0B2527] text-white border-l-4 border-emerald-400 rounded-l-none"
                            : "text-[#82929e] hover:text-white hover:bg-slate-800/40"
                        }`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-emerald-400" : "text-[#82929e] group-hover:text-white"}`} />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="p-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center font-bold text-white uppercase">
              {username[0]}
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-none">{username}</span>
              <span className="text-xs text-slate-400">Administrateur Système</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-y-auto h-screen p-10 bg-background text-foreground transition-colors duration-300">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            {activeTab === "overview" ? (
              <>
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h2>
                <p className="text-sm text-muted-foreground font-semibold flex items-center gap-1 mt-1">
                  Dashboard <span className="text-muted-foreground/30 font-normal">/</span> <span className="text-violet-600 font-bold dark:text-violet-400">Vue d'ensemble</span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-foreground capitalize leading-tight">
                  {activeTab === "blog" ? "Gestion du Blog" : activeTab === "messages" ? "Demandes de Contact" : activeTab === "tours" ? "Circuits Populaires" : activeTab === "packages" ? "Formules Promos" : activeTab === "agenda" ? "Agenda d'Équipe" : "Espace Admin"}
                </h2>
                <p className="text-sm text-muted-foreground font-semibold mt-1">
                  {activeTab === "agenda" ? "Gérez les tâches et événements de l'équipe" : "Gérez et mettez à jour le contenu de votre site web"}
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground hover:bg-accent rounded-xl text-sm font-semibold transition-all"
            >
              Voir le site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 text-destructive-foreground rounded-2xl flex items-center justify-between">
            <span className="text-sm font-semibold text-red-500">{error}</span>
            <Button onClick={fetchData} size="sm" className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg cursor-pointer">
              Réessayer
            </Button>
          </div>
        )}

        {/* Main tabs view switcher */}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-orange-yellow animate-spin" />
              <span className="text-sm text-muted-foreground font-semibold">Chargement des données depuis PostgreSQL...</span>
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Card 1: Projects (Circuits) */}
                  <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Compass className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground/80 dark:text-muted-foreground/60 tracking-tight">Total Circuits</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight">{tours.length}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full dark:text-emerald-400 dark:bg-emerald-500/20">
                        ↑ 32.54%
                      </span>
                    </div>
                  </Card>

                  {/* Card 2: Tasks (Formules) */}
                  <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Package className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground/80 dark:text-muted-foreground/60 tracking-tight">Total Formules</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight">{packages.length}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full dark:text-emerald-400 dark:bg-emerald-500/20">
                        ↑ 32.54%
                      </span>
                    </div>
                  </Card>

                  {/* Card 3: Bugs (Blog) */}
                  <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground/80 dark:text-muted-foreground/60 tracking-tight">Total Articles</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight">{blogPosts.length}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-500/10 px-2.5 py-1 rounded-full dark:text-red-400 dark:bg-red-500/20">
                        ↓ 32.54%
                      </span>
                    </div>
                  </Card>

                  {/* Card 4: Users (Messages) */}
                  <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground/80 dark:text-muted-foreground/60 tracking-tight">Total Messages</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight">{messages.length}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full dark:text-emerald-400 dark:bg-emerald-500/20">
                        ↑ 32.54%
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Chart and Status Column */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Project Overview Chart */}
                  <Card className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Aperçu de l'Activité</h3>
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>89% de réussite des circuits</span>
                          <span className="text-muted-foreground font-normal ml-1">Ce semestre</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            Anciens Clients
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                            Nouveaux Clients
                          </span>
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-background border border-border rounded-xl text-xs font-bold text-foreground hover:bg-accent transition-colors">
                          Derniers 12 Mois
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 mt-2">
                      <DashboardChart />
                    </div>
                  </Card>

                  {/* Right Column: Tasks Status */}
                  <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-300">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-foreground">Statut des Demandes</h3>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-background border border-border rounded-xl text-xs font-bold text-foreground hover:bg-accent transition-colors">
                          Aujourd'hui
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-4 mb-6">
                        <span className="text-4xl font-extrabold text-foreground block tracking-tight">
                          {messages.filter(m => {
                            const date = new Date(m.createdAt);
                            const today = new Date();
                            return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
                          }).length + 15}
                        </span>
                        <span className="text-xs text-muted-foreground/80 font-bold block mt-1">Demandes actives ce mois-ci</span>
                      </div>

                      {/* Tri-color Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex mb-8">
                        <div className="bg-emerald-500 h-full w-[60%]" title="Traités" />
                        <div className="bg-indigo-500 h-full w-[25%]" title="En cours" />
                        <div className="bg-orange-500 h-full w-[15%]" title="En attente" />
                      </div>

                      {/* List items */}
                      <div className="space-y-4">
                        {[
                          { label: "Demandes en cours", value: "+ 12", color: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10" },
                          { label: "Mises en attente", value: "+ 4", color: "bg-orange-500", text: "text-orange-600 dark:text-orange-400 bg-orange-500/10" },
                          { label: "Traitées avec succès", value: "+ 38", color: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 border border-border/40 rounded-2xl hover:bg-muted/30 transition-colors">
                            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                              {item.label}
                            </span>
                            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${item.text}`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedItem(null);
                        setIsTourDialogOpen(true);
                      }}
                      className="w-full mt-6 py-5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/15"
                    >
                      <Plus className="w-5 h-5" />
                      Créer un circuit
                    </Button>
                  </Card>
                </div>

                {/* Recent Inquiries / Tasks Table */}
                <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm transition-colors duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Suivi des Demandes de Contact</h3>
                      <p className="text-xs text-muted-foreground/80 font-medium mt-1">Derniers messages reçus depuis la base de données</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-xl text-xs font-bold text-foreground hover:bg-accent transition-colors">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Sélectionner Date
                      </button>
                      <button className="flex items-center gap-1 px-3 py-2 bg-background border border-border rounded-xl text-xs font-bold text-foreground hover:bg-accent transition-colors">
                        Aujourd'hui
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground/85 text-[11px] font-bold uppercase tracking-wider">
                          <th className="p-4 w-12">
                            <input type="checkbox" className="rounded border-border text-violet-600 focus:ring-violet-500 w-4 h-4 cursor-pointer" />
                          </th>
                          <th className="p-4">Expéditeur / Client</th>
                          <th className="p-4">Date de Réception</th>
                          <th className="p-4">Statut</th>
                          <th className="p-4">Date Limite</th>
                          <th className="p-4">Priorité</th>
                          <th className="p-4">Assigné à</th>
                          <th className="p-4">Progression</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 text-xs">
                        {messages.slice(0, 5).map((msg, idx) => {
                          const dateObj = new Date(msg.createdAt);
                          const formattedDate = dateObj.toLocaleDateString("fr-FR");
                          
                          // Simulating table values organically based on index
                          const limitDate = new Date(dateObj.setDate(dateObj.getDate() + 7)).toLocaleDateString("fr-FR");
                          const status = idx === 0 ? "Nouveau" : idx === 1 ? "En cours" : "Répondu";
                          const statusColor = status === "Nouveau" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : status === "En cours" ? "bg-orange-500/10 text-orange-600 dark:text-orange-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                          const priority = msg.message.length > 100 ? "Haute" : msg.message.length > 50 ? "Moyenne" : "Basse";
                          const priorityColor = priority === "Haute" ? "bg-red-500/10 text-red-600 dark:text-red-400" : priority === "Moyenne" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-slate-500/10 text-slate-600 dark:text-slate-400";
                          const progress = status === "Nouveau" ? 10 : status === "En cours" ? 50 : 100;
                          const progressColor = status === "Nouveau" ? "bg-blue-500" : status === "En cours" ? "bg-orange-500" : "bg-emerald-500";
                          
                          // Administrative assignment
                          const team = [
                            { name: "Jean Dupont", initials: "JD", color: "bg-indigo-500" },
                            { name: "Marie Laurent", initials: "ML", color: "bg-emerald-500" },
                            { name: "Thomas Martin", initials: "TM", color: "bg-amber-500" }
                          ];
                          const assigned = team[idx % team.length];

                          return (
                            <tr key={msg.id} className="hover:bg-muted/20 transition-colors">
                              <td className="p-4">
                                <input type="checkbox" className="rounded border-border text-violet-600 focus:ring-violet-500 w-4 h-4 cursor-pointer" />
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-foreground text-sm">{msg.name}</span>
                                  <span className="text-[10px] text-muted-foreground/80 mt-0.5">{msg.email}</span>
                                </div>
                              </td>
                              <td className="p-4 text-muted-foreground font-semibold">{formattedDate}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${statusColor}`}>
                                  {status}
                                </span>
                              </td>
                              <td className="p-4 text-muted-foreground font-semibold">{limitDate}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${priorityColor}`}>
                                  {priority}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <span className={`w-6 h-6 rounded-full text-white flex items-center justify-center font-black text-[9px] ${assigned.color}`} title={assigned.name}>
                                    {assigned.initials}
                                  </span>
                                  <span className="font-bold text-[11px] text-foreground">{assigned.name}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2 min-w-[100px]">
                                  <div className="w-16 bg-muted h-1.5 rounded-full overflow-hidden">
                                    <div className={`h-full ${progressColor}`} style={{ width: `${progress}%` }} />
                                  </div>
                                  <span className="font-extrabold text-[11px] text-foreground">{progress}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {messages.length === 0 && (
                          <tr>
                            <td colSpan={8} className="text-center p-10 text-muted-foreground font-semibold">Aucun message de contact dans la base de données.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* TOURS TAB */}
            {activeTab === "tours" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-semibold">{tours.length} circuits enregistrés</span>
                  <Button
                    onClick={() => {
                      setSelectedItem(null)
                      setIsTourDialogOpen(true)
                    }}
                    className="bg-orange-yellow hover:bg-orange-yellow/90 text-slate-950 font-bold px-4 py-5 rounded-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter un circuit
                  </Button>
                </div>

                {/* Tours Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-colors duration-300">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted border-b border-border text-muted-foreground text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                          <th className="p-5">Couverture</th>
                          <th className="p-5">Titre</th>
                          <th className="p-5">Prix</th>
                          <th className="p-5">Équipements</th>
                          <th className="p-5">Description</th>
                          <th className="p-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-sm transition-colors duration-300">
                        {tours.map(tour => (
                          <tr key={tour.id} className="hover:bg-muted/40 transition-colors">
                            <td className="p-5">
                              <img src={tour.image} alt={tour.title} className="w-12 h-12 object-cover rounded-lg" />
                            </td>
                            <td className="p-5 font-bold text-foreground">{tour.title}</td>
                            <td className="p-5 text-orange-yellow font-bold">{tour.price}</td>
                            <td className="p-5 text-muted-foreground font-medium">{tour.amenities}</td>
                            <td className="p-5 text-muted-foreground max-w-xs truncate">{tour.description}</td>
                            <td className="p-5 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => {
                                    setSelectedItem(tour)
                                    setIsTourDialogOpen(true)
                                  }}
                                  className="p-2 bg-muted hover:bg-accent hover:text-accent-foreground text-foreground rounded-lg transition-colors cursor-pointer"
                                  title="Modifier"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTour(tour.id)}
                                  className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive dark:text-red-400 rounded-lg transition-colors cursor-pointer"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {tours.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center p-10 text-muted-foreground font-semibold">Aucun circuit trouvé.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PACKAGES TAB */}
            {activeTab === "packages" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-semibold">{packages.length} formules promos enregistrées</span>
                  <Button
                    onClick={() => {
                      setSelectedItem(null)
                      setIsPackageDialogOpen(true)
                    }}
                    className="bg-orange-yellow hover:bg-orange-yellow/90 text-slate-950 font-bold px-4 py-5 rounded-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter une formule
                  </Button>
                </div>

                {/* Packages Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-colors duration-300">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted border-b border-border text-muted-foreground text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                          <th className="p-5">Couverture</th>
                          <th className="p-5">Nom de la formule</th>
                          <th className="p-5">Région</th>
                          <th className="p-5">Prix</th>
                          <th className="p-5">Description</th>
                          <th className="p-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-sm transition-colors duration-300">
                        {packages.map(pkg => (
                          <tr key={pkg.id} className="hover:bg-muted/40 transition-colors">
                            <td className="p-5">
                              <img src={pkg.image} alt={pkg.title} className="w-12 h-12 object-cover rounded-lg" />
                            </td>
                            <td className="p-5 font-bold text-foreground">{pkg.title}</td>
                            <td className="p-5 text-muted-foreground font-semibold">{pkg.region}</td>
                            <td className="p-5 text-orange-yellow font-bold">{pkg.price}</td>
                            <td className="p-5 text-muted-foreground max-w-xs truncate">{pkg.description}</td>
                            <td className="p-5 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => {
                                    setSelectedItem(pkg)
                                    setIsPackageDialogOpen(true)
                                  }}
                                  className="p-2 bg-muted hover:bg-accent hover:text-accent-foreground text-foreground rounded-lg transition-colors cursor-pointer"
                                  title="Modifier"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePackage(pkg.id)}
                                  className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive dark:text-red-400 rounded-lg transition-colors cursor-pointer"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {packages.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center p-10 text-muted-foreground font-semibold">Aucune formule trouvée.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* BLOG TAB */}
            {activeTab === "blog" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-semibold">{blogPosts.length} articles rédigés</span>
                  <Button
                    onClick={() => {
                      setSelectedItem(null)
                      setIsBlogDialogOpen(true)
                    }}
                    className="bg-orange-yellow hover:bg-orange-yellow/90 text-slate-950 font-bold px-4 py-5 rounded-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    Rédiger un article
                  </Button>
                </div>

                {/* Blog Posts Cards/Table Grid */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-colors duration-300">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted border-b border-border text-muted-foreground text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                          <th className="p-5">Couverture</th>
                          <th className="p-5">Titre</th>
                          <th className="p-5">Date</th>
                          <th className="p-5">Catégories</th>
                          <th className="p-5">Extrait</th>
                          <th className="p-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-sm transition-colors duration-300">
                        {blogPosts.map(post => (
                          <tr key={post.id} className="hover:bg-muted/40 transition-colors">
                            <td className="p-5">
                              <img src={post.image} alt={post.title} className="w-16 h-10 object-cover rounded-lg" />
                            </td>
                            <td className="p-5 font-bold text-foreground max-w-xs truncate">{post.title}</td>
                            <td className="p-5 text-muted-foreground font-medium flex items-center gap-1.5 py-8">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              {post.date}
                            </td>
                            <td className="p-5 text-muted-foreground font-semibold">
                              <div className="flex flex-wrap gap-1">
                                {post.categories?.map((cat: string, i: number) => (
                                  <span key={i} className="px-2 py-0.5 rounded bg-muted text-foreground text-[10px] uppercase font-bold border border-border">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-5 text-muted-foreground max-w-xs truncate">{post.excerpt}</td>
                            <td className="p-5 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => {
                                    setSelectedItem(post)
                                    setIsBlogDialogOpen(true)
                                  }}
                                  className="p-2 bg-muted hover:bg-accent hover:text-accent-foreground text-foreground rounded-lg transition-colors cursor-pointer"
                                  title="Modifier"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive dark:text-red-400 rounded-lg transition-colors cursor-pointer"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {blogPosts.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center p-10 text-muted-foreground font-semibold">Aucun article trouvé.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <span className="text-sm text-muted-foreground font-semibold">{messages.length} demandes de contact reçues au total</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messages.map(msg => (
                    <Card key={msg.id} className="bg-card border border-border text-foreground rounded-2xl shadow-md flex flex-col justify-between transition-colors duration-300">
                      <CardHeader className="pb-2 flex flex-row justify-between items-start gap-4 space-y-0">
                        <div className="space-y-1">
                          <span className="flex items-center gap-2 font-bold text-foreground text-base">
                            <User className="w-4 h-4 text-orange-yellow" />
                            {msg.name}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            {msg.email}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </CardHeader>
                      <CardContent className="py-4">
                        <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line bg-background p-4 rounded-xl border border-border">
                          {msg.message}
                        </p>
                      </CardContent>
                      <div className="px-6 py-4 border-t border-border flex justify-end">
                        <Button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="bg-destructive/10 hover:bg-destructive/20 text-destructive dark:text-red-400 font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer le message
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {messages.length === 0 && (
                    <div className="col-span-2 text-center py-20 text-muted-foreground font-semibold bg-muted/20 border border-dashed border-border rounded-3xl">
                      Aucun message reçu pour le moment.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* EMPLOYES TAB */}
            {activeTab === "employes" && (
              <div className="space-y-6">
                {/* Sub-menu Navigation */}
                <div className="flex gap-4 border-b border-border pb-2">
                  <button
                    onClick={() => setEmployeeSubTab("list")}
                    className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                      employeeSubTab === "list"
                        ? "bg-[#0B2527] text-white"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    Membres de l'Équipe
                  </button>
                  <button
                    onClick={() => setEmployeeSubTab("roles")}
                    className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                      employeeSubTab === "roles"
                        ? "bg-[#0B2527] text-white"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    Rôles & Permissions
                  </button>
                </div>

                {/* Sub-tab 1: MEMBRES DE L'EQUIPE */}
                {employeeSubTab === "list" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card border border-border p-4 rounded-3xl shadow-sm">
                      <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={searchEmployeeQuery}
                          onChange={(e) => setSearchEmployeeQuery(e.target.value)}
                          placeholder="Rechercher un membre..."
                          className="pl-10 rounded-xl border border-border bg-background/50"
                        />
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedEmployee(null)
                          setIsEmployeeDialogOpen(true)
                        }}
                        className="w-full sm:w-auto bg-[#0B2527] text-white hover:bg-[#0B2527]/90 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter un employé
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {employees
                        .filter(emp =>
                          emp.name.toLowerCase().includes(searchEmployeeQuery.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchEmployeeQuery.toLowerCase()) ||
                          (emp.role?.name && emp.role.name.toLowerCase().includes(searchEmployeeQuery.toLowerCase()))
                        )
                        .map((emp) => (
                          <Card key={emp.id} className="bg-card border border-border p-6 rounded-3xl text-center shadow-md relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                            {/* Badges and Actions */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-85">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                emp.status === "Actif"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : emp.status === "En congé"
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  : "bg-red-500/10 text-red-600 dark:text-red-400"
                              }`}>
                                {emp.status}
                              </span>
                            </div>

                            {/* Avatar */}
                            <div className={`w-20 h-20 rounded-full ${emp.color || "bg-indigo-500"} text-white flex items-center justify-center font-black text-2xl mx-auto mb-4 shadow-inner relative group-hover:scale-105 transition-all duration-300`}>
                              {emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                            </div>

                            <h4 className="text-xl font-extrabold text-foreground tracking-tight">{emp.name}</h4>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 rounded-full">
                              <Shield className="w-3.5 h-3.5" />
                              {emp.role?.name || "Sans rôle"}
                            </span>

                            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground font-semibold">
                              <p className="flex items-center justify-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-muted-foreground/80" />
                                {emp.email}
                              </p>
                              {emp.phone && (
                                <p className="flex items-center justify-center gap-1.5">
                                  <Briefcase className="w-3.5 h-3.5 text-muted-foreground/80" />
                                  {emp.phone}
                                </p>
                              )}
                            </div>

                            {emp.bio && (
                              <p className="mt-4 text-xs text-muted-foreground/85 border-t border-border/50 pt-3 leading-relaxed italic">
                                "{emp.bio}"
                              </p>
                            )}

                            {/* Actions Bar */}
                            <div className="mt-6 flex gap-2 justify-center border-t border-border/50 pt-4">
                              <Button
                                onClick={() => {
                                  setSelectedEmployee(emp)
                                  setIsEmployeeDialogOpen(true)
                                }}
                                variant="outline"
                                className="h-8 rounded-lg px-3 text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Edit2 className="w-3 h-3" />
                                Modifier
                              </Button>
                              <Button
                                onClick={() => handleDeleteEmployee(emp.id)}
                                className="h-8 rounded-lg px-3 text-xs bg-destructive/10 hover:bg-destructive/20 text-destructive dark:text-red-400 flex items-center gap-1 cursor-pointer border border-transparent"
                              >
                                <Trash2 className="w-3 h-3" />
                                Supprimer
                              </Button>
                            </div>
                          </Card>
                        ))}
                      
                      {employees.length === 0 && (
                        <div className="col-span-full text-center py-20 text-muted-foreground font-semibold bg-muted/20 border border-dashed border-border rounded-3xl">
                          Aucun employé enregistré dans le système.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: MATRICE DES ROLES ET PERMISSIONS */}
                {employeeSubTab === "roles" && (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
                    {/* Roles Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Rôles disponibles</span>
                        <Button
                          onClick={handleCreateRole}
                          variant="ghost"
                          className="h-7 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:bg-emerald-500/5 px-2 rounded-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          Créer
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => setSelectedRoleId(role.id)}
                            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 group relative ${
                              selectedRoleId === role.id
                                ? "bg-violet-500/10 border-violet-500/40 shadow-sm"
                                : "bg-card border-border hover:bg-muted/40"
                            }`}
                          >
                            <h5 className="font-extrabold text-sm text-foreground pr-6">{role.name}</h5>
                            <p className="text-[10px] text-muted-foreground font-semibold mt-1 leading-snug truncate">
                              {role.description || "Aucune description fournie."}
                            </p>
                            <span className="inline-flex mt-2 items-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                              {role.permissions?.length || 0} permissions
                            </span>

                            {/* Delete custom roles button */}
                            {role.name !== "Directeur d'Agence" && (
                              <button
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation()
                                  handleDeleteRole(role.id)
                                }}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                title="Supprimer le rôle"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Permissions Panel */}
                    <div className="lg:col-span-3">
                      {selectedRoleId && roles.find(r => r.id === selectedRoleId) ? (
                        (() => {
                          const currentRole = roles.find(r => r.id === selectedRoleId)
                          return (
                            <Card className="bg-card border border-border rounded-3xl p-6 shadow-md space-y-6">
                              <div>
                                <h4 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                                  <Shield className="w-5 h-5 text-violet-500" />
                                  {currentRole.name}
                                </h4>
                                <p className="text-xs text-muted-foreground font-medium mt-1">
                                  {currentRole.description || "Configurez les permissions accordées aux employés affectés à ce rôle."}
                                </p>
                              </div>

                              <div className="border-t border-border pt-6 space-y-4">
                                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest block mb-4">
                                  Autorisations de Sécurité & Accès
                                </span>

                                <div className="space-y-4">
                                  {[
                                    {
                                      key: "manage_tours",
                                      title: "Gestion des Destinations & Circuits",
                                      description: "Permet de créer, éditer et supprimer les circuits de voyage ainsi que les destinations phares.",
                                      icon: Map,
                                      color: "text-emerald-500 bg-emerald-500/10"
                                    },
                                    {
                                      key: "manage_packages",
                                      title: "Gestion des Formules de Voyage",
                                      description: "Permet d'ajouter, modifier et supprimer les forfaits touristiques groupés.",
                                      icon: Package,
                                      color: "text-blue-500 bg-blue-500/10"
                                    },
                                    {
                                      key: "manage_blog",
                                      title: "Publication & Modération du Blog",
                                      description: "Autorise la rédaction d'articles, le chargement d'images et la modération des commentaires.",
                                      icon: BookOpen,
                                      color: "text-amber-500 bg-amber-500/10"
                                    },
                                    {
                                      key: "manage_messages",
                                      title: "Messagerie & Suivi des Réservations",
                                      description: "Permet de lire et gérer les formulaires de contacts clients ainsi que la liste des réservations.",
                                      icon: Mail,
                                      color: "text-sky-500 bg-sky-500/10"
                                    },
                                    {
                                      key: "manage_employees",
                                      title: "Contrôle d'Accès & Gestion de l'Équipe",
                                      description: "Autorise la création d'employés, la modification des rôles et l'attribution des permissions de sécurité.",
                                      icon: ShieldAlert,
                                      color: "text-red-500 bg-red-500/10"
                                    }
                                  ].map((perm) => {
                                    const PermIcon = perm.icon
                                    const isGranted = currentRole.permissions?.includes(perm.key)
                                    return (
                                      <div
                                        key={perm.key}
                                        onClick={() => handleTogglePermission(currentRole.id, perm.key)}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                                          isGranted
                                            ? "bg-card border-violet-500/30 hover:border-violet-500/50 shadow-sm"
                                            : "bg-muted/20 border border-border hover:bg-muted/40"
                                        }`}
                                      >
                                        <div className="flex gap-4 items-start pr-4">
                                          <div className={`p-2.5 rounded-xl shrink-0 ${perm.color}`}>
                                            <PermIcon className="w-5 h-5" />
                                          </div>
                                          <div>
                                            <h6 className="font-extrabold text-sm text-foreground">{perm.title}</h6>
                                            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                              {perm.description}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Switch Toggle */}
                                        <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${
                                          isGranted ? "bg-emerald-500" : "bg-muted-foreground/30"
                                        }`}>
                                          <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                                            isGranted ? "translate-x-5" : "translate-x-0"
                                          }`} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </Card>
                          )
                        })()
                      ) : (
                        <div className="text-center py-20 text-muted-foreground font-semibold bg-muted/20 border border-dashed border-border rounded-3xl">
                          Sélectionnez un rôle à gauche pour éditer ses permissions.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card border border-border p-4 rounded-3xl shadow-sm">
                  <span className="text-sm text-muted-foreground font-semibold">{services.length} services principaux disponibles</span>
                  <Button
                    onClick={() => {
                      setSelectedItem(null)
                      setIsServiceDialogOpen(true)
                    }}
                    className="w-full sm:w-auto bg-[#0B2527] text-white hover:bg-[#0B2527]/90 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un service
                  </Button>
                </div>

                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[960px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-border/60 bg-muted/30 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          <th className="px-4 py-3">Service</th>
                          <th className="px-4 py-3">Lieu</th>
                          <th className="px-4 py-3">Durée</th>
                          <th className="px-4 py-3">Prix</th>
                          <th className="px-4 py-3">Note</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {services.map((srv) => (
                          <tr key={srv.id} className="align-top hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="h-11 w-14 overflow-hidden rounded-lg bg-muted shrink-0">
                                  {srv.image ? (
                                    <img
                                      src={srv.image}
                                      alt={srv.title}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                      <Bell className="h-4 w-4" />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                    <p className="truncate text-sm font-bold text-foreground">{srv.title}</p>
                                  </div>
                                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                    {srv.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">{srv.location || "-"}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{srv.distance || "-"}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{srv.price || "-"}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-amber-500">
                              {Number(srv.rating || 5).toFixed(1)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                <Button
                                  onClick={() => handleOpenServiceDetails(srv)}
                                  variant="ghost"
                                  size="icon-sm"
                                  className="cursor-pointer"
                                  title="Voir détail"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={() => {
                                    setSelectedItem(srv)
                                    setIsServiceDialogOpen(true)
                                  }}
                                  variant="outline"
                                  size="icon-sm"
                                  className="cursor-pointer"
                                  title="Modifier"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteService(srv.id)}
                                  variant="destructive"
                                  size="icon-sm"
                                  className="cursor-pointer"
                                  title="Supprimer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {services.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-4 py-14 text-center text-sm font-semibold text-muted-foreground">
                              Aucun service enregistré pour le moment.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* RESERVATIONS TAB */}
            {activeTab === "reservations" && (
              <div className="space-y-6">
                <span className="text-sm text-muted-foreground font-semibold">Suivi des Réservations Client</span>
                <Card className="bg-card border border-border rounded-3xl p-6 shadow-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                          <th className="p-4">Client</th>
                          <th className="p-4">Destination</th>
                          <th className="p-4">Formule</th>
                          <th className="p-4">Date de Départ</th>
                          <th className="p-4">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 text-xs">
                        {[
                          { client: "Alice Dubois", dest: "Nosy Be", pkg: "Standard", date: "15/06/2026", status: "Confirmé", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                          { client: "Pierre Valois", dest: "Sainte Marie", pkg: "Luxe", date: "22/06/2026", status: "En attente", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
                          { client: "Sophie Martin", dest: "Antsirabe", pkg: "Aventure", date: "02/07/2026", status: "Annulé", color: "bg-red-500/10 text-red-600 dark:text-red-400" }
                        ].map((res, idx) => (
                          <tr key={idx} className="hover:bg-muted/10">
                            <td className="p-4 font-bold text-foreground">{res.client}</td>
                            <td className="p-4 text-muted-foreground font-semibold">{res.dest}</td>
                            <td className="p-4 text-muted-foreground font-semibold">{res.pkg}</td>
                            <td className="p-4 text-muted-foreground font-semibold">{res.date}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${res.color}`}>
                                {res.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* EQUIPE TAB */}
            {activeTab === "equipe" && (
              <div className="space-y-6">
                <span className="text-sm text-muted-foreground font-semibold">Organigramme de l'Équipe</span>
                <Card className="bg-card border border-border rounded-3xl p-6 shadow-md text-center max-w-lg mx-auto">
                  <h4 className="text-lg font-bold text-foreground">Équipe Vatosoaa</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Notre équipe est composée d'experts locaux passionnés par la richesse de Madagascar. 
                    Vous pouvez gérer les permissions des membres depuis les paramètres d'administration avancés.
                  </p>
                </Card>
              </div>
            )}

            {/* TEMOIGNAGES TAB */}
            {activeTab === "temoignages" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-card border border-border p-4 rounded-3xl shadow-sm">
                  <span className="text-sm text-muted-foreground font-semibold">
                    {temoignages.length} avis clients reçus au total
                  </span>
                  <Button
                    onClick={() => {
                      setSelectedItem(null)
                      setIsTemoignageDialogOpen(true)
                    }}
                    className="bg-orange-yellow hover:bg-orange-yellow/90 text-slate-950 font-bold px-4 py-5 rounded-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter un témoignage
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {temoignages.map((test) => (
                    <Card key={test.id} className="bg-card border border-border p-6 rounded-3xl shadow-md flex flex-col justify-between transition-colors duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={test.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"}
                              alt={test.author}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{test.author}</span>
                              {test.trip && (
                                <span className="text-[10px] text-muted-foreground font-semibold">Voyage: {test.trip}</span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-amber-500">
                            {"⭐".repeat(test.rating)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed italic bg-background p-4 rounded-xl border border-border">
                          "{test.content}"
                        </p>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-border/50 flex justify-end gap-2">
                        <Button
                          onClick={() => {
                            setSelectedItem(test)
                            setIsTemoignageDialogOpen(true)
                          }}
                          variant="outline"
                          className="h-8 rounded-lg px-3 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          Modifier
                        </Button>
                        <Button
                          onClick={() => handleDeleteTemoignage(test.id)}
                          className="h-8 rounded-lg px-3 text-xs bg-destructive/10 hover:bg-destructive/20 text-destructive dark:text-red-400 flex items-center gap-1 cursor-pointer border border-transparent"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Supprimer
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {temoignages.length === 0 && (
                    <div className="col-span-2 text-center py-20 text-muted-foreground font-semibold bg-muted/20 border border-dashed border-border rounded-3xl">
                      Aucun témoignage disponible pour le moment.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SLIDES HERO TAB */}
            {activeTab === "slides_hero" && (
              <Card className="bg-card border border-border p-6 rounded-3xl shadow-md">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sélectionnez et organisez les images héroïques affichées sur la page d'accueil de la vitrine. 
                  (Fonctionnalité en cours de modélisation pour l'intégration de la base de données).
                </p>
              </Card>
            )}

            {/* AGENDA TAB */}
            {activeTab === "agenda" && (
              <AgendaTab employees={employees} />
            )}

          </div>
        )}

      </main>

      {/* Popups & Dialog Modals */}
      <TourDialog
        isOpen={isTourDialogOpen}
        onClose={() => setIsTourDialogOpen(false)}
        onSave={handleSaveTour}
        tour={selectedItem}
      />

      <PackageDialog
        isOpen={isPackageDialogOpen}
        onClose={() => setIsPackageDialogOpen(false)}
        onSave={handleSavePackage}
        pkg={selectedItem}
      />

      <BlogDialog
        isOpen={isBlogDialogOpen}
        onClose={() => setIsBlogDialogOpen(false)}
        onSave={handleSaveBlog}
        blog={selectedItem}
      />

      <EmployeeDialog
        isOpen={isEmployeeDialogOpen}
        onClose={() => {
          setIsEmployeeDialogOpen(false)
          setSelectedEmployee(null)
        }}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
        roles={roles}
      />

      <ServiceDialog
        isOpen={isServiceDialogOpen}
        onClose={() => {
          setIsServiceDialogOpen(false)
          setSelectedItem(null)
        }}
        onSave={handleSaveService}
        onSuccess={(message) => pushToast("Service", message, "success")}
        onError={(message) => pushToast("Erreur service", message, "error")}
        service={selectedItem}
      />

      <ServiceDetailsDialog
        isOpen={isServiceDetailsOpen}
        onClose={() => {
          setIsServiceDetailsOpen(false)
          setSelectedServiceDetail(null)
        }}
        service={selectedServiceDetail}
      />

      <TemoignageDialog
        isOpen={isTemoignageDialogOpen}
        onClose={() => {
          setIsTemoignageDialogOpen(false)
          setSelectedItem(null)
        }}
        onSave={handleSaveTemoignage}
        temoignage={selectedItem}
      />

      <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md transition-all ${
              toast.variant === "success"
                ? "border-emerald-500/20 bg-emerald-50/95 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/90 dark:text-emerald-50"
                : toast.variant === "error"
                  ? "border-red-500/20 bg-red-50/95 text-red-950 dark:border-red-500/30 dark:bg-red-950/90 dark:text-red-50"
                  : "border-slate-300/40 bg-white/95 text-slate-900 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  toast.variant === "success"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                    : toast.variant === "error"
                      ? "bg-red-500/15 text-red-600 dark:text-red-300"
                      : "bg-slate-500/15 text-slate-600 dark:text-slate-300"
                }`}
              >
                {toast.variant === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : toast.variant === "error" ? (
                  <ShieldAlert className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-xs leading-relaxed opacity-80">{toast.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
                className="pointer-events-auto -mr-1 -mt-1 rounded-lg p-1 opacity-60 transition hover:opacity-100"
                aria-label="Fermer la notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}
