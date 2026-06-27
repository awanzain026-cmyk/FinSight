"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import DataEntryForm from "@/components/DataEntryForm";
import ProfitCard from "@/components/ProfitCard";
import { MonthlyBarChart, ExpensePieChart } from "@/components/Charts";
import AIInsights from "@/components/AIInsights";
import DataTable from "@/components/DataTable";
import DemoDataButton from "@/components/DemoDataButton";
import PDFExport from "@/components/PDFExport";
import { useStore } from "@/lib/store";

function SummaryCards() {
  const {
    totalIncome,
    totalExpenses,
    netProfit,
    profitMargin,
    totalInventoryValue,
    totalReceivablesOutstanding,
    totalPayablesOutstanding,
    formatAmount,
  } = useStore();

  const cards = [
    {
      label: "Net Profit",
      value: formatAmount(Math.abs(netProfit), 0),
      prefix: netProfit >= 0 ? "+" : "-",
      color: netProfit >= 0 ? "text-success" : "text-danger",
      sub: `${profitMargin.toFixed(1)}% margin`,
    },
    {
      label: "Income",
      value: formatAmount(totalIncome, 0),
      prefix: "",
      color: "text-success",
      sub: `${totalExpenses > 0 ? "×" + (totalIncome / (totalExpenses || 1)).toFixed(1) : "—"} ratio`,
    },
    {
      label: "Inventory Value",
      value: formatAmount(totalInventoryValue, 0),
      prefix: "",
      color: "text-accent",
      sub: "total stock",
    },
    {
      label: "Receivables",
      value: formatAmount(totalReceivablesOutstanding, 0),
      prefix: "",
      color: "text-warning",
      sub: "outstanding",
    },
    {
      label: "Payables",
      value: formatAmount(totalPayablesOutstanding, 0),
      prefix: "",
      color: "text-danger",
      sub: "to pay",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="glass glass-hover rounded-xl p-4 glow text-center"
        >
          <p className="text-xs text-muted uppercase tracking-wider mb-1">{card.label}</p>
          <p className={`text-lg sm:text-xl font-bold ${card.color}`}>
            {card.prefix}{card.value}
          </p>
          <p className="text-xs text-muted/60 mt-0.5">{card.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

function AutoLoadDemo() {
  const { loadDemoData, entryCount } = useStore();
  const searchParams = useSearchParams();
  const triggered = useRef(false);

  useEffect(() => {
    if (searchParams.get("demo") === "1" && entryCount === 0 && !triggered.current) {
      triggered.current = true;
      loadDemoData();
    }
  }, [searchParams, entryCount, loadDemoData]);

  return null;
}

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Suspense fallback={null}><AutoLoadDemo /></Suspense>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            Overview
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted text-sm mt-1"
          >
            Your business at a glance
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <PDFExport />
        </motion.div>
      </div>

      <DemoDataButton />

      <SummaryCards />

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <DataEntryForm />
        </div>
        <div className="lg:col-span-2">
          <ProfitCard />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <MonthlyBarChart />
        <ExpensePieChart />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <AIInsights />
        </div>
        <div className="lg:col-span-2">
          <DataTable />
        </div>
      </div>
    </motion.div>
  );
}
