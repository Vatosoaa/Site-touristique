import { motion } from "framer-motion"

export function BlogHero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-[#F8FAFC]">
      {/* Background Image - Responsive adaptation */}
      <div className="absolute top-0 right-0 w-full h-full md:w-[60%] z-0">
        <img 
          src="/images/blog.jpg" 
          alt="Notre Blog de Voyage" 
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-forest-green mb-4 tracking-tighter leading-none">
              Notre Blog
            </h1>
            
            <div className="relative inline-block mb-8 md:mb-10 group">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-orange-yellow -rotate-1 rounded-xl shadow-lg shadow-orange-yellow/20" 
              />
              <span className="relative z-10 text-lg sm:text-xl font-bold text-white px-4 md:px-6 py-2 block italic tracking-wide">
                Histoires, astuces et découvertes
              </span>
            </div>

            <p className="text-lg md:text-xl text-slate-700 mb-12 font-bold max-w-lg leading-relaxed">
              Plongez dans nos récits de voyage et trouvez l'inspiration pour votre prochaine grande aventure à Madagascar.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
