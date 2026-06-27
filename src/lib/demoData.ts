import type {
  Entry,
  InventoryItem,
  Receivable,
  Payable,
} from "./types";

export interface DemoData {
  entries: Omit<Entry, "id">[];
  inventory: Omit<InventoryItem, "id">[];
  receivables: Omit<Receivable, "id">[];
  payables: Omit<Payable, "id">[];
}

export const DEMO_DATA: DemoData = {
  entries: [
    { type: "income", amount: 450000, category: "Sales", description: "Winter Collection - Cash Sales", date: "2026-01-05T10:00:00.000Z" },
    { type: "income", amount: 320000, category: "Sales", description: "Winter Collection - Online Orders", date: "2026-01-08T14:30:00.000Z" },
    { type: "income", amount: 280000, category: "Sales", description: "Bridal Wear - Advance Booking", date: "2026-01-12T11:00:00.000Z" },
    { type: "income", amount: 150000, category: "Sales", description: "Kids Collection - Week Sales", date: "2026-01-15T16:00:00.000Z" },
    { type: "income", amount: 520000, category: "Sales", description: "Formal Wear - Bulk Order (Office)", date: "2026-01-18T09:00:00.000Z" },
    { type: "income", amount: 190000, category: "Sales", description: "Unstitched Fabric - Monthly Sale", date: "2026-01-22T13:00:00.000Z" },
    { type: "income", amount: 410000, category: "Sales", description: "Spring Collection Pre-Orders", date: "2026-02-02T10:00:00.000Z" },
    { type: "income", amount: 340000, category: "Sales", description: "Valentine's Week Special", date: "2026-02-08T12:00:00.000Z" },
    { type: "income", amount: 260000, category: "Sales", description: "Kurti Collection - Walk-in", date: "2026-02-12T15:00:00.000Z" },
    { type: "income", amount: 580000, category: "Sales", description: "Bridal Package - Premium", date: "2026-02-18T11:30:00.000Z" },
    { type: "income", amount: 210000, category: "Sales", description: "Eid Collection - Early Orders", date: "2026-03-01T10:00:00.000Z" },
    { type: "income", amount: 470000, category: "Sales", description: "Eid Collection - Peak Week", date: "2026-03-10T14:00:00.000Z" },
    { type: "income", amount: 390000, category: "Sales", description: "Summer Collection Launch", date: "2026-03-15T11:00:00.000Z" },
    { type: "income", amount: 130000, category: "Services", description: "Stitching Service - 20 Orders", date: "2026-03-18T09:30:00.000Z" },
    { type: "income", amount: 550000, category: "Sales", description: "Eid Collection - Final Days", date: "2026-03-25T16:00:00.000Z" },
    { type: "expense", amount: 85000, category: "Rent", description: "Shop Rent - Monthly", date: "2026-01-01T00:00:00.000Z" },
    { type: "expense", amount: 120000, category: "Salaries", description: "Staff Salaries (6 employees)", date: "2026-01-28T00:00:00.000Z" },
    { type: "expense", amount: 95000, category: "Supplies", description: "Fabric Purchase - Winter Stock", date: "2026-01-10T00:00:00.000Z" },
    { type: "expense", amount: 18000, category: "Utilities", description: "Electricity Bill - January", date: "2026-01-25T00:00:00.000Z" },
    { type: "expense", amount: 85000, category: "Rent", description: "Shop Rent - February", date: "2026-02-01T00:00:00.000Z" },
    { type: "expense", amount: 120000, category: "Salaries", description: "Staff Salaries - February", date: "2026-02-27T00:00:00.000Z" },
    { type: "expense", amount: 150000, category: "Supplies", description: "Bridal Fabric & Embroidery Stock", date: "2026-02-15T00:00:00.000Z" },
    { type: "expense", amount: 22000, category: "Utilities", description: "Electricity & Water - February", date: "2026-02-26T00:00:00.000Z" },
    { type: "expense", amount: 85000, category: "Rent", description: "Shop Rent - March", date: "2026-03-01T00:00:00.000Z" },
    { type: "expense", amount: 120000, category: "Salaries", description: "Staff Salaries - March", date: "2026-03-29T00:00:00.000Z" },
    { type: "expense", amount: 200000, category: "Supplies", description: "Eid Collection Fabric & Accessories", date: "2026-03-08T00:00:00.000Z" },
  ],
  inventory: [
    { name: "Winter Shawls (Premium)", sku: "WS-001", quantity: 45, unitCost: 850, category: "Finished Goods" },
    { name: "Kurti Collection (Printed)", sku: "KC-002", quantity: 80, unitCost: 1200, category: "Finished Goods" },
    { name: "Bridal Embroidery Fabric", sku: "BF-003", quantity: 25, unitCost: 3200, category: "Raw Materials" },
    { name: "Formal Suits (Stitched)", sku: "FS-004", quantity: 35, unitCost: 2500, category: "Finished Goods" },
    { name: "Kids Festive Wear", sku: "KF-005", quantity: 60, unitCost: 950, category: "Merchandise" },
    { name: "Unstitched Fabric (3m)", sku: "UF-006", quantity: 120, unitCost: 600, category: "Merchandise" },
    { name: "Sequins & Accessories", sku: "SA-007", quantity: 200, unitCost: 150, category: "Raw Materials" },
    { name: "Summer Lawn Collection", sku: "SL-008", quantity: 90, unitCost: 800, category: "Finished Goods" },
  ],
  receivables: [
    { customerName: "Boutique by Sara", invoiceNumber: "INV-024", amount: 45000, paidAmount: 0, issueDate: "2026-03-01T00:00:00.000Z", dueDate: "2026-03-15T00:00:00.000Z", status: "pending" },
    { customerName: "Al-Noor Events", invoiceNumber: "INV-025", amount: 128000, paidAmount: 50000, issueDate: "2026-02-20T00:00:00.000Z", dueDate: "2026-03-10T00:00:00.000Z", status: "partial" },
    { customerName: "Tehzeeb Textiles", invoiceNumber: "INV-026", amount: 95000, paidAmount: 95000, issueDate: "2026-02-10T00:00:00.000Z", dueDate: "2026-02-25T00:00:00.000Z", status: "paid" },
    { customerName: "Bridal Studio Lahore", invoiceNumber: "INV-027", amount: 210000, paidAmount: 0, issueDate: "2026-03-15T00:00:00.000Z", dueDate: "2026-04-01T00:00:00.000Z", status: "pending" },
    { customerName: "Corporate Gifts PK", invoiceNumber: "INV-028", amount: 75000, paidAmount: 75000, issueDate: "2026-01-05T00:00:00.000Z", dueDate: "2026-01-20T00:00:00.000Z", status: "paid" },
  ],
  payables: [
    { vendorName: "Fabric House Karachi", billNumber: "BILL-031", amount: 95000, paidAmount: 0, issueDate: "2026-03-20T00:00:00.000Z", dueDate: "2026-04-05T00:00:00.000Z", status: "pending" },
    { vendorName: "Embroidery Works Lahore", billNumber: "BILL-032", amount: 55000, paidAmount: 55000, issueDate: "2026-03-05T00:00:00.000Z", dueDate: "2026-03-20T00:00:00.000Z", status: "paid" },
    { vendorName: "Karachi Wholesale Mart", billNumber: "BILL-033", amount: 150000, paidAmount: 0, issueDate: "2026-03-25T00:00:00.000Z", dueDate: "2026-04-10T00:00:00.000Z", status: "pending" },
    { vendorName: "Stationery & Packaging Co", billNumber: "BILL-034", amount: 18000, paidAmount: 18000, issueDate: "2026-03-10T00:00:00.000Z", dueDate: "2026-03-25T00:00:00.000Z", status: "paid" },
    { vendorName: "Digital Ads Agency", billNumber: "BILL-035", amount: 35000, paidAmount: 0, issueDate: "2026-03-28T00:00:00.000Z", dueDate: "2026-04-15T00:00:00.000Z", status: "pending" },
  ],
};
