import { GraduationCap, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Youtube, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/iict-logo.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Study in USA", href: "/study-abroad" },
  { label: "Study in UK", href: "/study-abroad" },
  { label: "Study in Canada", href: "/study-abroad" },
  { label: "Study in Australia", href: "/study-abroad" },
  { label: "Scholarships", href: "/services" },
];

const services = [
  { label: "Profile Assessment", href: "/services" },
  { label: "University Selection", href: "/services" },
  { label: "Visa Assistance", href: "/services" },
  { label: "Loan Assistance", href: "/services" },
  { label: "Scholarship Support", href: "/services" },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";
      
      // Save local backup lead
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
      const newLead = {
        name: "Newsletter Subscriber",
        email: newsletterEmail.trim(),
        phone: "N/A",
        whatsapp: "N/A",
        country: "N/A",
        program: "Newsletter Subscription",
        message: "Subscribed via footer newsletter form",
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

      toast.success("Thank you for subscribing to our newsletter!");
      setNewsletterEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.success("Thank you for subscribing to our newsletter!"); // Keep success UX
      setNewsletterEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="Graam-Infotech Logo" className="h-10 w-auto object-contain bg-white rounded-md p-0.5 shadow-sm" />
              <span className="font-heading text-xl font-bold text-primary">Graam-Infotech</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for studying abroad. Guiding students to world-class education since 1996.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/p/Graamiict-Education-PVT-LTD-61577024690722/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-[#1877F2] transition-transform hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://x.com/DSiddiqui63133"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-black transition-transform hover:scale-105"
                aria-label="Twitter/X"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/graamiict-education-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-[#0A66C2] transition-transform hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.instagram.com/gieducationoverseas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-[#E1306C] transition-transform hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.youtube.com/@gieducationoverseas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-[#FF0000] transition-transform hover:scale-105"
                aria-label="YouTube"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Destinations</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Services</h4>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Contact Us</h4>
            <ul className="mb-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> info@graam-infotech.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> +91 98972 78615 / +91 93157 17679</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Delhi, Mumbai, South Korea</li>
            </ul>
            <h4 className="mb-2 font-heading text-sm font-bold text-foreground">Newsletter</h4>
            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button size="sm" type="submit" disabled={isSubmitting} className="flex items-center gap-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Graam-Infotech. All rights reserved.</p>
          <div className="flex gap-4 sm:mr-36 md:mr-44">
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
