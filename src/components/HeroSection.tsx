import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContent } from "@/contexts/ContentContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const flags = [
  { code: "it", name: "Italy" },
  { code: "fr", name: "France" },
  { code: "lv", name: "Latvia" },
  { code: "lt", name: "Lithuania" },
  { code: "hu", name: "Hungary" },
  { code: "hr", name: "Croatia" },
  { code: "de", name: "Germany" },
  { code: "pl", name: "Poland" },
];

export function HeroSection() {
  const { content } = useContent();

  const [counselName, setCounselName] = useState("");
  const [counselEmail, setCounselEmail] = useState("");
  const [counselPhone, setCounselPhone] = useState("");
  const [counselInterest, setCounselInterest] = useState("");
  const [counselProgram, setCounselProgram] = useState("");
  const [countryCode, setCountryCode] = useState("in");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCounsellingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselName.trim() || !counselEmail.trim() || !counselPhone.trim()) {
      toast.error("Please fill in Name, Email, and Contact Number.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const fullPhone = `+${countryCode === "in" ? "91" : countryCode === "us" ? "1" : "44"} ${counselPhone.trim()}`;
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";

      // Save local backup lead
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
      const newLead = {
        name: counselName.trim(),
        email: counselEmail.trim(),
        phone: fullPhone,
        whatsapp: fullPhone,
        country: "N/A",
        program: `${counselInterest || "General Interest"} (${counselProgram || "General Program"})`,
        message: "Free 1-on-1 counseling request from Hero Section form.",
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

      toast.success("Counselling Session Booked!", {
        description: "An admissions officer will contact you within 24 hours.",
      });

      // Reset form
      setCounselName("");
      setCounselEmail("");
      setCounselPhone("");
      setCounselInterest("");
      setCounselProgram("");
    } catch (error) {
      console.error("Error submitting counseling form:", error);
      toast.error("Registration saved locally", {
        description: "We captured your request locally and will sync once online.",
      });
      setCounselName("");
      setCounselEmail("");
      setCounselPhone("");
      setCounselInterest("");
      setCounselProgram("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSubtitle = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span key={index} className="text-[#008080]">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#e6f4f1] pb-24 pt-12">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-no-repeat bg-cover bg-right"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>

      <div className="container relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Content Side */}
        <div className="flex flex-col items-start gap-6 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-[64px]">
              {content.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-gray-800">
              {renderSubtitle(content.hero.subtitle)}
            </p>
            <p className="mt-2 text-sm sm:text-base font-semibold text-gray-700">
              {content.hero.description}
            </p>
          </motion.div>

          {/* Flags Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-2 sm:gap-4 mt-6 w-full max-w-md"
          >
            {flags.map((flag) => (
              <Link
                key={flag.code}
                to="/countries"
                className="flex flex-col items-center gap-1 group cursor-pointer transition-transform hover:scale-105"
              >
                <img 
                  src={`https://flagcdn.com/w80/${flag.code}.png`} 
                  alt={flag.name}
                  className="w-12 h-9 sm:w-16 sm:h-12 rounded-sm shadow-sm object-cover border border-gray-200 group-hover:border-red-500 group-hover:shadow-md transition-all"
                />
                <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center group-hover:text-red-600 transition-colors">{flag.name}</span>
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white rounded-md px-8 h-12 text-base group w-full sm:w-auto">
                Register Now <ArrowRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Form Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:ml-auto w-full max-w-md"
        >
          <div className="rounded-2xl bg-white p-8 shadow-2xl relative z-20">
            <h3 className="mb-6 text-xl font-bold text-gray-800">Get one on one free counselling</h3>
            
            <form className="space-y-4" onSubmit={handleCounsellingSubmit}>
              <Select value={counselInterest} onValueChange={setCounselInterest}>
                <SelectTrigger className="w-full h-12 bg-white text-gray-600">
                  <SelectValue placeholder="Select Your Interest*" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200">
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select value={counselProgram} onValueChange={setCounselProgram}>
                <SelectTrigger className="w-full h-12 bg-white text-gray-600">
                  <SelectValue placeholder="Select Program*" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200">
                  <SelectItem value="Bachelors">Bachelors</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                </SelectContent>
              </Select>

              <Input 
                placeholder="Enter Your Name*" 
                className="h-12 border-slate-200" 
                value={counselName}
                onChange={(e) => setCounselName(e.target.value)}
                required
              />
              <Input 
                placeholder="Enter Your EmailID*" 
                type="email" 
                className="h-12 border-slate-200" 
                value={counselEmail}
                onChange={(e) => setCounselEmail(e.target.value)}
                required
              />
              
              <div className="flex gap-2">
                <Select defaultValue="in" value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-28 h-12 bg-white text-gray-600">
                    <SelectValue placeholder="IN (91)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200">
                    <SelectItem value="in">IN (91)</SelectItem>
                    <SelectItem value="us">US (1)</SelectItem>
                    <SelectItem value="uk">UK (44)</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="Enter Contact No.*" 
                  type="tel" 
                  className="flex-1 h-12 border-slate-200" 
                  value={counselPhone}
                  onChange={(e) => setCounselPhone(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#cc0000] hover:bg-[#aa0000] text-white text-base font-semibold group flex items-center justify-between px-6 mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Booking...
                  </span>
                ) : (
                  <span>Book Free Counselling</span>
                )}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
