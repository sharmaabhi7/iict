import { useState, useEffect } from "react";
import { Zap, LifeBuoy, Award, ArrowRight, Menu, X, Sun, Moon, Check, CheckCircle2, Calendar } from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/iict-logo.jpeg";

export default function N8nTrainingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("curriculum");

  // Initialize theme from HTML element class list
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setTheme(isDark ? "dark" : "light");
  }, []);

  // Dynamic injection of the Razorpay Embed Script
  useEffect(() => {
    const scriptId = "razorpay-embed-btn-js";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
      script.defer = true;
      document.body.appendChild(script);
    } else {
      // Re-initialize if the script was already injected previously
      const rzp = (window as Window & { __rzp__?: { init?: () => void } }).__rzp__;
      if (rzp && rzp.init) {
        try {
          rzp.init();
        } catch (e) {
          console.error("Error initializing Razorpay widget", e);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Scroll to section handler
  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentSection(id);
    }
  };

  // Triggers the hidden Razorpay payment button click, with a hosted-page redirection fallback
  const handleEnrollClick = () => {
    const rzpBtn = (document.querySelector(".razorpay-payment-button") || 
                    document.querySelector(".razorpay-embed-btn button")) as HTMLButtonElement | null;
    if (rzpBtn) {
      rzpBtn.click();
    } else {
      // Fallback redirect if Razorpay's script is blocked by extensions/ad-blockers
      window.open("https://pages.razorpay.com/pl_T8wjREBssTQqjq/view", "_blank");
    }
  };

  // Timeline / Course Data
  const courseTimeline = [
    {
      day: "Day 1",
      level: "Basic",
      duration: "1 Hour",
      count: 3,
      title: "3 Basic agents",
      summary: "Foundation level — 3 real-world AI agents.",
      details: [
        "Introduction to n8n node architecture and credential configuration.",
        "Building a Lead Capture Agent connected to Google Sheets.",
        "Creating an Auto-Reply Email responder utilizing basic LLM prompts.",
        "Automating data formatting and transformation pipelines."
      ]
    },
    {
      day: "Day 2",
      level: "Intermediate",
      duration: "1 Hour",
      count: 4,
      title: "4 Intermediate agents",
      summary: "Skill-building level — 4 real-world AI agents.",
      details: [
        "Multi-step branching logic and conditional routing.",
        "Integrating WhatsApp and Telegram messaging nodes.",
        "Building a database lookup agent linked with Notion/CRM systems.",
        "Constructing a document parser agent with PDF OCR capabilities."
      ]
    },
    {
      day: "Day 3",
      level: "Expert",
      duration: "1 Hour",
      count: 3,
      title: "3 Expert agents",
      summary: "Advanced level — 3 real-world AI agents.",
      details: [
        "Advanced Agentic loops and memory-retrieval configurations.",
        "Building a complex web-scraper agent with AI-summarized outputs.",
        "Developing a content-generation engine connected to social channels.",
        "Error handling, production deployment, and monitoring dashboards."
      ]
    }
  ];

  // Comparison Matrix Data
  const comparisons = [
    {
      feature: "Format",
      desc: "How training is delivered",
      iict: "3 live days, 1 hour/day, live screen sharing",
      others: "Long pre-recorded videos, self-paced",
    },
    {
      feature: "Projects",
      desc: "What you can show in interviews",
      iict: "10 complete real-world AI agents",
      others: "1–2 demo workflows, mostly theory",
    },
    {
      feature: "Language",
      desc: "Medium of instruction",
      iict: "Hindi — easy to follow",
      others: "English-only, often hard to grasp",
    },
    {
      feature: "Focus",
      desc: "Primary goal of the program",
      iict: "Employment + portfolio building",
      others: "Generic AI awareness / theory",
    },
    {
      feature: "Code depth",
      desc: "Practical skill level",
      iict: "End-to-end n8n + LLM integration",
      others: "Basic n8n without real connections",
    },
    {
      feature: "Total time",
      desc: "Commitment required",
      iict: "3 hours total over 3 days",
      others: "Weeks of theory and upsells",
    },
    {
      feature: "Doubt support",
      desc: "Help when you get stuck",
      iict: "Live Q&A every session",
      others: "Comments or delayed replies",
    },
    {
      feature: "Certificate",
      desc: "Proof for CV / LinkedIn",
      iict: "Certified by IICT, Graam-Infotech Overseas Educon Ltd.",
      others: "Generic PDF, no institution",
    },
    {
      feature: "Price",
      desc: "Total, no surprises",
      iict: "₹199 flat — everything included",
      others: "₹5,000 – ₹25,000 + paid add-ons",
    },
  ];

  // SEO Schema
  const n8nTrainingSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Employment-Focused AI Agent Development Training",
    "description": "3-day Hindi training in n8n AI Agent Development. Build 10 real-world projects and get an IICT certificate. Only ₹199.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "IICT Graam-Infotech",
      "url": "https://iict-india.org"
    }
  };

  return (
    <div id="top" className="min-h-screen scroll-smooth bg-background text-foreground transition-colors duration-300 font-sans">
      <SEO
        title="Employment-Focused AI Agent Development Training | n8n | Hindi"
        description="3-day Hindi training in n8n AI Agent Development. Build 10 real-world projects, add them to your portfolio, and improve your chances of getting an IT job. Only ₹199."
        path="/n8n-training"
        schema={n8nTrainingSchema}
      />

      {/* Sticky Custom Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-border/40">
          <div className="h-full bg-primary" style={{ width: "0%" }}></div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); handleScroll("top"); }}
            className="shrink-0 flex items-center"
          >
            <img src={logo} alt="IICT Logo" className="h-10 w-auto object-contain md:h-12" />
            <span className="ml-2.5 text-xs font-extrabold tracking-tight text-foreground md:text-sm">
              · <span className="text-primary">n8n AI Training</span>
            </span>
          </a>
          
          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {[
              { id: "curriculum", label: "Curriculum" },
              { id: "timeline", label: "Timeline" },
              { id: "career", label: "Career" },
              { id: "who-should-attend", label: "Who" },
              { id: "enroll", label: "Enroll" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`relative shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none md:text-sm ${
                  currentSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Header CTA Button */}
            <button
              type="button"
              onClick={handleEnrollClick}
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:text-sm"
            >
              Build 10 agents for ₹199
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border bg-background/95 backdrop-blur-md md:hidden overflow-hidden"
            >
              <nav className="mx-auto flex flex-col gap-1 px-4 py-3">
                {[
                  { id: "curriculum", label: "Curriculum" },
                  { id: "timeline", label: "Timeline" },
                  { id: "career", label: "Career" },
                  { id: "who-should-attend", label: "Who" },
                  { id: "enroll", label: "Enroll" },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScroll(section.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      currentSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{section.label}</span>
                    <ArrowRight className={`h-4 w-4 transition-opacity ${currentSection === section.id ? "opacity-100" : "opacity-40"}`} />
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-l-[6px] border-primary scroll-mt-20 bg-background transition-colors duration-300">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-56 h-[780px] w-[780px] rounded-full bg-primary/10 blur-[100px] dark:bg-primary/5"></div>
        <div aria-hidden="true" className="pointer-events-none absolute right-40 top-[360px] h-[520px] w-[520px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/3"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-[-180px] h-[420px] w-[420px] rounded-full bg-primary/8 blur-[80px] dark:bg-primary/4"></div>

        <div className="relative mx-auto grid max-w-6xl gap-16 px-8 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
              01 · ATTENTION — STOP SCROLLING
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Build 10 real AI agents<br />
              <span className="text-gradient-primary">in 3 hours. For ₹199.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              India's most affordable employment-focused AI training. In just{" "}
              <strong className="text-foreground font-semibold">1 hour/day for 3 days</strong> — taught in{" "}
              <strong className="text-foreground font-semibold">Hindi</strong> — you build{" "}
              <strong className="text-foreground font-semibold">10 real-world AI agents in n8n</strong> that you can put on your resume by the weekend.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-primary/10 px-5 py-2.5 text-xs font-bold text-primary dark:bg-primary/20">3 days · 1 hr/day</span>
              <span className="rounded-full bg-primary/10 px-5 py-2.5 text-xs font-bold text-primary dark:bg-primary/20">10 real agents</span>
              <span className="rounded-full bg-primary/10 px-5 py-2.5 text-xs font-bold text-primary dark:bg-primary/20">₹199 only</span>
              <span className="rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary">Hindi language</span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={handleEnrollClick}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 ring-2 ring-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40 hover:ring-primary/40"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Build 10 agents for ₹199 →</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur shadow-sm">
                <Zap className="h-3.5 w-3.5 text-primary fill-primary/10" />
                Instant access
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur shadow-sm">
                <LifeBuoy className="h-3.5 w-3.5 text-primary" />
                n8n setup support
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur shadow-sm">
                <Award className="h-3.5 w-3.5 text-primary" />
                IICT certificate
              </span>
            </div>
            
            <p className="mt-12 text-xs font-semibold text-muted-foreground tracking-wide">
              Graam-InfoTech (IICT) · iict-india.org
            </p>
          </div>

          {/* Right Column Circular badge */}
          <div className="relative hidden items-center justify-center md:flex">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[360px] w-[360px]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-rose-600 shadow-2xl shadow-primary/30 animate-pulse-slow"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-white/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground text-center p-6">
                <p className="text-xs font-extrabold tracking-[0.3em] text-white/90">JOB-READY</p>
                <p className="mt-3 text-7xl font-black tracking-tighter text-white">₹199</p>
                <p className="mt-4 text-sm font-bold text-white/95">3 days · 10 agents</p>
                <p className="mt-1 text-xs font-medium text-white/80">Verifiable Certificate Included</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Why this works */}
      <section className="relative border-t border-border bg-card/50 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-8 py-14">
          <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
            02 · INTEREST — WHY THIS WORKS
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Short. Practical. In your language. Built for the resume — not the shelf.
          </h2>
          
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { val: "10", lbl: "real AI agents you build live" },
              { val: "3 hrs", lbl: "total time — 1 hour/day" },
              { val: "Hindi", lbl: "easy-to-follow instruction" },
              { val: "₹199", lbl: "flat — no upsells, no add-ons" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <p className="text-4xl font-black text-primary tracking-tight">{stat.val}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground leading-snug">{stat.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum breakdown */}
      <section id="curriculum" className="relative border-t border-border bg-secondary/30 scroll-mt-20 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
              03 · DESIRE — WHAT YOU WALK AWAY WITH
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              10 real-world agents across 3 focused days
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Each day builds on the previous one: basic on Day 1, intermediate on Day 2, and expert on Day 3. Every agent is chosen because it mirrors a real workplace task.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {courseTimeline.map((item, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
              >
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10"></div>
                
                <div className="relative flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <span className="text-2xl font-black leading-none">{item.count}</span>
                    <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider opacity-90">agents</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-widest text-primary uppercase">{item.day}</p>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.level}</p>
                  </div>
                </div>

                <h3 className="relative mt-8 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
                
                <ul className="mt-6 space-y-2.5 relative">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <p className="mt-12 text-center text-sm font-semibold text-muted-foreground">
            3 + 4 + 3 = <span className="font-extrabold text-foreground underline decoration-primary decoration-2">10 working AI agents</span> you can add to your portfolio.
          </p>
        </div>
      </section>

      {/* Timeline detail */}
      <section id="timeline" className="relative border-t border-border bg-background scroll-mt-20 transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
              TRAINING DATA
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              3 days, 1 hour each — what you will cover
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              A clear day-by-day plan. Every agent is based on a real-life use case so you can confidently explain it in an interview.
            </p>
          </div>

          <ol className="relative mt-14 space-y-12 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary before:via-primary/30 before:to-transparent md:before:left-6">
            {courseTimeline.map((item, i) => (
              <li key={i} className="group/timeline relative pl-14 md:pl-20">
                {/* Number Dot */}
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-background transition-transform duration-300 group-hover/timeline:scale-110 md:h-12 md:w-12">
                  {i + 1}
                </div>
                
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg md:p-8">
                  <div className="relative">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                          DAY {i + 1} · {item.level} · {item.duration}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
                          {item.title}
                        </h3>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors group-hover/timeline:bg-primary group-hover/timeline:text-primary-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.count} agents
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                    
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Key Projects & Core Skills:</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Career Scope / Benefits */}
      <section id="career" className="relative border-t border-border bg-secondary/30 scroll-mt-20 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
                CAREER BENEFITS
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Practical skills you can add to your resume
              </h2>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                This course is built for unemployed youth and IT students who want practical skills they can list on their resume and demonstrate in job interviews.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                By the end, you will have 10 real-world projects, hands-on experience with n8n and AI agents, and an IICT certificate to add to your CV / LinkedIn.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">What you can show after the course</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Build a portfolio of 10 industry-relevant AI projects",
                  "Gain practical experience in AI Agent Development with n8n",
                  "Understand modern automation workflows you can list on your CV",
                  "Add AI agent, LLM, and n8n automation skills to your resume / LinkedIn",
                  "Demonstrate real projects during job interviews"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90 font-medium">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary fill-primary/10" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm font-semibold text-foreground">
                  Focus on building real projects and skills you can confidently talk about in interviews.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Skills you can list on your resume</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "AI agent design with n8n",
                "LLM integration with business tools",
                "No-code / low-code automation",
                "Google Sheets / Gmail / CRM automation",
                "Real-world project portfolio building",
                "Prompt engineering for practical tasks",
                "Production deployment basics",
                "Resume-ready project presentation"
              ].map((skill, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-border bg-background p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                  <span className="text-sm font-semibold text-foreground/90">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section id="who-should-attend" className="relative border-t border-border bg-background scroll-mt-20 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
                WHO SHOULD ATTEND
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Made for unemployed youth & IT students
              </h2>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                If you are looking for a practical, short, and affordable way to start an AI or automation career, this training is for you.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Unemployed IT Graduates",
                "BCA / MCA Students",
                "B.Tech / M.Tech Students",
                "Computer Science Students",
                "Freshers seeking AI and Automation careers",
                "Anyone interested in AI Agent Development"
              ].map((audience, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-all duration-300">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-foreground/90">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why IICT Comparison matrix */}
      <section className="relative border-t border-border bg-card/30 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
              WHY IICT
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How this is different from every other n8n training
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Most courses sell you theory and screenshots. We focus on employment: 10 real projects, Hindi instruction, and a verifiable certificate you can use while job hunting.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "01", title: "Built for employment", body: "Every exercise is designed to help you build interview-ready projects and add real skills to your resume." },
              { id: "02", title: "10 real-world agents", body: "You build 10 complete, working AI agent projects that you can show to recruiters — not just theory." },
              { id: "03", title: "Taught in Hindi", body: "Hindi language instruction so anyone can follow along comfortably, even without strong English." },
              { id: "04", title: "1 hour/day for 3 days", body: "Short, focused sessions. Learn a practical skill without giving up your entire schedule." },
              { id: "05", title: "Live n8n configuration", body: "No vague slides. We open n8n and wire each node in front of you — credentials, prompts, and branching." },
              { id: "06", title: "Certificate from IICT", body: "Get a verifiable certificate from Graam-Infotech Overseas Educon Ltd. to add to your CV and LinkedIn." }
            ].map((adv, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                  {adv.id}
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{adv.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{adv.body}</p>
              </div>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="mt-20">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Side-by-side</p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  Employment-focused n8n training vs. other courses
                </h3>
              </div>
              <p className="text-xs text-muted-foreground sm:block hidden">Swipe → on mobile to compare.</p>
            </div>

            <div className="-mx-8 overflow-x-auto px-8 md:mx-0 md:overflow-hidden md:px-0">
              <div className="min-w-[680px] overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
                <div className="grid grid-cols-[1.4fr_1.4fr_1.4fr] border-b-2 border-border bg-secondary/60 text-xs font-bold uppercase tracking-widest">
                  <div className="sticky left-0 z-20 bg-secondary/95 px-6 py-5 text-muted-foreground backdrop-blur border-r border-border md:border-r-0">
                    What you get
                  </div>
                  <div className="border-l border-border bg-primary/10 px-6 py-5 text-primary font-extrabold">
                    IICT · ₹199
                  </div>
                  <div className="border-l border-border px-6 py-5 text-muted-foreground">
                    Other trainings
                  </div>
                </div>

                {comparisons.map((row, idx) => (
                  <div 
                    key={idx} 
                    className={`grid grid-cols-[1.4fr_1.4fr_1.4fr] border-b border-border last:border-b-0 ${
                      idx % 2 === 1 ? "bg-secondary/20" : "bg-card"
                    }`}
                  >
                    <div className="sticky left-0 z-10 px-6 py-5 backdrop-blur border-r border-border md:border-r-0 bg-card/95 font-semibold text-foreground">
                      <p className="text-sm">{row.feature}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground font-normal">{row.desc}</p>
                    </div>
                    <div className="flex items-start gap-2.5 border-l border-border bg-primary/5 px-6 py-5 text-foreground font-semibold dark:bg-primary/10">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">✓</span>
                      <p className="text-sm leading-relaxed">{row.iict}</p>
                    </div>
                    <div className="flex items-start gap-2.5 border-l border-border px-6 py-5 text-muted-foreground">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-[10px] font-bold text-muted-foreground">✕</span>
                      <p className="text-sm leading-relaxed">{row.others}</p>
                    </div>
                  </div>
                ))}

                {/* Bottom line Row */}
                <div className="grid grid-cols-[1.4fr_1.4fr_1.4fr] border-t border-border bg-foreground text-background">
                  <div className="sticky left-0 z-10 bg-foreground px-6 py-6 border-r border-background/10 md:border-r-0">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">Bottom line</p>
                    <p className="mt-1 text-sm font-semibold">Job-ready skills, 25× less cost.</p>
                  </div>
                  <div className="border-l border-background/10 px-6 py-6 flex items-center">
                    <button 
                      type="button" 
                      onClick={handleEnrollClick}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-102 hover:shadow-md"
                    >
                      Build 10 agents for ₹199 →
                    </button>
                  </div>
                  <div className="border-l border-background/10 px-6 py-6 items-center flex">
                    <p className="text-xs text-background/70 leading-relaxed">
                      Why pay thousands when you can build 10 interview-ready agents for ₹199?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">← swipe to compare →</p>
          </div>
        </div>
      </section>

      {/* CTA bottom section */}
      <section id="enroll" className="relative overflow-hidden border-t border-border bg-secondary/20 scroll-mt-20 transition-colors duration-300">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>
        
        <div className="relative mx-auto max-w-3xl px-8 py-24 text-center">
          <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
            04 · ACTION — TAKE THE NEXT STEP
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Build 10 real AI agents for ₹199.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Join the live Hindi cohort, build 10 real-world AI agents in n8n, and get an IICT certificate you can add to your resume. Seats per batch are limited.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center">
            {/* Final CTA Button */}
            <button
              type="button"
              onClick={handleEnrollClick}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-12 py-5 text-lg font-bold text-primary-foreground shadow-2xl shadow-primary/30 ring-4 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40 hover:ring-primary/20"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Build 10 agents for ₹199</span>
            </button>

            <p className="mt-4 text-xs font-semibold text-foreground">
              Takes under 60 seconds · Confirmation sent instantly
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur shadow-sm">
              <Zap className="h-3.5 w-3.5 text-primary fill-primary/10" />
              Instant access
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur shadow-sm">
              <LifeBuoy className="h-3.5 w-3.5 text-primary" />
              n8n setup support
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur shadow-sm">
              <Award className="h-3.5 w-3.5 text-primary" />
              IICT certificate
            </span>
          </div>
        </div>
      </section>

      {/* Invisible Razorpay Embed Button container (not hidden to allow layout checks by the embed script) */}
      <div className="opacity-0 absolute pointer-events-none w-1 h-1 overflow-hidden" aria-hidden="true">
        <div 
          className="razorpay-embed-btn" 
          data-url="https://pages.razorpay.com/pl_T8wjREBssTQqjq/view"
          data-text="Pay Now"
          data-color="#528FF0"
          data-size="small"
        >
        </div>
      </div>

      {/* Localized Footer */}
      <footer className="border-t border-border bg-background transition-colors duration-300">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-8 text-sm font-semibold text-muted-foreground">
          <span className="flex items-center gap-2.5">
            <img src={logo} alt="IICT Logo" className="h-8 w-auto object-contain" />
            <span>© IICT · Graam-Infotech Overseas Educon Ltd.</span>
          </span>
          <a href="https://iict-india.org" className="hover:text-primary hover:underline transition-all">
            iict-india.org
          </a>
        </div>
      </footer>
    </div>
  );
}
