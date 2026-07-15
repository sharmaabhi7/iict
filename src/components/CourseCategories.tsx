import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Medicine",
    desc: "MD / MBBS degrees in top global NMC & WHO approved state medical universities.",
    path: "/mbbs-abroad",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        <rect x="5.5" y="8.5" width="13" height="7" rx="3.5" stroke="currentColor" />
      </svg>
    )
  },
  {
    title: "Engineering",
    desc: "B.Tech/M.Tech CS, Robotics, & Mechanical courses in Germany & Europe.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Engineering abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m12 4a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4M6 12h12M12 10v2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  },
  {
    title: "Business",
    desc: "MBA & BBA programs with high return on investment & post-study permits.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Business / MBA abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M3 12h18" />
      </svg>
    )
  },
  {
    title: "Information Technology",
    desc: "Advanced specializations in Artificial Intelligence, Cybersecurity, & Data Science.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Information Technology / CS abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    )
  },
  {
    title: "Management Studies",
    desc: "Global Masters in Management (MiM) & PG diplomas with global internship options.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Management Studies abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a6 6 0 0 0-8-5.46M12 11a4 4 0 1 0-4-4M6 21H2M14 21h8M10 21h4" />
      </svg>
    )
  },
  {
    title: "Nursing",
    desc: "Highly demanded healthcare degrees with direct placement opportunities in EU hospitals.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Nursing abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v3H4v-3z" />
        <rect x="2" y="13" width="20" height="7" rx="1.5" />
        <path d="M12 6v4M10 8h4" />
      </svg>
    )
  },
  {
    title: "Health Science",
    desc: "Accredited programs in Public Health, Pharmacy, and Biomedical Sciences abroad.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Health Science abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6a8 8 0 0 1 16 0c0 2.5-1 4.5-2.5 6L10 22l-5.5-5.5z" />
        <path d="M10 7v6M7 10h6" />
      </svg>
    )
  },
  {
    title: "Hospitality & Tourism",
    desc: "Internship-embedded hotel management & culinary arts in Switzerland & EU.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Hospitality & Tourism abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
      </svg>
    )
  },
  {
    title: "Social Science",
    desc: "Undergraduate & postgraduate courses in International Relations, Psychology & Sociology.",
    path: "/register?program=Study Abroad (Bachelors / Masters)&message=I am interested in studying Social Science abroad.",
    icon: (
      <svg className="h-8 w-8 text-gray-750" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11a3 3 0 1 0-3-3M2 20a6 6 0 0 1 12 0M22 20a6 6 0 0 0-6-5" />
      </svg>
    )
  }
];

export function CourseCategories() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header decoration */}
        <div className="flex items-center justify-between mb-12">
          <div className="w-16 h-1 bg-[#ffcc00] rounded-sm" />
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            Popular Study Abroad Courses
          </h2>
          <div className="w-16 h-1 bg-[#ffcc00] rounded-sm" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <Link key={c.title} to={c.path} className="block">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-md cursor-pointer transition-all duration-300 h-full group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon wrapper */}
                  <div className="p-2.5 bg-gray-50 group-hover:bg-red-50 rounded-lg transition-colors shrink-0 mt-0.5">
                    {c.icon}
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-heading text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-tight">
                      {c.title}
                    </span>
                    <p className="text-xs text-gray-500 leading-normal font-medium max-w-[200px]">
                      {c.desc}
                    </p>
                  </div>
                </div>
                
                {/* Right Arrow */}
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-10 text-center">
          <Link
            to="/study-abroad"
            className="inline-flex items-center text-sm font-extrabold text-gray-600 hover:text-red-600 transition-colors gap-2"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
