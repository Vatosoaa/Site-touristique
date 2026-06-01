import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    if (api.isAuthenticated()) {
      navigate("/admin")
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.login(username, password)
      navigate("/admin")
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      {/* Background Graphic elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-forest-green/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-yellow/10 blur-[120px]" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour à l'accueil
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6 z-10"
      >
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-10 shadow-2xl relative">
          
          {/* Logo/Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-yellow flex items-center justify-center mb-4 shadow-lg shadow-orange-yellow/20">
              <Lock className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Portail Admin</h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium text-center">Connectez-vous pour gérer votre site</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive-foreground p-4 rounded-xl text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span className="font-semibold text-red-400">{error === "Failed to log in. Please check your credentials." ? "Échec de la connexion. Veuillez vérifier vos identifiants." : error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-muted-foreground">
                  <User className="w-5 h-5" />
                </span>
                <Input
                  type="text"
                  placeholder="Entrez votre identifiant"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-6 bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl focus:border-orange-yellow focus:ring-1 focus:ring-orange-yellow outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-6 bg-background border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl focus:border-orange-yellow focus:ring-1 focus:ring-orange-yellow outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl bg-orange-yellow hover:bg-orange-yellow/90 text-slate-950 font-bold text-base shadow-lg shadow-orange-yellow/15 hover:shadow-orange-yellow/25 transition-all flex justify-center items-center gap-2 cursor-pointer mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                "Se connecter"
              )}
            </Button>

          </form>

        </div>
      </motion.div>
    </div>
  )
}
