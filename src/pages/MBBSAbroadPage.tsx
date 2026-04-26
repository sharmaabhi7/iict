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
import mbbsImg from "@/assets/mbbs-hero.jpg";
import { Users, Globe, GraduationCap, Award, ClipboardList, BookOpen, Send, FileCheck, Stamp, Plane, Stethoscope, DollarSign, Building2 } from "lucide-react";

const stats = [
  { icon: Users, value: "25,000+", label: "Medical Students Placed" },
  { icon: Globe, value: "15+", label: "Countries" },
  { icon: GraduationCap, value: "100+", label: "Medical Universities" },
  { icon: Award, value: "WHO/NMC", label: "Recognized" },
];

const countries = [
  { name: "Russia", emoji: "🇷🇺" }, { name: "Philippines", emoji: "🇵🇭" }, { name: "Ukraine", emoji: "🇺🇦" },
  { name: "Georgia", emoji: "🇬🇪" }, { name: "Kazakhstan", emoji: "🇰🇿" }, { name: "Kyrgyzstan", emoji: "🇰🇬" },
  { name: "Bangladesh", emoji: "🇧🇩" }, { name: "Nepal", emoji: "🇳🇵" },
];

const fees = [
  { country: "Russia", tuition: "$3,000 - $8,000", living: "$1,500 - $3,000", total: "$4,500 - $11,000" },
  { country: "Philippines", tuition: "$2,500 - $5,000", living: "$2,000 - $3,000", total: "$4,500 - $8,000" },
  { country: "Georgia", tuition: "$5,000 - $8,000", living: "$2,000 - $3,000", total: "$7,000 - $11,000" },
  { country: "Kazakhstan", tuition: "$3,000 - $5,000", living: "$1,500 - $2,500", total: "$4,500 - $7,500" },
  { country: "Bangladesh", tuition: "$4,000 - $6,000", living: "$1,500 - $2,500", total: "$5,500 - $8,500" },
  { country: "Kyrgyzstan", tuition: "$2,500 - $4,000", living: "$1,000 - $2,000", total: "$3,500 - $6,000" },
];

const eligibility = [
  "Completed 10+2 with Physics, Chemistry, and Biology",
  "Minimum 50% aggregate in PCB (40% for reserved categories)",
  "NEET qualification is mandatory for Indian students",
  "Age: 17 years or above as of December 31 of the admission year",
  "Valid passport with minimum 18 months validity",
  "University must be WHO / NMC (formerly MCI) recognized",
  "No donation or capitation fee required",
  "Medium of instruction: English",
];

const steps = [
  { icon: ClipboardList, title: "Free Counselling", desc: "Understand your profile, NEET score, and budget to recommend best-fit universities." },
  { icon: BookOpen, title: "University Selection", desc: "Shortlist WHO/NMC-recognized universities matching your criteria." },
  { icon: Send, title: "Application & Admission", desc: "Submit application with required documents. Receive admission letter within 1-2 weeks." },
  { icon: FileCheck, title: "Fee Payment", desc: "Pay tuition and hostel fees as per university schedule." },
  { icon: Stamp, title: "Visa Processing", desc: "Complete visa documentation, invitation letter, and embassy appointment." },
  { icon: Plane, title: "Travel & Arrival", desc: "Pre-departure briefing, airport pickup, and university registration assistance." },
];

const partners = [
  { name: "Kazan Federal University" }, { name: "Crimea Federal University" },
  { name: "UV Gullas College" }, { name: "Tbilisi State Medical" },
  { name: "Kazakh National Medical" }, { name: "KSMU Kyrgyzstan" },
  { name: "Dhaka Medical College" }, { name: "Bashkir State Medical" },
  { name: "Rostov State Medical" }, { name: "Osh State University" },
  { name: "AMA Philippines" }, { name: "European University Georgia" },
];

const careers = [
  { icon: Stethoscope, title: "Practice in India", desc: "Clear FMGE/NExT exam to practice medicine in India after completing MBBS abroad." },
  { icon: Building2, title: "Global Medical Practice", desc: "USMLE, PLAB, or AMC pathways for practicing in USA, UK, or Australia." },
  { icon: DollarSign, title: "Competitive Salaries", desc: "MBBS graduates earn ₹8-15 LPA in India; $200K+ abroad after specialization." },
];

const caseStudy = {
  name: "Vikram Singh", country: "Russia", program: "MBBS",
  background: "12th PCB with 88%. NEET score: 480. Could not secure government medical seat in India.",
  problem: "Family worried about quality of education in Russia. Confused between multiple universities.",
  solution: "Counselled family with alumni testimonials. Selected NMC-recognized university. Handled visa end-to-end.",
  result: "Enrolled at Kazan Federal University. Now in 4th year. Preparing for FMGE with 90% mock test scores.",
};

export default function MBBSAbroadPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHero
        badge="🩺 NMC/WHO Recognized Universities"
        title="Study MBBS Abroad —"
        highlight="Affordable & World-Class"
        subtitle="Pursue your dream of becoming a doctor at globally recognized medical universities. No donation. No capitation fee. NEET-based admission."
        image={mbbsImg}
        imageAlt="Medical students in lecture hall"
      />
      <StatsBar stats={stats} />

      {/* Countries */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">Top MBBS Destinations</h2>
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

      <FeesTable title="MBBS Fees Structure" rows={fees} subtitle="Annual fees — total MBBS duration is 5-6 years including internship." />
      <EligibilitySection criteria={eligibility} />
      <ProcessSteps title="MBBS Admission Process" steps={steps} subtitle="A streamlined 6-step process from counselling to campus." />
      <UniversityPartners partners={partners} title="Partner Medical Universities" />
      <CareerScope title="Career After MBBS Abroad" items={careers} subtitle="Multiple pathways to a rewarding medical career." />
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
