import { useState } from "react";
import { Menu, X, ChevronDown, Search, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/iict-logo.jpeg"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About IICT", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Countries", href: "/countries", children: [
      { label: "Russia", href: "/countries/russia" },
      { label: "Georgia", href: "/countries/georgia" },
    ]
  },
  {
    label: "Study Abroad", href: "/study-abroad", children: [
      { label: "MBBS Abroad", href: "/mbbs-abroad" },
      { label: "n8n AI Training", href: "/n8n-training" }
    ]
  },
  { label: "Contact Us", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Logo & Contact Row */}
      <div className="container flex h-20 items-center justify-between border-b border-gray-100 py-2">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Graam-Infotech Logo" className="h-16 w-auto object-contain" />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full font-semibold px-6 gap-2">
            <span className="text-xl">🎧</span> Live Counselling
          </Button>

          <div className="flex items-center gap-2">
            <Phone className="h-8 w-8 text-red-600 p-1.5 border border-red-600 rounded-full" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-medium">Call Us Now</span>
              <a href="tel:9897278615" className="text-sm font-bold text-red-600 hover:underline">98972 78615</a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <svg className="h-8 w-8 text-green-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-medium">Whatsapp Us</span>
              <a href="https://wa.me/919897278615" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-green-500 hover:underline">98972 78615</a>
            </div>
          </div>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation Links Row */}
      <div className="hidden border-b border-gray-100 bg-white xl:block">
        <div className="container flex h-14 items-center justify-center gap-8">
          {navLinks.map((l) =>
            l.children ? (
              <div
                key={l.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => setDropdown(l.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-[15px] font-semibold transition-colors hover:text-red-600 ${location.pathname.startsWith(l.href) ? 'text-red-600' : 'text-gray-700'}`}>
                  {l.label} <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {dropdown === l.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 top-full z-50 w-48 rounded-md border border-gray-100 bg-white shadow-lg"
                    >
                      {l.children.map((c) => (
                        <Link
                          key={c.href}
                          to={c.href}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
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
                className={`text-[15px] font-semibold transition-colors hover:text-red-600 ${location.pathname === l.href ? 'text-red-600' : 'text-gray-700'}`}
              >
                {l.label}
              </Link>
            )
          )}
          <button className="text-gray-700 hover:text-red-600">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-white lg:hidden"
          >
            <nav className="container flex flex-col gap-2 py-4">
              {navLinks.map((l) =>
                l.children ? (
                  <div key={l.label}>
                    <p className="px-1 py-2 text-xs font-semibold uppercase text-gray-500">{l.label}</p>
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
                    className="block rounded-lg px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-red-600"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

