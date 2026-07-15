import { motion } from "framer-motion";
import { Check, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BatchSelection() {
  return (
    <section className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
            Select Your Graam-Infotech Batch For <span className="text-red-600">MBBS</span> right upto PG
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          
          {/* Card 1: Admission Pack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#e6f2ff] border border-[#cce6ff] rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            {/* Top crossed-fee seal graphic placeholder */}
            <div className="flex justify-center mb-6">
              <div className="border-2 border-dashed border-[#0066cc]/40 bg-white/80 px-4 py-2 rounded-lg text-center transform -rotate-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase leading-none block">Consultancy Fees</span>
                <span className="text-xs font-black text-red-600 line-through tracking-wider">₹50,000 - ₹1,00,000</span>
                <span className="text-[9px] font-extrabold text-green-600 block mt-0.5">FREE / 0 CHARGES</span>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 flex flex-col gap-4 mb-8">
              <h3 className="font-heading text-xl font-extrabold text-[#004d99] border-b border-[#cce6ff] pb-2">
                Admission Pack
              </h3>
              <ul className="space-y-3.5">
                {[
                  "Guaranteed MBBS Admission",
                  "Full Travel Packages",
                  "Post Arrival Services",
                  "Local Support"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-gray-700">
                    <Check className="h-5 w-5 text-[#0066cc] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Button Area */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-red-600 text-center uppercase tracking-wide">
                Limited MBBS Abroad Seats
              </span>
              <Link to="/register?program=MBBS Abroad&message=Interested in Admission Pack for MBBS." className="w-full">
                <Button className="w-full bg-[#b30000] hover:bg-red-800 text-white font-bold py-3.5 rounded-lg shadow-sm">
                  Apply Now!
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: NExT Career Pack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#fff6e6] border border-[#ffe0b3] rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            {/* Top crossed-fee seal graphic placeholder */}
            <div className="flex justify-center mb-6">
              <div className="border-2 border-dashed border-[#b38600]/40 bg-white/80 px-4 py-2 rounded-lg text-center transform rotate-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase leading-none block">NExT Exam Coaching</span>
                <span className="text-xs font-black text-red-600 tracking-wider">6 YEARS INCLUDED</span>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 flex flex-col gap-4 mb-8">
              <h3 className="font-heading text-xl font-extrabold text-[#997300] border-b border-[#ffe0b3] pb-2">
                NExT Career Pack
              </h3>
              <ul className="space-y-3.5">
                {[
                  "MBBS Abroad and Practice in India",
                  "Guaranteed License Batch",
                  "6 Years of NExT Coaching",
                  "Pay everything on Easy EMI"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-gray-700">
                    <Check className="h-5 w-5 text-[#b38600] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom button area */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-gray-500 text-center uppercase tracking-wide">
                Start prep from Day 1
              </span>
              <Link to="/register?program=MBBS Abroad&message=Interested in NExT Career Pack for MBBS." className="w-full">
                <Button className="w-full bg-[#997300] hover:bg-[#806000] text-white font-bold py-3.5 rounded-lg shadow-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: USMLE Career Pack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#ffe8e8] border border-[#ffcccc] rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            {/* Recommended Badge */}
            <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-lg tracking-wider">
              Recommended
            </div>

            {/* Top crossed-fee seal graphic placeholder */}
            <div className="flex justify-center mb-6">
              <div className="border-2 border-dashed border-[#990000]/40 bg-white/80 px-4 py-2 rounded-lg text-center transform -rotate-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase leading-none block">US Residency Match</span>
                <span className="text-xs font-black text-green-600 tracking-wider">USMLE PREP INCLUDED</span>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 flex flex-col gap-4 mb-8">
              <h3 className="font-heading text-xl font-extrabold text-[#990000] border-b border-[#ffcccc] pb-2">
                USMLE Career Pack
              </h3>
              <ul className="space-y-3.5">
                {[
                  "MBBS + PG in USA",
                  "Guaranteed ECFMG certification",
                  "6 Years of USMLE Coaching",
                  "Pay everything on Easy EMI"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-gray-700">
                    <Check className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom button area */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-[#990000] text-center uppercase tracking-wide">
                Best path to USA residency
              </span>
              <Link to="/register?program=MBBS Abroad&message=Interested in USMLE Career Pack for MBBS." className="w-full">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg shadow-sm">
                  Get Details
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white border border-red-200 rounded-xl p-4 flex items-center justify-center gap-3 max-w-2xl mx-auto shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <Lightbulb className="h-5 w-5 fill-current" />
          </div>
          <span className="text-sm md:text-base font-extrabold text-red-700 tracking-wide text-center">
            Don't Pay Consultancy Charges to Agents!
          </span>
        </motion.div>

      </div>
    </section>
  );
}
