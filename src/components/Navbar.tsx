import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/iict-logo.jpeg"
const services = [
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "MBBS Abroad", href: "/mbbs-abroad" },
  { label: "CPL Training", href: "/cpl-training" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#", children: services },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <img src={logo} alt="IICT Logo" className="h-20 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) =>
            l.children ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  {l.label} <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-lg"
                    >
                      {l.children.map((c) => (
                        <Link
                          key={c.href}
                          to={c.href}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                            location.pathname === c.href ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === l.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button size="sm" asChild>
            <Link to="/contact">Book Free Counselling</Link>
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border lg:hidden"
          >
            <nav className="container flex flex-col gap-2 py-4">
              {navLinks.map((l) =>
                l.children ? (
                  <div key={l.label}>
                    <p className="px-1 py-2 text-xs font-semibold uppercase text-muted-foreground">{l.label}</p>
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                )
              )}
              <Button size="sm" className="mt-2" asChild>
                <Link to="/contact" onClick={() => setOpen(false)}>Book Free Counselling</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
