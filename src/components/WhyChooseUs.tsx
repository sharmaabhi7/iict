import { motion } from "framer-motion";
import { Shield, Clock, Award, HeartHandshake, Users, Target } from "lucide-react";

const reasons = [
  { icon: Shield, title: "20+ Years Experience", desc: "Two decades of trusted expertise guiding students to top universities worldwide." },
  { icon: Target, title: "98.5% Visa Success", desc: "Industry-leading visa approval rates through meticulous preparation and expert guidance." },
  { icon: Users, title: "250,000+ Students", desc: "A quarter million students have trusted us with their study abroad dreams." },
  { icon: Award, title: "Certified Counsellors", desc: "Our advisors hold international certifications and undergo regular training." },
  { icon: HeartHandshake, title: "End-to-End Support", desc: "From profile assessment to post-arrival support — we're with you all the way." },
  { icon: Clock, title: "Fast Processing", desc: "Streamlined processes ensure your applications are processed swiftly and efficiently." },
];

export function WhyChooseUs() {
  return (
    <section className="bg-section-alt py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">WHY CHOOSE US</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Why 250,000+ Students Trust EduBridge
          </h2>
          <p className="mt-4 text-muted-foreground">
            We combine decades of experience with personalized care to deliver results that matter.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-heading text-base font-bold text-foreground">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
