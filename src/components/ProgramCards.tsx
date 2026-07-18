import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Study Medicine Abroad",
    desc: "Embark on your medical education journey abroad at half the cost of Indian private medical colleges. Discover over 200 renowned universities across 30 countries and learn about their courses, fees, and other details.",
    imgUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
    path: "/mbbs-abroad"
  },
  {
    title: "Study in Europe at Indian Costs!",
    desc: "Pursue affordable specializations in engineering, business, economics, hospitality, and management in Europe. Benefit from post-study visa opportunities to work and settle down on the continent.",
    imgUrl: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=600&auto=format&fit=crop",
    path: "/study-abroad"
  },
  {
    title: "Integrated German Skill Program",
    desc: "This affordable program helps ambitious students prepare for a future in Germany while pursuing diploma or vocational courses after 12th grade. It offers a pathway to study, train, and earn, with a potential salary of ₹30 Lakh and more after completion.",
    imgUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop",
    path: "/countries/germany"
  }
];

export function ProgramCards() {
  return (
    <section className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full group"
            >
              {/* Image Header */}
              <Link to={card.path} className="h-48 overflow-hidden relative block">
                <img
                  src={card.imgUrl}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </Link>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <Link to={card.path}>
                  <h3 className="font-heading text-xl font-bold text-gray-900 leading-snug hover:text-red-600 transition-colors">
                    {card.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {card.desc}
                </p>
                <Link
                  to={card.path}
                  className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide inline-flex items-center gap-1.5 self-start"
                >
                  Know More &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
