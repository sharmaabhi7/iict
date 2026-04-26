import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How do I start my study abroad journey?", a: "Simply book a free counselling session with us. Our expert advisors will assess your profile, understand your goals, and create a personalised roadmap for you." },
  { q: "How much does your service cost?", a: "Our initial counselling is absolutely free. We offer a range of service packages depending on the level of support you need — from basic guidance to end-to-end management." },
  { q: "Which countries can I study in?", a: "We support admissions to 60+ countries including USA, UK, Canada, Australia, New Zealand, Ireland, Germany, and many more." },
  { q: "Do you help with scholarships?", a: "Yes! Our team actively identifies scholarship opportunities and assists you with applications to maximise your chances of securing financial aid." },
  { q: "How long does the entire process take?", a: "Typically 3-6 months depending on the country and intake, but we recommend starting at least 8-12 months before your desired intake for the best options." },
  { q: "Can you help with education loans?", a: "Absolutely. We partner with leading banks and financial institutions to help you secure education loans with competitive interest rates." },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-section-alt py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold text-primary">FAQ</span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-card px-6 shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
