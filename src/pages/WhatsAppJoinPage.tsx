import { useState, useEffect } from "react";
import { 
  Users, 
  MessageSquare, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Share2, 
  Smartphone, 
  BookOpen, 
  QrCode, 
  Clock, 
  HelpCircle,
  AlertCircle,
  Home,
  Sun,
  Moon,
  ChevronDown
} from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/iict-logo.jpeg";
import { useContent } from "@/contexts/ContentContext";

// Customized WhatsApp Brand Icon SVG
const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.012 2C6.485 2 2 6.485 2 12.012c0 1.766.457 3.483 1.326 5.006L2 22l5.127-1.345c1.472.802 3.125 1.222 4.887 1.222 5.527 0 10.012-4.485 10.012-10.012C22.026 6.485 17.54 2 12.012 2zm0 18.232c-1.564 0-3.094-.419-4.442-1.213l-.319-.19-3.042.798.812-2.964-.208-.332c-.87-1.39-1.332-3.003-1.332-4.664 0-4.802 3.906-8.708 8.708-8.708 4.802 0 8.708 3.906 8.708 8.708 0 4.803-3.906 8.708-8.708 8.708zm4.773-6.52c-.262-.13-1.547-.763-1.785-.85-.237-.087-.41-.13-.583.13-.172.26-.67.85-.82 1.024-.15.173-.3.195-.562.065-.262-.13-1.107-.408-2.11-1.3c-.78-.695-1.306-1.553-1.46-1.812-.152-.26-.016-.4.115-.53.118-.118.262-.303.393-.455.13-.152.173-.26.26-.433.088-.173.044-.325-.022-.455-.065-.13-.583-1.407-.8-1.927-.21-.51-.443-.44-.6-.448-.152-.008-.325-.008-.498-.008-.173 0-.455.065-.693.303-.238.238-.91.888-.91 2.165 0 1.277.928 2.51 1.057 2.684.13.173 1.826 2.79 4.423 3.91 1.01.435 1.8.693 2.42 1.01.62.317 1.184.272 1.63.206.497-.074 1.547-.63 1.765-1.235.218-.606.218-1.125.152-1.233-.065-.108-.238-.173-.5-.303z"/>
  </svg>
);

// High-fidelity Mock QR Code SVG
const MockQRCode = () => (
  <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground dark:text-white" fill="currentColor">
    {/* QR Borders */}
    <path d="M0 0h25v5H5v20H0V0zm75 0h25v25h-5V5H75V0zM0 75h5v20h20v5H0V75zm95 0h5v25H75v-5h20V75z" />
    {/* Top-Left Finder */}
    <path d="M5 5h15v15H5V5zm3 3v9h9V8H8z" />
    <path d="M10 10h5v5h-5v-5z" />
    {/* Top-Right Finder */}
    <path d="M80 5h15v15H80V5zm3 3v9h9V8h-9z" />
    <path d="M85 10h5v5h-5v-5z" />
    {/* Bottom-Left Finder */}
    <path d="M5 80h15v15H5V80zm3 3v9h9v-9H8z" />
    <path d="M10 85h5v5h-5v-5z" />
    {/* Center visual data noise mimicking a real group QR code */}
    <path d="M30 10h5v5h-5v-5zm10 5h10v5H40v-5zm15-5h5v5h-5v-5zm10 0h5v5h-5v-5zm-35 20h5v5h-5v-5zm10 0h5v5h-5v-5zm20 5h5v10h-5v-10zm10-5h5v5h-5v-5zm5 10h5v5h-5v-5zm-50 15h10v5H30v-5zm15 5h5v5h-5v-5zm15-10h5v15h-5V60zm10 5h5v5h-5v-5zm10-5h5v5h-5v-5zm-50 15h5v5h-5v-5zm15 0h5v5h-5v-5zm10-5h10v5H55v-5zm15 10h5v5h-5v-5zm10-5h5v5h-5v-5z" />
    <circle cx="50" cy="50" r="8" className="fill-primary" />
    <path d="M48 47h4v6h-4z" className="fill-primary-foreground" />
  </svg>
);

