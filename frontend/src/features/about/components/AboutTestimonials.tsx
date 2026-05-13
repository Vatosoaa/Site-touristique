import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const TESTIMONIALS = [
  {
    name: "Carl Moore",
    role: "Best Services",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
    content: "There are many variations of passages of Lorem Ipsum available by injected humour, randomised words which look even slightly believable."
  },
  {
    name: "Sophie Laurent",
    role: "Voyageuse Passionnée",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
    content: "Une expérience inoubliable ! Explor'île a su nous faire découvrir Madagascar d'une manière authentique et respectueuse. Je recommande vivement."
  },
  {
    name: "Marc Antoine",
    role: "Photographe",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
    content: "Les paysages sont à couper le souffle, et l'organisation était parfaite. Un voyage riche en émotions et en découvertes culturelles."
  }
]

export function AboutTestimonials() {
  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white font-serif italic text-2xl mb-2"
          >
            Read The Top
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-orange-yellow mb-10"
          >
            Travel Reviews
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed"
          >
            Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Proin rhoncus urna dictum neque molestie ultricies mauris ac.Ut enim ad minim veniam, quis nostrud exercitation ullamco
          </motion.p>
        </div>

        {/* Carousel with Autoplay */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-1"
                  >
                    {/* White Card as per reference image */}
                    <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl">
                      <div className="p-10">
                        <div className="flex items-center gap-6 mb-8">
                          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{testimonial.name}</h3>
                            <p className="text-slate-500 text-sm mb-2">{testimonial.role}</p>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-orange-yellow text-orange-yellow border-none" />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Horizontal Line as per reference */}
                        <div className="h-[1px] w-full bg-slate-100 mb-8" />
                        
                        <p className="text-slate-900 text-sm font-medium leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation / Dots - Centered as per reference */}
            <div className="flex justify-center gap-3 mt-12">
               <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
               <div className="w-2.5 h-2.5 rounded-full bg-white" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
