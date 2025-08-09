"use client";

import { motion } from "framer-motion";
import ProfileCard from "@/app/components/profile-card/index";
import ExperienceTimeline from "@/app/components/ExperienceTimeline";

export default function AboutPage() {
  return (
    <div className="text-white relative min-h-screen overflow-hidden">
      <main className="relative z-10 px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl" >

          {/* 主要内容区域 */}
          <div className="flex flex-col lg:flex-row gap-16 min-h-screen">
            {/* 左侧：ProfileCard */}
            <motion.div
              className="flex justify-center items-center lg:justify-end flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-80">
                <ProfileCard
                  avatarUrl="/id-photo-no-bg.png"
                  iconUrl="/iconpattern.png"
                  grainUrl="/grain.webp"
                  name="Benjamin"
                  title="Software Engineer"
                  handle="benjamin"
                  status="Online"
                  showUserInfo={true}
                  enableTilt={true}
                />
              </div>
            </motion.div>
            
            {/* 右侧：经历时间线 */}
            <motion.div
              className="flex-1 min-w-0 h-[calc(100vh-10rem)] mt-32"
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