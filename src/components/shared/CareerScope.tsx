import { motion } from "framer-motion";
import { TrendingUp, type LucideIcon } from "lucide-react";

interface CareerItem {
  icon?: LucideIcon;
  title: string;
  desc: string;
}

interface CareerScopeProps {
  title?: string;
  subtitle?: string;
  items: CareerItem[];
}

export function CareerScope({ title = "Career Scope", subtitle, items }: CareerScopeProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">CAREER</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon || TrendingUp;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-card"
              >
                <Icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
