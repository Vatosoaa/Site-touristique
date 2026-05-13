import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    title: "Top Restaurant To Visit",
    excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem...",
    date: "2 MAY, 26",
    link: "/blog/1"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    title: "Tips for Family Trips",
    excerpt: "We share our best travel tips, family vacation itineraries, adventurous...",
    date: "2 MAY, 26",
    link: "/blog/2"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    title: "Most Experience Photographer With Us To Caputre",
    excerpt: "Photography is a way of feeling, of touching, of loving....",
    date: "2 MAY, 26",
    link: "/blog/3"
  }
]

export function BlogList() {
  return (
    <section className="bg-[#F8FAFC] py-24 px-6 md:px-12 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              {/* Image */}
              <div className="h-64 w-full">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-forest-green mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Footer */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
                  <span className="text-orange-yellow text-xs font-bold uppercase tracking-wider">
                    {post.date}
                  </span>
                  <Link 
                    to={post.link} 
                    className="text-orange-yellow text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
                  >
                    Read More &gt;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
