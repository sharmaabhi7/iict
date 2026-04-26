import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SuccessStoriesPreview } from "@/components/SuccessStoriesPreview";
import { TimelineSection } from "@/components/TimelineSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTABanner } from "@/components/CTABanner";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SuccessStoriesPreview />
      <WhyChooseUs />
      <DestinationsSection />
      <TestimonialsSection />
      <TimelineSection />
      <CTABanner />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
