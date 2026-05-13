import { motion } from "framer-motion"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const REVIEWS = [
  {
    id: 1,
    text: "Nous tenons tout d'abord à remercier l'équipe pour son écoute dès le premier contact, sa disponibilité, son efficacité et sa réactivité. Si nous devions organiser un prochain voyage, nous les recontacterions, c'est certain. Le voyage s'est très bien déroulé, tout a été très bien organisé, nous avons donc pu profiter sereinement. Nous garderons un très bon souvenir de notre première découverte de Madagascar !",
    author: "VIRGINIE ET LE GROUPE",
    date: "Novembre 2025",
    trip: "Sur les traces des ancêtres : Autotour dans les Hautes Terres"
  },
  {
    id: 2,
    text: "Une organisation sans faille pour notre lune de miel. Les hébergements choisis correspondaient parfaitement à nos attentes, avec des vues incroyables. Notre chauffeur était d'une gentillesse absolue et nous a appris tant de choses sur la culture locale. Un grand merci !",
    author: "MARC ET SOPHIE",
    date: "Octobre 2025",
    trip: "Séjours balnéaires à l'Est"
  },
  {
    id: 3,
    text: "Nous avons vécu une véritable aventure dans l'Ouest. Les Tsingy et l'Allée des Baobabs étaient magiques. L'équipe a su adapter le rythme à notre famille avec des enfants en bas âge. Tout était pensé dans les moindres détails.",
    author: "FAMILLE LAURENT",
    date: "Août 2025",
    trip: "Aventures dans l'Ouest"
  }
]

const OTHER_TRIPS = [
  {
    id: 1,
    duration: "8 JOURS / 7 NUITS",
    title: "Les essentiels de Madagascar en courte durée",
    price: "1 500 000 Ar",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    duration: "11 JOURS / 10 NUITS",
    title: "Découverte de Nosy Be : de la ville à l'île",
    price: "2 200 000 Ar",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    duration: "14 JOURS / 13 NUITS",
    title: "Immersion dans les Grands Parcs du Sud",
    price: "2 800 000 Ar",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800&auto=format&fit=crop"
  }
]

export function DetailBottom() {
  return (
    <div className="w-full bg-[#f4f6f5] pt-16 pb-24 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Testimonials Section */}
        <section className="text-center mb-24 relative">
          <h2 className="text-4xl font-serif text-slate-900 mb-8 tracking-tight">
            Les avis de nos voyageurs
          </h2>
          
          <div className="flex justify-center items-center gap-2 mb-8">
            <span className="text-forest-green font-bold italic text-lg">5/5</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-forest-green fill-forest-green" />
              ))}
            </div>
          </div>

          <div className="relative px-12 md:px-24">
            {/* Fake Quote Marks Background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] leading-none text-slate-200/50 font-serif italic select-none z-0">
              "
            </div>
            
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full relative z-10"
            >
              <CarouselContent>
                {REVIEWS.map((review) => (
                  <CarouselItem key={review.id} className="w-full">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto min-h-[120px]">
                        {review.text}
                      </p>
                      
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">
                          - {review.author} -
                        </span>
                        <span className="text-xs text-slate-400">{review.date}</span>
                        <span className="text-xs text-slate-400 mt-2">
                          Avis relatif au voyage "{review.trip}"
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 border-none bg-transparent hover:bg-transparent text-slate-400 hover:text-forest-green [&>svg]:w-12 [&>svg]:h-12" />
              <CarouselNext className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 border-none bg-transparent hover:bg-transparent text-slate-400 hover:text-forest-green [&>svg]:w-12 [&>svg]:h-12" />
            </Carousel>
          </div>
        </section>

        {/* Other Trips Section */}
        <section className="text-center">
          <h2 className="text-4xl font-serif text-forest-green mb-12 tracking-tight">
            Découvrez d'autres voyages à Madagascar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {OTHER_TRIPS.map((trip) => (
              <motion.div 
                key={trip.id}
                whileHover={{ y: -5 }}
                className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-sm"
              >
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-white h-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-90">
                    {trip.duration}
                  </span>
                  <h3 className="text-2xl font-serif font-medium leading-tight mb-4">
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-medium opacity-90">À partir de</span>
                    <span className="text-lg font-bold">{trip.price}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest underline decoration-1 underline-offset-4 group-hover:text-forest-green transition-colors">
                    &gt; DÉCOUVRIR
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
