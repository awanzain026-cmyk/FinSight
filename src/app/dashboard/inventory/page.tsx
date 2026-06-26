"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { INVENTORY_CATEGORIES } from "@/lib/types";
import type { InventoryItem } from "@/lib/types";

export default function InventoryPage() {
  const {
    inventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    totalInventoryValue,
  } = useStore();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [category, setCategory] = useState(INVENTORY_CATEGORIES[0]);
  const [editing, setEditing] = useState<string | null>(null);

  const itemCount = useMemo(() => inventory.length, [inventory]);
  const unitCount = useMemo(
    () => inventory.reduce((s, i) => s + i.quantity, 0),
    [inventory]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    const cost = parseFloat(unitCost);
    if (!name.trim() || !sku.trim() || isNaN(qty) || isNaN(cost)) return;

    if (editing) {
      const item = inventory.find((i) => i.id === editing);
      if (item) {
        updateInventoryItem({ ...item, name: name.trim(), sku: sku.trim(), quantity: qty, unitCost: cost, category });
      }
      setEditing(null);
    } else {
      addInventoryItem({
        name: name.trim(),
        sku: sku.trim(),
        quantity: qty,
        unitCost: cost,
        category,
      });
    }

    setName("");
    setSku("");
    setQuantity("");
    setUnitCost("");
    setCategory(INVENTORY_CATEGORIES[0]);
  };

  const startEdit = (item: InventoryItem) => {
    setName(item.name);
    setSku(item.sku);
    setQuantity(String(item.quantity));
    setUnitCost(String(item.unitCost));
    setCategory(item.category);
    setEditing(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Inventory</h1>
        <p className="text-muted text-sm mt-1">
          Track merchandise, materials, and supplies
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass glass-hover rounded-xl p-6 glow"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            {editing ? "Edit Item" : "Add Item"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Item Name</label>
              <input
                type="text"
                placeholder="e.g. Office Chair"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">SKU</label>
              <input
                type="text"
                placeholder="e.g. CHR-001"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-muted mb-1">Quantity</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">
                  Unit Cost ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-muted-strong focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 transition-colors"
              >
                {INVENTORY_CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-card">{c}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
              >
                {editing ? "Update" : "Add Item"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setName("");
                    setSku("");
                    setQuantity("");
                    setUnitCost("");
                    setCategory(INVENTORY_CATEGORIES[0]);
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Inventory Items
              <span className="text-sm font-normal text-muted ml-2">
                ({itemCount})
              </span>
            </h2>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <p className="text-xs text-muted">Total Units</p>
                <p className="text-white font-semibold">{unitCount}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted">Total Value</p>
                <p className="text-success font-semibold">
                  ${totalInventoryValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {itemCount === 0 ? (
            <div className="h-32 flex items-center justify-center text-sm text-muted">
              No inventory items yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-3 text-muted font-medium text-xs uppercase">Item</th>
                    <th className="text-left py-2 pr-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">SKU</th>
                    <th className="text-left py-2 pr-3 text-muted font-medium text-xs uppercase">Category</th>
                    <th className="text-right py-2 pr-3 text-muted font-medium text-xs uppercase">Qty</th>
                    <th className="text-right py-2 pr-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Cost</th>
                    <th className="text-right py-2 pr-3 text-muted font-medium text-xs uppercase">Value</th>
                    <th className="text-right py-2 text-muted font-medium text-xs uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 pr-3 text-white/80 whitespace-nowrap">{item.name}</td>
                      <td className="py-3 pr-3 text-muted text-xs whitespace-nowrap hidden sm:table-cell">{item.sku}</td>
                      <td className="py-3 pr-3 text-white/60 text-xs whitespace-nowrap">{item.category}</td>
                      <td className="py-3 pr-3 text-right text-white/80">{item.quantity}</td>
                      <td className="py-3 pr-3 text-right text-muted hidden sm:table-cell">
                        ${item.unitCost.toFixed(2)}
                      </td>
                      <td className="py-3 pr-3 text-right text-success font-medium">
                        ${(item.quantity * item.unitCost).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => startEdit(item)}
                            className="text-muted-strong hover:text-accent transition-colors p-1"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteInventoryItem(item.id)}
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
