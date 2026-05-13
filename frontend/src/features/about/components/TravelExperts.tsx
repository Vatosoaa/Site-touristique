import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const EXPERTS = [
  {
    name: "Jane Wills",
    role: "Expert en Culture",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Ralphe Knoy",
    role: "Guide Naturaliste",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Jane Wills",
    role: "Spécialiste Itinéraire",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Jane Wills",
    role: "Logistique Voyage",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop"
  }
]

export function TravelExperts() {
  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-yellow font-serif italic text-2xl mb-2"
          >
            Our Best
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-white"
          >
            Travel Experts
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERTS.map((expert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-slate-900/40 border border-white/5"
            >
              {/* Image - Top Part */}
              <div className="aspect-[1/1] overflow-hidden bg-slate-800">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Info Block - Transparent Gray with stronger Backdrop Blur */}
              <div className="p-6 bg-slate-800/80 backdrop-blur-md text-white text-center flex-1">
                <h3 className="text-xl font-bold mb-2">{expert.name}</h3>
                <p className="text-white/70 text-sm mb-6 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="hover:text-orange-yellow transition-colors">
                    <Facebook className="w-4 h-4 fill-white" />
                  </a>
                  <a href="#" className="hover:text-orange-yellow transition-colors">
                    <Twitter className="w-4 h-4 fill-white" />
                  </a>
                  <a href="#" className="hover:text-orange-yellow transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="hover:text-orange-yellow transition-colors">
                    <Linkedin className="w-4 h-4 fill-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
