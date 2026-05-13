import { motion } from "framer-motion"

export function TrustBanner() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="relative min-h-[450px] md:h-[500px] w-full rounded-3xl md:rounded-[40px] overflow-hidden group flex flex-col justify-center">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Villa" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 px-8 md:px-24 py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Nos engagements
            </h2>
            <div className="text-white/95 text-base md:text-lg max-w-2xl leading-relaxed space-y-4">
              <p className="font-medium">Nous croyons en un tourisme respectueux et porteur de sens. C’est pourquoi nous nous engageons à :</p>
              <ul className="space-y-3">
                {[
                  "Valoriser la richesse culturelle et historique de Madagascar",
                  "Respecter l’identité et la dignité des populations locales",
                  "Contribuer au développement des communautés visitées"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-2 h-2 rounded-full bg-orange-yellow mt-2.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
