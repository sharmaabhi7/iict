import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`Privacy Policy - ${content.global.siteName}`}
        description="Privacy policy details for Graam-Infotech (IICT). Learn how we collect, use, protect and manage your personal data."
        path="/privacy-policy"
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
            <Shield className="h-6 w-6 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Data Protection
            </span>
          </motion.div>
          
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl leading-tight">
            Privacy <span className="text-red-500">Policy</span>
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
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">1. Information We Collect</h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you register on our website, express an interest in obtaining information about us or our services, or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identifiers such as your full name, email address, phone number, and WhatsApp number.</li>
                <li>Academic details including your educational qualification, preferred study destination, and program of interest.</li>
                <li>Any other information you choose to provide in support of your admissions and counseling process.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use personal information collected via our website for a variety of academic and business purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, operate, and maintain our study abroad counseling and admissions services.</li>
                <li>To connect you with certified counselors and medical/academic training coordinators.</li>
                <li>To send administrative information, updates, and promotional messages via email, call, or SMS/WhatsApp.</li>
                <li>To comply with legal obligations and ensure safety against fraudulent activity.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade your personal data. We may share information with partner universities abroad, visa consultants, and service providers only when necessary to process your admission applications and visa paperwork with your explicit consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">4. Data Security</h2>
              <p>
                We implement robust security measures to maintain the safety of your personal information. However, please remember that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute data security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">5. Your Rights and Choices</h2>
              <p>
                You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, or request that your personal information be deleted from our marketing databases. Please reach out to us using the contact details provided below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b pb-2">6. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
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
