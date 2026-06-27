"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    title: "AI Insights",
    desc: "Click one button and get 4 personalized business insights — actionable advice based on your real financial data.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Live Charts",
    desc: "Bar charts and pie charts that update instantly when you add data. See income vs expenses and category breakdowns.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "PDF Export",
    desc: "Export a professional one-page PDF report with your KPIs, charts, and AI insights. Perfect for accountants.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-white font-bold text-sm">F</div>
              <span className="text-base font-bold text-white tracking-tight">FinSight</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors glow"
              >
                Launch Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      <main>
        <section className="relative flex items-center justify-center px-4 pt-24 pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                AI-Powered Financial Dashboard
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
            >
              <span className="text-white">FinSight —</span>
              <br />
              <span className="text-gradient">Know Your Business</span>
              <br />
              <span className="text-white">Numbers Instantly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              Track income, expenses, inventory, and receivables. Get AI-powered insights and
              professional PDF reports — no accounting degree required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/dashboard?demo=1"
                className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl text-base transition-all glow"
              >
                Try Live Demo
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl text-base border border-white/10 transition-all"
              >
                Launch Dashboard
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need in{" "}
              <span className="text-gradient">one dashboard</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover rounded-xl p-6 glow group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/5 py-8">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} FinSight — AI-Powered Financial Dashboard
          </p>
        </footer>
      </main>
    </>
  );
}
