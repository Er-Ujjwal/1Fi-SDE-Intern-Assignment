import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Fi - Mutual Fund backed 0% EMIs | 1Fi Marketplace",
  description: "Shop electronics, smartphones, and gadgets at 0% interest EMIs backed by your mutual fund portfolio. Zero down payment, investments keep compounding.",
  applicationName: "1Fi",
  keywords: ["1Fi", "LAMF", "Loan Against Mutual Funds", "0% EMI", "Fintech India", "Mutual Fund Shopping"],
  authors: [{ name: "1Fi SDE Intern Assignment" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#712CDC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
