import { motion } from "framer-motion"
import { Clock, Tag, ChevronRight, Info } from "lucide-react"

export function DetailHero() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-[#F8FAFC]">
      {/* Background Image - Responsive adaptation */}
      <div className="absolute top-0 right-0 w-full h-full md:w-[60%] z-0 overflow-hidden">
        <img 
          src="/images/detail1.jpg" 
          alt="Madagascar Nature" 
          className="w-full h-full object-cover object-center opacity-40 md:opacity-100"
        />
        {/* Soft gradient to blend with left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/40 md:via-[#F8FAFC]/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div className="max-w-2xl">
            {/* Breadcrumbs - Responsive hiding on very small screens */}
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[10px] mb-8 uppercase tracking-widest font-bold">
              <span>Voyage Madagascar</span>
              <ChevronRight className="w-3 h-3" />
              <span>Hautes Terres</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-forest-green">Sur les traces des ancêtres</span>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-orange-yellow text-white px-4 py-1 rounded-sm text-[10px] font-bold mb-6 uppercase tracking-wider">
                Immersion Culturelle
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-forest-green mb-6 md:mb-8 tracking-tighter leading-tight">
                Sur les traces des ancêtres : <br /> Autotour dans les Hautes Terres
              </h1>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl font-bold">
                En plus de découvrir les paysages époustouflants des collines sacrées, 
                vous découvrirez au cours de votre autotour des villages, des parcs et des sites 
                parmi les plus emblématiques de l'histoire malgache.
              </p>
            </motion.div>
          </div>

          {/* Price Card - Responsive behavior */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:absolute lg:right-12 lg:bottom-0 lg:translate-y-1/2 bg-white p-8 md:p-10 rounded-[30px] shadow-2xl shadow-slate-200/60 w-full max-w-sm border border-slate-50 z-30"
          >
            <h2 className="text-xl md:text-2xl font-serif text-forest-green text-center mb-6">
              Autotour à Madagascar
            </h2>
            <div className="w-full h-px bg-slate-100 mb-8 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-forest-green/40 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10 border-b border-slate-50 pb-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1 text-forest-green mb-1">
                   <Tag className="w-3 h-3" />
                   <span className="text-[10px] font-bold uppercase tracking-tighter">À partir de</span>
                </div>
                <span className="text-base md:text-lg font-black text-slate-900 leading-tight">250 000 Ar/pers</span>
              </div>

              <div className="flex flex-col items-center text-center border-l border-slate-100">
                <div className="flex items-center gap-1 text-forest-green mb-1">
                   <Clock className="w-3 h-3" />
                   <span className="text-[10px] font-bold uppercase tracking-tighter">Durée</span>
                </div>
                <span className="text-base md:text-lg font-black text-slate-900 leading-tight">12j / 11n</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={scrollToBooking}
                className="w-full bg-[#0F1C0F] hover:bg-black text-white rounded-2xl py-6 text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-forest-green/10"
              >
                Demander un devis
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Icon top right - Hidden on mobile to avoid clutter */}
      <div className="hidden md:block absolute top-8 right-8 z-10 text-slate-300 hover:text-forest-green transition-colors cursor-pointer">
        <Info className="w-6 h-6" />
      </div>
    </section>
  );
}
