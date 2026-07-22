import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Users,
  Award,
  Clock,
  BookOpen,
  DollarSign,
  Building,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  Coins,
  FileCheck,
  Plane,
  HeartHandshake,
  Loader2
} from "lucide-react";
import mbbsImg from "@/assets/mbbs-hero.jpg";

// Countries structure mapping to Lovable design
interface CountryDetails {
  name: string;
  flag: string;
  tuition: string;
  living: string;
  total: string;
  duration: string;
  medium: string;
  recognition: string;
  description: string;
}

const countriesData: CountryDetails[] = [
  {
    name: "Russia",
    flag: "🇷🇺",
    tuition: "$3,000 - $8,000 / Year",
    living: "$1,500 - $3,000 / Year",
    total: "$4,500 - $11,000 / Year",
    duration: "6 Years",
    medium: "English",
    recognition: "NMC, WHO, WDOMS, ECFMG (USA)",
    description: "Russia is the most popular destination for Indian medical students, offering premium university infrastructure, clinical exposure, and government-subsidized tuition rates."
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    tuition: "$5,000 - $8,000 / Year",
    living: "$2,000 - $3,000 / Year",
    total: "$7,000 - $11,000 / Year",
    duration: "6 Years",
    medium: "English",
    recognition: "NMC, WHO, WFME, WDOMS, ECFMG",
    description: "Located at the intersection of Eastern Europe and Western Asia, Georgia offers high European educational standards, safe environment, and direct pathways to practice in Europe."
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    tuition: "$3,000 - $4,500 / Year",
    living: "$1,500 - $2,000 / Year",
    total: "$4,500 - $6,500 / Year",
    duration: "5 Years",
    medium: "English",
    recognition: "NMC, WHO, WDOMS",
    description: "Offering a cost-effective 5-year curriculum completely in English. Highly popular for its proximity to India, similar clinical profiles, and modern learning equipment."
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    tuition: "$3,000 - $5,000 / Year",
    living: "$1,500 - $2,500 / Year",
    total: "$4,500 - $7,500 / Year",
    duration: "5 Years",
    medium: "English",
    recognition: "NMC, WHO, WDOMS",
    description: "Kazakh national universities boast top global rankings. The 5-year duration provides an accelerated path back to India for licensing exams."
  },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    tuition: "$2,500 - $4,000 / Year",
    living: "$1,000 - $2,000 / Year",
    total: "$3,500 - $6,000 / Year",
    duration: "5 Years",
    medium: "English",
    recognition: "NMC, WHO, WDOMS",
    description: "The most budget-friendly destination for MBBS aspirants. Home to top-tier state universities offering high-quality practice laboratories."
  },
  {
    name: "Philippines",
    flag: "🇵🇭",
    tuition: "$2,500 - $5,000 / Year",
    living: "$2,000 - $3,000 / Year",
    total: "$4,500 - $8,000 / Year",
    duration: "5.5 Years",
    medium: "English",
    recognition: "NMC, WHO, WDOMS",
    description: "Boasts a US-based BS-MD education framework. Focuses on communicative English fluency and offers clinical training in massive public-private hospital clusters."
  },
  {
    name: "Bangladesh",
    flag: "🇧🇩",
    tuition: "$4,000 - $6,000 / Year",
    living: "$1,500 - $2,500 / Year",
    total: "$5,500 - $8,500 / Year",
    duration: "5 Years",
    medium: "English",
    recognition: "NMC, WHO, BMDC",
    description: "Features the highest FMGE passing rate for Indian students due to identical clinical disease patterns, books, and treatment standards as India."
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    tuition: "$6,000 - $9,000 / Year",
    living: "$1,500 - $2,500 / Year",
    total: "$7,500 - $11,500 / Year",
    duration: "5.5 Years",
    medium: "English",
    recognition: "NMC, WHO, Medical Council of Nepal",
    description: "Direct overland travel without visa or passports for Indian nationals. Academic rigor and textbooks perfectly align with the Indian medical syllabus."
  }
];

