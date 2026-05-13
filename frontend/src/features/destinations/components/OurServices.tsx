import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export function OurServices() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <h3 className="text-slate-900 text-xl font-bold">Travel by bus, car and minivan</h3>
            <p className="text-slate-500 font-medium">Air conditioning guaranteed</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-2 md:text-center"
          >
            <h3 className="text-slate-900 text-xl font-bold">Entrance to the museums</h3>
            <p className="text-slate-500 font-medium">50% discount on all admissions</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-2 md:text-right"
          >
            <h3 className="text-slate-900 text-xl font-bold">Travel with children and pets</h3>
            <p className="text-slate-500 font-medium">Possibility to rent the stroller</p>
          </motion.div>
        </div>

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
