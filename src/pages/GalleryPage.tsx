import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import { SEO } from "@/components/shared/SEO";
import acc1 from "@/assets/Accreditations/027f443e-dd39-4d72-a4b8-4a3b6de1ce57_.jpeg";
import acc2 from "@/assets/Accreditations/02ad33b1-a7d4-4622-9bbc-87feee7e6fb1_.jpeg";
import acc3 from "@/assets/Accreditations/05531c66-35b6-4e0a-87d7-58fe72e8839d_.jpeg";
import acc4 from "@/assets/Accreditations/0d4cbcce-31e6-4494-8635-62f6871fb18b_.jpeg";
import acc5 from "@/assets/Accreditations/278b9685-0dca-4f33-8f22-3b7f41016603_.jpeg";
import acc6 from "@/assets/Accreditations/77407bf1-b700-4491-8687-76684458a3b7_.jpeg";
import acc7 from "@/assets/Accreditations/97b1807f-c066-435f-9ebd-0e27242535cf_.jpeg";
import acc8 from "@/assets/Accreditations/APPRICIATION LETTER FROM DGR, DEFENCE MINISTRY, GOVT.OF INDIA.jpeg";
import acc9 from "@/assets/Accreditations/CERTIFICATE OF GRAMIICT EDUCATION PVT.LTD..jpeg";
import acc10 from "@/assets/Accreditations/CERTIFICATE OF GRAMINFOTECH PVT.LTD..jpeg";
import acc11 from "@/assets/Accreditations/CERTIFICATE OF MINORITY COMMISSION OF INDIA.jpeg";
import acc12 from "@/assets/Accreditations/CERTIFICATE OF MSME.jpeg";
import acc13 from "@/assets/Accreditations/CERTIFICATE OF UPDESCO.jpeg";
import acc14 from "@/assets/Accreditations/Certificate of Society.jpeg";
import acc15 from "@/assets/Accreditations/DGR PRC TRAINING ALLOTMENT LEETER.jpeg";
import acc16 from "@/assets/Accreditations/KC OVERSEAS EDUCATION PARTNER LETTER.jpeg";
import acc17 from "@/assets/Accreditations/KIMPO UNIVERSITY SOUTH KOREA ADMISSION NOTICE.jpeg";
import acc18 from "@/assets/Accreditations/NIELIT ACCREDITTION LETTER.jpeg";
import acc19 from "@/assets/Accreditations/PMKVY TRAINING ALLOTMENT LETTER.jpeg";
import acc20 from "@/assets/Accreditations/RANKSTUDENT AND NASA SCIENTIST PROJECT.jpeg";
import acc21 from "@/assets/Accreditations/aafd38c3-bc92-4c82-b713-750f5b9e1dcc_.jpeg";
import acc22 from "@/assets/Accreditations/bd089fd0-f740-4eff-b05e-630aca8e40fd_.jpeg";
import acc23 from "@/assets/Accreditations/c0177957-ab7c-4172-b58b-0e8f17f91953_.jpeg";
import acc24 from "@/assets/Accreditations/f553b148-3fda-4007-a452-de9e8f419559_.jpeg";
import acc25 from "@/assets/Accreditations/startup-cert.jpg";

const galleryImages = [
  { src: acc8, alt: "Appreciation Letter from DGR, Defence Ministry", category: "Letters" },
  { src: acc9, alt: "Certificate of GramIICT Education Pvt. Ltd.", category: "Certificates" },
  { src: acc10, alt: "Certificate of Graminfotech Pvt. Ltd.", category: "Certificates" },
  { src: acc11, alt: "Certificate of Minority Commission of India", category: "Certificates" },
  { src: acc12, alt: "Certificate of MSME", category: "Certificates" },
  { src: acc13, alt: "Certificate of UPDESCO", category: "Certificates" },
  { src: acc14, alt: "Certificate of Society", category: "Certificates" },
  { src: acc15, alt: "DGR PRC Training Allotment Letter", category: "Letters" },
  { src: acc16, alt: "KC Overseas Education Partner Letter", category: "Letters" },
  { src: acc17, alt: "Kimpo University South Korea Admission Notice", category: "Notices" },
  { src: acc18, alt: "NIELIT Accreditation Letter", category: "Letters" },
  { src: acc19, alt: "PMKVY Training Allotment Letter", category: "Letters" },
  { src: acc20, alt: "RankStudent and NASA Scientist Project", category: "Projects" },
  { src: acc25, alt: "Startup Certificate", category: "Certificates" },
  { src: acc1, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc2, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc3, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc4, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc5, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc6, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc7, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc21, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc22, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc23, alt: "Accreditation Document", category: "Accreditations" },
  { src: acc24, alt: "Accreditation Document", category: "Accreditations" },
];

import { useContent } from "@/contexts/ContentContext";

const categories = ["All", "Certificates", "Letters", "Notices", "Projects", "Accreditations"];

export default function GalleryPage() {
  const { content } = useContent();

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Accreditations & Recognitions - ${content.global.siteName}`,
    "description": content.pages.gallery.description,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "url": "https://iict-india.org"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={content.pages.gallery.title}
        description={content.pages.gallery.description}
        path="/gallery"
        schema={gallerySchema}
      />
      <Navbar />

      <section className="bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">ACCREDITATIONS</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              Our <span className="text-gradient-primary">Accreditations</span> & Recognitions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Official certifications and letters of appreciation that validate our commitment to excellence.
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
