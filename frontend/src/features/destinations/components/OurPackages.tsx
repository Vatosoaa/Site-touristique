import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { api } from "@/lib/api"

const FALLBACK_SERVICES = [
  {
    id: 1,
    image: "/images/destination2.jpg",
    location: "Nosy Be",
    title: "Hébergement Chic Nosy Be",
    price: "Ar 450 000 / nuit",
    description: "Profitez d'un séjour inoubliable au bord de la plage à Nosy Be avec tout le confort moderne et petit-déjeuner inclus."
  },
  {
    id: 2,
    image: "/images/destination3.jpg",
    location: "Sainte Marie",
    title: "Observation des Baleines",
    price: "Ar 250 000 / pers",
    description: "Vivez l'expérience magique de l'observation des baleines à bosse à Sainte Marie avec nos guides locaux certifiés."
  },
  {
    id: 3,
    image: "/images/destination4.jpg",
    location: "Isalo",
    title: "Randonnée Parc de l'Isalo",
    price: "Ar 350 000 / pers",
    description: "Explorez les paysages spectaculaires, canyons mystiques et piscines naturelles du parc national de l'Isalo."
  }
]

export function OurPackages() {
  const [services, setServices] = useState<any[]>(FALLBACK_SERVICES)

  useEffect(() => {
    api.getServices()
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data)
        }
      })
      .catch((err) => console.log("Failed to fetch services, using fallback", err))
  }, [])

  return (
    <section className="bg-[#F8FAFC] py-24 px-6 md:px-12 flex flex-col items-center">
      {/* Titles */}
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-forest-green font-serif italic text-2xl mb-2"
          style={{ fontFamily: "'Playball', 'Great Vibes', serif" }} // Fallback cursive
        >
          Promotion
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-[#F59E0B]"
        >
          Nos offres de services
        </motion.h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {services.map((srv, index) => (
          <motion.div 
            key={srv.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-shadow flex flex-col"
          >
            {/* Image */}
            <div className="h-64 w-full relative">
              <img 
                src={srv.image || "/images/destination2.jpg"} 
                alt={srv.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Orange Location Banner */}
            <div className="bg-[#F59E0B] py-2 px-6">
              <span className="text-white font-semibold text-lg">{srv.location || "Madagascar"}</span>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                  <MapPin className="w-5 h-5 text-black" fill="black" stroke="white" strokeWidth={1} />
                  <span>{srv.title}</span>
                </div>
                {srv.price && (
                  <span className="font-semibold text-slate-800 shrink-0">{srv.price}</span>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {srv.description}
              </p>
              {(srv.distance || srv.rating) && (
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-100 text-xs text-slate-500 font-semibold">
                  {srv.distance && <span>Durée : {srv.distance}</span>}
                  {srv.rating && <span className="text-amber-500">★ {srv.rating.toFixed(1)}</span>}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

