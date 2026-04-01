import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Blending timeless craftsmanship with <span className="text-primary italic font-light">new-generation technology.</span>
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-balance">
            <p>
              Since 1990, Tayabi Decor has been dedicated to imbuing your spaces with positive energy and bringing your design dreams to life. 
            </p>
            <p>
              Our team of master artisans brings over 20 years of expertise to every project. We specialize in designing, decorating, and maintaining a wide array of spaces including residential buildings, luxury villas, corporate headquarters, shopping malls, retail outlets, and prestigious hotels.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
            <div>
              <p className="font-display text-4xl font-bold text-foreground mb-2">30+</p>
              <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">Years of Excellence</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-foreground mb-2">20+</p>
              <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">Years of Artisan Expertise</p>
            </div>
          </div>
        </motion.div>

        {/* Image Collage */}
        <div className="relative h-[600px] w-full z-10 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0 w-4/5 h-[80%] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* wood craft detail */}
            <img 
              src="https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=1000&auto=format&fit=crop" 
              alt="Craftsmanship detail"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-3/5 h-[60%] rounded-2xl overflow-hidden shadow-2xl border-4 border-background"
          >
            {/* beautiful architectural interior */}
            <img 
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop" 
              alt="Interior design"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
