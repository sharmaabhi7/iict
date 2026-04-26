import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import officeImg from "@/assets/office.jpg";
import heroImg from "@/assets/hero-students.jpg";
import founderImg from "@/assets/founder.jpg";
import mbbsImg from "@/assets/mbbs-hero.jpg";

const galleryImages = [
  { src: heroImg, alt: "Student send-off ceremony", category: "Student Send-offs" },
  { src: officeImg, alt: "EduBridge head office", category: "Office Photos" },
  { src: founderImg, alt: "Visa approval celebration", category: "Visa Approvals" },
  { src: mbbsImg, alt: "MBBS students abroad", category: "Events" },
  { src: heroImg, alt: "Graduation ceremony", category: "Student Send-offs" },
  { src: officeImg, alt: "Counselling session", category: "Office Photos" },
  { src: mbbsImg, alt: "University visit event", category: "Events" },
  { src: founderImg, alt: "Visa stamping celebration", category: "Visa Approvals" },
  { src: heroImg, alt: "Pre-departure event", category: "Events" },
];

const categories = ["All", "Visa Approvals", "Student Send-offs", "Office Photos", "Events"];

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">GALLERY</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              Our Journey in <span className="text-gradient-primary">Pictures</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Moments that matter — from visa approvals to student send-offs.
            </p>
          </motion.div>
        </div>
      </section>

      <GalleryGrid images={galleryImages} categories={categories} title="" />

      <CTABanner />
      <Footer />
    </div>
  );
}
