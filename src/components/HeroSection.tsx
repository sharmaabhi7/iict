import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2, Globe } from "lucide-react";
import { HeroCarousel } from "./HeroCarousel";

const counters = [
  { icon: Users, value: "250,000+", label: "Students Assisted" },
  { icon: Building2, value: "800+", label: "University Partners" },
  { icon: Globe, value: "60+", label: "Countries Supported" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-12 pt-12 md:pb-20 md:pt-20">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text side */}
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
          >
            🎓 Trusted by 250,000+ students worldwide
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Your Study Abroad Journey{" "}
            <span className="text-gradient-primary">Begins Here</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Expert guidance from profile assessment to visa approval. We partner with 800+ universities across 60+ countries to make your dream of studying abroad a reality.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" className="gap-2 text-base shadow-lg shadow-primary/20">
              Book Free Counselling <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Explore Universities
            </Button>
          </motion.div>
        </div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <HeroCarousel />
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 z-10 rounded-2xl bg-card p-4 shadow-card md:-bottom-6 md:-left-6">
            <p className="text-xs font-medium text-muted-foreground">Student Satisfaction</p>
            <p className="font-heading text-2xl font-bold text-primary">98.5%</p>
          </div>
        </motion.div>
      </div>


      {/* Trust counters */}
      <div className="container mt-16">
        <div className="grid grid-cols-1 gap-6 rounded-3xl bg-card p-8 shadow-card sm:grid-cols-3">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{c.value}</p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
