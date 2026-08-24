import { useState } from "react";
import { Instagram, Heart, MessageCircle, ExternalLink, Play, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface InstaPost {
  id: string;
  type: "reel" | "image";
  imageUrl: string;
  likes: string;
  comments: string;
  caption: string;
  tag: string;
  url: string;
}

const INSTAGRAM_ACCOUNT = "gieducationoverseas";
const INSTAGRAM_URL = "https://www.instagram.com/gieducationoverseas/";

const posts: InstaPost[] = [
  {
    id: "post-1",
    type: "reel",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
    likes: "1.4k",
    comments: "128",
    caption: "Student batch departure at IGI Airport for Bashkir State Medical University! ✈️🩺 #MBBSAbroad #GraamIICT",
    tag: "Batch Departure",
    url: INSTAGRAM_URL
  },
  {
    id: "post-2",
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop",
    likes: "2.1k",
    comments: "94",
    caption: "Hands-on Clinical Training & Anatomy Lab session at Samarkand State Medical University 🥼🧬",
    tag: "Clinical Practice",
    url: INSTAGRAM_URL
  },
  {
    id: "post-3",
    type: "reel",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    likes: "3.8k",
    comments: "215",
    caption: "Graduation Day 🎓 Proud moments as our students receive their MD degrees! #FutureDoctors",
    tag: "Graduation 2025",
    url: INSTAGRAM_URL
  },
  {
    id: "post-4",
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=600&auto=format&fit=crop",
    likes: "1.8k",
    comments: "86",
    caption: "Hostel life & Indian Mess facilities tour at Tashkent Medical Academy 🏢🍲 #StudentLife",
    tag: "Campus & Hostel",
    url: INSTAGRAM_URL
  },
  {
    id: "post-5",
    type: "reel",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
    likes: "2.9k",
    comments: "142",
    caption: "One-on-One Counselling Session with Dr. MGA Siddiqui for 2026-27 MBBS Admissions 📋🩺",
    tag: "Admissions Open",
    url: INSTAGRAM_URL
  },
  {
    id: "post-6",
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop",
    likes: "1.2k",
    comments: "67",
    caption: "Simulation lab training & robotic surgical equipment demo at Kursk State Medical University 🔬🤖",
    tag: "High-Tech Labs",
    url: INSTAGRAM_URL
  }
];

export function InstagramGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-16 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-200/60">
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Instagram Profile Ring Avatar */}
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-md group shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-white p-1 rounded-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xl overflow-hidden shadow-inner">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white" />
              </span>
            </a>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-bold tracking-widest text-pink-600 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Official Instagram Feed
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                @{INSTAGRAM_ACCOUNT}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
                Follow our student journeys, departure updates & campus tours across 60+ countries
              </p>
            </div>
          </div>

          {/* Follow Button */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:via-pink-700 hover:to-rose-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-pink-500/20 transition-all duration-300 hover:shadow-pink-500/35 hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 bg-slate-900 cursor-pointer transition-all duration-300"
            >
              {/* Post Image */}
              <img
                src={post.imageUrl}
                alt={post.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Top Tag Badge */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                  {post.tag}
                </span>
              </div>

              {/* Reel indicator icon if video */}
              {post.type === "reel" && (
                <div className="absolute top-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full border border-white/20">
                  <Play className="w-3 h-3 fill-current text-white" />
                </div>
              )}

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col justify-between p-3.5 z-20 ${
                  hoveredId === post.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Top stats */}
                <div className="flex items-center justify-end gap-3 text-white text-xs font-bold pt-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                    {post.comments}
                  </span>
                </div>

                {/* Bottom Caption preview & action button */}
                <div>
                  <p className="text-white text-[11px] font-medium leading-snug line-clamp-3 mb-2 opacity-90">
                    {post.caption}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-400 group-hover:text-pink-300">
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Banner note */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold text-slate-400">
            Join 50,000+ medical aspirants following <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-bold">@gieducationoverseas</a> for daily updates & MBBS counseling tips.
          </p>
        </div>
      </div>
    </section>
  );
}
