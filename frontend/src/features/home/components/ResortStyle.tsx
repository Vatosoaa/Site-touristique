import { motion } from "framer-motion"

const STYLES = [
  {
    id: 1,
    title: "Voyages en famille",
    description: "Découvrez la richesse culturelle de Madagascar en famille. Nos circuits sont adaptés pour captiver petits et grands à travers des activités ludiques et éducatives.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Escapades authentiques",
    description: "Reconnectez-vous avec l'essentiel lors de nos escapades rurales. Vivez au rythme des villages et découvrez les savoir-faire traditionnels malgaches.",
    image: "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Expéditions thématiques",
    description: "Pour les passionnés d'histoire et de patrimoine, nos expéditions offrent un contenu riche basé sur des recherches scientifiques approfondies.",
    image: "https://images.unsplash.com/photo-1505881502353-a1986add3762?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Détente et Nature",
    description: "Alliez découverte et relaxation dans des cadres naturels spectaculaires, du canal de Pangalanes aux côtes sauvages de l'Ouest malgache.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop"
  }
]

export function ResortStyle() {
  return (
    <section className="py-24 px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight">
        Vivez l'expérience Explor’île
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {STYLES.map((style, index) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
              <img 
                src={style.image} 
                alt={style.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop"
                }}
              />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {style.title}
            </h3>
            
            <p className="text-slate-500 leading-relaxed text-base">
              {style.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
