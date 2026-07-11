import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  { name: "Russia", code: "ru" },
  { name: "Georgia", code: "ge" },
  { name: "Uzbekistan", code: "uz" },
  { name: "China", code: "cn" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Nepal", code: "np" },
  { name: "Egypt", code: "eg" },
  { name: "Germany", code: "de" },
  { name: "Italy", code: "it" },
  { name: "Poland", code: "pl" },
  { name: "Belarus", code: "by" },
  { name: "Latvia", code: "lv" },
];

const getDestinationPath = (name: string) => {
  if (name === "Russia") return "/countries/russia";
  if (name === "Georgia") return "/countries/georgia";
  const mbbsCountries = ["Uzbekistan", "China", "Kazakhstan", "Nepal", "Egypt", "Belarus"];
  const service = mbbsCountries.includes(name) ? "mbbs-abroad" : "study-abroad";
  return `/contact?service=${service}&country=${name}`;
};

export function DestinationsSection() {
  return (
    <section id="destinations" className="bg-white py-20 mt-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 text-center"
        >
          <h2 className="font-heading text-4xl font-extrabold text-gray-800">
            Where would you <span className="text-red-600">like to study?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-6 max-w-5xl mx-auto">
          {destinations.map((d, i) => (
            <Link
              key={d.name}
              to={getDestinationPath(d.name)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-4 border-2 border-transparent group-hover:border-red-500 transition-colors">
                  <img 
                    src={`https://flagcdn.com/w160/${d.code}.png`} 
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                  {d.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/countries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Counselor/Expert Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          {counselors.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl overflow-hidden p-6 relative flex flex-col justify-between h-72 ${c.bg} border border-black/5 shadow-sm hover:shadow-md transition-shadow`}
            >
              {/* Card Text Content */}
              <div className="z-10 max-w-[60%] flex flex-col gap-2">
                <h3 className={`font-heading text-xl font-bold ${c.textColor}`}>
                  {c.title}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {c.desc}
                </p>
                <a
                  href="#"
                  className={`text-xs font-bold ${c.textColor} hover:underline mt-2 inline-flex items-center gap-1`}
                >
                  Learn More &rarr;
                </a>
              </div>

              {/* Counselor Photo (Positioned Absolutely on bottom-right) */}
              <div className="absolute right-0 bottom-0 w-[45%] h-[85%] overflow-hidden pointer-events-none flex items-end justify-end">
                <img
                  src={c.imgUrl}
                  alt={c.title}
                  className="object-cover object-center h-full w-full rounded-tl-3xl shadow-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const counselors = [
  {
    title: "Expert Counselling",
    desc: "Get admission in top global universities with personal assistance from our certified academic counsellors.",
    bg: "bg-[#e6f7f4]",
    textColor: "text-[#008080]",
    imgUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Visa Assistance",
    desc: "Meticulous verification of documents and complete visa preparation for smooth, fast approvals.",
    bg: "bg-[#fff9e6]",
    textColor: "text-[#b38600]",
    imgUrl: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Career Roadmap",
    desc: "Find the right course, university, and budget fit based on your individual academic goals and dreams.",
    bg: "bg-[#f9e6ff]",
    textColor: "text-[#800080]",
    imgUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
  }
];
