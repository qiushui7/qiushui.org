'use client';

import { useState, useEffect } from "react";
import Hero from "./components/Hero";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isClient) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 主内容区域 */}
      <main className="relative z-10 px-4 md:px-8 lg:px-12">
        {/* Hero Section */}
        <Hero isClient={isClient} />
      </main>
    </div>
  );
}
