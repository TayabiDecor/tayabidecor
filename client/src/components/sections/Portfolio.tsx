import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  images: string[];
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Luxury Villa Interior",
    category: "Decoration",
    images: [
      "/lxry_villa_1.jpg",
      "/lxry_villa_2.jpg",
      "/lxry_villa_3.gif",
      "/lxry_villa_4.jpg",
      "/lxry_villa_5.jpg",
    ],
  },
  {
    id: 2,
    title: "Custom Wooden Doors",
    category: "Carpentry",
    images: ["/door_1.jpg", "/door_2.jpg", "/door_3.JPG"],
  },
  {
    id: 3,
    title: "Corporate Office Fit Out",
    category: "Office Fit Out",
    images: [
      "/office_1.jpg",
      "/office_2 (2).jpg",
      "/office_3 (2).jpg",
      "/office_4.jpg",
      "/office_5.jpg",
    ],
  },
  {
    id: 4,
    title: "Modern Gypsum Ceiling",
    category: "Gypsum",
    images: ["/cieling_1.jpg", "/cieling_2.jpg"],
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openLightbox = (project: PortfolioItem) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Always start at the first image of the project
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the lightbox from closing when clicking the arrow
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length,
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedProject.images.length) %
          selectedProject.images.length,
      );
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary tracking-widest uppercase text-sm font-semibold mb-4 block">
            Selected Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Our Portfolio
          </h2>
        </motion.div>

        {/* Gallery Grid - Adjusted to a 2-column layout for 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-primary text-sm tracking-wider uppercase font-medium mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="text-white font-display text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex items-center gap-2">
                  <span className="text-xs font-semibold">
                    {item.images.length} Photos
                  </span>
                  <ZoomIn size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 backdrop-blur-sm p-4 md:p-12"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2 z-[110]"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Previous Arrow */}
            {selectedProject.images.length > 1 && (
              <button
                className="absolute left-4 md:left-12 text-white hover:text-primary transition-colors p-2 z-[110] bg-black/20 hover:bg-black/40 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft size={40} />
              </button>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
              <motion.img
                key={currentImageIndex} // React keys trigger re-animation on change
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - View ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              />

              {/* Image Counter */}
              {selectedProject.images.length > 1 && (
                <div className="absolute bottom-6 md:bottom-12 text-white font-semibold tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              )}
            </div>

            {/* Next Arrow */}
            {selectedProject.images.length > 1 && (
              <button
                className="absolute right-4 md:right-12 text-white hover:text-primary transition-colors p-2 z-[110] bg-black/20 hover:bg-black/40 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight size={40} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}