import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ClientTurbulenceBackground from "./components/ClientTurbulenceBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "qiushui - 个人博客",
  description: "技术创新者 · 产品开发者 · 开源贡献者的个人博客，分享编程技术、产品思考和开发经验",
  keywords: ["个人博客", "技术博客", "前端开发", "产品开发", "开源项目"],
  authors: [{ name: "qiushui" }],
  creator: "qiushui",
  publisher: "qiushui",
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
        <ClientTurbulenceBackground />
        <Header />
        {children}
      </body>
    </html>
  );
}
