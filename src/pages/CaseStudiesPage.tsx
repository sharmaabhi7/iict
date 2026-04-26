import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudyCard, type CaseStudy } from "@/components/shared/CaseStudyCard";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";

const caseStudies: CaseStudy[] = [
  { name: "Priya Sharma", country: "Canada", program: "MS Computer Science", background: "B.Tech from VIT with 8.5 CGPA, 2 years work experience at TCS. IELTS 7.5.", problem: "Rejected twice by Canadian universities due to weak SOP and misaligned course selection.", solution: "Our counsellors rewrote her SOP, identified 5 best-fit universities, and provided mock interview preparation.", result: "Admitted to University of Waterloo with CAD 10,000 scholarship. Student visa approved in 3 weeks." },
  { name: "Rahul Patel", country: "USA", program: "MBA", background: "B.Com from Mumbai University, 5 years in finance at HDFC Bank. GMAT 710.", problem: "Confused between MBA programs, unsure about funding, and anxious about the F-1 visa interview.", solution: "Matched him with top 50 MBA programs, secured education loan, and conducted 4 visa mock interviews.", result: "Admitted to USC Marshall School of Business. F-1 visa approved. ₹20L loan sanctioned at 8.5% interest." },
  { name: "Ananya Gupta", country: "UK", program: "MSc Data Science", background: "B.Sc Mathematics from Delhi University, strong academic record but no international exposure.", problem: "No clarity on UK admission process, tight budget, and worried about living alone abroad.", solution: "Guided end-to-end application, identified Chevening Scholarship eligibility, and connected with alumni.", result: "Admitted to University of Edinburgh. Received partial Chevening Scholarship covering 60% tuition." },
  { name: "Vikram Singh", country: "Australia", program: "MBBS Equivalent", background: "12th PCB with 92%. NEET qualified but couldn't secure a government medical seat in India.", problem: "Limited options in India, family concerned about quality of medical education abroad.", solution: "Recommended WHO/NMC-recognized universities in Australia. Arranged campus virtual tour and parent counselling.", result: "Enrolled in University of Melbourne Medical School. Visa approved. Now in 3rd year of MBBS." },
  { name: "Meera Krishnan", country: "New Zealand", program: "PG Diploma Hospitality", background: "BHM from Christ University, Bangalore. 1 year at Taj Hotels.", problem: "Wanted a country with post-study work visa but had limited budget and lower IELTS score (6.0).", solution: "Identified New Zealand's open work visa policy, found affordable PGDip program, and helped improve IELTS.", result: "Admitted to AUT University. Post-study work visa secured. Now working as Hotel Manager in Auckland." },
  { name: "Karan Joshi", country: "Ireland", program: "MSc Cybersecurity", background: "B.Tech IT from NIT Surat, 3 years at Wipro in cybersecurity.", problem: "Wanted to relocate to Europe but overwhelmed by options. Concerned about Stamp 1G visa.", solution: "Narrowed down to Ireland for tech ecosystem. Handled entire application and Stamp 1G visa documentation.", result: "Admitted to Trinity College Dublin. Stamp 4 work permit received after graduation. Now at Google Dublin." },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">CASE STUDIES</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              Real Success <span className="text-gradient-primary">Stories</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Detailed breakdowns of how we helped students overcome challenges and achieve their study abroad dreams.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((s, i) => (
              <CaseStudyCard key={s.name} study={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
