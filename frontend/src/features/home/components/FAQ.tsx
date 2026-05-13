import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const QUESTIONS = [
  {
    id: "item-1",
    question: "En quoi Explor’île est-elle différente des autres agences ?",
    answer: "Explor’île propose une approche basée sur des recherches scientifiques et historiques. Nous ne nous contentons pas de vous emmener quelque part ; nous donnons du sens à votre voyage grâce à une immersion culturelle profonde et authentique."
  },
  {
    id: "item-2",
    question: "Quelles sont les destinations couvertes par vos circuits ?",
    answer: "Nous couvrons l'ensemble de Madagascar, avec une expertise particulière pour les Hautes Terres (Antananarivo et ses collines sacrées), le Grand Sud et la Côte Est (Canal de Pangalanes)."
  },
  {
    id: "item-3",
    question: "Comment sont sélectionnés les guides ?",
    answer: "Nos guides sont des experts passionnés, souvent des guides-conférenciers, sélectionnés pour leur connaissance approfondie du patrimoine, de l'histoire et de la culture malgache."
  },
  {
    id: "item-4",
    question: "Quels types d'activités proposez-vous lors des circuits ?",
    answer: "Nos activités vont de la visite de sites historiques et sacrés à l'immersion en milieu rural (riziculture, artisanat), en passant par des moments de détente balnéaire et des découvertes de la faune et flore locales."
  },
  {
    id: "item-5",
    question: "Comment assurez-vous un tourisme responsable ?",
    answer: "Nous collaborons directement avec les communautés locales, veillons au respect de leur dignité et contribuons à leur développement économique à travers des actions solidaires concrètes."
  }
]

export function FAQ() {
  return (
    <section className="py-24 px-12 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Des questions sur nos circuits ?<br />Nous avons les réponses !
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500"
          >
            Découvrez les réponses aux questions les plus fréquentes sur Explor’île.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion className="space-y-4">
            {QUESTIONS.map((q) => (
              <AccordionItem 
                key={q.id} 
                value={q.id}
                className="bg-white border border-slate-100 rounded-2xl px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all overflow-hidden"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6">
                  {q.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
