import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
  {
    image: "/images/destination5.jpg",
    subtitle: "Romantic",
    title: "Wine Tour",
  },
  {
    image: "/images/destination6.jpg",
    subtitle: "Relaxing",
    title: "Holiday",
  },
  {
    image: "/images/destination7.jpg",
    subtitle: "Stunning",
    title: "Far Places",
  },
  // You can add more here if needed
  {
    image: "/images/destination5.jpg",
    subtitle: "Adventurous",
    title: "Mountain",
  },
]

export function DestinationsCarousel() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/3 lg:basis-1/3">
                <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                  {/* Background Image */}
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />
                  
                  {/* Text Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <p 
                      className="text-white font-serif italic text-2xl md:text-3xl mb-2 drop-shadow-md"
                      style={{ fontFamily: "'Playball', 'Great Vibes', serif" }}
                    >
                      {slide.subtitle}
                    </p>
                    <h3 className="text-white text-4xl md:text-5xl font-serif font-bold drop-shadow-lg">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="w-10 h-10 bg-black/50 hover:bg-black/80 border-none text-white -left-16" />
            <CarouselNext className="w-10 h-10 bg-black/50 hover:bg-black/80 border-none text-white -right-16" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
