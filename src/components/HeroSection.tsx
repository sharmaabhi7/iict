import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContent } from "@/contexts/ContentContext";

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
              <div key={flag.code} className="flex flex-col items-center gap-1">
                <img 
                  src={`https://flagcdn.com/w80/${flag.code}.png`} 
                  alt={flag.name}
                  className="w-12 h-9 sm:w-16 sm:h-12 rounded-sm shadow-sm object-cover border border-gray-200"
                />
                <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center">{flag.name}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Button size="lg" variant="outline" className="border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white rounded-md px-8 h-12 text-base group">
              Register Now <ArrowRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
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
            
            <form className="space-y-4">
              <Select>
                <SelectTrigger className="w-full h-12 bg-white text-gray-600">
                  <SelectValue placeholder="Select Your Interest*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full h-12 bg-white text-gray-600">
                  <SelectValue placeholder="Select Program*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelors</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Enter Your Name*" className="h-12" />
              <Input placeholder="Enter Your EmailID*" type="email" className="h-12" />
              
              <div className="flex gap-2">
                <Select defaultValue="in">
                  <SelectTrigger className="w-28 h-12 bg-white text-gray-600">
                    <SelectValue placeholder="IN (91)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">IN (91)</SelectItem>
                    <SelectItem value="us">US (1)</SelectItem>
                    <SelectItem value="uk">UK (44)</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Enter Contact No.*" type="tel" className="flex-1 h-12" />
              </div>

              <Button className="w-full h-12 bg-[#cc0000] hover:bg-[#aa0000] text-white text-base font-semibold group flex items-center justify-between px-6 mt-4">
                <span>Book Free Counselling</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
