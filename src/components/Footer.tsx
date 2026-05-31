import { GraduationCap, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/iict-logo.jpeg";

const quickLinks = [
  { label: "Study in USA", href: "#" },
  { label: "Study in UK", href: "#" },
  { label: "Study in Canada", href: "#" },
  { label: "Study in Australia", href: "#" },
  { label: "Scholarships", href: "#" },
];

const services = [
  { label: "Profile Assessment", href: "#" },
  { label: "University Selection", href: "#" },
  { label: "Visa Assistance", href: "#" },
  { label: "Loan Assistance", href: "#" },
  { label: "IELTS Preparation", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#" className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="Graam-Infotech Logo" className="h-10 w-auto object-contain bg-white rounded-md p-0.5 shadow-sm" />
              <span className="font-heading text-xl font-bold text-primary">Graam-Infotech</span>
            </a>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for studying abroad. Guiding students to world-class education since 2010.
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
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </a>
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
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Contact Us</h4>
            <ul className="mb-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> info@graam-infotech.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> +91 98972 78615</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Mumbai, Delhi, Bangalore</li>
            </ul>
            <h4 className="mb-2 font-heading text-sm font-bold text-foreground">Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
              <Button size="sm" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Graam-Infotech. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
