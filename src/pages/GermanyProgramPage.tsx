import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { trackPixelEvent } from "@/lib/metaPixel";
import {
  BookOpen,
  Award,
  MapPin,
  DollarSign,
  Clock,
  ArrowRight,
  Check,
  UserCheck,
  GraduationCap,
  Phone,
  Send,
  Building,
  HeartPulse,
  Wrench,
  BadgeAlert,
  Compass,
  FileCheck,
  Plane,
  Home,
  MessageCircle,
  HelpCircle,
  Loader2
} from "lucide-react";

import healthcarePdf from "@/assets/igsp/IGSP_D-GCA_Presentation.pdf";
import mechatronicsPdf from "@/assets/igsp/D-ASM-IGSP-Presentation.pdf";
import hospitalityPdf from "@/assets/igsp/IGSP_Hospitality_GermanBakery.pdf";

// Form Validation Schema
const leadSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Valid phone number is required").max(20),
  qualification: z.string().min(1, "Please select your current qualification"),
  sector: z.string().min(1, "Please select your preferred sector"),
  message: z.string().trim().max(1000).optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function GermanyProgramPage() {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      qualification: "",
      sector: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";

      const newLead = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.phone,
        country: "Germany",
        program: "Indo-German Skill Program (IGSP)",
        message: `Qualification: ${data.qualification}. Preferred Sector: ${data.sector}. Message: ${data.message || "N/A"}`,
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        status: webhookUrl ? "Submitted to Sheets" : "Saved Locally (Pending Sync)"
      };

      // Save local backup lead
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
      localStorage.setItem("iict_leads", JSON.stringify([newLead, ...savedLeads]));

      if (webhookUrl) {
        const searchParams = new URLSearchParams();
        searchParams.append("timestamp", newLead.date);
        searchParams.append("name", newLead.name);
        searchParams.append("email", newLead.email);
        searchParams.append("phone", newLead.phone);
        searchParams.append("whatsapp", newLead.whatsapp);
        searchParams.append("country", newLead.country);
        searchParams.append("program", newLead.program);
        searchParams.append("message", newLead.message);

        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: searchParams.toString(),
        });
      }

      // Track Facebook Pixel Lead event
      trackPixelEvent("Lead", {
        content_name: "Indo-German Skill Program (IGSP)",
        content_category: "Germany",
        value: 0,
        currency: "INR"
      });

      toast.success("Thank you! Redirecting to WhatsApp...");
      form.reset();
      window.location.href = "https://wa.me/919315717679?text=hii%20i%20am%20just%20submit%20the%20form%20for%20IGSP";
    } catch (error) {
      console.error("Error submitting form:", error);

      // Track Facebook Pixel Lead event even on connection failures, since they submitted their info
      trackPixelEvent("Lead", {
        content_name: "Indo-German Skill Program (IGSP) (Offline/Local)",
        content_category: "Germany",
        value: 0,
        currency: "INR"
      });

      toast.success("Thank you! Redirecting to WhatsApp...");
      form.reset();
      window.location.href = "https://wa.me/919315717679?text=hii%20i%20am%20just%20submit%20the%20form%20for%20IGSP";
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    window.open("https://wa.me/919315717679?text=Hi%2C%20I%20am%20interested%20in%20the%20Indo%20German%20Skill%20Program%20(IGSP).%20Please%2520guide%20me.", "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO
        title="IGSP — Indo German Skill Program | Study, Train & Earn in Germany"
        description="The Indo German Skill Program (IGSP) helps Indian students build careers in Germany with language training, professional skills, paid apprenticeships and end-to-end support."
        path="/countries/germany"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-16 text-white md:py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute -left-20 top-1/4 h-[300px] w-[300px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-10 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* Left Content */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/20">
                🇩🇪 Germany Career Pathway
              </span>
              <h1 className="font-heading text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                <span className="bg-gradient-to-r from-red-500 via-amber-400 to-amber-500 bg-clip-text text-transparent block mb-3 uppercase">
                  IGSP
                </span>
                Study, Train & Earn <br />
                <span className="bg-gradient-to-r from-red-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  In Germany
                </span>
              </h1>
              <p className="text-lg text-slate-300 md:text-xl font-medium leading-relaxed max-w-2xl">
                Language training. Real skills. Paid apprenticeships. One clear pathway from India to a long-term German career.
              </p>

              {/* Core Features */}
              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                {[
                  "Germany career pathway & PR route",
                  "Paid apprenticeship (Ausbildung)",
                  "German A1 → B2 training included",
                  "100% end-to-end relocation support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
                  className="border border-slate-700 bg-transparent hover:bg-slate-800 text-white font-bold px-8 py-[18px] text-base rounded-full transition-colors"
                >
                  Explore Programs
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <UserCheck className="h-4 w-4 text-amber-500" />
                <span>Organized by GIEducation Overseas Education. Takes 30 seconds.</span>
              </div>
            </div>

            {/* Right Form Card */}
            <div id="apply" className="lg:col-span-5 scroll-mt-36">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 shadow-2xl backdrop-blur-md"
              >
                <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
                  Book Free Counselling
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-6">
                  Talk to our Germany experts and plan your pathway.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-slate-900">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-slate-300 font-bold uppercase tracking-wide">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" className="bg-slate-950 border-slate-800 text-white rounded-xl placeholder:text-slate-600" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-slate-300 font-bold uppercase tracking-wide">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="name@example.com" className="bg-slate-950 border-slate-800 text-white rounded-xl placeholder:text-slate-600" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-slate-300 font-bold uppercase tracking-wide">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit number" className="bg-slate-950 border-slate-800 text-white rounded-xl placeholder:text-slate-600" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-slate-300 font-bold uppercase tracking-wide">Current Qualification</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-950 border-slate-800 text-white rounded-xl">
                                <SelectValue placeholder="Select qualification" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                              <SelectItem value="12th Passed (Science)">12th Passed (Science Stream)</SelectItem>
                              <SelectItem value="12th Passed (Other)">12th Passed (Other Streams)</SelectItem>
                              <SelectItem value="Diploma Holder">Diploma / Polytechnic Holder</SelectItem>
                              <SelectItem value="ITI Student">ITI Student</SelectItem>
                              <SelectItem value="Graduate">Graduate (Any Stream)</SelectItem>
                              <SelectItem value="Young Professional">Young Professional (18-24)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-slate-300 font-bold uppercase tracking-wide">Preferred Sector</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-950 border-slate-800 text-white rounded-xl">
                                <SelectValue placeholder="Select sector in Germany" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                              <SelectItem value="Healthcare">Healthcare & Nursing Assistants</SelectItem>
                              <SelectItem value="Technical">Technical (Mechatronics, Mechanical, CNC)</SelectItem>
                              <SelectItem value="Commercial">Commercial (Business, Hospitality, Bank)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-xl uppercase tracking-wider mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Consultation Request"
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Program Structure (India vs Germany) */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-md">How IGSP Works</span>
            <h2 className="font-heading text-3xl font-black text-slate-900 mt-4 sm:text-4xl">
              Build your foundation in India, then learn & earn in Germany.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              A structured two-phase program designed to bridge the gap between Indian aspirants and German employers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Phase 1: India */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-100">
                    Phase 1
                  </span>
                  <span className="text-slate-400 font-bold text-sm">1 Year</span>
                </div>

                <h3 className="font-heading text-2xl font-black text-slate-900">
                  Build Your Foundation in India
                </h3>

                <ul className="space-y-4 text-slate-600 font-medium text-sm sm:text-base mt-2">
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                      <BookOpen className="h-3 w-3" />
                    </span>
                    <span><strong>Earn a valuable Indian diploma:</strong> Align academic credentials with program targets.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                      <Compass className="h-3 w-3" />
                    </span>
                    <span><strong>Master the German language:</strong> Structured classroom training from A1 to B2 level.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                      <GraduationCap className="h-3 w-3" />
                    </span>
                    <span><strong>Practical skill development:</strong> Core hands-on vocational modules suited for EU standards.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2 font-semibold">Certification partner</span>
                <p className="text-sm text-slate-700 font-bold">
                  Medhavi Skills University, Sikkim
                </p>
              </div>
            </div>

            {/* Phase 2: Germany */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Phase 2
                  </span>
                  <span className="text-slate-400 font-bold text-sm">2–3 Years</span>
                </div>

                <h3 className="font-heading text-2xl font-black text-white">
                  Learn & Earn in Germany
                </h3>

                <ul className="space-y-4 text-slate-300 font-medium text-sm sm:text-base mt-2">
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 mt-0.5">
                      <Award className="h-3 w-3" />
                    </span>
                    <span><strong>Fully-sponsored German training:</strong> Zero tuition fee during your specialized training.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 mt-0.5">
                      <DollarSign className="h-3 w-3" />
                    </span>
                    <span><strong>Monthly stipend from day one:</strong> Earn €1,000 to €1,400 per month (approx. ₹90,000 - ₹1.2 Lakh).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    <span><strong>German vocational certificate:</strong> Earn global qualification accepted across Europe.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-slate-800 pt-6">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2 font-semibold">Post-Program Growth</span>
                <p className="text-sm text-slate-200 font-bold">
                  Guaranteed full-time job offer with PR pathway in 2 years.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pathway Callout Banner */}
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-heading text-2xl font-black">A partner, not just a program.</h3>
            <p className="text-slate-100 font-semibold mt-1 max-w-xl text-sm md:text-base">
              Every stage of your Germany journey is handled by counsellors who have done this hundreds of times.
            </p>
          </div>
          <Button
            onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white hover:bg-slate-100 text-red-600 font-black px-6 py-3 rounded-xl uppercase tracking-wider text-sm shadow-md"
          >
            Talk to a counsellor
          </Button>
        </div>
      </section>

      {/* The 8-Step Journey */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-md">Roadmap</span>
            <h2 className="font-heading text-3xl font-black text-slate-900 mt-4 sm:text-4xl">
              Your 8-step journey to Germany
            </h2>
            <p className="mt-4 text-base text-slate-600 font-semibold">
              A clear, guided path from your first call to a long-term career abroad.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, title: "Apply for IGSP", desc: "Register in minutes.", icon: FileCheck },
              { step: 2, title: "Counselling", desc: "1:1 pathway mapping.", icon: UserCheck },
              { step: 3, title: "Language Training", desc: "A1 → B2 with experts.", icon: BookOpen },
              { step: 4, title: "Professional Training", desc: "Skills for German employers.", icon: GraduationCap },
              { step: 5, title: "Visa Handling", desc: "End-to-end paperwork.", icon: FileCheck },
              { step: 6, title: "Move to Germany", desc: "Pre-departure & arrival.", icon: Plane },
              { step: 7, title: "Paid Apprenticeship", desc: "Earn from day one.", icon: DollarSign },
              { step: 8, title: "Career in Germany", desc: "Growth & PR pathway.", icon: Award },
            ].map((journey, idx) => {
              const Icon = journey.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 font-black text-sm">
                      0{journey.step}
                    </span>
                    <Icon className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-slate-800 text-base">{journey.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1">{journey.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Profiles / Who is it for */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            <div className="flex flex-col gap-6 lg:col-span-5">
              <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-md w-fit">Target Profile</span>
              <h2 className="font-heading text-3xl font-black text-slate-900 sm:text-4xl leading-tight">
                If you are practical, curious and career-focused, IGSP is designed for you.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-semibold">
                This program is tailored for ambitious Indian youths who value hands-on specialized vocational training over traditional non-vocational degrees.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-sm font-semibold">
                <strong>Preferred profile:</strong> 12th passed (Science preferred), age 18–24, interested in practical skills — not just degrees.
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Students after 12th", desc: "Science stream preferred. Perfect springboard for European healthcare/tech careers." },
                { title: "Diploma Holders", desc: "Polytechnic or technical diploma holders ready to specialise with top German industrial firms." },
                { title: "ITI Students", desc: "Students with practical vocational backgrounds in high demand across Germany's industrial sectors." },
                { title: "Graduates", desc: "Add international experience and complete a dual-degree/vocational pathway in Europe." },
                { title: "Young Professionals", desc: "Aged 18–24, career-focused individuals aiming to relocate and settle in the EU." },
              ].map((profile, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-heading font-black text-slate-800 text-base flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600" /> {profile.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                    {profile.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Specialization Programs Grid */}
      <section id="programs" className="py-20 bg-slate-950 text-white relative scroll-mt-36">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-md border border-amber-500/20">Programs</span>
            <h2 className="font-heading text-3xl font-black mt-4 sm:text-4xl">
              Vocational, technical & business programs
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Choose from a range of high-demand specialties, all with a fully-integrated German pathway.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Healthcare Assistant", cat: "Healthcare", pdf: healthcarePdf },
              { name: "Automobile Service & Mechatronics", cat: "Technical", pdf: mechatronicsPdf },
              { name: "Diploma in Hospitality", cat: "German Bakery", pdf: hospitalityPdf },
            ].map((program, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-4 group hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-amber-500">
                    {program.cat}
                  </span>
                  <h4 className="font-heading font-black text-lg text-white mt-1 group-hover:text-amber-400 transition-colors">
                    {program.name}
                  </h4>
                </div>
                <Button
                  asChild
                  variant="link"
                  className="p-0 h-auto text-slate-400 hover:text-white font-bold flex items-center justify-start gap-1 text-xs uppercase tracking-wider mt-2"
                >
                  <a href={program.pdf} target="_blank" rel="noopener noreferrer">
                    Know More <ArrowRight className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-5 rounded-full"
            >
              View all pathways →
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-md">Market Demand</span>
            <h2 className="font-heading text-3xl font-black text-slate-900 mt-4 sm:text-4xl">
              Three high-demand sectors in Germany
            </h2>
            <p className="mt-4 text-base text-slate-600 font-semibold">
              Germany is actively recruiting international skilled talent. Here are the core career branches under the program:
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Healthcare */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-black text-slate-900">Healthcare Sector</h3>
              <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                Backbone of Germany's social system. B2 German language level is required for this route.
              </p>
              <ul className="space-y-3 mt-6 border-t border-slate-100 pt-6">
                {["Health Duty Assistant", "Medical Assistant", "Lab Technician", "OR Assistant"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-black text-slate-900">Technical & Engineering</h3>
              <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                Ausbildung with major German industrial employers, mechanical leaders and automotive firms.
              </p>
              <ul className="space-y-3 mt-6 border-t border-slate-100 pt-6">
                {["KFZ Mechatroniker", "Electronics Technician", "Industrial Mechanic", "Production Tech"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-black text-slate-900">Commercial & Business</h3>
              <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                Roles stretching from banking and business administration to premium European hospitality services.
              </p>
              <ul className="space-y-3 mt-6 border-t border-slate-100 pt-6">
                {["Hotelfachmann (Hospitality)", "Bankkaufmann (Banking)", "Industriekaufmann (Business)", "Bakery Specialist"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* End to End Support Grid */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-md">Our Services</span>
            <h2 className="font-heading text-3xl font-black text-slate-900 mt-4 sm:text-4xl">
              End-to-end support — from application to arrival
            </h2>
            <p className="mt-4 text-base text-slate-600 font-semibold">
              Handled by GIEducation expert counselors so you can focus entirely on your training modules.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Career Counselling", desc: "1:1 session mapping with Germany program experts.", icon: UserCheck },
              { title: "Application Assistance", desc: "Direct handling of university admissions and employer contracts.", icon: FileCheck },
              { title: "Language Training", desc: "Structured A1 to B2 classes custom-tailored to vocational needs.", icon: BookOpen },
              { title: "Documentation Support", desc: "Document attestation, official translations and notary handling.", icon: FileCheck },
              { title: "Visa Assistance", desc: "Complete embassy interview preparation and file submission support.", icon: FileCheck },
              { title: "Accommodation Guidance", desc: "Arranging secure housing contracts in Germany before departure.", icon: Home },
              { title: "Pre-Departure Support", desc: "Cultural and work environment training prior to take-off.", icon: Plane },
              { title: "Arrival Support", desc: "Assisting at airports, city registrations and German bank accounts.", icon: MapPin },
              { title: "Ongoing Guidance", desc: "Constant helpline counseling support throughout your stay.", icon: Compass },
            ].map((support, idx) => {
              const Icon = support.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                  <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-slate-800 text-base">{support.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
                      {support.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#cc00001a_0%,transparent_100%)]" />
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
          <span className="text-4xl text-amber-500">“</span>
          <blockquote className="font-heading text-2xl md:text-3xl font-black text-white leading-relaxed max-w-3xl mx-auto">
            Skilled workers should consider opportunities Germany has to offer.
          </blockquote>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto font-medium">
            “We have one of the most liberal immigration laws in Europe and what is remarkable is that though we had a change of government where Conservatives took over the Chancellery, nobody is thinking of changing this immigration law.”
          </p>
          <cite className="block text-xs font-black text-amber-400 uppercase tracking-widest mt-6 not-italic">
            — Times of India
          </cite>
        </div>
      </section>

      {/* Why Choose us / Choices */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-md">Smart Choice</span>
            <h2 className="font-heading text-3xl font-black text-slate-900 mt-4 sm:text-4xl">
              Why IGSP is your smartest choice
            </h2>
            <p className="mt-4 text-base text-slate-600 font-semibold">
              Everything you need to move from India to a professional career in Germany — one integrated program.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Low Initial Investment", desc: "Start in India, minimise upfront costs compared to direct study.", icon: DollarSign },
              { title: "Earn From Day 1", desc: "Earn a monthly stipend (€1,000+) during your apprenticeship.", icon: DollarSign },
              { title: "Dual Certification", desc: "Gain both an Indian diploma and a German vocational certificate.", icon: Award },
              { title: "Clear Pathway to PR", desc: "Secure long-term career growth and settlement routes in the EU.", icon: Compass },
              { title: "Language Training", desc: "Structured, classroom level A1 to B2 courses fully integrated.", icon: BookOpen },
              { title: "Industry Exposure", desc: "Train directly with real German industrial and healthcare employers.", icon: Building },
              { title: "EU Qualification", desc: "Earn a globally-recognized degree valid across the European Union.", icon: GraduationCap },
              { title: "Complete Support", desc: "Documents, visas, travel coordination and on-arrival assistance.", icon: UserCheck },
            ].map((choice, idx) => {
              const Icon = choice.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
                  <Icon className="h-6 w-6 text-red-600" />
                  <h4 className="font-heading font-black text-slate-800 text-base mt-2">{choice.title}</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">
                    {choice.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <HelpCircle className="h-8 w-8 text-red-600" />
            <h2 className="font-heading text-3xl font-black text-slate-900 mt-4 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-slate-600 font-semibold">
              Find answers to common questions about eligibility, language criteria, stipends, and visas.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is the Indo German Skill Program (IGSP)?",
                a: "IGSP is an integrated vocational and academic training pathway. It prepares Indian students with professional courses and German language training in India for 1 year, and facilitates fully-sponsored apprenticeships (Ausbildung) with monthly stipends at major employers in Germany."
              },
              {
                q: "Who is eligible to apply for this program?",
                a: "Students who have completed 12th passed (Science preferred), polytechnic/ITI diploma holders, and fresh graduates aged between 18 and 24. A keen interest in hands-on practical skills and willingness to learn German is necessary."
              },
              {
                q: "Do I need to know German before applying?",
                a: "No prior German knowledge is required to enroll. Complete German language training from level A1 to B2 is built into the program structure and conducted by expert teachers during Phase 1 in India."
              },
              {
                q: "How much stipend can I earn during training in Germany?",
                a: "Apprentices (Ausbildung candidates) in Germany earn a monthly stipend of €1,000 to €1,400 (approx. ₹90,000 to ₹1.25 Lakhs) right from day one, which covers standard living costs in Germany."
              },
              {
                q: "Does the program require a blocked account?",
                a: "No. Unlike standard study visa routes that require students to deposit around €11,000+ per year in a German blocked account to show proof of funds, IGSP candidates are generally exempt because they earn monthly stipends from day one under signed employment contracts."
              },
              {
                q: "What is the career path after completing the apprenticeship?",
                a: "Upon completing the 2-3 years apprenticeship, candidates receive a globally recognized German vocational certificate and a guaranteed full-time employment contract from partner employers. Under German immigration laws, you can apply for a Permanent Residency (PR) after 2 years of full-time work."
              }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border border-slate-200 rounded-2xl px-6 py-2 shadow-sm">
                <AccordionTrigger className="font-heading font-black text-slate-850 text-left hover:text-red-600 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 font-semibold text-sm leading-relaxed mt-2 border-t border-slate-100 pt-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col gap-6">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-md border border-amber-500/20 w-fit mx-auto">
            Relocate to Germany
          </span>
          <h2 className="font-heading text-3xl font-black md:text-4xl">
            Ready to build a global career?
          </h2>
          <p className="text-slate-300 font-medium max-w-xl mx-auto text-sm md:text-base">
            Book your free counselling session today with a GIEducation Overseas Education expert and map your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-6 rounded-full uppercase tracking-wider text-sm shadow-lg shadow-red-600/20"
            >
              Book Free Consultation
            </Button>
            <Button
              onClick={handleWhatsAppChat}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-6 rounded-full uppercase tracking-wider text-sm flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
