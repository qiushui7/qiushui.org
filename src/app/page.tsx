'use client';

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import ProfileCard from "../components/profile-card";
import ExperienceTimeline from "../components/ExperienceTimeline";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleContactClick = () => {
    window.location.href = 'mailto:qiushui030716@gmail.com';
  };

  if (!isClient) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 主内容区域 */}
      <main className="relative z-10 px-4 md:px-8 lg:px-12">
        {/* Hero Section */}
        <Hero isClient={isClient} />
        <div className="mx-auto max-w-7xl" >
          <div className="flex flex-col lg:flex-row lg:gap-16 min-h-screen">
            {/* 左侧：ProfileCard */}
            <motion.div
              className="flex justify-center items-center lg:justify-end flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-80 lg: mt-30">
                <ProfileCard
                  avatarUrl="/photo-no-bg.png"
                  miniAvatarUrl="/ava.jpg"
                  iconUrl="/iconpattern.png"
                  grainUrl="/grain.webp"
                  name="Benjamin"
                  title="Software Engineer"
                  handle="benjamin"
                  status="Online"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={handleContactClick}
                />
              </div>
            </motion.div>
            
            {/* 右侧：经历时间线 */}
            <motion.div
              className="flex-1 min-w-0 h-[calc(100vh-10rem)] mt-4 lg:mt-32"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ExperienceTimeline />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
