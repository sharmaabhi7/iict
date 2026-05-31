import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABanner } from "@/components/CTABanner";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";

import { useContent } from "@/contexts/ContentContext";

const reviews = [
  { name: "Priya Sharma", country: "Canada", text: "Graam-Infotech made my dream of studying in Canada a reality. From university selection to visa approval, the support was exceptional.", rating: 5, before: "Confused about options, rejected twice", after: "Admitted to University of Waterloo with scholarship" },
  { name: "Rahul Patel", country: "USA", text: "The counsellors are incredibly knowledgeable. They helped me secure a scholarship that covered 60% of my tuition.", rating: 5, before: "Low confidence, unsure about MBA programs", after: "USC Marshall School of Business, full funding" },
  { name: "Ananya Gupta", country: "UK", text: "I was overwhelmed by the application process, but Graam-Infotech simplified everything. Their step-by-step guidance gave me confidence.", rating: 5, before: "No international exposure, tight budget", after: "University of Edinburgh, Chevening Scholar" },
  { name: "Vikram Singh", country: "Australia", text: "Professional, supportive, and transparent. Graam-Infotech helped me navigate the complex visa process with ease.", rating: 5, before: "Couldn't get MBBS seat in India", after: "University of Melbourne Medical School" },
  { name: "Meera Krishnan", country: "New Zealand", text: "Best decision I made was choosing Graam-Infotech. They understood my constraints and found the perfect program for me.", rating: 5, before: "Limited budget, low IELTS", after: "AUT University, now working in Auckland" },
  { name: "Karan Joshi", country: "Ireland", text: "From day one to my first job in Dublin, Graam-Infotech was there. They don't just get you admitted — they set you up for success.", rating: 5, before: "Overwhelmed by European options", after: "Trinity College Dublin, now at Google" },
];

const countries = ["All", "Canada", "USA", "UK", "Australia", "New Zealand", "Ireland"];

const videos = [
  { name: "Priya Sharma", country: "Canada", thumbnail: "🎓" },
  { name: "Rahul Patel", country: "USA", thumbnail: "🎓" },
  { name: "Ananya Gupta", country: "UK", thumbnail: "🎓" },
];

export default function TestimonialsPage() {
  const { content } = useContent();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? reviews : reviews.filter((r) => r.country === filter);

  const testimonialsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Student Testimonials - ${content.global.siteName}`,
    "description": content.pages.testimonials.description,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={content.pages.testimonials.title}
        description={content.pages.testimonials.description}
        path="/testimonials"
        schema={testimonialsSchema}
      />
      <Navbar />

      <section className="bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">TESTIMONIALS</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              Hear From Our <span className="text-gradient-primary">Students</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Real stories from real students who trusted us with their study abroad journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-section-alt py-16">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">Video Testimonials</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <motion.div key={v.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group cursor-pointer rounded-3xl border border-border bg-card shadow-card">
                <div className="relative flex aspect-video items-center justify-center rounded-t-3xl bg-muted text-6xl">
                  {v.thumbnail}
                  <div className="absolute inset-0 flex items-center justify-center rounded-t-3xl bg-foreground/10 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-heading text-sm font-bold text-foreground">{v.name}</p>
                  <p className="text-xs text-muted-foreground">Studied in {v.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Reviews */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">Student Reviews</h2>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((r) => (
                <motion.div key={r.name} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-foreground">&ldquo;{r.text}&rdquo;</p>
                  <div className="mb-4">
                    <p className="font-heading text-sm font-bold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">Studied in {r.country}</p>
                  </div>
                  <div className="space-y-2 rounded-2xl bg-muted p-3">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs font-semibold text-destructive">Before:</span>
                      <span className="text-xs text-muted-foreground">{r.before}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs font-semibold text-primary">After:</span>
                      <span className="text-xs text-muted-foreground">{r.after}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
