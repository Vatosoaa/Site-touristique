import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, X, Loader2, Sparkles } from "lucide-react"
import { api } from "@/lib/api"

export function OurServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await api.getServices()
        setServices(data)
      } catch (err) {
        console.error("Failed to fetch services", err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-forest-green font-serif italic text-2xl mb-2"
            style={{ fontFamily: "'Playball', 'Great Vibes', serif" }}
          >
            Amazing Experience
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-[#F59E0B]"
          >
            Our Services
          </motion.h2>
        </div>

        {/* Top Features Row */}
        {loading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <Loader2 className="w-8 h-8 text-forest-green animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full">
            {services.map((srv, idx) => (
              <motion.div 
                key={srv.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-slate-100 hover:border-forest-green/20 hover:shadow-lg hover:shadow-forest-green/5 bg-slate-50/50 hover:bg-white transition-all duration-300 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center font-bold mb-1 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 text-lg font-bold group-hover:text-forest-green transition-colors duration-300">{srv.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{srv.description}</p>
              </motion.div>
            ))}
            {services.length === 0 && (
              <p className="col-span-full text-center text-slate-400 font-semibold py-6">Aucun service disponible pour le moment.</p>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-slate-200 mb-16"></div>

        {/* Bottom Included/Not Included Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Package specifications */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-slate-900 text-2xl font-bold mb-6">Package specifications</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                <span className="text-slate-600 font-medium">Travel cancellation insurance</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                <span className="text-slate-600 font-medium">Breakfast and dinner included</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                <span className="text-slate-600 font-medium">Health care included</span>
              </li>
            </ul>
          </motion.div>

          {/* Services NOT included */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-slate-900 text-2xl font-bold mb-6">Services NOT included</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0" strokeWidth={3} />
                <span className="text-slate-600 font-medium">Lunch not included in the package</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0" strokeWidth={3} />
                <span className="text-slate-600 font-medium">Baggage protection insurance</span>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
