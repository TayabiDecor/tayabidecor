import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Custom Doors & Designs",
    image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=1000&auto=format&fit=crop", // painter painting wall
  },
  {
    id: "02",
    title: "Carpentry & Joinery Works",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1000&auto=format&fit=crop", // wood working tools
  },
  {
    id: "03",
    title: "Gypsum & Partition",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop", // modern partition wall
  },
  {
    id: "04",
    title: "Office Fit Out & Design",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", // luxury office space
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 mb-16 md:flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <p className="text-background/70 max-w-xl text-lg">
            Comprehensive solutions tailored to elevate your environment, merging aesthetic brilliance with functional perfection.
          </p>
        </motion.div>
      </div>

      {/* Interactive Accordion Grid */}
      <div className="w-full h-[60vh] md:h-[70vh] flex flex-col md:flex-row gap-1 md:gap-2 px-2 md:px-6">
        {services.map((service, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={service.id}
              onHoverStart={() => setHoveredIndex(index)}
              className="relative overflow-hidden cursor-pointer rounded-lg bg-secondary/10 flex-1 min-h-[80px]"
              animate={{
                flex: isHovered ? (window.innerWidth > 768 ? 4 : 3) : 1,
              }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                  style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1.2)' }}
                />
                <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'bg-black/40' : 'bg-black/70'}`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-4">
                  <span className="font-display text-primary text-xl font-medium">{service.id}</span>
                  <motion.h3 
                    className="font-display text-xl md:text-3xl font-bold text-white whitespace-nowrap"
                    animate={{
                      opacity: isHovered ? 1 : 0.6,
                      y: isHovered ? 0 : 10
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {service.title}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}