import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientTurbulenceBackground from "../components/ClientTurbulenceBackground";
import ScrollProgressBar from "../components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "qiushui - Personal Blog",
  description: "Technical innovator · Product developer · Open source contributor's personal blog, sharing programming techniques, product insights and development experience",
  keywords: ["personal blog", "tech blog", "frontend development", "product development", "open source projects"],
  authors: [{ name: "qiushui" }],
  creator: "qiushui",
  publisher: "qiushui",
  icons: {
    icon: [
      {
        url: "/ava.jpg",
        sizes: "32x32",
        type: "image/jpeg"
      }
    ],
    apple: [
      {
        url: "/ava.jpg",
        sizes: "180x180",
        type: "image/jpeg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <ScrollProgressBar />
        <ClientTurbulenceBackground />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
