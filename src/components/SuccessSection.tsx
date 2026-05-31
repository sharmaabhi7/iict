import { motion } from "framer-motion";

const stats = [
  { value: "800+", label: "Total Courses" },
  { value: "1,500+", label: "Universities" },
  { value: "6,000+", label: "Students Served" },
  { value: "93%", label: "Visa Success Ratio" },
  { value: "12+", label: "Years of Experience" },
  { value: "75L+", label: "Budgeting assistance" }
];

export function SuccessSection() {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-150">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-800 tracking-wider uppercase">
              GRAAM-INFOTECH SUCCESS FOR THE LAST 10 YEARS
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Study Abroad Consultants
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-2">
              Welcome to Graam-Infotech Overseas Educon Limited, the first NSE Listed Public Limited Company having a combination of student mobility services along with ed-tech. Our expertise lies in guiding aspiring Indian students looking to study abroad. Our trained counselors at All India Counseling Centers, backed by physical centers across the country in multiple cities, have helped thousands of students reach their dream global career!
            </p>
          </div>

          {/* Right Stats Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-3"
              >
                {/* Yellow Accent Bar */}
                <div className="w-1.5 h-full bg-[#ffcc00] shrink-0 rounded-sm" />
                
                <div className="flex flex-col justify-center">
                  <span className="text-3xl md:text-4xl font-black text-red-600 tracking-tight leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
