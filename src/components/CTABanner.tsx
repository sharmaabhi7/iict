import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTABanner() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
              Book a free counselling session today and let our experts guide you to your dream university.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                  Book Free Counselling <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="ghost" className="border border-white/35 text-base text-white hover:bg-white hover:text-primary transition-colors">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
