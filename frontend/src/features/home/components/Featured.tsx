import { motion } from "framer-motion"
import { Star, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "@/lib/api"

const RESORTS = [
  {
    id: 1,
    location: "Le Grand Sud",
    name: "Autotour à Madagascar",
    distance: "12 jours / 11 nuits",
    price: "250 000 Ar/pers",
    rating: 5.0,
    image: "/images/detail1.jpg"
  },
  {
    id: 2,
    location: "Antananarivo",
    name: "Excursions d’une journée",
    distance: "Sites emblématiques de la capitale",
    price: "Patrimoine royal",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    location: "Milieu Rural",
    name: "Escapades culturelles (2 jours)",
    distance: "Collines sacrées & immersion",
    price: "Expérience authentique",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
  }
]

export function Featured() {
  const [services, setServices] = useState<any[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await api.getServices()
        setServices(data)
      } catch (err) {
        console.error("Failed to fetch services", err)
      }
    }

    fetchServices()
  }, [])

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate("/details#booking-form");
  };

  const displayedServices = services.length > 0 ? services : RESORTS

  return (
    <section className="py-16 px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">
        Nos offres de services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {displayedServices.map((resort, index) => (
          <motion.div
            key={resort.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col group cursor-pointer"
            onClick={() => navigate("/details")}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100">
              <img 
                src={resort.image || "/images/detail1.jpg"} 
                alt={resort.name || resort.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop"
                }}
              />
              
              {/* Heart Icon */}
              <button className="absolute top-4 right-4 p-2 bg-transparent hover:bg-black/10 rounded-full transition-colors group/heart">
                <Heart className="w-6 h-6 text-white group-hover/heart:fill-white transition-all" strokeWidth={2} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">{resort.location}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-slate-900">{Number(resort.rating || 5).toFixed(1)}</span>
                </div>
              </div>
              
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {resort.name || resort.title}
              </h3>
              
              <span className="text-sm text-slate-400">
                {resort.distance}
              </span>
              
              <div className="mt-1">
                <span className="text-sm font-bold text-forest-green uppercase text-xs tracking-wider">{resort.price}</span>
              </div>
            </div>

            {/* Quote Button */}
            <button 
              onClick={handleBooking}
              className="w-full bg-[#0F1C0F] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
            >
              Demander un devis
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
