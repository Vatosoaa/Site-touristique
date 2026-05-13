import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User, Send, CheckCircle2, ShieldCheck, Clock3 } from "lucide-react"

export function BookingForm() {
  return (
    <section id="booking-form" className="py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Side: Info & Trust */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <span className="inline-block bg-orange-yellow/10 text-orange-yellow px-4 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
                Réservation & Devis
              </span>
              <h2 className="text-5xl font-black text-forest-green mb-8 leading-tight">
                Prêt pour <br /> l'aventure ?
              </h2>
              <p className="text-slate-600 text-lg mb-12 leading-relaxed font-medium">
                Remplissez ce formulaire et nos experts locaux concevront pour vous un voyage sur-mesure, adapté à vos envies et à votre budget.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-6">
                {[
                  { icon: <Clock3 className="w-5 h-5" />, title: "Réponse sous 24h", desc: "Nos conseillers vous répondent rapidement." },
                  { icon: <ShieldCheck className="w-5 h-5" />, title: "Paiement Sécurisé", desc: "Transactions garanties et protégées." },
                  { icon: <CheckCircle2 className="w-5 h-5" />, title: "Expertise Locale", desc: "Guides certifiés et natifs de l'île." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-forest-green shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: The Form */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {/* Name */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Nom Complet</label>
                    <div className="relative group">
                      <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                      <Input 
                        placeholder="Ex: Jean Dupont" 
                        className="pl-8 py-6 border-0 border-b-2 border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-forest-green transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Adresse Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                      <Input 
                        type="email"
                        placeholder="Ex: jean@mail.com" 
                        className="pl-8 py-6 border-0 border-b-2 border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-forest-green transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Téléphone</label>
                    <div className="relative group">
                      <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                      <Input 
                        placeholder="+261 34 00 000 00" 
                        className="pl-8 py-6 border-0 border-b-2 border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-forest-green transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Travelers */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Nombre de Voyageurs</label>
                    <div className="relative group">
                      <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                      <Input 
                        placeholder="Ex: 2 adultes, 1 enfant" 
                        className="pl-8 py-6 border-0 border-b-2 border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-forest-green transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Période Souhaitée</label>
                    <div className="relative group">
                      <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                      <Input 
                        placeholder="Ex: Septembre 2026 (environ 2 semaines)" 
                        className="pl-8 py-6 border-0 border-b-2 border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-forest-green transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Votre Projet de Voyage</label>
                    <Textarea 
                      placeholder="Dites-nous ce qui vous fait rêver... (hôtels, activités, parcs, budget indicatif)" 
                      className="min-h-[120px] p-0 border-0 border-b-2 border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-forest-green transition-all placeholder:text-slate-400 text-slate-900 font-bold resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button className="w-full bg-forest-green hover:bg-forest-green/95 text-white py-5 md:py-8 rounded-2xl text-base md:text-lg font-black shadow-2xl shadow-forest-green/20 group overflow-hidden relative">
                      <span className="relative z-10 flex items-center justify-center gap-3 text-center">
                        Envoyer ma demande
                        <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform shrink-0" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-forest-green via-forest-green/80 to-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.div>
                  <p className="text-center text-slate-500 mt-6 text-[10px] uppercase tracking-widest font-black">
                    🛡️ Données 100% sécurisées & usage interne exclusif
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
