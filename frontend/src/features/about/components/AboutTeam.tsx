import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AboutTeam() {
  return (
    <section className="bg-black py-24 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Text */}
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl font-serif text-orange-yellow mb-6">
                Our Team
              </h2>
              
              <div className="space-y-6">
                <p className="text-white text-xl font-bold leading-tight">
                  Our agency has been present for over 20 years. We make the best for all our customers.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                  Al elit omnes impedfght ius, vel et hinc agam fabulas. Ut audiam inve nire iracu ndia vim. En eam dico simi lique, ut sint posse sit, eum sumo diam ea. Liber consec tetuer in mei, sea in imperdiet assue verit contentiones, an his cibo blandit tacimates. Iusto iudi cabit simil ique id velex, in sea rebum deser uisse appntur honcus. Maece nas cibo blandit tacimates sint posse.
                </p>
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10"
              >
                <Button className="bg-white text-black hover:bg-white/90 rounded-xl px-10 py-6 text-lg font-bold shadow-lg shadow-white/5">
                  Read More
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-[32px] overflow-hidden shadow-2xl relative border border-white/10">
                <img 
                  src="/images/team.jpg" 
                  alt="Our Professional Team" 
                  className="w-full h-auto object-cover opacity-90"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                  }}
                />
              </div>
              
              {/* Subtle accent decoration */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-orange-yellow/10 rounded-[32px]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
