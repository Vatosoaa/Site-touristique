import { motion } from "framer-motion"
import { Compass, BookOpen, Users, HeartHandshake } from "lucide-react"

const FEATURES = [
  {
    icon: Compass,
    title: "Une expérience authentique",
    description: "Plongez dans la vie locale et découvrez Madagascar de l’intérieur."
  },
  {
    icon: BookOpen,
    title: "Un contenu enrichissant",
    description: "Des circuits inspirés de recherches en histoire, culture et patrimoine."
  },
  {
    icon: Users,
    title: "Des guides experts",
    description: "Des guides-conférenciers pour donner du sens à chaque visite."
  },
  {
    icon: HeartHandshake,
    title: "Un tourisme responsable",
    description: "Des actions concrètes pour soutenir les communautés locales."
  },
  {
    icon: Users,
    title: "Accompagnement personnalisé",
    description: "Un suivi sur mesure pour adapter chaque voyage à vos envies spécifiques."
  },
  {
    icon: BookOpen,
    title: "Rigueur scientifique",
    description: "Des informations vérifiées et sourcées auprès d'experts en patrimoine."
  }
]

export function WhyResort() {
  return (
    <section className="py-24 px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Pourquoi choisir Explor’île ?</h2>
        <p className="text-slate-500 max-w-3xl mx-auto">
          Nous offrons une approche unique du voyage à Madagascar, alliant rigueur scientifique et immersion humaine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="w-10 h-10 text-forest-green mb-6" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
