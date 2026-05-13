import { motion } from "framer-motion"

export function ContactHero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-[#F8FAFC]">
      {/* Background Image - Responsive adaptation */}
      <div className="absolute top-0 right-0 w-full h-full md:w-[60%] z-0">
        <img 
          src="/images/contact.jpg" 
          alt="Contactez Explor’île" 
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
              Contact
            </h1>
            
            <div className="relative inline-block mb-8 md:mb-12 group">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-orange-yellow -rotate-1 rounded-xl shadow-lg shadow-orange-yellow/20" 
              />
              <span className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-white px-4 md:px-6 py-2 block italic tracking-wide">
                À votre écoute
              </span>
            </div>

            <p className="text-lg md:text-xl text-slate-700 mb-12 font-bold max-w-lg leading-relaxed">
              Une question sur nos circuits ? Envie de personnaliser votre aventure à Madagascar ? Notre équipe est là pour vous accompagner.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-6 md:gap-8"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email</span>
              <p className="text-base md:text-lg font-bold text-forest-green">contact@explorile.mg</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Téléphone</span>
              <p className="text-base md:text-lg font-bold text-forest-green">+261 34 00 000 00</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
