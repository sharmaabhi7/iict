import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Valid phone number required").max(20),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const offices = [
  { city: "Mumbai (Head Office)", address: "5th Floor, Trade Centre, Bandra Kurla Complex, Mumbai 400051", phone: "+91 22 6789 0123" },
  { city: "Delhi", address: "3rd Floor, Connaught Place, New Delhi 110001", phone: "+91 11 4567 8901" },
  { city: "Bangalore", address: "2nd Floor, MG Road, Bangalore 560001", phone: "+91 80 2345 6789" },
];

export default function ContactPage() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });

  const onSubmit = (data: ContactForm) => {
    toast.success("Thank you! We'll get back to you within 24 hours.");
    form.reset();
  };

  return (
    <div className="min-h-screen">
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
                      <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
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
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
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
                  <span className="text-muted-foreground">hello@edubridge.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">+91 98765 43210</span>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2!2d72.87!3d19.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM2LjAiTiA3MsKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="EduBridge Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
