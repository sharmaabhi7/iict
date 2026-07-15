import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Award, Users, Globe, Calendar, Shield, BookOpen } from "lucide-react";
import founderImg from "@/assets/founder.webp";
import officeImg from "@/assets/office.jpg";
import mehwishImg from "@/assets/mehwish Siddiqui.webp";
import akanshaImg from "@/assets/Akansha Singh.webp";
import mazaImg from "@/assets/Maza Noor.webp";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";

const milestones = [
  { year: "2003", title: "Founded", desc: "Graam-Infotech established with a vision to democratize international education." },
  { year: "2007", title: "1,000 Students", desc: "Reached our first milestone — 1,000 students placed in top universities." },
  { year: "2012", title: "10 Country Partners", desc: "Expanded partnerships across 10 countries with 200+ university tie-ups." },
  { year: "2016", title: "50,000 Students", desc: "Celebrated 50,000 successful student placements globally." },
  { year: "2020", title: "Digital Transformation", desc: "Launched virtual counselling and online services during the pandemic." },
  { year: "2024", title: "250,000+ Students", desc: "Crossed a quarter million students assisted across 60+ countries." },
];

const achievements = [
  { icon: Award, title: "AIRC Certified", desc: "American International Recruitment Council certified agency." },
  { icon: Shield, title: "ICEF Accredited", desc: "Globally recognized accreditation for education agents." },
  { icon: BookOpen, title: "British Council Partner", desc: "Official partner for UK education promotion." },
  { icon: Globe, title: "60+ Countries", desc: "Active university partnerships worldwide." },
];

const team = [
  {
    name: "Mehwish Siddiqui",
    role: "Global Head – International Education",
    badge: "Global Admissions Expert",
    desc: "Undergraduate, Postgraduate, Healthcare, Scholarship Guidance",
    imgUrl: mehwishImg
  },
  {
    name: "Akansha Singh",
    role: "Regional Counsellor – Asia & Europe",
    badge: "Asia & Europe Specialist",
    desc: "Russia, China, Germany, France, Italy, Spain, Sweden & 25+ countries",
    imgUrl: akanshaImg
  },
  {
    name: "Maza Noor",
    role: "Senior Counsellor – English Speaking Countries",
    badge: "USA, UK, Canada, Australia Expert",
    desc: "MBA, Master's Admissions, IELTS/PTE",
    imgUrl: mazaImg
  }
];

export default function AboutPage() {
  const { content } = useContent();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About Us | ${content.global.siteName}`,
    "description": content.pages.about.schemaDescription || content.pages.about.description,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": content.global.siteName,
      "logo": content.global.logoUrl || "https://iict-india.org/src/assets/iict-logo.jpeg"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={content.pages.about.title}
        description={content.pages.about.description}
        path="/about"
        schema={aboutSchema}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">ABOUT US</span>
            <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
              20+ Years of Transforming <span className="text-gradient-primary">Student Dreams</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Since 2003, Graam-Infotech has been India's trusted partner for international education, guiding a quarter million students to the world's best universities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-section-alt py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row border border-gray-100/80"
          >
            {/* Left Column: Founder Photo */}
            <div className="md:w-1/3 min-h-[350px] relative">
              <img
                src={founderImg}
                alt="Dr. Mohammad Ghufran Ali Siddiqui"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>

            {/* Right Column: Founder Details */}
            <div className="md:w-2/3 p-8 md:p-10 flex flex-col gap-6 justify-between">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  Dr. Mohammad Ghufran Ali Siddiqui
                </h2>
                <span className="text-xs font-bold text-red-600 block mt-1">
                  Founder & CEO, GRAAMIICT Education Pvt. Ltd.
                </span>
              </div>

              {/* Badges/Chips */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-gray-200/50">
                  Ph.D. in Physics
                </span>
                <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-gray-200/50">
                  ADCHNE | PGDCA | CNE | CIC | RHCE
                </span>
                <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-gray-200/50">
                  International Book Author
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                With Dr. MGA Siddiqui, you don't get a call centre agent — you get a Ph.D. physicist, Certified Immigration Consultant, and published international author personally guiding your global future. He brings 28+ years of experience in education and technology consulting, specializing in Study Abroad Consultation, Immigration Advisory, and Test Preparation.
              </p>

              {/* Stats Highlight Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-5">
                <div className="bg-gray-50 border border-gray-200/40 p-3.5 rounded-xl text-center flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 leading-tight">
                    <span className="text-red-600 text-sm font-black block">28+</span> Years Experience
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-200/40 p-3.5 rounded-xl text-center flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 leading-tight">
                    <span className="text-red-600 text-sm font-black block">Published</span> International Author
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-200/40 p-3.5 rounded-xl text-center flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 leading-tight">
                    <span className="text-red-600 text-sm font-black block">Study Abroad</span> & Immigration Expert
                  </span>
                </div>
              </div>

              {/* LinkedIn Connect */}
              <a
                href="https://www.linkedin.com/in/dr-mga-siddiqui/"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006297] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors shadow-sm mt-1"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">OUR JOURNEY</span>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">20+ Years of Milestones</h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                  {m.year}
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-foreground">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">ACHIEVEMENTS</span>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Certifications & Recognition</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl border border-border bg-card p-6 text-center shadow-card">
                <a.icon className="mx-auto mb-3 h-10 w-10 text-primary" />
                <h3 className="mb-1 font-heading text-base font-bold text-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <h2 className="font-heading text-3xl font-black text-gray-900">
              Our Expert Counselling Team
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col h-full text-left"
              >
                {/* Counselor Photo */}
                <div className="h-72 relative overflow-hidden bg-gray-100">
                  <img
                    src={t.imgUrl}
                    alt={t.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                </div>
                {/* Counselor Info */}
                <div className="p-6 flex flex-col items-start gap-3 flex-grow">
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-slate-900 leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-xs font-bold text-red-600 tracking-wide mt-1">
                      {t.role}
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-block bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-200/50">
                    {t.badge}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1 flex-grow">
                    {t.desc}
                  </p>

                  {/* Book Session button */}
                  <a
                    href={`https://wa.me/919897278615?text=Hello,%20I'd%20like%20to%20book%20a%20session%20with%20counselor%20${encodeURIComponent(t.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 border border-red-600 hover:bg-red-50 text-red-600 font-black text-xs px-5 py-2.5 rounded-full transition-colors"
                  >
                    Book Session &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">OUR OFFICES</span>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Where We Work</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl shadow-card">
            <img src={officeImg} alt="Graam-Infotech office" className="w-full object-cover" loading="lazy" width={1280} height={720} />
          </motion.div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
