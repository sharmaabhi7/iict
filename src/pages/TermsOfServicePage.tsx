import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`Terms of Service - ${content.global.siteName}`}
        description="Terms of service details for Graam-Infotech (IICT). Understand the guidelines, conditions, and legal agreements for using our services."
        path="/terms-of-service"
      />
      <Navbar />

      <section className="relative overflow-hidden bg-slate-900 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.6),rgba(15,23,42,0.95))]" />
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FileText className="h-6 w-6 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Terms & Conditions
            </span>
          </motion.div>
          
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl leading-tight">
            Terms of <span className="text-red-500">Service</span>
          </h1>
          <p className="mt-4 text-md text-slate-300">
            Last Updated: July 18, 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">1. Agreement to Terms</h2>
              <p>
                By accessing or using our website, services, and educational programs, you agree to be bound by these Terms of Service. If you do not agree with all of these terms, you are prohibited from using the site and must discontinue use immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">2. Scope of Services</h2>
              <p className="mb-4">
                Graam-Infotech (IICT) provides overseas educational consultancy, medical/MBBS admissions guidance, Commercial Pilot License (CPL) program listings, and n8n AI training programs. 
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Admissions: We assist students in applying to accredited international universities. Final admission decisions rest solely with the respective academic institutions.</li>
                <li>Visa Processing: We guide students on visa documentation requirements. The granting or rejection of a student visa is determined exclusively by the respective country's embassy or consulate.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">3. User Conduct</h2>
              <p>
                You agree to provide true, accurate, and complete information when registering or submitting lead forms on our platform. You must not use our website for any unlawful purpose, transmit any malware, or attempt unauthorized access to our server databases.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">4. Intellectual Property</h2>
              <p>
                Unless otherwise indicated, the website, including all source code, databases, designs, audio, video, text, photographs, and graphics are our proprietary property and are protected by copyright and trademark laws. Content may not be copied, reproduced, or distributed for commercial purposes without our express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">5. Limitation of Liability</h2>
              <p>
                In no event will Graam-Infotech (IICT), its directors, or employees be liable for any direct, indirect, consequential, or incidental damages arising out of your use of our consultancy or training services. While we aim for high success rates, we do not guarantee university admission or visa approvals.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">6. Changes to Terms</h2>
              <p>
                We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time. We will alert you about any changes by updating the "Last Updated" date of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">7. Contact Information</h2>
              <p>
                If you have questions or want to clarify any aspect of these Terms, please contact us at:
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                Graam-Infotech (IICT)<br />
                Email: info@graam-infotech.com<br />
                Phone: +91 98972 78615 / +91 93157 17679
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
