import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <a href="#" className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-primary">
              <GraduationCap className="h-7 w-7" />
              EduBridge
            </a>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for studying abroad. Guiding students to world-class education since 2010.
            </p>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "Instagram", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
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
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> hello@edubridge.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> +91 98765 43210</li>
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
          <p>© {new Date().getFullYear()} EduBridge. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
