import { motion } from "framer-motion";

interface Partner {
  name: string;
  logo?: string;
}

interface UniversityPartnersProps {
  partners: Partner[];
  title?: string;
}

export function UniversityPartners({ partners, title = "Our University Partners" }: UniversityPartnersProps) {
  return (
    <section className="bg-section-alt py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">PARTNERS</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex h-20 items-center justify-center rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <p className="text-center text-xs font-semibold text-muted-foreground">{p.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
