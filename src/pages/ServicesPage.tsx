import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";
import { Link } from "react-router-dom";
import {
  UserCheck,
  School,
  FileText,
  Stamp,
  Award,
  Landmark,
  Plane,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Headphones,
  Stethoscope,
  GraduationCap
} from "lucide-react";

interface ServiceDetail {
  icon: any;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  color: string;
}

const serviceDetails: ServiceDetail[] = [
  {
    icon: UserCheck,
    title: "Profile Assessment",
    shortDesc: "Get a personalized evaluation of your academic profile and study goals.",
    longDesc: "Our experienced counsellors analyze your academic transcripts, test scores, extracurricular achievements, work experience, and financial background to create a realistic admission roadmap.",
    features: [
      "Academic transcript evaluation",
      "Standardized test requirement analysis (IELTS, TOEFL, GMAT, GRE)",
      "Career path mapping and interest alignment",
      "Financial feasibility and budgeting assessment"
    ],
    color: "from-blue-500/10 to-indigo-500/10 text-indigo-600"
  },
  {
    icon: School,
    title: "University Selection",
    shortDesc: "Find the best-fit universities based on your preferences and eligibility.",
    longDesc: "We short-list universities based on ranking, budget, course structure, location, post-study work opportunities, and your profile match to maximize your chances of admission.",
    features: [
      "Customized shortlist of safety, target, and reach universities",
      "Analysis of acceptance rates and intake deadlines",
      "Information on campus facilities, accommodation, and city life",
      "Direct communication with university representatives"
    ],
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600"
  },
  {
    icon: FileText,
    title: "Admission Guidance",
    shortDesc: "End-to-end support from application to admission confirmation.",
    longDesc: "We assist in compiling and polishing application documents. From crafting outstanding Statements of Purpose (SOP) to formatting Letters of Recommendation (LOR) and resume building, we ensure your application stands out.",
    features: [
      "Professional editing and feedback on SOPs and Essays",
      "Templates and review for Letters of Recommendation (LOR)",
      "Step-by-step assistance with university application forms",
      "Application fee waiver support (where available)"
    ],
    color: "from-amber-500/10 to-orange-500/10 text-amber-600"
  },
  {
    icon: Stamp,
    title: "Visa Assistance",
    shortDesc: "Expert help with visa documentation and interview preparation.",
    longDesc: "Navigating the student visa process is complex. We offer complete guidance on visa forms, financial documentation, source of funds verification, and conduct rigorous mock interviews to build your confidence.",
    features: [
      "Up-to-date checklist of student visa documents",
      "Financial documentation and sponsorship guidance",
      "Visa form completion and slot booking",
      "Real-world visa mock interview sessions"
    ],
    color: "from-rose-500/10 to-pink-500/10 text-rose-600"
  },
  {
    icon: Award,
    title: "Scholarship Support",
    shortDesc: "Identify and apply for scholarships to reduce your financial burden.",
    longDesc: "Higher education abroad can be expensive. We actively track merit-based, need-based, and country-specific scholarships to help you secure financial aid and tuition fee discounts.",
    features: [
      "Database of institutional and government scholarships",
      "Guidance on writing impactful scholarship essays",
      "Tuition waiver application assistance",
      "Early bird discount opportunities alerts"
    ],
    color: "from-purple-500/10 to-violet-500/10 text-purple-600"
  },
  {
    icon: Landmark,
    title: "Loan Assistance",
    shortDesc: "Guidance on education loans and financial planning for your studies.",
    longDesc: "We partner with leading nationalized banks, private banks, and non-banking financial companies (NBFCs) to help you secure education loans at competitive interest rates with fast processing times.",
    features: [
      "Comparative analysis of loan products",
      "Collateral and non-collateral loan options",
      "Speedy approval through partner financial institutions",
      "Pre-visa loan disbursement assistance"
    ],
    color: "from-cyan-500/10 to-blue-500/10 text-cyan-600"
  },
  {
    icon: Plane,
    title: "Pre-Departure Support",
    shortDesc: "Everything you need to know before you fly — from packing to settling in.",
    longDesc: "Moving to a new country is a major transition. Our pre-departure briefing covers academic preparation, immigration procedures, health insurance, local transportation, banking, mobile connections, and cultural adjustment.",
    features: [
      "Pre-departure briefing sessions (group & individual)",
      "Packing checklists and travel checklist guides",
      "Foreign exchange (Forex) and SIM card setup guidance",
      "Alumni networking and roommate matching assistance"
    ],
    color: "from-sky-500/10 to-blue-600/10 text-sky-600"
  }
];

