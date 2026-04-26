import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const destinations = [
  { name: "USA", emoji: "🇺🇸", desc: "World-class universities with diverse programs and research opportunities.", unis: "4,000+ Universities" },
  { name: "United Kingdom", emoji: "🇬🇧", desc: "Prestigious education system with globally recognized degrees.", unis: "160+ Universities" },
  { name: "Canada", emoji: "🇨🇦", desc: "Affordable education with excellent post-study work opportunities.", unis: "200+ Universities" },
  { name: "Australia", emoji: "🇦🇺", desc: "High quality of life with innovative teaching methodologies.", unis: "40+ Universities" },
  { name: "New Zealand", emoji: "🇳🇿", desc: "Safe and welcoming environment with globally ranked institutions.", unis: "30+ Universities" },
  { name: "Ireland", emoji: "🇮🇪", desc: "Emerging tech hub with strong industry connections.", unis: "30+ Universities" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

export function DestinationsSection() {
  return (
    <section id="destinations" className="bg-section-alt py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">POPULAR DESTINATIONS</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Choose Your Dream Destination
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore top study destinations around the world with expert guidance every step of the way.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group cursor-pointer rounded-3xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 text-5xl">{d.emoji}</div>
              <h3 className="font-heading text-xl font-bold text-foreground">{d.name}</h3>
              <p className="mb-1 text-xs font-medium text-primary">{d.unis}</p>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              <Button variant="ghost" size="sm" className="gap-1 px-0 text-primary">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
