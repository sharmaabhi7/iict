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
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import cplImg from "@/assets/cpl-hero.jpg";
import { Users, Globe, Plane, Award, ClipboardList, BookOpen, Send, FileCheck, Stamp, CloudSun, DollarSign, Building2 } from "lucide-react";
import { SEO } from "@/components/shared/SEO";

import { useContent } from "@/contexts/ContentContext";

const stats = [
  { icon: Users, value: "2,500+", label: "Pilots Trained" },
  { icon: Globe, value: "8+", label: "Training Countries" },
  { icon: Plane, value: "200+", label: "Flight Hours Avg" },
  { icon: Award, value: "DGCA", label: "License Conversion" },
];

const countries = [
  { name: "USA", emoji: "🇺🇸" }, { name: "Canada", emoji: "🇨🇦" }, { name: "Australia", emoji: "🇦🇺" },
  { name: "South Africa", emoji: "🇿🇦" }, { name: "Philippines", emoji: "🇵🇭" }, { name: "New Zealand", emoji: "🇳🇿" },
];

const fees = [
  { country: "USA", tuition: "$50,000 - $80,000", living: "$12,000 - $18,000", total: "$62,000 - $98,000" },
  { country: "Canada", tuition: "CAD 55,000 - 75,000", living: "CAD 10,000 - 15,000", total: "CAD 65,000 - 90,000" },
  { country: "South Africa", tuition: "$25,000 - $40,000", living: "$5,000 - $8,000", total: "$30,000 - $48,000" },
  { country: "Philippines", tuition: "$30,000 - $45,000", living: "$4,000 - $6,000", total: "$34,000 - $51,000" },
  { country: "Australia", tuition: "AUD 60,000 - 90,000", living: "AUD 12,000 - $18,000", total: "AUD 72,000 - 108,000" },
  { country: "New Zealand", tuition: "NZD 50,000 - 70,000", living: "NZD 12,000 - 16,000", total: "NZD 62,000 - 86,000" },
];

const eligibility = [
  "Minimum age: 17 years for PPL, 18 years for CPL",
  "10+2 pass with Physics and Mathematics",
  "DGCA Class 1 Medical Certificate",
  "English proficiency: ICAO Level 4 or above",
  "Valid passport with minimum 2 years validity",
  "Clear vision (can be corrected with glasses up to ±2)",
  "No criminal record or history of substance abuse",
  "Minimum 200 flight hours required for CPL (varies by country)",
];

const steps = [
  { icon: ClipboardList, title: "Free Assessment", desc: "Evaluate your eligibility, medical fitness, and budget for CPL training abroad." },
  { icon: BookOpen, title: "Select Academy", desc: "Choose from DGCA-approved flight schools with highest placement rates." },
  { icon: Send, title: "Apply & Enroll", desc: "Complete documentation and enrollment at the selected flight academy." },
  { icon: FileCheck, title: "Medical & Visa", desc: "DGCA Class 1 medical and student visa processing." },
  { icon: CloudSun, title: "Flight Training", desc: "12-18 months of ground school + flight training totaling 200+ hours." },
  { icon: Plane, title: "License & Placement", desc: "Obtain CPL, convert to DGCA license, and airline placement support." },
];

const partners = [
  { name: "ATP Flight School" }, { name: "CAE Oxford" }, { name: "Sling Pilot Academy" },
  { name: "Philippine Academy" }, { name: "Airways Aviation" }, { name: "L3Harris" },
  { name: "Flight Training Adelaide" }, { name: "Ardmore Flying School" },
  { name: "Moncton Flight College" }, { name: "Airline Transport Academy" },
  { name: "Pan Am International" }, { name: "Phoenix East Aviation" },
];

const careers = [
  { icon: Plane, title: "Airline Pilot", desc: "Fly for domestic and international airlines. Starting salary ₹12-25 LPA in India." },
  { icon: Building2, title: "Corporate Aviation", desc: "Fly private jets for corporates. Premium salaries and lifestyle." },
  { icon: DollarSign, title: "International Opportunities", desc: "CPL holders can work globally — Middle East airlines offer $5,000-$15,000/month." },
];

const caseStudy = {
  name: "Aryan Malhotra", country: "South Africa", program: "CPL Training",
  background: "12th with PCM from Delhi Public School. Passionate about aviation since childhood.",
  problem: "CPL training in India was extremely expensive (₹40-60L). Limited slots and long waiting periods.",
  solution: "Recommended South Africa for cost-effective training. Enrolled at Sling Pilot Academy. Handled visa and accommodation.",
  result: "Completed CPL in 14 months with 210 flight hours. DGCA license converted. Now flying for IndiGo Airlines.",
};

export default function CPLTrainingPage() {
  const { content } = useContent();

  const cplTrainingSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Commercial Pilot License (CPL) Training",
    "description": content.pages.cplTraining.schemaDescription || content.pages.cplTraining.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={content.pages.cplTraining.title}
        description={content.pages.cplTraining.description}
        path="/cpl-training"
        schema={cplTrainingSchema}
      />
      <Navbar />
      <PageHero
        badge="✈️ Become a Commercial Pilot"
        title="CPL Training Abroad —"
        highlight="Fly Your Dreams"
        subtitle="World-class commercial pilot training at DGCA-approved flight academies. Faster completion, lower costs, and global career opportunities."
        image={cplImg}
        imageAlt="Pilot trainee with aircraft"
      />
      <StatsBar stats={stats} />

      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">Top CPL Training Destinations</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <span className="text-3xl">{c.emoji}</span>
                <span className="font-heading text-sm font-bold text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeesTable title="CPL Training Fees" rows={fees} subtitle="Total program fees — training duration 12-18 months." />
      <EligibilitySection criteria={eligibility} />
      <ProcessSteps title="CPL Training Process" steps={steps} subtitle="From assessment to airline cockpit — a clear pathway." />
      <UniversityPartners partners={partners} title="Partner Flight Academies" />
      <CareerScope title="Career After CPL" items={careers} subtitle="A CPL opens doors to one of the most exciting careers in the world." />
      <TestimonialsSection />

      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">Featured Case Study</h2>
          <div className="mx-auto max-w-2xl"><CaseStudyCard study={caseStudy} /></div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
