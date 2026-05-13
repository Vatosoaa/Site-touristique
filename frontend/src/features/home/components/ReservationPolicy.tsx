import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

export function ReservationPolicy() {
  return (
    <section className="py-12 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Policy Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-forest-green rounded-[30px] md:rounded-[40px] p-8 md:p-20 text-center text-white mb-24 md:mb-32 shadow-2xl shadow-forest-green/20 relative overflow-hidden group"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-yellow/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
            <ShieldCheck className="w-8 h-8 text-orange-yellow" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-tight max-w-2xl">
            Notre politique de réservation garantie
          </h2>
          <p className="max-w-3xl mx-auto text-white/90 leading-relaxed text-base md:text-xl font-medium">
            Nous garantissons une expérience sans faille. Avec Explor’île, vous avez l'assurance d'un voyage 
            parfaitement encadré. Si un imprévu survient avec votre réservation, nous nous engageons à 
            trouver la meilleure solution alternative pour vous assurer un séjour d'exception.
          </p>
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight max-w-3xl mx-auto tracking-tighter"
        >
          Prêt à vivre une aventure unique à Madagascar ?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg mb-20 leading-relaxed font-medium"
        >
          Que vous cherchiez une évasion en famille ou une aventure personnelle, Explor’île vous connecte 
          au cœur de l'identité malgache. Découvrez nos circuits et préparez-vous pour un voyage 
          riche en sens et en émotions !
        </motion.p>

        {/* Logos Container - Improved responsiveness */}
        <div className="space-y-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Ils nous font confiance</p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          >
            <span className="text-xl md:text-2xl font-serif tracking-widest text-slate-900">ĀMAN</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">SHERATON</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Hilton</span>
            <span className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900 italic underline decoration-orange-yellow decoration-4">WYNDHAM</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Marriott</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Alila</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
