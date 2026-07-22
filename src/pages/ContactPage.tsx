import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Valid phone number required").max(20),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const offices = [
  { city: "Delhi Office", address: "101, NH-19, above Sandoz Restaurant, CRRI, Ishwar Nagar, Okhla, New Delhi, Delhi 110020", phone: "+91 98972 78615" },
  { city: "Mumbai Office", address: "5th Floor, Trade Centre, BKC, Mumbai 400051", phone: "+91 98972 78615" },
  { city: "South Korea Office", address: "Seoul, South Korea", phone: "+91 93157 17679" },
];

import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function ContactPage() {
  const { content } = useContent();
  const [searchParams] = useSearchParams();
  const urlService = searchParams.get("service");
  const urlCountry = searchParams.get("country");

  const defaultService = urlService === "mbbs-abroad" ? "mbbs" : (urlService === "study-abroad" ? "study-abroad" : "");
  const defaultMessage = urlCountry ? `I am interested in studying in ${urlCountry}. Please provide more information about the courses, eligibility, and admission process.` : "";

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", service: defaultService, message: defaultMessage },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";
      
      // Save local backup lead
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
      const newLead = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.phone, // Default WhatsApp to contact phone
        country: "N/A", // Contact page has no country selector
        program: data.service === "mbbs" ? "MBBS Abroad" : "Study Abroad",
        message: data.message,
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        status: webhookUrl ? "Submitted to Sheets" : "Saved Locally (Pending Sync)"
      };
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

      toast.success("Thank you! We'll get back to you within 24 hours.");
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form to sheets:", error);
      toast.success("Thank you! We'll get back to you within 24 hours."); // Keep success UX
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact Us - ${content.global.siteName}`,
    "description": content.pages.contact.schemaDescription || content.pages.contact.description,
    "url": "https://iict-india.org/contact",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "telephone": content.global.contactPhone,
      "email": content.global.contactEmail
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={content.pages.contact.title}
        description={content.pages.contact.description}
        path="/contact"
        schema={contactPageSchema}
      />
      <Navbar />

      <section className="bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">CONTACT US</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              Let's Start Your <span className="text-gradient-primary">Journey</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Get in touch with our expert counsellors for a free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-8 shadow-card lg:col-span-3"
          >
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                       <FormLabel>Phone</FormLabel>
                       <FormControl><Input placeholder="+91 98972 78615" {...field} /></FormControl>
                       <FormMessage />
                     </FormItem>
                   )} />
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="study-abroad">Study Abroad</SelectItem>
                          <SelectItem value="mbbs">MBBS Abroad</SelectItem>
                          <SelectItem value="cpl">CPL Training</SelectItem>
                          <SelectItem value="visa">Visa Assistance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl><Textarea placeholder="Tell us about your study abroad goals..." rows={4} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            {/* WhatsApp */}
             <a href="https://wa.me/919315717679" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">Chat on WhatsApp</p>
                <p className="text-sm text-muted-foreground">Get instant response</p>
              </div>
            </a>

            {/* General info */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-heading text-lg font-bold text-foreground">General Enquiries</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{content.global.contactEmail}</span>
                </div>
                 <div className="flex items-start gap-3">
                   <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                   <span className="text-muted-foreground">{content.global.contactPhone}</span>
                 </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">Mon-Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Offices */}
            {offices.map((o) => (
              <div key={o.city} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{o.city}</p>
                    <p className="text-xs text-muted-foreground">{o.address}</p>
                    <p className="mt-1 text-xs text-primary">{o.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="container">
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe
              src="https://maps.google.com/maps?q=101%2C%20NH-19%2C%20above%20Sandoz%20Restaurant%2C%20CRRI%2C%20Ishwar%20Nagar%2C%20Okhla%2C%20New%20Delhi%2C%20Delhi%20110020&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Graam-Infotech Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
