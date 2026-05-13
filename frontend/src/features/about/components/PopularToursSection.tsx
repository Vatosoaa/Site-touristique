import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useNavigate } from "react-router-dom"

const TOURS = [
  {
    destination: "Les Hautes Terres",
    categories: "Culture | Nature | Autotour",
    price: "250k Ar",
    description: "Une immersion au cœur des paysages emblématiques et des traditions ancestrales."
  },
  {
    destination: "Le Canal des Pangalanes",
    categories: "Bateau | Nature | Détente",
    price: "320k Ar",
    description: "Une navigation paisible le long de la côte Est, entre lagunes et villages de pêcheurs."
  },
  {
    destination: "Le Massif de l'Isalo",
    categories: "Trekking | Parcs | Aventure",
    price: "450k Ar",
    description: "Explorez les canyons spectaculaires et les piscines naturelles du Grand Sud."
  },
  {
    destination: "Nosy Be & les Îles",
    categories: "Plage | Plongée | Croisière",
    price: "550k Ar",
    description: "Détente absolue sur les plages de sable blanc et découverte des fonds marins."
  }
]

export function PopularToursSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0A0A0B] py-16 md:py-24 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-orange-yellow mb-4 italic"
          >
            Nos Circuits Populaires
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            Découvrez une sélection de nos plus beaux voyages, conçus pour vous offrir une immersion totale dans l'âme malgache.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-stretch">
          {/* Left Side: Video/Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative group cursor-pointer"
          >
            <div className="rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-full relative border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop" 
                alt="Madagascar Landscape" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 md:w-10 md:h-10 text-black fill-black ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Tours List */}
          <div className="flex-1 w-full flex flex-col justify-center py-4">
            <div className="space-y-10 md:space-y-12">
              {TOURS.map((tour, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => navigate("/details")}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-black text-white group-hover:text-orange-yellow transition-colors tracking-tight">
                        {tour.destination}
                      </h3>
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                        {tour.categories}
                      </p>
                    </div>
                    
                    {/* Dotted Line Connector - Hidden on mobile stack */}
                    <div className="hidden sm:block flex-1 border-b border-dotted border-white/20 mx-4 mb-2 h-0" />
                    
                    <div className="text-xl md:text-2xl font-black text-orange-yellow">
                      {tour.price}
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-xs md:text-sm max-w-md leading-relaxed font-medium">
                    {tour.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
