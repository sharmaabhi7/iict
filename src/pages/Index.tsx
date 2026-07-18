import { TopHeader } from "@/components/TopHeader";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { UniversitySearch } from "@/components/UniversitySearch";
import { StudentCarousel } from "@/components/StudentCarousel";
import { SuccessSection } from "@/components/SuccessSection";
import { ProgramCards } from "@/components/ProgramCards";
import { ConsultationBanner } from "@/components/ConsultationBanner";
import { DestinationsSection } from "@/components/DestinationsSection";
import { CourseCategories } from "@/components/CourseCategories";
import { BatchSelection } from "@/components/BatchSelection";
import { CareerStories } from "@/components/CareerStories";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";

const Index = () => {
  const { content } = useContent();

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": content.global.siteName,
    "url": "https://iict-india.org",
    "logo": content.global.logoUrl || "https://iict-india.org/src/assets/iict-logo.jpeg",
    "description": content.pages.index.schemaDescription || content.pages.index.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": content.global.addressLocality,
      "addressRegion": content.global.addressRegion,
      "addressCountry": content.global.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": content.global.contactPhone,
      "contactType": "admissions",
      "email": content.global.contactEmail
    }
  };

  return (
    <div className="min-h-screen relative bg-white">
      <SEO 
        title={content.pages.index.title}
        description={content.pages.index.description}
        path="/"
        schema={homeSchema}
      />
      {/* Top Header Titlebar */}
      <TopHeader />
      
      {/* Navigation Header */}
      <Navbar />
      
      {/* Hero Section & Search Form */}
      <HeroSection />
      <UniversitySearch />
      
      {/* Student Video Carousel */}
      <StudentCarousel />
      
      {/* Company Success Statistics Section */}
      <SuccessSection />
      
      {/* Three Study Abroad Program tracks */}
      <ProgramCards />
      
      {/* Pink consultation quick action banner */}
      <ConsultationBanner />
      
      {/* Destinations Flags and Counselor profile cards */}
      <DestinationsSection />
      
      {/* Gridded Course categories */}
      <CourseCategories />
      
      {/* Selection of MBBS Batch Packs */}
      <BatchSelection />
      
      {/* Student Success Stories & explore section */}
      <CareerStories />
      
      {/* Frequently Asked Questions */}
      <FAQSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
