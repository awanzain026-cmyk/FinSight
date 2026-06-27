"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { formatCurrency, type CurrencyCode } from "@/lib/currency";

const currencies: { code: CurrencyCode; label: string; flag: string }[] = [
  { code: "PKR", label: "PKR", flag: "🇵🇰" },
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "AED", label: "AED", flag: "🇦🇪" },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useStore();
  const [open, setOpen] = useState(false);

  const current = currencies.find((c) => c.code === currency);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-muted hover:text-white border border-white/10 transition-all"
      >
        <span>{current?.flag}</span>
        <span>{current?.label}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-1 z-50 w-32 glass rounded-xl border border-white/10 py-1 shadow-xl"
          >
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                  currency === c.code ? "text-accent bg-accent/10" : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.label}</span>
                {currency === c.code && (
                  <svg className="w-3 h-3 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
