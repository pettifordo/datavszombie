import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Stewardship Platform",
  description: "Monitor and manage data quality, issues, and stewardship across your organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-navy-900 text-slate-100 h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
