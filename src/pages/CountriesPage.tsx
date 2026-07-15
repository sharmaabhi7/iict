import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, DollarSign, Clock, CheckCircle2, ChevronRight, School, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";

interface Country {
  code: string;
  name: string;
  category: "mbbs" | "study-abroad";
  image: string;
  tuition: string;
  livingCost: string;
  duration: string;
  flag: string;
  highlights: string[];
  path: string;
  hasDetails: boolean;
}

const countriesList: Country[] = [
  {
    code: "ru",
    name: "Russia",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    tuition: "₹3.5 - 7 Lakhs / year",
    livingCost: "₹1.5 - 2.5 Lakhs / year",
    duration: "6 Years (inc. internship)",
    flag: "🇷🇺",
    highlights: ["NMC & WHO Recognized", "Top Russian State Universities", "English Medium MBBS", "No Donation Required"],
    path: "/countries/russia",
    hasDetails: true
  },
  {
    code: "ge",
    name: "Georgia",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=600&auto=format&fit=crop",
    tuition: "₹4.5 - 6.5 Lakhs / year",
    livingCost: "₹1.8 - 2.5 Lakhs / year",
    duration: "6 Years (inc. internship)",
    flag: "🇬🇪",
    highlights: ["100% English Medium", "Safe European Living Standard", "WHO & NMC Approved", "High Visa Success Rate"],
    path: "/countries/georgia",
    hasDetails: true
  },
  {
    code: "uz",
    name: "Uzbekistan",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop",
    tuition: "₹2.8 - 4.5 Lakhs / year",
    livingCost: "₹1.2 - 1.8 Lakhs / year",
    duration: "5-6 Years",
    flag: "🇺🇿",
    highlights: ["Affordable Tuition Fees", "Bilingual / English Medium", "5-year Direct Programs", "Close to India"],
    path: "/contact?service=mbbs-abroad&country=Uzbekistan",
    hasDetails: false
  },
  {
    code: "kz",
    name: "Kazakhstan",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop",
    tuition: "₹3.0 - 5.0 Lakhs / year",
    livingCost: "₹1.5 - 2.5 Lakhs / year",
    duration: "5 Years",
    flag: "🇰🇿",
    highlights: ["NMC Recognized Degree", "5-Year MBBS Course", "Low Cost Living", "Indian Mess Available"],
    path: "/contact?service=mbbs-abroad&country=Kazakhstan",
    hasDetails: false
  },
  {
    code: "kg",
    name: "Kyrgyzstan",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=600&auto=format&fit=crop",
    tuition: "₹2.5 - 4.0 Lakhs / year",
    livingCost: "₹1.0 - 2.0 Lakhs / year",
    duration: "5 Years",
    flag: "🇰🇬",
    highlights: ["Extremely Low Cost Fees", "Top Medical Schools", "Direct Flights from Delhi", "English Medium Course"],
    path: "/contact?service=mbbs-abroad&country=Kyrgyzstan",
    hasDetails: false
  },
  {
    code: "ph",
    name: "Philippines",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=600&auto=format&fit=crop",
    tuition: "₹3.5 - 5.5 Lakhs / year",
    livingCost: "₹1.5 - 2.5 Lakhs / year",
    duration: "5.5 Years",
    flag: "🇵🇭",
    highlights: ["US-based Medical Curriculum", "Excellent English Environment", "90%+ FMGE Passing Rate", "Tropical Climate like India"],
    path: "/contact?service=mbbs-abroad&country=Philippines",
    hasDetails: false
  },
  {
    code: "eg",
    name: "Egypt",
    category: "mbbs",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600&auto=format&fit=crop",
    tuition: "₹4.0 - 6.0 Lakhs / year",
    livingCost: "₹1.5 - 2.0 Lakhs / year",
    duration: "5 Years + 2 Yrs Internship",
    flag: "🇪🇬",
    highlights: ["European Standard System", "English Medium MBBS", "NMC and WHO Approved", "Historical & Rich Culture"],
    path: "/contact?service=mbbs-abroad&country=Egypt",
    hasDetails: false
  },
  {
    code: "us",
    name: "USA",
    category: "study-abroad",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format&fit=crop",
    tuition: "$20,000 - $55,000 / year",
    livingCost: "$12,000 - $18,000 / year",
    duration: "3-4 Years (UG) / 2 Yrs (PG)",
    flag: "🇺🇸",
    highlights: ["World's Top Rank Universities", "STEM OPT Extension (3 Yrs)", "High Return on Investment", "Global Networking Options"],
    path: "/contact?service=study-abroad&country=USA",
    hasDetails: false
  },
  {
    code: "gb",
    name: "United Kingdom",
    category: "study-abroad",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
    tuition: "£12,000 - £38,000 / year",
    livingCost: "£9,000 - £12,000 / year",
    duration: "3 Years (UG) / 1 Yr (PG)",
    flag: "🇬🇧",
    highlights: ["2-Year Post-Study Work Visa", "Shorter Course Durations", "Russell Group Universities", "Rich Academic History"],
    path: "/contact?service=study-abroad&country=UK",
    hasDetails: false
  },
  {
    code: "ca",
    name: "Canada",
    category: "study-abroad",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600&auto=format&fit=crop",
    tuition: "CAD 15,000 - 35,000 / year",
    livingCost: "CAD 10,000 - 15,000 / year",
    duration: "2-4 Years",
    flag: "🇨🇦",
    highlights: ["3-Year Post-Grad Work Permit", "Easy Pathway to PR status", "High Quality of Living", "Co-op Programs Available"],
    path: "/contact?service=study-abroad&country=Canada",
    hasDetails: false
  },
  {
    code: "de",
    name: "Germany",
    category: "study-abroad",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop",
    tuition: "Free to €20,000 / year",
    livingCost: "€10,000 - €12,000 / year",
    duration: "3 Years (UG) / 2 Yrs (PG)",
    flag: "🇩🇪",
    highlights: ["Zero Tuition in Public Uni", "18-Month Job Seeking Visa", "Europe's Strongest Economy", "High Industrial Integration"],
    path: "/contact?service=study-abroad&country=Germany",
    hasDetails: false
  },
  {
    code: "au",
    name: "Australia",
    category: "study-abroad",
    image: "https://images.unsplash.com/photo-1523482596682-0cd210ee7f5a?q=80&w=600&auto=format&fit=crop",
    tuition: "AUD 20,000 - 45,000 / year",
    livingCost: "AUD 12,000 - 18,000 / year",
    duration: "2-4 Years",
    flag: "🇦🇺",
    highlights: ["Up to 4 Years Post-Study Work", "Top Ranked Group of 8", "Stunning Cities & Climate", "Part-Time Work Allowances"],
    path: "/contact?service=study-abroad&country=Australia",
    hasDetails: false
  }
];

