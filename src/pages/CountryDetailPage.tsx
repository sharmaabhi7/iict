import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { ConsultationBanner } from "@/components/ConsultationBanner";
import { motion } from "framer-motion";
import { Check, ArrowLeft, School, GraduationCap, Clock, DollarSign, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";

import { useContent } from "@/contexts/ContentContext";

const countryData: Record<string, {
  name: string;
  flag: string;
  desc: string;
  tuition: string;
  living: string;
  duration: string;
  universities: string[];
  eligibility: string[];
  bannerUrl: string;
}> = {
  russia: {
    name: "Russia",
    flag: "🇷🇺",
    desc: "Russia has been one of the top destinations for Indian medical aspirants for decades. Russian medical universities offer world-class infrastructure, high-quality practical training, and globally recognized degrees at highly subsidized tuition rates.",
    tuition: "₹3.5 Lakhs - ₹7 Lakhs / year",
    living: "₹1.5 Lakhs - ₹2.5 Lakhs / year",
    duration: "6 Years (including internship)",
    universities: [
      "Kazan Federal University",
      "Crimea Federal University",
      "Bashkir State Medical University",
      "Rostov State Medical University",
      "Orenburg State Medical University"
    ],
    eligibility: [
      "Completed 10+2 with Physics, Chemistry, and Biology",
      "Minimum 50% aggregate in PCB (40% for reserved categories)",
      "NEET qualification is mandatory for Indian students",
      "Age: 17 years or above as of December 31"
    ],
    bannerUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop"
  },
  georgia: {
    name: "Georgia",
    flag: "🇬🇪",
    desc: "Georgia has rapidly emerged as a favorite study destination for medical students due to its safe, peaceful environment, high European educational standards, and fully English-medium MBBS courses. Universities in Georgia are highly accredited.",
    tuition: "₹4.5 Lakhs - ₹6.5 Lakhs / year",
    living: "₹1.8 Lakhs - ₹2.5 Lakhs / year",
    duration: "6 Years (including internship)",
    universities: [
      "Tbilisi State Medical University",
      "European University Georgia",
      "New Vision University",
      "Batumi Shota Rustaveli State University"
    ],
    eligibility: [
      "Completed 10+2 with Physics, Chemistry, and Biology",
      "Minimum 50% aggregate in PCB (40% for reserved categories)",
      "NEET qualification is mandatory for Indian students",
      "Age: 17 years or above as of December 31"
    ],
    bannerUrl: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop"
  }
};

export default function CountryDetailPage() {
  const { content } = useContent();
  const { countryId } = useParams<{ countryId: string }>();
  const data = countryId ? countryData[countryId.toLowerCase()] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <SEO 
          title="Destination Not Found"
          description="We currently don't support or have details for this country. Browse our active programs."
          path="/countries"
        />
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 text-center container px-4">
          <h1 className="text-3xl font-black text-gray-900 mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md">We currently don't support or have details for this country. Browse our active programs.</p>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const countrySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Study MBBS in ${data.name}`,
    "description": data.desc,
    "provider": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    },
    "areaServed": "IN"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`Study MBBS in ${data.name} - Fees, Universities, Eligibility`}
        description={`Study MBBS in ${data.name}. Tuition fees: ${data.tuition}, living costs: ${data.living}. Explore NMC & WHO recognized universities and eligibility rules.`}
        path={`/countries/${countryId}`}
        schema={countrySchema}
      />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden flex items-center justify-center text-white">
        <img
          src={data.bannerUrl}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container relative z-10 text-center flex flex-col items-center gap-3">
          <Link to="/countries" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Destinations
          </Link>
          <span className="text-4xl md:text-5xl">{data.flag}</span>
          <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight mt-1">
            Study MBBS in {data.name}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mt-2 font-medium">
            Affordable tuition, premium European/international learning facilities, and WHO/NMC recognized programs.
          </p>
        </div>
      </section>

      {/* Main Details Panel */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content column */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Introduction */}
              <div>
                <h2 className="font-heading text-2xl font-black text-gray-900 mb-4 border-b border-gray-150 pb-2">
                  About studying MBBS in {data.name}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base font-semibold">
                  {data.desc}
                </p>
              </div>

              {/* Key Universities */}
              <div>
                <h2 className="font-heading text-2xl font-black text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-150 pb-2">
                  <School className="h-6 w-6 text-red-600" /> Key Partner Universities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.universities.map((uni) => (
                    <div key={uni} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 shadow-sm">
                      <GraduationCap className="h-6 w-6 text-red-600 shrink-0" />
                      <span className="text-sm font-bold text-gray-800 leading-tight">{uni}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h2 className="font-heading text-2xl font-black text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-150 pb-2">
                  <HeartPulse className="h-6 w-6 text-red-600" /> Eligibility Criteria
                </h2>
                <ul className="space-y-3.5">
                  {data.eligibility.map((crit) => (
                    <li key={crit} className="flex items-start gap-2.5 text-sm font-bold text-gray-700">
                      <Check className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Stat Widget column */}
            <div className="flex flex-col gap-6">
              
              {/* Key Quick stats */}
              <div className="bg-red-50 border border-red-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="font-heading text-lg font-black text-red-700 uppercase tracking-wide border-b border-red-200/50 pb-2">
                  Quick Details
                </h3>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-red-800 font-bold uppercase tracking-wider">Tuition Fees</span>
                    <span className="text-sm font-black text-gray-800">{data.tuition}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-red-800 font-bold uppercase tracking-wider">Living Costs</span>
                    <span className="text-sm font-black text-gray-800">{data.living}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-red-800 font-bold uppercase tracking-wider">Duration</span>
                    <span className="text-sm font-black text-gray-800">{data.duration}</span>
                  </div>
                </div>

              </div>

              {/* Consultation trigger card */}
              <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-center">
                <h3 className="font-heading text-lg font-black tracking-wide">Ready to Apply?</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                  Get personalized support and guidance from our academic counsellors on entry requirements, admissions processes, and visa handling.
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider mt-2 shadow-md">
                  <Link to="/contact">Request Information</Link>
                </Button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FAQ banner */}
      <FAQSection />

      {/* CTA section */}
      <ConsultationBanner />

      <Footer />
    </div>
  );
}
