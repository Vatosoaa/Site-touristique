import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { api } from "@/lib/api"

const INITIAL_TOURS = [
  {
    title: "Thailand",
    price: "$599",
    amenities: "Beach | Hotel | Vehicle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/destination2.jpg"
  },
  {
    title: "North Africa",
    price: "$800",
    amenities: "Beach | Hotel | Vehicle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/destination3.jpg"
  },
  {
    title: "South Korea",
    price: "$650",
    amenities: "Beach | Hotel | Vehicle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/destination4.jpg"
  },
  {
    title: "Switzerland",
    price: "$700",
    amenities: "Beach | Hotel | Vehicle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/destination2.jpg"
  }
]

export function OurPopularTours() {
  const [tours, setTours] = useState<any[]>(INITIAL_TOURS)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Fetch from database
  useEffect(() => {
    api.getTours()
      .then((data) => {
        if (data && data.length > 0) {
          setTours(data)
        }
      })
      .catch((err) => console.log("Failed to fetch tours, using fallback", err))
  }, [])

  // Build images list dynamically from tours
  const tourImages = tours.map(t => t.image).filter(Boolean)
  const sliderImages = tourImages.length > 0 ? tourImages : ["/images/destination2.jpg", "/images/destination3.jpg"]

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [sliderImages.length])

  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif text-[#F59E0B] mb-4"
          >
            Our Popular Tours
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-800 font-medium max-w-3xl"
          >
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem
          </motion.p>
        </div>

        {/* Content Section: Slider + List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          
          {/* Left Column: Image Slider */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={sliderImages[currentImageIndex]}
                alt="Popular tour destination"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Slider Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentImageIndex ? "bg-[#F59E0B] w-6" : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Tour List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center gap-8"
          >
            {tours.map((tour, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-baseline gap-4 w-full mb-1">
                  <h3 className="text-xl font-bold text-slate-900 whitespace-nowrap">
                    {tour.title}
                  </h3>
                  {/* Dotted separator */}
                  <div className="flex-grow border-b-2 border-dotted border-slate-300 relative top-[-6px]"></div>
                  <span className="text-2xl font-bold text-[#F59E0B] whitespace-nowrap">
                    {tour.price}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-600">
                    {tour.amenities}
                  </span>
                  <p className="text-sm text-slate-500">
                    {tour.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
