import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { StatsBar } from "@/components/shared/StatsBar";
import { FeesTable } from "@/components/shared/FeesTable";
import { EligibilitySection } from "@/components/shared/EligibilitySection";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { UniversityPartners } from "@/components/shared/UniversityPartners";
import { CareerScope } from "@/components/shared/CareerScope";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTABanner } from "@/components/CTABanner";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import heroImg from "@/assets/hero-students.jpg";
import officeImg from "@/assets/office.jpg";
import { Users, Globe, Building2, Award, MapPin, BookOpen, Send, Mail, Stamp, Plane, Briefcase, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "150,000+", label: "Students Placed" },
  { icon: Globe, value: "60+", label: "Countries" },
  { icon: Building2, value: "800+", label: "Partner Universities" },
  { icon: Award, value: "98.5%", label: "Visa Success Rate" },
];

const countries = [
  { name: "USA", emoji: "🇺🇸" }, { name: "UK", emoji: "🇬🇧" }, { name: "Canada", emoji: "🇨🇦" },
  { name: "Australia", emoji: "🇦🇺" }, { name: "Germany", emoji: "🇩🇪" }, { name: "New Zealand", emoji: "🇳🇿" },
  { name: "Ireland", emoji: "🇮🇪" }, { name: "Singapore", emoji: "🇸🇬" },
];

const fees = [
  { country: "USA", tuition: "$20,000 - $55,000", living: "$12,000 - $18,000", total: "$32,000 - $73,000" },
  { country: "UK", tuition: "£12,000 - £38,000", living: "£9,000 - £12,000", total: "£21,000 - £50,000" },
  { country: "Canada", tuition: "CAD 15,000 - 35,000", living: "CAD 10,000 - 15,000", total: "CAD 25,000 - 50,000" },
  { country: "Australia", tuition: "AUD 20,000 - 45,000", living: "AUD 12,000 - 18,000", total: "AUD 32,000 - 63,000" },
  { country: "Germany", tuition: "€0 - €20,000", living: "€10,000 - €12,000", total: "€10,000 - €32,000" },
  { country: "New Zealand", tuition: "NZD 22,000 - 35,000", living: "NZD 15,000 - 20,000", total: "NZD 37,000 - 55,000" },
];

const eligibility = [
  "Completed 10+2 or equivalent for undergraduate programs",
  "Bachelor's degree for postgraduate programs",
  "English proficiency: IELTS 6.0+ / TOEFL 80+ / PTE 50+",
  "Minimum GPA of 3.0/4.0 or equivalent (varies by university)",
  "Valid passport with at least 18 months validity",
  "Financial proof — bank statements or education loan sanction",
  "Relevant work experience for MBA/MS programs (recommended)",
  "Strong SOP and letters of recommendation",
];

const steps = [
  { icon: MapPin, title: "Choose Destination", desc: "Select your ideal country based on career goals, budget, and lifestyle preferences." },
  { icon: BookOpen, title: "Select Course", desc: "Match your academic background with the best program across partner universities." },
  { icon: Send, title: "Apply to Universities", desc: "We handle SOP, LOR, resume, and submit applications to 5-8 shortlisted universities." },
  { icon: Mail, title: "Receive Offer Letter", desc: "Accept your preferred university offer and pay the deposit to confirm admission." },
  { icon: Stamp, title: "Visa Application", desc: "Complete documentation, financial proof, and visa interview preparation." },
  { icon: Plane, title: "Pre-Departure & Fly", desc: "Accommodation, forex, travel insurance, and airport guidance." },
];

const partners = [
  { name: "MIT" }, { name: "Stanford" }, { name: "Oxford" }, { name: "Cambridge" },
  { name: "U of Toronto" }, { name: "U of Melbourne" }, { name: "NUS" }, { name: "ETH Zurich" },
  { name: "Imperial College" }, { name: "UC Berkeley" }, { name: "TU Munich" }, { name: "Trinity College" },
];

const careers = [
  { icon: Briefcase, title: "Global Career Access", desc: "Degrees from top universities open doors to employers in 190+ countries." },
  { icon: DollarSign, title: "Higher Earning Potential", desc: "International graduates earn 25-50% more than domestic peers on average." },
  { icon: TrendingUp, title: "Post-Study Work Visas", desc: "Countries like Canada, Australia, and UK offer 1-3 year post-study work permits." },
];

const caseStudy = {
  name: "Sneha Reddy", country: "Canada", program: "MBA",
  background: "B.Com from Osmania University, 4 years at Deloitte. GMAT 680, IELTS 7.0.",
  problem: "Multiple rejections from top Canadian B-schools due to weak extracurriculars section.",
  solution: "Revamped resume highlighting leadership, identified niche MBA programs, and crafted targeted SOP.",
  result: "Admitted to Rotman School of Management, University of Toronto. CAD 15,000 scholarship. Visa approved in 2 weeks.",
};

const gallery = [
  { src: heroImg, alt: "Students abroad", category: "Students" },
  { src: officeImg, alt: "Counselling session", category: "Campus" },
];

export default function StudyAbroadPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHero
        badge="🌍 Study in 60+ Countries"
        title="Your Dream University"
        highlight="Awaits"
        subtitle="Comprehensive guidance for undergraduate, postgraduate, and doctoral programs at 800+ universities worldwide."
        image={heroImg}
        imageAlt="Students studying abroad"
      />
      <StatsBar stats={stats} />

      {/* Countries */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">Popular Destinations</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <span className="text-3xl">{c.emoji}</span>
                <span className="font-heading text-sm font-bold text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeesTable rows={fees} subtitle="Approximate annual costs — varies by university and city." />
      <EligibilitySection criteria={eligibility} />
      <ProcessSteps steps={steps} subtitle="Our proven 6-step process ensures a smooth journey from application to arrival." />
      <UniversityPartners partners={partners} />
      <CareerScope items={careers} subtitle="A degree from a global university transforms your career trajectory." />
      <TestimonialsSection />

      {/* Case Study */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">Featured Case Study</h2>
          <div className="mx-auto max-w-2xl">
            <CaseStudyCard study={caseStudy} />
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
