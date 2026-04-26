import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTABanner } from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Award, Users, Globe, Calendar, Shield, BookOpen } from "lucide-react";
import founderImg from "@/assets/founder.jpg";
import officeImg from "@/assets/office.jpg";

const milestones = [
  { year: "2003", title: "Founded", desc: "EduBridge established with a vision to democratize international education." },
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
  { name: "Rajesh Kumar", role: "Founder & CEO", initials: "RK" },
  { name: "Priya Menon", role: "Head of Counselling", initials: "PM" },
  { name: "Amit Sharma", role: "Visa Director", initials: "AS" },
  { name: "Neha Gupta", role: "Student Success Lead", initials: "NG" },
  { name: "Sanjay Patel", role: "UK & Europe Head", initials: "SP" },
  { name: "Kavita Rao", role: "Australia & NZ Head", initials: "KR" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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
              Since 2003, EduBridge has been India's trusted partner for international education, guiding a quarter million students to the world's best universities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={founderImg} alt="Founder" className="rounded-3xl shadow-card" loading="lazy" width={800} height={800} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="mb-3 inline-block text-sm font-semibold text-primary">FOUNDER'S STORY</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">A Vision Born from Experience</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              In 2003, Rajesh Kumar — himself a graduate of a prestigious UK university — saw firsthand how confusing and overwhelming the study abroad process was for Indian students. With a deep passion for education and a desire to bridge the gap, he founded EduBridge.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as a one-room consultancy in Mumbai has grown into India's most trusted study abroad advisory, with offices in 12 cities and partnerships with 800+ universities across the globe.
            </p>
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
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">OUR TEAM</span>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Meet the Experts</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-heading text-lg font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading text-base font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
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
            <img src={officeImg} alt="EduBridge office" className="w-full object-cover" loading="lazy" width={1280} height={720} />
          </motion.div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
