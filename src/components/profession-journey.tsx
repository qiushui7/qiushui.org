'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProfileCard from '@/components/profile-card';
import ExperienceCard from '@/components/experience-time-line';
import type { Experience } from '@/components/experience-time-line';

function handleContactClick() {
  window.location.assign('mailto:qiushui030716@gmail.com');
}

const experiences: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Cloudpilot',
    period: '2025.6 - Present',
    description: 'Took on my first remote role, independently responsible for developing various enterprise web applications using React, TypeScript, and Next.js.',
    technologies: ['React', 'TypeScript', 'Next.js', 'SWR', 'Rechart']
  },
  {
    title: 'Frontend Intern',
    company: 'ByteDance',
    period: '2024.1 - 2024.5',
    description: 'Developed B2B products using technologies such as Vue, React, and micro-frontend architecture, while also driving the team\u2019s engineering efforts toward a Monorepo-based project structure.',
    technologies: ['Vue', 'React', 'TypeScript', 'MircoFrontend', 'Monorepo']
  },
  {
    title: 'Frontend Intern',
    company: 'Baidu',
    period: '2023.9 - 2023.12',
    description: 'Began my web development career by working on consumer-facing products using Vue and server-side rendering (SSR) technologies.',
    technologies: ['Vue', 'JavaScript', 'SSR', 'Webpack']
  }
];

export default function ProfessionJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Experience 0 - left (Cloudpilot)
  const exp0Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const exp0X = useTransform(scrollYProgress, [0.15, 0.3], [-80, 0]);

  // Experience 1 - right (ByteDance)
  const exp1Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const exp1X = useTransform(scrollYProgress, [0.35, 0.5], [80, 0]);

  // Experience 2 - left (Baidu)
  const exp2Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const exp2X = useTransform(scrollYProgress, [0.55, 0.7], [-80, 0]);

  return (
    <>
      {/* Desktop: scroll-driven pinned section */}
      <div ref={containerRef} className="hidden lg:block h-[400vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center [overflow:clip]">
          <div className="mx-auto max-w-7xl px-4 w-full">
            {/* Section Title */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="w-12 h-px bg-white/30" />
                <span className="text-sm text-gray-400 uppercase tracking-widest">Experience</span>
                <span className="w-12 h-px bg-white/30" />
              </div>
              <h2 className="font-pixel text-5xl sm:text-7xl">
                <span
                  className="crt-text block w-fit mx-auto"
                  style={{ '--crt-delay': '0s', '--crt-duration': '2.8s' } as React.CSSProperties}
                >
                  <span className="relative z-[1]">Professional Journey</span>
                  <span className="absolute inset-0 crt-glow" aria-hidden="true">Professional Journey</span>
                </span>
              </h2>
            </div>

            {/* Three-column layout */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
              {/* Left column */}
              <div className="space-y-6">
                <motion.div style={{ opacity: exp0Opacity, x: exp0X }}>
                  <ExperienceCard exp={experiences[0]} />
                </motion.div>
                <motion.div style={{ opacity: exp2Opacity, x: exp2X }}>
                  <ExperienceCard exp={experiences[2]} />
                </motion.div>
              </div>

              {/* Center: ProfileCard - always visible */}
              <div className="w-80">
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

              {/* Right column */}
              <div className="flex items-center">
                <motion.div className="w-full" style={{ opacity: exp1Opacity, x: exp1X }}>
                  <ExperienceCard exp={experiences[1]} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: normal scroll layout */}
      <div className="lg:hidden px-4 py-24 max-w-lg mx-auto space-y-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="w-12 h-px bg-white/30" />
            <span className="text-sm text-gray-400 uppercase tracking-widest">Experience</span>
            <span className="w-12 h-px bg-white/30" />
          </div>
          <h2 className="font-pixel text-4xl">
            Professional Journey
          </h2>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-72">
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

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ExperienceCard exp={exp} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
