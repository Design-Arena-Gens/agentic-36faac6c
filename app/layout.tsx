import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic Sales Studio",
  description: "Deploy AI-styled customer agents that craft personalized outreach with persuasive sales psychology."
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full bg-slate-950 ${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-slate-950 font-body text-slate-100 antialiased">{children}</body>
    </html>
  );
}
