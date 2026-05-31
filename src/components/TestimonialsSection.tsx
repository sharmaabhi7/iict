import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Priya Sharma",
    country: "Canada",
    university: "University of Toronto",
    text: "Graam-Infotech made my dream of studying in Canada a reality. From university selection to visa approval, the support was exceptional. I couldn't have done it without them!",
    rating: 5,
  },
  {
    name: "Rahul Patel",
    country: "USA",
    university: "MIT",
    text: "The counsellors at Graam-Infotech are incredibly knowledgeable. They helped me secure a scholarship that covered 60% of my tuition. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    country: "UK",
    university: "University of Oxford",
    text: "I was overwhelmed by the application process, but Graam-Infotech simplified everything. Their step-by-step guidance gave me confidence throughout the journey.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    country: "Australia",
    university: "University of Melbourne",
    text: "Professional, supportive, and transparent. Graam-Infotech helped me navigate the complex Australian visa process with ease. I'm now living my dream!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">TESTIMONIALS</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            What Our Students Say
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
            <Quote className="absolute right-8 top-8 h-12 w-12 text-primary/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-6 text-lg leading-relaxed text-foreground">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-heading text-base font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.university} — {t.country}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === idx ? "w-8 bg-primary" : "w-2.5 bg-border"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={prev} aria-label="Previous">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={next} aria-label="Next">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