const steps = [
  {
    num: "01",
    title: "Free Initial Consultation",
    desc: "Speak with a dedicated advisor to discuss your international education aspirations."
  },
  {
    num: "02",
    title: "Profile Assessment & Selection",
    desc: "Receive a tailored list of best-fit courses and universities based on your profile."
  },
  {
    num: "03",
    title: "Document Prep & Applications",
    desc: "Draft excellent SOPs, secure LORs, and submit complete, polished applications."
  },
  {
    num: "04",
    title: "Financial Planning & Visa",
    desc: "Secure funding/loans and receive step-by-step assistance for your visa filing."
  },
  {
    num: "05",
    title: "Pre-Departure & Fly",
    desc: "Attend briefings, connect with seniors, pack your bags, and fly to your destination."
  }
];

export default function ServicesPage() {
  const { content } = useContent();

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Our Services - ${content.global.siteName}`,
    "description": content.pages.services?.description || "Explore our comprehensive study abroad and consultancy services.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SEO
        title={content.pages.services?.title || "Our Services - Graam-InfoTech (IICT)"}
        description={content.pages.services?.description || "Comprehensive overseas education services, from program selection to university application and student visa processing."}
        path="/services"
        schema={servicesSchema}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 border border-red-500/20 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> What We Do
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Empowering Your <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Global Future</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              From your initial interest assessment to landing safely at your global campus destination, we provide standard-setting counsel every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#services-list"
                className="rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-red-700"
              >
                Explore Services
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-slate-800"
              >
                Free Counselling <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic & Professional Pathways */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-red-600 uppercase tracking-widest">Program Pathways</span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Specialized Study Programs Abroad
            </h2>
            <p className="mt-4 text-slate-600">
              We offer direct pathways and specialized admissions support for top-tier international programs matching your career goals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* MBBS Abroad Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">Study MBBS Abroad</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Pursue affordable medical degrees at low-cost, WHO & NMC-recognized medical universities across the globe.
                  </p>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                    <span>NMC & WHO Recognized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                    <span>No Donation / Capitation Fee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                    <span>Russia, Georgia, Kazakhstan & more</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                    <span>English Medium Instruction</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100/80">
                <Link
                  to="/mbbs-abroad"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Explore MBBS Programs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Study Abroad Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Study Abroad (UG/PG)</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Secure admissions for Engineering, MBA, Computer Science, and Humanities at top universities in 60+ countries.
                  </p>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                    <span>800+ Partner Universities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                    <span>USA, UK, Canada, Australia, Germany</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                    <span>98.5% Student Visa Success Rate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                    <span>Scholarship and Loan Assistance</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100/80">
                <Link
                  to="/study-abroad"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Explore General Degrees <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* CPL Flight Training Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Plane className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">CPL Flight Training</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Launch your aviation career with flight school placements that grant Commercial Pilot Licenses (CPL) worldwide.
                  </p>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>FAA, EASA & CAD Flight Schools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>Modern Fleet & Flight Simulators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>Pre-Assessment & Ground Classes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>Airline Placement Pathways</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100/80">
                <Link
                  to="/cpl-training"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
                >
                  Explore Aviation Programs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services-list" className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-red-600 uppercase tracking-widest">Our Offerings</span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              End-to-End Solutions for Study Abroad
            </h2>
            <p className="mt-4 text-slate-600">
              We offer bespoke solutions tailored to your unique academic, professional, and economic requirements.
            </p>
          </div>

          <div className="space-y-12">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md md:p-12 lg:flex-row ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Left Column: Icon & Desc */}
                  <div className="flex-1 space-y-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-base">{service.longDesc}</p>
                    
                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        Enquire about this service <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Divider Line on Desktop */}
                  <div className="hidden w-px bg-slate-100 lg:block" />

                  {/* Right Column: Features checklist */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">What is included:</h4>
                    <ul className="space-y-3.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps/Timeline Section */}
      <section className="border-t border-slate-100 bg-white py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-red-600 uppercase tracking-widest">Our Workflow</span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Your Journey to Success
            </h2>
            <p className="mt-4 text-slate-600">
              We guide you through a structured, hassle-free path to landing your dream university.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Vertical timeline line on desktop */}
            <div className="absolute left-[39px] top-6 bottom-6 hidden w-0.5 bg-slate-100 md:block" />

            <div className="space-y-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative flex flex-col md:flex-row md:gap-8"
                >
                  {/* Step bubble */}
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                    <div className="z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-700 font-heading text-2xl font-bold text-white shadow-md">
                      {step.num}
                    </div>
                    {/* Visual mobile separator */}
                    <div className="h-px flex-1 bg-slate-100 md:hidden" />
                  </div>

                  {/* Step Content */}
                  <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 md:mt-0 md:flex-1 md:p-8">
                    <h3 className="font-heading text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed text-sm md:text-base">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white shadow-xl md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4" /> 100% Certified Guidance
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">
                  Ready to Start Your Journey?
                </h2>
                <p className="mt-4 text-red-50 leading-relaxed">
                  Join thousands of successful students who found their path with Graam-InfoTech (IICT). Book your counseling session for professional advice.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-red-600 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <Calendar className="h-4 w-4" /> Book Free Session
                </Link>
                <a
                  href="tel:9897278615"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Headphones className="h-4 w-4" /> Call 98972 78615
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
