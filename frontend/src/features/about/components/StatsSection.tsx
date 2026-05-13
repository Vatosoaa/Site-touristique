import { motion, useInView, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
}

function CountUp({ to, duration = 3 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: duration,
        onUpdate: (value) => setCount(Math.floor(value)),
        ease: "easeInOut",
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsSection() {
  const stats = [
    { label: "Clients", value: 900 },
    { label: "Circuits", value: 48 },
    { label: "Experts", value: 120 },
    { label: "Ans d'Expérience", value: 15 },
  ];

  return (
    <section className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden py-24 px-6">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/fond-chiffre.jpg"
          alt="Stats Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-[#0F1C0F]/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif mb-16 tracking-tight leading-tight italic"
        >
          "Faire ce qu'il faut, <br className="md:hidden" /> au bon moment."
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="flex flex-col items-center group"
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 leading-none text-white">
                  <CountUp to={stat.value} />
                  {stat.value === 900 && <span className="text-orange-yellow text-4xl sm:text-5xl">+</span>}
                </span>
                <div className="h-1 w-12 bg-orange-yellow rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
