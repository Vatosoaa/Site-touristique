import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function SearchHoliday() {
  return (
    <section className="bg-[#F8FAFC] py-12 md:py-24 px-6 md:px-12 flex flex-col items-center">
      {/* Titles */}
      <div className="text-center mb-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-forest-green font-serif italic text-xl md:text-2xl mb-2"
          style={{ fontFamily: "'Playball', 'Great Vibes', serif" }} // Fallback cursive
        >
          Promotion
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-[#F59E0B] tracking-tight"
        >
          Search your Holiday
        </motion.h2>
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl"
      >
        {/* Background Image - Taller on mobile to show more */}
        <div className="w-full h-[750px] md:h-[600px] relative">
          <img 
            src="/images/destination1.jpg" 
            alt="Beautiful destination" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Search Form Overlay - Using relative on mobile to ensure visibility if needed, but absolute is fine if container is tall */}
        <div className="absolute bottom-0 left-0 w-full bg-[#8CA3A7]/95 backdrop-blur-md rounded-t-[32px] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            {/* Destination */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-bold text-xs md:text-sm uppercase tracking-widest">
                Select Your Destination :
              </label>
              <div className="relative">
                <select 
                  className="w-full h-12 px-4 rounded-xl bg-white text-slate-800 outline-none appearance-none cursor-pointer pr-10 font-medium"
                  defaultValue="---"
                >
                  <option value="---">---</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="United States">United States</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-bold text-xs md:text-sm uppercase tracking-widest">
                Select Your Date :
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full h-12 px-4 rounded-xl bg-white text-slate-800 outline-none cursor-pointer font-medium"
                />
              </div>
            </div>

            {/* Guest */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-bold text-xs md:text-sm uppercase tracking-widest">
                Total Guest :
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  min="1"
                  placeholder="2 adults"
                  className="w-full h-12 px-4 rounded-xl bg-white text-slate-800 outline-none cursor-pointer font-medium"
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex flex-col justify-end">
              <button className="w-full h-12 bg-[#1E242B] hover:bg-black transition-all text-white font-black uppercase tracking-widest rounded-xl text-xs shadow-xl">
                Book Now
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
