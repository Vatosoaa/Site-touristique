import { motion } from "framer-motion"

export function AboutIntro() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
                Notre Vision <br /> du Voyage
              </h2>
              
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-medium">
                <p>
                  Chez Explor’île, nous croyons que le voyage est bien plus qu'un simple déplacement. C'est une porte ouverte sur la compréhension d'un monde riche en traditions et en savoirs.
                </p>
                <p>
                  Notre approche se base sur une immersion profonde, respectueuse des écosystèmes et des cultures locales. Chaque itinéraire est une histoire que nous écrivons ensemble.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                   <div className="w-12 h-12 rounded-xl bg-orange-yellow flex items-center justify-center text-black shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                   </div>
                   <div>
                      <p className="font-bold text-white">Engagement Local</p>
                      <p className="text-sm text-slate-400">100% de nos guides sont locaux</p>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Content - More "Hero-like" but in a container */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="rounded-[60px] overflow-hidden shadow-2xl relative aspect-[4/5] border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Vision de voyage" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Decorative elements to give it that "Premium" feel */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-yellow rounded-full -z-10 blur-2xl opacity-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-full -z-10 blur-2xl opacity-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