export default function WhatsAppJoinPage() {
  const { content } = useContent();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const groupInviteUrl = "https://chat.whatsapp.com/KLY32gyoOLoGOuxOO9zcBr";

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(groupInviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqData = [
    {
      q: "What is this WhatsApp group used for?",
      a: "This is the official communication hub for the IICT AI Agent Development & n8n Training Program. Tutors share live session links (Zoom/Meet), daily assignments, reference templates, n8n workflow JSON configs, and important updates here."
    },
    {
      q: "Is there any charge to join this group?",
      a: "No, joining the WhatsApp group and community support chat is 100% free for all students and career seekers interested in artificial intelligence and workflow automation."
    },
    {
      q: "What if I don't have WhatsApp on my phone?",
      a: "You can download WhatsApp for your Android or iOS device from the official store. Alternatively, you can use WhatsApp Web in your browser on a laptop or desktop computer to join the group."
    },
    {
      q: "Can I invite other students to this group?",
      a: "Yes! BCA, MCA, B.Tech, or any unemployed youth seeking computer-related skills are welcome. Feel free to copy the invite link using the share feature and pass it along."
    },
    {
      q: "What are the rules of the group?",
      a: "To maintain a productive environment, we strictly forbid spamming, promotional links, unrelated forward messages, or harassment. Conversations should remain focused on AI Agent Development, n8n workflows, and code assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans pb-16">
      <SEO
        title={content.pages.whatsapp.title}
        description={content.pages.whatsapp.description}
        path="/whatsapp"
      />

      {/* Decorative Glow Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/5"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[100px] dark:bg-primary/5"></div>
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <img src={logo} alt="IICT Logo" className="h-9 w-auto object-contain rounded-md" />
            <span className="text-xs font-black tracking-tight text-foreground sm:text-sm">
              Graam-InfoTech <span className="text-primary">(IICT)</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-semibold hover:bg-card transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </a>
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:pt-16">
        
        {/* Core Invite Box and Quick Info Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1.3fr] items-start">
          
          {/* Left Side: Elevating the Official WhatsApp Join Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card/60 shadow-xl backdrop-blur-md overflow-hidden relative"
          >
            {/* Emerald Top Highlight bar mimicking WhatsApp brand style */}
            <div className="h-2 w-full bg-emerald-500"></div>

            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              
              {/* WhatsApp Iconic Badge */}
              <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-8">
                <WhatsAppIcon className="h-5 w-5" />
                <span>WhatsApp Community</span>
              </div>

              {/* Styled Circular Group Profile Image */}
              <div className="relative mb-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-primary/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-card text-emerald-600 dark:text-emerald-400 shadow-inner">
                  <Users className="h-10 w-10 animate-pulse-slow" />
                </div>
                {/* Visual active badge */}
                <span className="absolute bottom-1 right-1 flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-card">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                </span>
              </div>

              {/* Title & Status */}
              <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                AI TRAINING 26
              </h1>
              <p className="text-sm font-semibold text-muted-foreground mt-1.5">
                Official IICT Cohort Invite
              </p>

              {/* Participant Mock Count & Group Status */}
              <div className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Active Community
                </span>
                <span>•</span>
                <span>750+ participants joined</span>
              </div>

              {/* Divider */}
              <hr className="w-full my-6 border-border" />

              {/* Primary Actions */}
              <div className="w-full space-y-3">
                <a
                  href={groupInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <WhatsAppIcon className="h-6 w-6 shrink-0" />
                  <span>Join Chat / Group</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold hover:bg-secondary transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{copied ? "Copied Link!" : "Copy Invite Link"}</span>
                  </button>
                  <a
                    href="https://web.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold hover:bg-secondary transition-colors"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>WhatsApp Web</span>
                  </a>
                </div>
              </div>

              {/* Desktop Scan Option */}
              <div className="hidden sm:flex flex-col items-center mt-8 p-5 border border-dashed border-border bg-secondary/20 rounded-2xl w-full">
                <MockQRCode />
                <p className="mt-3 text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                  <QrCode className="h-4 w-4 text-primary" />
                  Or scan this QR code with your mobile camera to join
                </p>
              </div>

              {/* Warning/Guidance footnote */}
              <div className="mt-6 flex items-start gap-2.5 text-left p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 leading-normal">
                  Make sure you have WhatsApp installed on your current device. Real-time updates and Zoom links will not be accessible elsewhere.
                </p>
              </div>

            </div>
          </motion.div>

          {/* Right Side: Detailed Perks, Instructions & Expectations */}
          <div className="space-y-6">
            
            {/* High Impact Overview Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-3xl border border-primary/20 bg-primary/5 relative overflow-hidden"
            >
              <div className="absolute right-[-40px] bottom-[-40px] text-primary/10 select-none">
                <Cpu className="h-40 w-40" />
              </div>

              <div className="relative">
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase mb-3">
                  <Sparkles className="h-3 w-3" />
                  <span>Interactive Cohort</span>
                </span>
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Connect, Debug & Learn Live
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
                  This WhatsApp community group brings together fellow students of the <strong className="text-foreground font-semibold">n8n AI Agent Development Course</strong>. Join to stay synchronized with announcements, download code files, and interact with teachers.
                </p>
              </div>
            </motion.div>

            {/* What you get list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-md shadow-sm"
            >
              <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                What is shared inside the group?
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Live session links",
                    desc: "Instant invitations to Zoom, Teams, or Meet lectures so you never miss a class."
                  },
                  {
                    title: "n8n JSON Workflows",
                    desc: "Copy-pasteable JSON templates of the 10 real-world AI agents built during lessons."
                  },
                  {
                    title: "Doubt clearing support",
                    desc: "Post screenshots of logic errors or credential mismatches and get quick answers."
                  },
                  {
                    title: "Placement opportunities",
                    desc: "Announcements regarding internship options and entry-level automation roles."
                  },
                  {
                    title: "Certificate registration",
                    desc: "Step-by-step instructions on claiming your verified IICT completion certificate."
                  },
                  {
                    title: "AI updates & tips",
                    desc: "Stay informed about the latest additions in n8n nodes and OpenAI APIs."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <Check className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Code of Conduct / Rules */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-3xl border border-border bg-card/40 backdrop-blur-md shadow-sm"
            >
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                Group Code of Conduct
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To guarantee high-quality discussions, we expect all participants to follow these simple community boundaries:
              </p>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-foreground/80">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Keep topics strictly focused on AI and n8n pipelines.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  No promotional spam, affiliate links, or random forwards.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Respect other students and foster constructive answers.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Do not contact community members privately without consent.
                </li>
              </ul>
            </motion.div>

          </div>
        </div>

        {/* FAQs Accordion Section */}
        <section className="mt-16 sm:mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground font-semibold">
              Got questions about the WhatsApp group? We have got you covered.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-border bg-card/45 backdrop-blur-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm sm:text-base font-bold text-foreground transition-colors hover:bg-secondary/40"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-primary" : ""
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3 bg-secondary/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>
      
      {/* Visual Backdoor back to Course details */}
      <div className="mt-16 text-center">
        <a 
          href="/n8n-training"
          className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
        >
          <Clock className="h-4 w-4" />
          <span>Go back to N8n Training Course Information Page</span>
        </a>
      </div>
    </div>
  );
}
