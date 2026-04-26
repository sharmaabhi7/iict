import { motion } from "framer-motion";

interface PageHeroProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export function PageHero({ badge, title, highlight, subtitle, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            {badge}
          </span>
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {title} <span className="text-primary">{highlight}</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full rounded-2xl object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
