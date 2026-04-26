import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories?: string[];
  title?: string;
}

export function GalleryGrid({ images, categories, title = "Gallery" }: GalleryGridProps) {
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const allCategories = categories || ["All", ...new Set(images.map((i) => i.category).filter(Boolean))];
  if (!allCategories.includes("All")) allCategories.unshift("All");

  const filtered = active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">GALLERY</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
        </motion.div>

        {allCategories.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c!)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setLightbox(img)}
                className="cursor-pointer overflow-hidden rounded-2xl border border-border shadow-card transition-shadow hover:shadow-card-hover"
              >
                <img src={img.src} alt={img.alt} className="aspect-video w-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-primary-foreground" onClick={() => setLightbox(null)}>
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
