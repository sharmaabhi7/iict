import { Play } from "lucide-react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Tanya Sharma",
    program: "MBBS in Russia",
    imgUrl: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=400&auto=format&fit=crop",
    quote: "Got placed in a top Russian medical academy. Graam-Infotech handled everything seamlessly!"
  },
  {
    name: "Rohan Varma",
    program: "Medicine in Georgia",
    imgUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
    quote: "Top-notch coaching for licensing exams. The travel assistance was extremely professional."
  },
  {
    name: "Priyanka Sen",
    program: "General Medicine",
    imgUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    quote: "Now preparing for USMLE. The mentorship and material are top class!"
  }
];

export function CareerStories() {
  return (
    <section className="bg-white py-16 border-b border-gray-100 relative overflow-hidden">
      
      {/* Decorative Yellow Triangle */}
      <div className="absolute left-6 bottom-16 w-16 h-16 border-4 border-[#ffcc00] border-t-transparent border-r-transparent transform -rotate-12 rounded-bl-lg pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
            Career Stories of <span className="text-red-600">Graam-Infotech Students...</span>
          </h2>
          <a
            href="#"
            className="text-sm font-extrabold text-gray-600 hover:text-red-600 transition-colors uppercase tracking-wider inline-flex items-center gap-1 shrink-0"
          >
            Explore More &rarr;
          </a>
        </div>

        {/* Text Paragraph */}
        <p className="text-sm md:text-base text-gray-600 max-w-4xl leading-relaxed mb-12">
          At Graam-Infotech, our dedication to student success has helped numerous students pursue their studies in Europe, Russia, Georgia, China, and other countries. Our proven track record in mentoring students through their educational journey, up to postgraduate studies, has established Graam-Infotech as the most trusted overseas educational consultant in India.
        </p>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              {/* Image Preview */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img
                  src={story.imgUrl}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md transform transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h4 className="font-heading text-base font-extrabold text-gray-900 leading-tight">
                    {story.name}
                  </h4>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">
                    {story.program}
                  </span>
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed flex-1">
                  "{story.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
