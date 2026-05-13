import { motion } from "framer-motion"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-[#F8FAFC]">
      {/* Background Image - Responsive adaptation */}
      <div className="absolute top-0 right-0 w-full h-full md:w-[60%] z-0">
        <img 
          src="https://images.unsplash.com/photo-1538964173425-93884d739596?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Resort Beach" 
          className="w-full h-full object-cover object-center opacity-40 md:opacity-100"
        />
        {/* Soft gradient to blend with left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/40 md:via-[#F8FAFC]/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-forest-green mb-4 tracking-tighter leading-none">
              Explor’île
            </h1>
            
            <div className="relative inline-block mb-8 md:mb-12 group">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-orange-yellow -rotate-1 rounded-xl shadow-lg shadow-orange-yellow/20" 
              />
              <span className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-white px-4 md:px-6 py-2 block italic tracking-wide">
                sur les traces des Malgaches
              </span>
            </div>

            <p className="text-lg md:text-xl text-slate-600 mb-10 md:mb-12 font-medium max-w-lg">
              Envie de découvrir Madagascar au-delà des sentiers battus ? Explor’île vous invite à vivre des expériences uniques.
            </p>
          </motion.div>

          {/* New Pill-style Search Bar - Responsive stacking */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-3xl sm:rounded-full p-2 sm:pl-8 shadow-2xl shadow-slate-200 border border-slate-100 gap-4 sm:gap-0"
          >
            <div className="flex items-center gap-4 px-4 sm:pr-8 sm:border-r border-slate-100 py-2 sm:py-0">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-900 uppercase">Destination</span>
                <input 
                  type="text" 
                  placeholder="Où aller ?" 
                  className="text-sm text-slate-500 bg-transparent outline-none w-full sm:w-40"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-8 py-2 sm:py-0">
              <Calendar className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-900 uppercase">Date</span>
                <input 
                  type="text" 
                  placeholder="Choisir" 
                  className="text-sm text-slate-500 bg-transparent outline-none w-full sm:w-32"
                />
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-14 h-14 rounded-2xl sm:rounded-full bg-forest-green hover:opacity-90 shadow-lg shadow-forest-green/30 flex items-center justify-center gap-2 sm:gap-0">
              <Search className="w-5 h-5 text-white" />
              <span className="sm:hidden font-bold">Rechercher</span>
            </Button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 md:mt-12 text-sm text-slate-500 leading-relaxed max-w-sm hidden sm:block"
          >
            Nos circuits exclusifs offrent une immersion culturelle et scientifique 
            bien au-delà d'un simple voyage touristique.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