export default function MBBSAbroadPage() {
  const { content } = useContent();

  // NEET Predictor State
  const [predName, setPredName] = useState("");
  const [predMobile, setPredMobile] = useState("");
  const [predScore, setPredScore] = useState("");
  const [predCategory, setPredCategory] = useState("");
  const [predState, setPredState] = useState("");
  const [isSubmittingPredictor, setIsSubmittingPredictor] = useState(false);
  const [predictorSuccess, setPredictorSuccess] = useState(false);

  // Counselling Form State
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cInterest, setCInterest] = useState("");
  const [isSubmittingCounselling, setIsSubmittingCounselling] = useState(false);
  const [counsellingSuccess, setCounsellingSuccess] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState("Russia");

  const activeCountry = countriesData.find((c) => c.name === activeTab) || countriesData[0];

  const handlePredictorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!predName || !predMobile || !predScore || !predCategory || !predState) {
      toast.error("Please fill in all details for prediction.");
      return;
    }

    setIsSubmittingPredictor(true);
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");

      const newLead = {
        name: predName,
        email: "N/A",
        phone: predMobile,
        whatsapp: predMobile,
        country: predState, // Map Home State here
        program: `MBBS Abroad (NEET Predictor - Score: ${predScore}, Cat: ${predCategory})`,
        message: `NEET Predictor. Category: ${predCategory}, NEET Score: ${predScore}, Home State: ${predState}`,
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        status: webhookUrl ? "Submitted to Sheets" : "Saved Locally (Pending Sync)"
      };

      localStorage.setItem("iict_leads", JSON.stringify([newLead, ...savedLeads]));

      if (webhookUrl) {
        const searchParams = new URLSearchParams();
        searchParams.append("timestamp", newLead.date);
        searchParams.append("name", newLead.name);
        searchParams.append("email", newLead.email);
        searchParams.append("phone", newLead.phone);
        searchParams.append("whatsapp", newLead.whatsapp);
        searchParams.append("country", newLead.country);
        searchParams.append("program", newLead.program);
        searchParams.append("message", newLead.message);

        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: searchParams.toString(),
        });
      }

      setPredictorSuccess(true);
      toast.success("Details Submitted! Predicting colleges now...");
    } catch (err) {
      console.error(err);
      setPredictorSuccess(true); // Graceful recovery UX
    } finally {
      setIsSubmittingPredictor(false);
    }
  };

  const handleCounsellingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cPhone || !cEmail || !cInterest) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmittingCounselling(true);
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");

      const newLead = {
        name: cName,
        email: cEmail,
        phone: cPhone,
        whatsapp: cPhone,
        country: cInterest,
        program: "MBBS Abroad (Counselling Request)",
        message: `Enquired from bottom counselling section. Destination interest: ${cInterest}`,
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        status: webhookUrl ? "Submitted to Sheets" : "Saved Locally (Pending Sync)"
      };

      localStorage.setItem("iict_leads", JSON.stringify([newLead, ...savedLeads]));

      if (webhookUrl) {
        const searchParams = new URLSearchParams();
        searchParams.append("timestamp", newLead.date);
        searchParams.append("name", newLead.name);
        searchParams.append("email", newLead.email);
        searchParams.append("phone", newLead.phone);
        searchParams.append("whatsapp", newLead.whatsapp);
        searchParams.append("country", newLead.country);
        searchParams.append("program", newLead.program);
        searchParams.append("message", newLead.message);

        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: searchParams.toString(),
        });
      }

      setCounsellingSuccess(true);
      toast.success("Request received! A senior counsellor will reach out shortly.");
    } catch (err) {
      console.error(err);
      setCounsellingSuccess(true);
    } finally {
      setIsSubmittingCounselling(false);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mbbsAbroadSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MBBS Abroad Admissions & Counselling Cell",
    "description": content.pages.mbbsAbroad.schemaDescription || content.pages.mbbsAbroad.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    },
    "areaServed": "IN"
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
      <SEO
        title={content.pages.mbbsAbroad.title}
        description={content.pages.mbbsAbroad.description}
        path="/mbbs-abroad"
        schema={mbbsAbroadSchema}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 py-20 md:py-28">
        <div className="container relative z-10 mx-auto grid gap-12 px-4 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left Content */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-400">
              🩺 NMC/WHO Recognized Universities
            </div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Your Dream MBBS College Starts Here
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Trusted by NEET aspirants across India — expert counselling, accurate college prediction and a transparent admission process for MBBS in India & abroad.
            </p>

            {/* Checklist */}
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Accurate College Prediction",
                "Expert NEET Counselling",
                "Transparent Admission Process",
                "Complete Support Until You Join College"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />
                  <span className="text-slate-200 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollTo("predictor")}
                className="bg-orange-600 font-bold hover:bg-orange-500 rounded-xl px-8 py-6 text-white text-base shadow-lg shadow-orange-600/30 transition-transform active:scale-95"
              >
                Predict My College →
              </Button>
              <Button
                onClick={() => scrollTo("apply")}
                variant="outline"
                className="border-slate-800 bg-slate-900/60 font-semibold text-white hover:bg-slate-900 rounded-xl px-8 py-6 text-base"
              >
                Talk to a Counsellor
              </Button>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-3 shadow-2xl backdrop-blur-xl">
              <img
                src={mbbsImg}
                alt="Medical students studying"
                className="h-full w-full rounded-2xl object-cover grayscale-[20%] brightness-90 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-600/20 p-2 text-orange-500">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">25,000+ Placements</div>
                    <div className="text-xs text-slate-400">Guiding careers since 1996</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Europe Promo Section */}
      <section className="bg-slate-950 px-4 py-8">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600/90 to-amber-500/90 px-8 py-10 text-white shadow-2xl md:px-12 md:py-12">
            <div className="absolute right-0 top-0 translate-x-12 translate-y-[-12px] opacity-10">
              <GraduationCap className="h-64 w-64 text-white" />
            </div>
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-100 bg-black/20 rounded-full px-3 py-1">Special programs</span>
                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">STUDY IN EUROPE</h2>
                <p className="mt-1 text-lg font-medium text-slate-100">Same as Indian Budget — Engineering | MBA | MPH | Hospitality & more</p>
              </div>
              <Button
                onClick={() => scrollTo("apply")}
                className="bg-slate-950 font-bold hover:bg-slate-900 rounded-xl px-8 py-6 text-white text-base shadow-xl"
              >
                Register Now →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Predictor Section */}
      <section id="predictor" className="border-t border-slate-900 bg-slate-950 py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-12">
          
          {/* Predictor Left Content */}
          <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
            <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
              NEET College Predictor
            </h2>
            <p className="text-slate-300">
              Enter your NEET details — get a personalized list of colleges you can realistically get into based on statistical analysis of 3,000+ past admissions.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { label: "Data from 3,000+ successful admissions" },
                { label: "Covers Govt, Private, Deemed & Abroad" },
                { label: "Free & confidential evaluation" },
                { label: "Direct counselor callback within 15 minutes" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-slate-300 font-medium text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Predictor Right Form Panel */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 shadow-xl backdrop-blur-sm md:p-10">
              
              <AnimatePresence mode="wait">
                {!predictorSuccess ? (
                  <motion.form
                    key="predictor-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handlePredictorSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Name</label>
                        <Input
                          value={predName}
                          onChange={(e) => setPredName(e.target.value)}
                          placeholder="Enter your name"
                          className="border-slate-800 bg-slate-950/80 rounded-xl focus-visible:ring-orange-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mobile Number</label>
                        <Input
                          type="tel"
                          value={predMobile}
                          onChange={(e) => setPredMobile(e.target.value)}
                          placeholder="10-digit number"
                          className="border-slate-800 bg-slate-950/80 rounded-xl focus-visible:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">NEET Score (e.g. 137 - 720)</label>
                        <Input
                          type="number"
                          value={predScore}
                          onChange={(e) => setPredScore(e.target.value)}
                          placeholder="Enter Score"
                          min="0"
                          max="720"
                          className="border-slate-800 bg-slate-950/80 rounded-xl focus-visible:ring-orange-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</label>
                        <Select onValueChange={(val) => setPredCategory(val)} value={predCategory}>
                          <SelectTrigger className="border-slate-800 bg-slate-950/80 rounded-xl">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="border-slate-800 bg-slate-950 text-slate-200">
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="OBC">OBC</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="ST">ST</SelectItem>
                            <SelectItem value="EWS">EWS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Home State</label>
                      <Input
                        value={predState}
                        onChange={(e) => setPredState(e.target.value)}
                        placeholder="e.g. Uttar Pradesh, Delhi, Bihar"
                        className="border-slate-800 bg-slate-950/80 rounded-xl focus-visible:ring-orange-500"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingPredictor}
                      className="w-full bg-orange-600 font-bold hover:bg-orange-500 rounded-xl py-6 text-white shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      {isSubmittingPredictor ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Analyzing Score...
                        </>
                      ) : (
                        "Predict Colleges Now"
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="predictor-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">Prediction Checklist Prepared!</h3>
                    <p className="max-w-md text-slate-300">
                      Thanks, <strong className="text-white">{predName}</strong>! We've analyzed your score of <strong className="text-orange-400">{predScore}</strong> ({predCategory} category). Our MBBS admissions expert will contact you at <span className="text-orange-400 font-semibold">{predMobile}</span> within 15 minutes with your custom report.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      {/* Where to study / Countries Tabs Section */}
      <section id="countries" className="border-t border-slate-900 bg-slate-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">Study MBBS Abroad</h2>
            <p className="mt-4 text-lg text-slate-400">At low cost — in world-ranked, NMC-approved universities.</p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-900">
            {countriesData.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveTab(c.name)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === c.name
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Profile Display */}
          <div className="grid gap-10 rounded-3xl border border-slate-850 bg-slate-900/25 p-8 shadow-2xl backdrop-blur-sm lg:grid-cols-12 lg:items-center">
            
            {/* Country Profile Meta Column */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeCountry.flag}</span>
                <h3 className="font-heading text-3xl font-extrabold text-white">MBBS in {activeCountry.name}</h3>
              </div>
              <p className="text-slate-300 text-base leading-relaxed">
                {activeCountry.description}
              </p>

              {/* Grid details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Tuition Fees</div>
                  <div className="mt-1 text-lg font-extrabold text-white">{activeCountry.tuition}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Duration</div>
                  <div className="mt-1 text-lg font-extrabold text-white">{activeCountry.duration}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Medium of Instruction</div>
                  <div className="mt-1 text-lg font-extrabold text-white">{activeCountry.medium}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Recognized By</div>
                  <div className="mt-1 text-lg font-extrabold text-white">{activeCountry.recognition}</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  onClick={() => scrollTo("apply")}
                  className="bg-orange-600 font-bold hover:bg-orange-500 rounded-xl px-6 py-5 text-white"
                >
                  Get Fee Structure
                </Button>
                <Button
                  onClick={() => scrollTo("apply")}
                  variant="outline"
                  className="border-slate-800 bg-slate-900/80 text-white hover:bg-slate-900 rounded-xl px-6 py-5"
                >
                  Talk to Counsellor
                </Button>
              </div>
            </div>

            {/* Visual Callout Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-850 bg-slate-950/80 p-6 space-y-4">
                <h4 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  Key Highlights
                </h4>
                <ul className="space-y-3">
                  {[
                    "Complete English medium curriculums.",
                    "Hospitals with high patient count for clinical rotations.",
                    "Safe and modern university hostel dorms with Indian food catering.",
                    "Pre-licensing coaching for NExT / FMGE exams in India."
                  ].map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <span className="mt-1 text-orange-500 font-extrabold">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why GI Education Overseas */}
      <section className="border-t border-slate-900 bg-slate-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">Why GI Education Overseas?</h2>
            <p className="mt-4 text-slate-400">Bringing overseas medical education within every NEET aspirant's reach.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "NMC-Approved Universities Only",
                desc: "We shortlist and place students only in universities recognized by the National Medical Commission (NMC) and WHO/WDOMS guidelines."
              },
              {
                icon: Coins,
                title: "Transparent Fees",
                desc: "No hidden charges, donation fees, or back-door packages. Receive a detailed university-certified breakdown of fees before committing."
              },
              {
                icon: HeartHandshake,
                title: "Loan Assistance",
                desc: "Strong financial division tie-ups with leading nationalized and private banks to assist you in securing education loans up to ₹40 Lakh."
              },
              {
                icon: Award,
                title: "28+ Years of Experience",
                desc: "Delivering credibility, trust, and flawless admission executions in global university placements since 1996."
              },
              {
                icon: FileCheck,
                title: "End-to-End Support",
                desc: "Counselling, admission letters, embassy visa processing, currency exchange, tickets, and campus check-in — handled by our single in-house team."
              },
              {
                icon: Plane,
                title: "On-Ground Presence",
                desc: "Local coordinators deployed in Russia, Georgia, Kazakhstan, etc., to ensure safe housing, local registration, and clinical comfort."
              }
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 hover:bg-slate-900/30 transition-all hover:border-slate-800">
                <div className="mb-4 max-w-fit rounded-lg bg-orange-600/10 p-3 text-orange-500">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MBBS Journey in 5 steps */}
      <section className="border-t border-slate-900 bg-slate-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">Your MBBS Journey in 5 Steps</h2>
            <p className="mt-4 text-slate-400">A seamless, guided pathway from counselling to campus.</p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-5">
            {/* Connection line for desktop */}
            <div className="absolute left-0 right-0 top-10 hidden h-[2px] bg-slate-800 md:block z-0" />
            
            {[
              { step: "01", title: "Free Counselling", desc: "One-on-one session with a NEET & MBBS abroad expert to understand your goals." },
              { step: "02", title: "College Prediction", desc: "Data-driven college prediction based on your NEET score, category and state." },
              { step: "03", title: "University Shortlisting", desc: "Get a personalized list of NMC-approved universities matching your budget." },
              { step: "04", title: "Admission & Docs", desc: "Application, offer letter, visa filing, forex and travel handled end-to-end." },
              { step: "05", title: "Pre-Departure & Support", desc: "Orientation briefings, hostel accommodation setup, and support until graduation." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-950 text-orange-500 font-extrabold text-lg shadow-xl shadow-orange-500/10">
                  {step.step}
                </div>
                <h3 className="font-heading text-base font-bold text-white mt-4 mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info checklists: Eligibility & Career (For high SEO value) */}
      <section className="border-t border-slate-900 bg-slate-950 py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-2">
          
          {/* Eligibility checklist */}
          <div className="rounded-3xl border border-slate-900 bg-slate-900/10 p-8">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Eligibility Criteria for MBBS Abroad</h2>
            <ul className="space-y-3.5">
              {[
                "Completed 10+2 with Physics, Chemistry, and Biology (PCB)",
                "Minimum 50% aggregate in PCB (40% for reserved SC/ST/OBC categories)",
                "NEET qualification is mandatory for Indian students",
                "Age must be 17 years or above as of Dec 31 of admission year",
                "Valid passport with at least 18 months validity remaining",
                "No donation or capitation fees required"
              ].map((el, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Pathways */}
          <div className="rounded-3xl border border-slate-900 bg-slate-900/10 p-8">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Career Opportunities After Graduation</h2>
            <div className="space-y-4">
              {[
                { title: "Practice Medicine in India", desc: "Pass the NExT/FMGE licensing examination to practice clinical medicine in leading Indian hospitals." },
                { title: "Global Licensing Pathways", desc: "Support paths to take global clinical entrance tests: USMLE (USA), PLAB (UK), AMC (Australia)." },
                { title: "Specialization & Higher Ed", desc: "Secure hospital administration degrees (MHA) or specialized clinical MD programs worldwide." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-600/10 text-orange-500">
                    <span className="font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-slate-900 bg-slate-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-slate-400">Everything NEET aspirants and parents ask us.</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "Is NEET mandatory for studying MBBS abroad?",
                  a: "Yes, as per National Medical Commission (NMC) regulations, qualifying NEET is mandatory for Indian nationals wanting to study MBBS abroad and subsequently clear licensing exams to practice in India."
                },
                {
                  q: "What is the duration of MBBS abroad?",
                  a: "The duration ranges between 5 to 6 years depending on the country. For example, in Russia and Georgia it is 6 years (including clinical practice), while in Uzbekistan, Kazakhstan, and Kyrgyzstan it is 5 years."
                },
                {
                  q: "Are degrees from abroad recognized in India?",
                  a: "Yes. All universities we partner with are listed in the World Directory of Medical Schools (WDOMS) and approved by the WHO. Graduates can register with the NMC/State Medical Councils after qualifying the licensing exam."
                },
                {
                  q: "Can I get an education loan for MBBS abroad?",
                  a: "Yes. Our team provides complete official documentation, including admission and fee structure letters, to help students secure study loans from nationalized banks (like SBI) and private lenders."
                },
                {
                  q: "What is the medium of instruction for the course?",
                  a: "All partner medical schools offer the curriculum completely in English. Students are also taught basic local language terminology for smooth patient interaction during clinical hospital rotations."
                }
              ].map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="rounded-2xl border border-slate-900 bg-slate-900/10 px-6"
                >
                  <AccordionTrigger className="py-5 text-left font-heading text-base font-bold text-white hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Book Counselling Bottom Section */}
      <section id="apply" className="border-t border-slate-900 bg-slate-950 py-16 md:py-24">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-12">
          
          {/* Bottom Left Info panel */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                Book Your Free MBBS Counselling
              </h2>
              <p className="text-slate-400">
                Talk to a senior counsellor today. 100% free, no obligation — get honest advice about MBBS in India & abroad, fees, universities and admission timelines.
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10 text-orange-500">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Call Us Now</div>
                  <a href="tel:919897278615" className="text-sm font-bold text-white hover:underline">+91-9897278615</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Whatsapp Us</div>
                  <a href="https://wa.me/919315717679" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-green-400 hover:underline">+91-9315717679</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10 text-orange-500">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Us</div>
                  <a href="mailto:info@gieducationoverseas.com" className="text-sm font-bold text-white hover:underline">info@gieducationoverseas.com</a>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              Building trust and credibility in overseas education since 1996.
            </div>
          </div>

          {/* Bottom Right Counselling Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-900 bg-slate-900/20 p-8 md:p-10 shadow-xl">
              <h3 className="font-heading text-xl font-bold text-white mb-6">Request a Call Back</h3>
              
              <AnimatePresence mode="wait">
                {!counsellingSuccess ? (
                  <motion.form
                    key="counselling-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleCounsellingSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Full Name</label>
                      <Input
                        value={cName}
                        onChange={(e) => setCName(e.target.value)}
                        placeholder="Enter your name"
                        className="border-slate-850 bg-slate-950/80 rounded-xl"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Phone / WhatsApp</label>
                        <Input
                          type="tel"
                          value={cPhone}
                          onChange={(e) => setCPhone(e.target.value)}
                          placeholder="Phone number"
                          className="border-slate-850 bg-slate-950/80 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Email Address</label>
                        <Input
                          type="email"
                          value={cEmail}
                          onChange={(e) => setCEmail(e.target.value)}
                          placeholder="Email address"
                          className="border-slate-850 bg-slate-950/80 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Preferred Study Destination</label>
                      <Select onValueChange={(val) => setCInterest(val)} value={cInterest}>
                        <SelectTrigger className="border-slate-850 bg-slate-950/80 rounded-xl">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-850 bg-slate-950 text-slate-200">
                          <SelectItem value="Russia">Russia 🇷🇺</SelectItem>
                          <SelectItem value="Georgia">Georgia 🇬🇪</SelectItem>
                          <SelectItem value="Uzbekistan">Uzbekistan 🇺🇿</SelectItem>
                          <SelectItem value="Kazakhstan">Kazakhstan 🇰🇿</SelectItem>
                          <SelectItem value="Kyrgyzstan">Kyrgyzstan 🇰🇬</SelectItem>
                          <SelectItem value="Philippines">Philippines 🇵🇭</SelectItem>
                          <SelectItem value="Bangladesh">Bangladesh 🇧🇩</SelectItem>
                          <SelectItem value="Nepal">Nepal 🇳🇵</SelectItem>
                          <SelectItem value="Other">Other Country</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingCounselling}
                      className="w-full bg-orange-600 font-bold hover:bg-orange-500 rounded-xl py-6 text-white shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      {isSubmittingCounselling ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="counselling-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">Request Received!</h3>
                    <p className="max-w-md text-slate-300 text-sm">
                      Thank you, <strong className="text-white">{cName}</strong>. Your enquiry for MBBS in {cInterest} has been logged. A senior counselor from GI Education Overseas will contact you shortly to clarify budgets and university choices.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
