import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const students = [
  {
    name: "Anisha",
    program: "General Medicine",
    imgUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Arya",
    program: "General Medicine",
    imgUrl: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Anushka",
    program: "General Medicine",
    imgUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Aarya",
    program: "Medicine",
    imgUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop"
  }
];

export function StudentCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll through dot groups on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % students.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#fcfcfc] py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Slider Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {students.map((student, idx) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-2xl h-80 shadow-md group cursor-pointer border border-gray-150 transition-transform duration-300 hover:-translate-y-1 ${
                idx === activeIndex ? "ring-2 ring-red-600 sm:ring-0" : ""
              }`}
            >
              {/* Background Image */}
              <img
                src={student.imgUrl}
                alt={student.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Video Overlay Tint */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-colors" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 fill-current ml-1" />
                </div>
              </div>

              {/* Student Details (Bottom Left) */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 pointer-events-none">
                {/* Name Badge */}
                <div className="self-start bg-[#ffcc00] text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                  Name:<span className="font-extrabold">{student.name}</span>
                </div>
                {/* Program Badge */}
                <div className="self-start bg-white text-black text-[11px] font-semibold px-3 py-1 rounded-sm shadow-sm">
                  Program:<span className="font-extrabold text-gray-800">{student.program}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {students.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex 
                  ? "w-6 bg-red-600" 
                  : "w-2.5 bg-red-200 hover:bg-red-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