export default function CountriesPage() {
  const { content } = useContent();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "mbbs" | "study-abroad">("all");

  useEffect(() => {
    const s = searchParams.get("search") || "";
    const t = searchParams.get("tab") || "all";
    setSearchQuery(s);
    setActiveTab((t === "mbbs" || t === "study-abroad") ? t : "all");
  }, [searchParams]);

  const filteredCountries = countriesList.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || country.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const countriesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Global Study Destinations Directory",
    "description": "Explore study abroad options for MBBS, Engineering, and Business in Russia, Georgia, Kazakhstan, Kyrgyzstan, USA, UK, Canada, and Germany.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    },
    "areaServed": "IN"
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Study Abroad Destinations - Global Medical & Academic Programs"
        description="Explore top destinations for MBBS & General Study Abroad. Detailed guides for Russia, Georgia, and guidance for USA, UK, Canada, Germany, and Kazakhstan."
        path="/countries"
        schema={countriesSchema}
      />
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white md:py-28">
        {/* Background Gradients & Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.6),rgba(15,23,42,0.95))]" />
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Globe className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              World-Class Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl font-black tracking-tight sm:text-6xl text-white mb-6 leading-tight"
          >
            Choose Your Study <span className="text-red-500">Destination</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
          >
            Find details on tuition fees, living costs, and universities for top MBBS and global academic programs. Get expert guidance and seamless admissions.
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by country name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 pl-12 pr-4 py-6 rounded-full text-base focus:border-red-500 focus:ring-red-500 shadow-lg backdrop-blur-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Countries Grid and Filter Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Tabs Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: "all", label: "All Destinations" },
              { id: "mbbs", label: "MBBS Abroad" },
              { id: "study-abroad", label: "Global Study Abroad" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm border ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white border-red-600 shadow-red-500/25"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Countries Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCountries.map((c) => (
                <motion.div
                  key={c.code}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-red-500/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Card Banner Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    {/* Floating Info Tag */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
                        c.category === "mbbs" ? "bg-red-600" : "bg-blue-600"
                      }`}>
                        {c.category === "mbbs" ? "🩺 MBBS" : "🎓 Study Abroad"}
                      </span>
                      {c.hasDetails && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm bg-emerald-600 text-white flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Info Ready
                        </span>
                      )}
                    </div>

                    {/* Flag & Title at Bottom of Image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{c.flag}</span>
                        <h3 className="text-2xl font-black text-white leading-none">
                          {c.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Content details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                      {/* Grid Stats */}
                      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tuition Fees</span>
                            <span className="text-xs font-bold text-slate-700">{c.tuition}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Duration</span>
                            <span className="text-xs font-bold text-slate-700">{c.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights Bullet List */}
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Key Highlights</h4>
                        <ul className="space-y-2">
                          {c.highlights.map((hl) => (
                            <li key={hl} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span className="truncate">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Redirect Button */}
                    <div className="mt-8 pt-4 border-t border-slate-100">
                      <Button
                        asChild
                        className={`w-full font-bold rounded-xl transition-all duration-300 py-5 ${
                          c.hasDetails 
                            ? "bg-slate-950 text-white hover:bg-red-600" 
                            : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <Link to={c.path} className="flex items-center justify-center gap-1">
                          {c.hasDetails ? "Explore Programs" : "Request Consultation"}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredCountries.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No countries found</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  We couldn't find any countries matching "{searchQuery}". Try searching for another destination like Russia or Germany.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Global Guidance/Process Section */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="text-xs font-bold uppercase text-red-500 tracking-wider bg-red-50 px-3.5 py-1.5 rounded-full">
            Our Enrollment Process
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-12">
            Your Steps to Study Abroad
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Free Counselling", desc: "Speak to our admissions experts to align your scores, budget, and dreams with matching countries." },
              { step: "02", title: "University Select", desc: "Shortlist WHO/NMC recognized or world-ranking campuses meeting your profile needs." },
              { step: "03", title: "Admission & Visa", desc: "Get end-to-end assistance on applications, recommendation letters, visa filing, and travel." }
            ].map((p, idx) => (
              <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left shadow-sm relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
                <span className="text-5xl font-black text-slate-200/60 absolute right-4 top-2 select-none group-hover:text-red-500/10 transition-colors">
                  {p.step}
                </span>
                <h3 className="text-lg font-black text-slate-800 mb-3">{p.title}</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Inquiry CTA Banner */}
      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-3xl font-black text-slate-900 mb-4">
            Still Confused About Your Destination?
          </h2>
          <p className="text-slate-600 font-medium max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Get absolute clarity from our expert academic advisors. We will help you select the ideal university, calculate your budget, and complete the enrollment seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-xl shadow-md shadow-red-500/20">
              <Link to="/contact">Request Free Call</Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-300 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl bg-white">
              <Link to="/about">About IICT</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
}
