"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span className="text-lg font-semibold text-white">FinSight</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                !isDashboard ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm transition-colors ${
                isDashboard ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            {!isDashboard && (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
