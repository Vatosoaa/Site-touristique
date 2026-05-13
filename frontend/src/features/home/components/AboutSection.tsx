import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="py-24 px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight"
          >
            Une immersion au cœur <br className="hidden md:block" /> de l’âme malgache
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-slate-500 leading-relaxed"
          >
            <p>
              Explor’île vous invite à vivre des expériences uniques, au croisement du tourisme culturel et de l’aventure. 
              Nos voyages sont conçus à partir de recherches scientifiques, de savoirs locaux et de récits authentiques, 
              pour vous offrir bien plus qu’un simple séjour.
            </p>
            <p>
              Partez à la rencontre d’un patrimoine vivant exceptionnel : traditions, danses et chants, modes de vie ruraux, 
              riziculture, pêche artisanale, sans oublier les croyances et les sites sacrés qui façonnent l’identité de l’île.
            </p>
            <p>
              Chaque circuit est soigneusement élaboré et encadré par des professionnels passionnés, pour allier 
              recherches scientifiques, découvertes, distractions et moments de détente.
            </p>
          </motion.div>
        </div>

        {/* Image Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="rounded-[40px] overflow-hidden shadow-2xl bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1506953244848-d1ad99954845?q=80&w=1000&auto=format&fit=crop" 
              alt="Resort Aerial View" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
