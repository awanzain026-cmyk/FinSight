"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    title: "AI-Powered Insights",
    desc: "Get 4 actionable business insights instantly. Our AI analyzes your income, expenses, and trends to find opportunities and risks you might miss.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: "Live Charts & Reports",
    desc: "Bar charts, pie charts, and financial statements that update the moment you add data. Export to PDF with one click.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Multi-Currency",
    desc: "Support for PKR, USD, GBP, and AED. Switch currencies anytime — all amounts update instantly across the entire dashboard.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Full Financial Suite",
    desc: "Income & expense tracking, inventory management, accounts receivable, accounts payable, and financial statements — all in one place.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
];

const steps = [
  { title: "Add Your Data", desc: "Manually enter income and expenses with categories, or load demo data to see how it works instantly.", num: "01" },
  { title: "Visualize Finances", desc: "Watch your data transform into beautiful charts, profit analysis, and professional financial statements.", num: "02" },
  { title: "Get AI Insights", desc: "Click one button to get 4 personalized business insights — actionable advice based on your real numbers.", num: "03" },
];

const testimonials = [
  {
    name: "Ahmed Riaz",
    business: "Al-Zain Traders, Lahore",
    text: "FinSight completely changed how I look at my clothing business. The AI insights told me my rent was too high — I negotiated and saved Rs. 15,000/month.",
    rating: 5,
  },
  {
    name: "Fatima Usman",
    business: "Boutique by Sara, Karachi",
    text: "I was using spreadsheets before. FinSight's dashboard shows me everything at a glance — profit, expenses, who owes me money. It's a game changer.",
    rating: 5,
  },
  {
    name: "Omar Hassan",
    business: "Hassan Electronics, Islamabad",
    text: "The PDF export feature alone saves me hours every month. I send reports to my accountant in minutes. The multi-currency support is perfect for my import business.",
    rating: 5,
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
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white tracking-tight">FinSight</span>
                <span className="text-[10px] text-accent font-medium tracking-wider uppercase">Dashboard</span>
              </div>
            </Link>
            <nav className="flex items-center gap-6">
              <a href="#features" className="text-sm text-muted hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-muted hover:text-white transition-colors">How it Works</a>
              <a href="#testimonials" className="text-sm text-muted hover:text-white transition-colors">Testimonials</a>
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
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/8 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                AI-Powered Financial Intelligence for Small Businesses
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Know Your</span>
              <br />
              <span className="text-gradient">Business Numbers</span>
              <br />
              <span className="text-white">Instantly</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Track income, expenses, inventory, and receivables. Get AI-powered insights and
              professional financial reports — no accounting degree required.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl text-base transition-all glow"
              >
                Launch Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl text-base border border-white/10 transition-all"
              >
                Try Live Demo →
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { label: "Modules", value: "5", suffix: "financial tools" },
                { label: "AI Powered", value: "Real", suffix: "insights" },
                { label: "Free", value: "100%", suffix: "no signup" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              Everything Included
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              A complete financial toolkit for{" "}
              <span className="text-gradient">your business</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              No bloated software. Just the tools you actually need to understand and grow your business.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <section id="how-it-works" className="max-w-5xl mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              Simple Setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start in{" "}
              <span className="text-gradient">three simple steps</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="max-w-7xl mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              Trusted by Business Owners
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What our{" "}
              <span className="text-gradient">users say</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover rounded-xl p-6 glow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm text-white font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.business}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-10 sm:p-16 glow"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-muted mb-8 max-w-lg mx-auto">
              No sign up required. Everything stays on your device. Start tracking in seconds.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl text-base transition-all glow"
            >
              Launch Dashboard Free
            </Link>
          </motion.div>
        </section>

        <footer className="border-t border-white/5 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-white font-bold text-xs">F</div>
              <span className="text-sm font-semibold text-white">FinSight</span>
            </Link>
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} FinSight. AI-Powered Financial Dashboard for Small Businesses.
            </p>
            <p className="text-xs text-muted/60 mt-1">
              Your data stays on your device. No cloud storage, no signup required.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
