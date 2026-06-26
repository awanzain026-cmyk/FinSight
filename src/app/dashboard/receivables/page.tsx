"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import type { Receivable } from "@/lib/types";

export default function ReceivablesPage() {
  const {
    receivables,
    addReceivable,
    updateReceivable,
    deleteReceivable,
    totalReceivablesOutstanding,
  } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)
  );
  const [editing, setEditing] = useState<string | null>(null);

  const totalReceivables = useMemo(
    () => receivables.reduce((s, r) => s + r.amount, 0),
    [receivables]
  );
  const totalPaid = useMemo(
    () => receivables.reduce((s, r) => s + r.paidAmount, 0),
    [receivables]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!customerName.trim() || !invoiceNumber.trim() || isNaN(amt) || amt <= 0) return;

    if (editing) {
      const r = receivables.find((x) => x.id === editing);
      if (r) {
        updateReceivable({
          ...r,
          customerName: customerName.trim(),
          invoiceNumber: invoiceNumber.trim(),
          amount: amt,
          dueDate: new Date(dueDate).toISOString(),
        });
      }
      setEditing(null);
    } else {
      addReceivable({
        customerName: customerName.trim(),
        invoiceNumber: invoiceNumber.trim(),
        amount: amt,
        paidAmount: 0,
        issueDate: new Date().toISOString(),
        dueDate: new Date(dueDate).toISOString(),
        status: "pending",
      });
    }

    setCustomerName("");
    setInvoiceNumber("");
    setAmount("");
    setEditing(null);
  };

  const markPaid = (r: Receivable) => {
    const remaining = r.amount - r.paidAmount;
    updateReceivable({
      ...r,
      paidAmount: r.amount,
      status: "paid",
    });
  };

  const startEdit = (r: Receivable) => {
    setCustomerName(r.customerName);
    setInvoiceNumber(r.invoiceNumber);
    setAmount(String(r.amount));
    setDueDate(r.dueDate.slice(0, 10));
    setEditing(r.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Accounts Receivable
        </h1>
        <p className="text-muted text-sm mt-1">Track money owed to you</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass glass-hover rounded-xl p-6 glow"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            {editing ? "Edit Invoice" : "New Invoice"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Customer Name</label>
              <input
                type="text"
                placeholder="e.g. John's Cafe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Invoice #</label>
              <input
                type="text"
                placeholder="e.g. INV-001"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
              >
                {editing ? "Update" : "Add Invoice"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setCustomerName("");
                    setInvoiceNumber("");
                    setAmount("");
                  }}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-muted text-sm rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 glass glass-hover rounded-xl p-6 glow"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-white">
              Invoices
              <span className="text-sm font-normal text-muted ml-2">
                ({receivables.length})
              </span>
            </h2>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <p className="text-xs text-muted">Total Invoiced</p>
                <p className="text-white font-semibold">
                  ${totalReceivables.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted">Collected</p>
                <p className="text-success font-semibold">
                  ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted">Outstanding</p>
                <p className="text-warning font-semibold">
                  ${totalReceivablesOutstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {receivables.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-sm text-muted">
              No invoices yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-3 text-muted font-medium text-xs uppercase">Customer</th>
                    <th className="text-left py-2 pr-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Invoice</th>
                    <th className="text-left py-2 pr-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Due</th>
                    <th className="text-right py-2 pr-3 text-muted font-medium text-xs uppercase">Amount</th>
                    <th className="text-right py-2 pr-3 text-muted font-medium text-xs uppercase">Due</th>
                    <th className="text-center py-2 pr-3 text-muted font-medium text-xs uppercase">Status</th>
                    <th className="text-right py-2 text-muted font-medium text-xs uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {receivables.map((r, i) => {
                    const outstanding = r.amount - r.paidAmount;
                    const overdue =
                      r.status !== "paid" &&
                      new Date(r.dueDate) < new Date();
                    return (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 pr-3 text-white/80 whitespace-nowrap">{r.customerName}</td>
                        <td className="py-3 pr-3 text-muted text-xs whitespace-nowrap hidden sm:table-cell">{r.invoiceNumber}</td>
                        <td className="py-3 pr-3 text-muted text-xs whitespace-nowrap hidden md:table-cell">
                          {new Date(r.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </td>
                        <td className="py-3 pr-3 text-right text-white/80 font-medium">
                          ${r.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className={`py-3 pr-3 text-right font-medium ${overdue ? "text-danger" : "text-muted"}`}>
                          ${outstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 pr-3 text-center">
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              r.status === "paid"
                                ? "bg-success/20 text-success"
                                : r.status === "partial"
                                ? "bg-warning/20 text-warning"
                                : overdue
                                ? "bg-danger/20 text-danger"
                                : "bg-accent/20 text-accent"
                            }`}
                          >
                            {overdue && r.status !== "paid" ? "overdue" : r.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex gap-1 justify-end">
                            {r.status !== "paid" && (
                              <button
                                onClick={() => markPaid(r)}
                                className="text-muted-strong hover:text-success transition-colors p-1"
                                title="Mark as paid"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => startEdit(r)}
                              className="text-muted-strong hover:text-accent transition-colors p-1"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteReceivable(r.id)}
                              className="text-muted-strong hover:text-danger transition-colors p-1"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
