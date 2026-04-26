import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stories = [
  { name: "Ankit Mehta", from: "Delhi", to: "University of Melbourne, Australia", program: "MS in Data Science", highlight: "Full scholarship secured" },
  { name: "Sneha Reddy", from: "Hyderabad", to: "University of Toronto, Canada", program: "MBA", highlight: "98% visa approval first attempt" },
  { name: "Arjun Nair", from: "Kerala", to: "Imperial College London, UK", program: "MS in AI", highlight: "₹15L scholarship" },
];

export function SuccessStoriesPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">SUCCESS STORIES</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Real Students, Real Results
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-card"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">From {s.from}</p>
                </div>
              </div>
              <p className="mb-1 text-sm font-medium text-foreground">{s.to}</p>
              <p className="mb-3 text-xs text-muted-foreground">{s.program}</p>
              <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-primary">{s.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" className="gap-2" asChild>
            <a href="/case-studies">
              View All Success Stories <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
