import { motion } from "framer-motion";
import {
  UserCheck, School, FileText, Stamp, Award, Landmark, Plane,
} from "lucide-react";

const services = [
  { icon: UserCheck, title: "Profile Assessment", desc: "Get a personalized evaluation of your academic profile and study goals." },
  { icon: School, title: "University Selection", desc: "Find the best-fit universities based on your preferences and eligibility." },
  { icon: FileText, title: "Admission Guidance", desc: "End-to-end support from application to admission confirmation." },
  { icon: Stamp, title: "Visa Assistance", desc: "Expert help with visa documentation and interview preparation." },
  { icon: Award, title: "Scholarship Support", desc: "Identify and apply for scholarships to reduce your financial burden." },
  { icon: Landmark, title: "Loan Assistance", desc: "Guidance on education loans and financial planning for your studies." },
  { icon: Plane, title: "Pre-Departure Support", desc: "Everything you need to know before you fly — from packing to settling in." },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">OUR SERVICES</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Comprehensive Support at Every Step
          </h2>
          <p className="mt-4 text-muted-foreground">
            From your first consultation to landing in your dream country, we've got you covered.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
