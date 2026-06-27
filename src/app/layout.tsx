import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinSight - AI-Powered Financial Dashboard",
  description:
    "Professional financial dashboard for small businesses with AI-powered insights, multi-currency support, inventory tracking, and PDF reports.",
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%236C63FF'/><text x='16' y='22' text-anchor='middle' fill='white' font-size='18' font-weight='bold' font-family='sans-serif'>F</text></svg>", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-dark antialiased">{children}</body>
    </html>
  );
}
