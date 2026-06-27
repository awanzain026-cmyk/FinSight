"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function PDFExport() {
  const { entryCount, formatAmount, totalIncome, totalExpenses, netProfit, profitMargin } = useStore();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (entryCount === 0) return;
    setExporting(true);

    try {
      const { default: jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = 190;

      pdf.setFillColor(10, 10, 15);
      pdf.rect(0, 0, 210, 297, "F");

      // header bar
      pdf.setFillColor(108, 99, 255);
      pdf.rect(0, 0, 210, 8, "F");

      // title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.text("FinSight", 105, 20, { align: "center" });

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(148, 163, 184);
      pdf.text(`Financial Report — ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`, 105, 28, { align: "center" });

      pdf.setDrawColor(108, 99, 255);
      pdf.setLineWidth(0.3);
      pdf.line(10, 32, 200, 32);

      // KPI boxes
      const kpis = [
        { label: "Total Income", value: formatAmount(totalIncome, 0), color: [16, 185, 129] },
        { label: "Total Expenses", value: formatAmount(totalExpenses, 0), color: [239, 68, 68] },
        { label: "Net Profit", value: formatAmount(netProfit, 0), color: netProfit >= 0 ? [16, 185, 129] : [239, 68, 68] },
        { label: "Profit Margin", value: `${profitMargin.toFixed(1)}%`, color: netProfit >= 0 ? [16, 185, 129] : [239, 68, 68] },
      ];

      let x = 10;
      const boxW = 44;
      const boxH = 22;
      for (const kpi of kpis) {
        pdf.setFillColor(26, 26, 46);
        pdf.setDrawColor(108, 99, 255);
        pdf.setLineWidth(0.2);
        pdf.roundedRect(x, 38, boxW, boxH, 2, 2, "FD");

        pdf.setFontSize(6);
        pdf.setTextColor(148, 163, 184);
        pdf.text(kpi.label, x + boxW / 2, 46, { align: "center" });

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
        pdf.text(kpi.value, x + boxW / 2, 55.5, { align: "center" });
        x += boxW + 2.5;
      }

      // Try to capture charts
      const chartElements = document.querySelectorAll(".recharts-wrapper");
      let yPos = 68;
      if (chartElements.length >= 2) {
        try {
          const w = 85;
          const chartData1 = await html2canvas(chartElements[0] as HTMLElement, { backgroundColor: "#1a1a2e", scale: 2 });
          const chartData2 = await html2canvas(chartElements[1] as HTMLElement, { backgroundColor: "#1a1a2e", scale: 2 });
          pdf.addImage(chartData1.toDataURL(), "PNG", 10, yPos, w, 55);
          pdf.addImage(chartData2.toDataURL(), "PNG", 105, yPos, w, 55);
          yPos += 62;
        } catch {
          yPos += 0;
        }
      }

      // summary line
      pdf.setDrawColor(108, 99, 255);
      pdf.setLineWidth(0.3);
      pdf.line(10, yPos + 5, 200, yPos + 5);

      // breakdown
      yPos += 12;
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("Summary", 105, yPos, { align: "center" });

      const summaryLines = [
        `Total Income: ${formatAmount(totalIncome, 0)} | Total Expenses: ${formatAmount(totalExpenses, 0)}`,
        `Net Profit: ${formatAmount(netProfit, 0)} | Profit Margin: ${profitMargin.toFixed(1)}%`,
        `Total Transactions: ${entryCount}`,
      ];

      yPos += 8;
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(148, 163, 184);
      pdf.setFontSize(8);
      for (const line of summaryLines) {
        pdf.text(line, 105, yPos, { align: "center" });
        yPos += 5;
      }

      // AI Insights section
      const insightCards = document.querySelectorAll('[class*="rounded-lg"][class*="border-"]');
      if (insightCards.length >= 4) {
        yPos += 6;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(108, 99, 255);
        pdf.text("AI Insights", 105, yPos, { align: "center" });

        yPos += 5;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);
        for (let i = 0; i < Math.min(4, insightCards.length); i++) {
          const text = insightCards[i]?.textContent?.trim() || "";
          if (text) {
            const lines = pdf.splitTextToSize(`${i + 1}. ${text}`, pageW - 20);
            pdf.setTextColor(226, 232, 240);
            for (const line of lines) {
              pdf.text(line, 10, yPos);
              yPos += 4;
            }
            yPos += 2;
          }
        }
      }

      // footer
      pdf.setFontSize(7);
      pdf.setTextColor(100, 116, 139);
      pdf.text("Generated by FinSight — AI-Powered Financial Dashboard", 105, 285, { align: "center" });

      pdf.save(`FinSight_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting || entryCount === 0}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-muted hover:text-white text-sm font-medium rounded-lg border border-white/10 transition-all"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      {exporting ? "Exporting..." : "Download Report"}
    </button>
  );
}
