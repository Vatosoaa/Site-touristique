import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

const packages = [
  {
    id: 1,
    image: "/images/destination2.jpg",
    region: "Europe",
    title: "Winter Action",
    price: "$700",
    description: "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
  },
  {
    id: 2,
    image: "/images/destination3.jpg",
    region: "Thailand",
    title: "Snow Surfing",
    price: "$1200",
    description: "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
  },
  {
    id: 3,
    image: "/images/destination4.jpg",
    region: "Africa",
    title: "Ropeway",
    price: "$900",
    description: "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
  }
]

export function OurPackages() {
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
          Our Packages
        </motion.h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {packages.map((pkg, index) => (
          <motion.div 
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-shadow flex flex-col"
          >
            {/* Image */}
            <div className="h-64 w-full relative">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Orange Region Banner */}
            <div className="bg-[#F59E0B] py-2 px-6">
              <span className="text-white font-semibold text-lg">{pkg.region}</span>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                  <MapPin className="w-5 h-5 text-black" fill="black" stroke="white" strokeWidth={1} />
                  <span>{pkg.title}</span>
                </div>
                <span className="font-semibold text-slate-800">{pkg.price}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {pkg.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
