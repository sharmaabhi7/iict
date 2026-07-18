import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const categories = ["All", "Visa Guides", "SOP Writing", "IELTS Prep", "MBBS Abroad", "CPL Training", "Cost Calculator"];

const blogs = [
  { 
    title: "Complete Guide to Student Visa for USA in 2024", 
    category: "Visa Guides", 
    excerpt: "Everything you need to know about the F-1 visa process — documents, interview tips, and common mistakes to avoid.", 
    date: "Dec 15, 2024", 
    author: "Priya Menon", 
    readTime: "8 min read",
    content: "Studying in the USA is a dream for many, but securing the F-1 Student Visa is the critical final step. First, you must be accepted by a SEVP-approved school and receive your Form I-20. Next, pay the SEVIS I-901 fee and fill out the DS-160 online application form. The visa interview is the most crucial part—be prepared to explain why you chose your specific university, how you will finance your education, and your clear plans to return to your home country after completing your studies. Avoid generic answers and maintain an honest, confident attitude throughout the interview."
  },
  { 
    title: "How to Write an SOP That Gets You Admitted", 
    category: "SOP Writing", 
    excerpt: "A step-by-step guide to crafting a compelling Statement of Purpose that stands out from thousands of applications.", 
    date: "Dec 10, 2024", 
    author: "Amit Sharma", 
    readTime: "6 min read",
    content: "Your Statement of Purpose (SOP) is your voice in the admissions committee. It should go beyond your resume and tell a cohesive story. Start with a hook—a specific moment or project that sparked your academic interest. Detail your academic background, highlighting relevant coursework, projects, or research that prepared you for this program. Explain why this specific university and program align with your career goals. Conclude with a strong vision of how you plan to contribute to the field. Remember to proofread, seek feedback, and customize each SOP for the specific institution."
  },
  { 
    title: "IELTS 7.5+ Strategy: Tips from Our Top Scorers", 
    category: "IELTS Prep", 
    excerpt: "Proven strategies and resources used by our students who scored 7.5 and above in their IELTS examination.", 
    date: "Dec 5, 2024", 
    author: "Neha Gupta", 
    readTime: "10 min read",
    content: "Scoring 7.5 or higher on the IELTS requires a blend of strong language skills and test-taking strategies. For the Listening section, practice active listening with various accents. In Reading, master the techniques of skimming and scanning to locate answers quickly without reading every single word. For Writing, structure your essays with clear introductions, body paragraphs, and conclusions, paying special attention to task achievement and cohesive devices. Finally, for the Speaking section, practice speaking naturally and fluently on various common topics, recording yourself to catch pronunciation errors. Consistent mock tests are key to success."
  },
  { 
    title: "MBBS in Russia vs MBBS in Philippines: A Comparison", 
    category: "MBBS Abroad", 
    excerpt: "Detailed comparison of medical education in Russia and Philippines — fees, NMC recognition, clinical exposure, and career prospects.", 
    date: "Nov 28, 2024", 
    author: "Kavita Rao", 
    readTime: "12 min read",
    content: "Choosing between Russia and the Philippines for your MBBS is a common dilemma. Russian medical state universities are renowned for low tuition fees, high-end laboratories, and direct 6-year programs fully recognized by the WHO and NMC. In contrast, the Philippines offers a US-style medical curriculum (BS-MD) and is a fully English-speaking nation, which provides excellent clinical exposure and high FMGE/NExT passing rates. However, the duration in the Philippines is slightly different due to the pre-medical BS requirement, and the weather is tropical, resembling India's. Assess your budget and language preferences before making your choice."
  },
  { 
    title: "CPL Training Abroad: Countries, Costs & Career Scope", 
    category: "CPL Training", 
    excerpt: "Everything aspiring pilots need to know about pursuing Commercial Pilot License training overseas.", 
    date: "Nov 20, 2024", 
    author: "Sanjay Patel", 
    readTime: "9 min read",
    content: "A Commercial Pilot License (CPL) is the gateway to a career in the skies. Doing your CPL training abroad—in countries like the USA, Canada, South Africa, or New Zealand—often offers faster flight hours accumulation due to favorable weather conditions and superior airport infrastructure. The cost ranges from INR 35 Lakhs to 60 Lakhs, depending on the school and country. When choosing a flight school, verify DGCA compatibility so your license can be converted back in India without excessive hassle. Check the fleet size, instructor ratio, and safety records of the academy to ensure a smooth training journey."
  },
  { 
    title: "Study Abroad Cost Calculator: Budget Planning Guide", 
    category: "Cost Calculator", 
    excerpt: "How to accurately estimate the total cost of studying abroad — tuition, living expenses, travel, insurance, and hidden costs.", 
    date: "Nov 15, 2024", 
    author: "Rajesh Kumar", 
    readTime: "7 min read",
    content: "Proper budgeting is essential for a stress-free study abroad experience. The total cost includes tuition fees, accommodation (on-campus vs off-campus), food, health insurance, airfare, local transport, and academic books. Do not overlook exchange rate fluctuations and miscellaneous lifestyle expenses. Look for part-time work options allowed under student visas to ease daily costs. We recommend preparing a detailed spreadsheet with low, medium, and high estimates for your chosen destination. Applying for regional and university scholarships early can also significantly reduce your overall budget requirements."
  },
  { 
    title: "Canada Student Visa Rejection: Reasons & How to Reapply", 
    category: "Visa Guides", 
    excerpt: "Common reasons for Canadian study permit rejection and a proven strategy to strengthen your reapplication.", 
    date: "Nov 10, 2024", 
    author: "Priya Menon", 
    readTime: "8 min read",
    content: "Receiving a Canada study permit rejection can be disappointing, but it is not the end of the road. Common rejection reasons include lack of financial proof, unclear career objectives, weak ties to your home country, or an incomplete study plan. To reapply successfully, order your Global Case Management System (GCMS) notes to see the visa officer's exact remarks. Address every concern raised by providing stronger documentation, clarifying your Statement of Purpose (SOP), and clarifying why studying in Canada makes sense for your future career in India. Ensure all details are robust before submitting again."
  },
  { 
    title: "Korea Scholarships for Indian Students 2025", 
    category: "MBBS Abroad", 
    excerpt: "Top scholarships available for Indian students wanting to study in South Korea — KGSP, university grants, and more.", 
    date: "Nov 5, 2024", 
    author: "Neha Gupta", 
    readTime: "6 min read",
    content: "South Korea is becoming a premier educational hub in Asia. The Global Korea Scholarship (GKS), fully funded by the Korean government, covers round-trip airfare, tuition fees, monthly stipends, and medical insurance for international students. To qualify, students must maintain a strong GPA and demonstrate academic merit. University-specific scholarships are also available, often covering 30% to 100% of tuition based on English or Korean language proficiency test scores. Study in Korea offers world-class technology, rich cultural exposure, and excellent global placement opportunities."
  }
];

