import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const images = [
  {
    url: "https://images.unsplash.com/photo-1523050338692-7b835a07973f?q=80&w=2070&auto=format&fit=crop",
    alt: "Students on campus",
  },
  {
    url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop",
    alt: "Graduation celebration",
  },
  {
    url: "https://images.unsplash.com/photo-1523240715630-979bb070e61b?q=80&w=2070&auto=format&fit=crop",
    alt: "Diverse students studying",
  },
  {
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
    alt: "University library",
  },
];

export const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const intervalId = setInterval(() => {
      scrollNext();
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId);
  }, [emblaApi, scrollNext]);

  return (
    <div className="overflow-hidden rounded-3xl shadow-card bg-muted" ref={emblaRef}>
      <div className="flex">
        {images.map((image, index) => (
          <div className="relative min-w-full flex-[0_0_100%]" key={index}>
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={image.url}
              alt={image.alt}
              className="h-[300px] md:h-[500px] w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Subtle overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};
