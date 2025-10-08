'use client';

import { motion } from 'framer-motion';
import ProfileCard from '@/components/profile-card';
import ExperienceTimeline from '@/components/experience-time-line';

function handleContactClick() {
  window.location.assign('mailto:qiushui030716@gmail.com');
}

export default function ProfessionJourney() {
  return (
    <div className="mx-auto max-w-7xl">
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
              handle="qiushui7"
              status="benjamin"
              showUserInfo
              enableTilt
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
  );
}
