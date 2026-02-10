'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import ProfileCard from '@/components/profile-card';
import ExperienceCard from '@/components/experience-time-line';
import IconCloudPilotAI from '@/assets/icons/cloudpilot-ai';
import Baidu from '@/assets/icons/baidu';
import Bytedance from '@/assets/icons/bytedance';

function handleContactClick() {
  window.location.assign('mailto:qiushui030716@gmail.com');
}

const experiences = [
  {
    title: 'Software Engineer',
    logo: <IconCloudPilotAI />,
    company: 'CloudPilot',
    period: '2025.6 - Present',
    description: 'Took on my first remote role, independently responsible for developing various enterprise web applications using React, TypeScript, and Next.js.',
    technologies: ['React', 'TypeScript', 'Next.js', 'SWR', 'Rechart']
  },
  {
    title: 'Frontend Intern',
    logo: <Bytedance />,
    company: 'ByteDance',
    period: '2024.1 - 2024.5',
    description: 'Developed B2B products using technologies such as Vue, React, and micro-frontend architecture, while also driving the team\u2019s engineering efforts toward a Monorepo-based project structure.',
    technologies: ['Vue', 'React', 'TypeScript', 'MircoFrontend', 'Monorepo']
  },
  {
    title: 'Frontend Intern',
    logo: <Baidu />,
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

  // --- Scroll-driven transforms for each experience ---
  // Exp 0 (Cloudpilot): visible from start → fade out
  const exp0LeftOp = useTransform(scrollYProgress, [0, 0, 0.24, 0.32], [1, 1, 1, 0]);
  const exp0LeftX = useTransform(scrollYProgress, [0, 0, 0.24, 0.32], [0, 0, 0, -50]);
  const exp0RightOp = useTransform(scrollYProgress, [0, 0, 0.24, 0.32], [1, 1, 1, 0]);
  const exp0RightX = useTransform(scrollYProgress, [0, 0, 0.24, 0.32], [0, 0, 0, 50]);

  // Exp 1 (ByteDance): appear → stay → fade out
  const exp1LeftOp = useTransform(scrollYProgress, [0.36, 0.44, 0.54, 0.62], [0, 1, 1, 0]);
  const exp1LeftX = useTransform(scrollYProgress, [0.36, 0.44, 0.54, 0.62], [-50, 0, 0, -50]);
  const exp1RightOp = useTransform(scrollYProgress, [0.39, 0.46, 0.54, 0.62], [0, 1, 1, 0]);
  const exp1RightX = useTransform(scrollYProgress, [0.39, 0.46, 0.54, 0.62], [50, 0, 0, 50]);

  // Exp 2 (Baidu): appear → stays visible until exit
  const exp2LeftOp = useTransform(scrollYProgress, [0.66, 0.74], [0, 1]);
  const exp2LeftX = useTransform(scrollYProgress, [0.66, 0.74], [-50, 0]);
  const exp2RightOp = useTransform(scrollYProgress, [0.69, 0.76], [0, 1]);
  const exp2RightX = useTransform(scrollYProgress, [0.69, 0.76], [50, 0]);

  // Track the active experience based on scroll progress
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.34) {
      setActiveExpIndex(0);
    } else if (latest < 0.64) {
      setActiveExpIndex(1);
    } else {
      setActiveExpIndex(2);
    }
  });

  // Group for easier iteration in JSX
  const transforms = [
    { leftOp: exp0LeftOp, leftX: exp0LeftX, rightOp: exp0RightOp, rightX: exp0RightX },
    { leftOp: exp1LeftOp, leftX: exp1LeftX, rightOp: exp1RightOp, rightX: exp1RightX },
    { leftOp: exp2LeftOp, leftX: exp2LeftX, rightOp: exp2RightOp, rightX: exp2RightX }
  ];

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

            {/* Three-column: left info | ProfileCard | right info */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
              {/* Left column: Title + Company + Description */}
              <div className="relative h-[420px]">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    className="absolute inset-0 flex flex-col justify-center items-end text-right pr-4"
                    style={{ opacity: transforms[i].leftOp, x: transforms[i].leftX }}
                  >
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-gray-300 mt-1 flex items-center gap-2">
                      {exp.logo && <span className="inline-flex shrink-0">{exp.logo}</span>}
                      {exp.company}
                    </p>
                    <p className="text-lg text-gray-400 mt-1">
                      {exp.period}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Center: ProfileCard - always visible */}
              <div className="w-80">
                <ProfileCard
                  avatarUrl="/photo-no-bg.png"
                  miniAvatarUrl="/ava.jpg"
                  iconUrl="/iconpattern.png"
                  grainUrl="/grain.webp"
                  name={experiences[activeExpIndex].company}
                  title={experiences[activeExpIndex].title}
                  handle="qiushui7"
                  status="benjamin"
                  showUserInfo
                  enableTilt
                  onContactClick={handleContactClick}
                />
              </div>

              {/* Right column: Period + Technologies */}
              <div className="relative h-[420px]">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    className="absolute inset-0 flex flex-col justify-center gap-5 pl-4"
                    style={{ opacity: transforms[i].rightOp, x: transforms[i].rightX }}
                  >
                    <div className="flex flex-wrap gap-2">
                      <p className="text-lg text-gray-400 mt-4 leading-relaxed max-w-sm">
                        {exp.description}
                      </p>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
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
