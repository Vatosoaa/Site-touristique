import { motion } from "framer-motion"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jean-Pierre Durand",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    text: "Une expérience inoubliable ! Le circuit était parfaitement organisé, alliant découvertes culturelles et moments de détente. L'équipe est professionnelle et passionnée. Nous reviendrons l'année prochaine !"
  },
  {
    id: 2,
    name: "Marie Lefebvre",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    text: "Explor’île nous a permis de découvrir Madagascar d'une manière totalement différente. Les guides sont de véritables experts qui donnent du sens à chaque visite. Une immersion authentique garantie !"
  },
  {
    id: 3,
    name: "Thomas Bernard",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    text: "Nous avons adoré notre séjour balnéaire à l'Est. Le canal de Pangalanes est une pure merveille. Tout était fluide, du transfert à l'aéroport jusqu'aux activités quotidiennes. Hautement recommandé !"
  },
  {
    id: 4,
    name: "Sophie Morel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    text: "Un contenu d'une richesse rare. On sent que chaque circuit est basé sur de vraies recherches. C'est bien plus qu'un voyage, c'est une véritable immersion au cœur de l'âme malgache."
  }
]

export function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-12 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-4 md:px-12"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.id} className="pl-4 md:pl-8 basis-[90%] sm:basis-1/2 md:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 md:p-8 h-full rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0 ring-4 ring-slate-50" 
                    />
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 text-sm md:text-base leading-tight">{t.name}</span>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                    "{t.text}"
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex -left-4 w-12 h-12 bg-white border-slate-100" />
          <CarouselNext className="hidden lg:flex -right-4 w-12 h-12 bg-white border-slate-100" />
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === 1 ? "w-6 bg-forest-green" : "w-2 bg-slate-200"
              )} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Helper for class merging if not available
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
