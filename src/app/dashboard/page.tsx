"use client";

import { motion } from "framer-motion";
import DataEntryForm from "@/components/DataEntryForm";
import ProfitCard from "@/components/ProfitCard";
import { MonthlyBarChart, ExpensePieChart } from "@/components/Charts";
import AIInsights from "@/components/AIInsights";
import DataTable from "@/components/DataTable";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white"
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted text-sm mt-1"
        >
          Track your income, expenses, and get AI-powered insights
        </motion.p>
      </div>

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
