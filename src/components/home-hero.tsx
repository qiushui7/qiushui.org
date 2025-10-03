'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

function Icon({ src, alt }: { src: string, alt: string }) {
  return (
    <Image src={src} alt={alt} width={24} height={24} />
  );
}

export default function Hero() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'HTML', icon: <Icon src="/html-5.svg" alt="HTML" /> },
    { name: 'CSS', icon: <Icon src="/css-3.svg" alt="CSS" /> },
    { name: 'JavaScript', icon: <Icon src="/js.svg" alt="JavaScript" /> },
    { name: 'TypeScript', icon: <Icon src="/ts.svg" alt="TypeScript" /> },
    { name: 'React.js', icon: <Icon src="/react.svg" alt="React" /> },
    { name: 'Vue.js', icon: <Icon src="/vue.svg" alt="Vue.js" /> },
    { name: 'Next.js', icon: <Icon src="/nextjs.svg" alt="Next.js" /> },
    { name: 'Node.js', icon: <Icon src="/nodejs.svg" alt="Node.js" /> },
    { name: 'Nest.js', icon: <Icon src="/nestjs.svg" alt="Nest.js" /> },
    { name: 'Tailwind', icon: <Icon src="/tailwind.svg" alt="Tailwind" /> },
    { name: 'PostgreSQL', icon: <Icon src="/postgresql.svg" alt="PostgreSQL" /> },
    { name: 'Docker', icon: <Icon src="/docker.svg" alt="Docker" /> },
    { name: 'AWS', icon: <Icon src="/aws.svg" alt="AWS" /> }
  ];

  return (
    <section className="h-screen flex flex-col justify-center relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 主要内容 */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center min-h-0">
          {/* 左侧文本内容 */}
          <motion.div
            className="space-y-6 lg:space-y-8 order-2 lg:order-1 flex-1"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm text-gray-400 uppercase tracking-widest">
                <span className="w-12 h-px bg-white/30" />
                <span>Creative Developer</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                <span className="block">CRAFTING</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">DIGITAL</span>
                <span className="block">EXPERIENCES</span>
              </h1>
            </div>

            {/* 引用文字 */}
            <div className="py-4">
              <blockquote className="text-lg lg:text-xl text-gray-300 italic border-l-2 border-white/30 pl-6">
                &ldquo;Slow production defeats crazy internal competition&rdquo;
              </blockquote>
            </div>

            {/* 行动按钮 */}
            <div className="flex flex-wrap gap-4">
              <button type="button" className="bg-white text-black px-6 lg:px-8 py-3 text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors duration-150">
                <Link href="/blog">
                  View My Blog
                </Link>
              </button>
              {/* <button className="border border-white/30 text-white px-6 lg:px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-150">
                Get In Touch
              </button> */}
            </div>
          </motion.div>

          {/* 右侧头像区域 */}
          <motion.div
            className="flex justify-end order-1 lg:order-2 flex-1"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              className="relative avatar-container mr-4"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              {/* 主头像 */}
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-2">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                  <Image
                    src="/ava.jpg"
                    alt="Qiushui Portrait"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-200"
                    priority
                  />
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -inset-4 rounded-full border border-white/10 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-white/5" />

              {/* 浮动标签 */}
              <div className="absolute top-4 sm:top-8 -left-2 sm:-left-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs uppercase tracking-wide">
                Frontend
              </div>
              <div className="absolute bottom-4 sm:bottom-8 -right-2 sm:-right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs uppercase tracking-wide">
                Full Stack
              </div>
              <div className="absolute top-1/2 -right-4 sm:-right-8 bg-black/80 backdrop-blur-sm border border-white/20 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs uppercase tracking-wide">
                UI/UX
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 mb-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
        >
          <Marquee
            speed={40}
            pauseOnHover
            className="py-4"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill.name}
                className="skill-tag px-4 py-2 bg-black/5 border border-white/10 text-sm hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default whitespace-nowrap mx-2 flex items-center gap-2"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                animate={{
                  opacity: hoveredSkill && hoveredSkill !== skill.name ? 0.3 : 1,
                  scale: hoveredSkill === skill.name ? 1.1 : 1,
                  filter: hoveredSkill && hoveredSkill !== skill.name ? 'blur(1px)' : 'blur(0px)'
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
              >
                <span className="w-6 h-6">{skill.icon}</span>
                {skill.name}
              </motion.span>
            ))}
          </Marquee>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
