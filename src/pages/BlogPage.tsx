import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";

const categories = ["All", "Visa Guides", "SOP Writing", "IELTS Prep", "MBBS Abroad", "CPL Training", "Cost Calculator"];

const blogs = [
  { title: "Complete Guide to Student Visa for USA in 2024", category: "Visa Guides", excerpt: "Everything you need to know about the F-1 visa process — documents, interview tips, and common mistakes to avoid.", date: "Dec 15, 2024", author: "Priya Menon", readTime: "8 min read" },
  { title: "How to Write an SOP That Gets You Admitted", category: "SOP Writing", excerpt: "A step-by-step guide to crafting a compelling Statement of Purpose that stands out from thousands of applications.", date: "Dec 10, 2024", author: "Amit Sharma", readTime: "6 min read" },
  { title: "IELTS 7.5+ Strategy: Tips from Our Top Scorers", category: "IELTS Prep", excerpt: "Proven strategies and resources used by our students who scored 7.5 and above in their IELTS examination.", date: "Dec 5, 2024", author: "Neha Gupta", readTime: "10 min read" },
  { title: "MBBS in Russia vs MBBS in Philippines: A Comparison", category: "MBBS Abroad", excerpt: "Detailed comparison of medical education in Russia and Philippines — fees, NMC recognition, clinical exposure, and career prospects.", date: "Nov 28, 2024", author: "Kavita Rao", readTime: "12 min read" },
  { title: "CPL Training Abroad: Countries, Costs & Career Scope", category: "CPL Training", excerpt: "Everything aspiring pilots need to know about pursuing Commercial Pilot License training overseas.", date: "Nov 20, 2024", author: "Sanjay Patel", readTime: "9 min read" },
  { title: "Study Abroad Cost Calculator: Budget Planning Guide", category: "Cost Calculator", excerpt: "How to accurately estimate the total cost of studying abroad — tuition, living expenses, travel, insurance, and hidden costs.", date: "Nov 15, 2024", author: "Rajesh Kumar", readTime: "7 min read" },
  { title: "Canada Student Visa Rejection: Reasons & How to Reapply", category: "Visa Guides", excerpt: "Common reasons for Canadian study permit rejection and a proven strategy to strengthen your reapplication.", date: "Nov 10, 2024", author: "Priya Menon", readTime: "8 min read" },
  { title: "Korea Scholarships for Indian Students 2025", category: "MBBS Abroad", excerpt: "Top scholarships available for Indian students wanting to study in South Korea — KGSP, university grants, and more.", date: "Nov 5, 2024", author: "Neha Gupta", readTime: "6 min read" },
];

export default function BlogPage() {
  const { content } = useContent();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${content.global.siteName} Study Abroad Blog`,
    "description": content.pages.blog.schemaDescription || content.pages.blog.description,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={content.pages.blog.title}
        description={content.pages.blog.description}
        path="/blog"
        schema={blogSchema}
      />
      <Navbar />

      <section className="bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">BLOG & RESOURCES</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              Guides, Tips & <span className="text-gradient-primary">Insights</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Expert advice and detailed guides to help you navigate your study abroad journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Badge key={c} variant="secondary" className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground">
                {c}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, i) => (
              <motion.article
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group cursor-pointer rounded-3xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary">
                  {b.category}
                </Badge>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{b.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {b.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.date}</span>
                  </div>
                  <span>{b.readTime}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