export default function BlogPage() {
  const { content } = useContent();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null);

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

  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

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
              <Badge 
                key={c} 
                variant={activeCategory === c ? "default" : "secondary"}
                onClick={() => setActiveCategory(c)}
                className="cursor-pointer px-4 py-2 text-sm transition-colors"
              >
                {c}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((b, i) => (
              <motion.article
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedBlog(b)}
                className="group cursor-pointer rounded-3xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover flex flex-col justify-between"
              >
                <div>
                  <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary">
                    {b.category}
                  </Badge>
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{b.excerpt}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-slate-100 mt-auto">
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

      <Dialog open={selectedBlog !== null} onOpenChange={(open) => !open && setSelectedBlog(null)}>
        {selectedBlog && (
          <DialogContent className="max-w-2xl rounded-3xl p-6 sm:p-8">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {selectedBlog.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{selectedBlog.readTime}</span>
              </div>
              <DialogTitle className="font-heading text-2xl font-black text-foreground sm:text-3xl leading-snug">
                {selectedBlog.title}
              </DialogTitle>
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-b border-border pb-4">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> By {selectedBlog.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedBlog.date}</span>
              </div>
            </DialogHeader>
            <DialogDescription className="text-sm leading-relaxed text-slate-700 whitespace-pre-line pt-2 font-medium">
              {selectedBlog.content}
            </DialogDescription>
          </DialogContent>
        )}
      </Dialog>

      <CTABanner />
      <Footer />
    </div>
  );
}
