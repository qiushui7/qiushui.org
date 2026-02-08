'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import Aws from '@/assets/icons/aws';
import Html5 from '@/assets/icons/html-5';
import Css3 from '@/assets/icons/css-3';
import Nextjs from '@/assets/icons/nextjs';
import Vue from '@/assets/icons/vue';
import Postgresql from '@/assets/icons/postgresql';
import Tailwind from '@/assets/icons/tailwind';
import Nestjs from '@/assets/icons/nestjs';
import Nodejs from '@/assets/icons/nodejs';
import Js from '@/assets/icons/js';
import Ts from '@/assets/icons/ts';
import React from '@/assets/icons/react';
import Docker from '@/assets/icons/docker';
import Solidity from '@/assets/icons/solidity';

export default function Hero() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const skills = [
    { name: 'HTML', icon: <Html5 /> },
    { name: 'CSS', icon: <Css3 /> },
    { name: 'JavaScript', icon: <Js /> },
    { name: 'TypeScript', icon: <Ts /> },
    { name: 'React.js', icon: <React /> },
    { name: 'Vue.js', icon: <Vue /> },
    { name: 'Next.js', icon: <Nextjs /> },
    { name: 'Node.js', icon: <Nodejs /> },
    { name: 'Nest.js', icon: <Nestjs /> },
    { name: 'Tailwind', icon: <Tailwind /> },
    { name: 'PostgreSQL', icon: <Postgresql /> },
    { name: 'Docker', icon: <Docker /> },
    { name: 'AWS', icon: <Aws /> },
    { name: 'Solidity', icon: <Solidity /> }
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

              <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
                <span
                  className="crt-text block w-fit"
                  style={{ '--crt-delay': '0s', '--crt-duration': '2.5s' } as React.CSSProperties}
                >
                  <span className="relative z-[1]">CRAFTING</span>
                  <span className="absolute inset-0 crt-glow" aria-hidden="true">CRAFTING</span>
                </span>
                <span
                  className="crt-text block w-fit"
                  style={{ '--crt-delay': '0.8s', '--crt-duration': '3s' } as React.CSSProperties}
                >
                  <span className="relative z-[1]">DIGITAL</span>
                  <span className="absolute inset-0 crt-glow" aria-hidden="true">DIGITAL</span>
                </span>
                <span
                  className="crt-text block w-fit"
                  style={{ '--crt-delay': '0.4s', '--crt-duration': '2.2s' } as React.CSSProperties}
                >
                  <span className="relative z-[1]">EXPERIENCES</span>
                  <span className="absolute inset-0 crt-glow" aria-hidden="true">EXPERIENCES</span>
                </span>
              </h1>
            </div>

            {/* 引用文字 */}
            <div className="py-4">
              <blockquote className="text-lg lg:text-xl text-gray-300 italic border-l-2 border-white/30 pl-6">
                &ldquo;Slow production defeats crazy internal competition&rdquo;
              </blockquote>
            </div>

          </motion.div>

          {/* 右侧头像区域 */}
          <motion.div
            className="flex justify-center order-1 lg:order-2 flex-1"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              className="relative avatar-container"
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
            speed={20}
            pauseOnHover={false}
            play={!isMarqueePaused}
            className="py-2"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill.name}
                className="skill-tag px-4 py-2 text-sm hover:text-white transition-all duration-300 cursor-default whitespace-nowrap mx-2 flex items-center gap-2"
                onMouseEnter={() => {
                  setHoveredSkill(skill.name);
                  setIsMarqueePaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setIsMarqueePaused(false);
                }}
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
          <Marquee
            speed={20}
            direction="right"
            pauseOnHover={false}
            play={!isMarqueePaused}
            className="py-2"
          >
            {skills.reverse().map((skill) => (
              <motion.span
                key={skill.name}
                className="skill-tag px-4 py-2 text-sm hover:text-white transition-all duration-300 cursor-default whitespace-nowrap mx-2 flex items-center gap-2"
                onMouseEnter={() => {
                  setHoveredSkill(skill.name + 'reverse');
                  setIsMarqueePaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setIsMarqueePaused(false);
                }}
                animate={{
                  opacity: hoveredSkill && hoveredSkill !== skill.name + 'reverse' ? 0.3 : 1,
                  scale: hoveredSkill === skill.name + 'reverse' ? 1.1 : 1,
                  filter: hoveredSkill && hoveredSkill !== skill.name + 'reverse' ? 'blur(1px)' : 'blur(0px)'
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut'
                }}
              >
                <span className="w-6 h-6">{skill.icon}</span>
                {skill.name}
              </motion.span>
            ))}
          </Marquee>
        </motion.div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
