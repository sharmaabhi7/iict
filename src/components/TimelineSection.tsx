import { motion } from "framer-motion";
import { MapPin, BookOpen, Send, Mail, Stamp, Plane } from "lucide-react";

const steps = [
  { icon: MapPin, title: "Choose Destination", desc: "Pick the country and city that fits your goals." },
  { icon: BookOpen, title: "Select Course", desc: "Find the right program aligned with your career." },
  { icon: Send, title: "Apply to University", desc: "We handle your applications end to end." },
  { icon: Mail, title: "Receive Offer", desc: "Get your admission offer letter confirmed." },
  { icon: Stamp, title: "Visa Process", desc: "Expert support through the visa application." },
  { icon: Plane, title: "Fly Abroad", desc: "Pre-departure guidance and you're all set!" },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="bg-section-alt py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">HOW IT WORKS</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Your Path to Studying Abroad
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six simple steps from dream to reality — and we walk with you every step of the way.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block" />

          <div className="flex flex-col gap-10">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-4 md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 rounded-3xl border border-border bg-card p-5 shadow-card md:max-w-[45%] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <h3 className="font-heading text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>

                  {/* Circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md">
                    <s.icon className="h-5 w-5" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
