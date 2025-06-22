'use client';

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  isClient: boolean;
}

export default function Hero({ isClient }: HeroProps) {
  if (!isClient) return null;

  return (
    <section className="mb-20">
      <div className="max-w-6xl mx-auto">
        {/* 主要内容 */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-24">
          {/* 左侧文本内容 */}
          <motion.div 
            className="space-y-6 lg:space-y-8 order-2 lg:order-1 flex-1"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm text-gray-400 uppercase tracking-widest">
                <span className="w-12 h-px bg-white/30"></span>
                <span>Creative Developer</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block">CRAFTING</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">DIGITAL</span>
                <span className="block">EXPERIENCES</span>
              </h1>
              
              {/* <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
                我专注于创建令人印象深刻的数字体验，结合创新技术与优雅设计，
                为用户打造独特而有意义的产品。
              </p> */}
            </div>

            {/* 统计数据 */}
            <div className="flex flex-wrap gap-6 lg:gap-8">
              <div className="space-y-1">
                <div className="text-2xl lg:text-3xl font-bold">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl lg:text-3xl font-bold">3+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Years Exp</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl lg:text-3xl font-bold">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Satisfaction</div>
              </div>
            </div>

            {/* 行动按钮 */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-6 lg:px-8 py-3 text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors duration-150">
                View My Work
              </button>
              <button className="border border-white/30 text-white px-6 lg:px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-150">
                Get In Touch
              </button>
            </div>
          </motion.div>

          {/* 右侧头像区域 */}
          <motion.div 
            className="flex justify-end order-1 lg:order-2 flex-1"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              className="relative avatar-container mr-4"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              {/* 主头像 */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-2">
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
              <div className="absolute -inset-4 rounded-full border border-white/10 animate-pulse"></div>
              <div className="absolute -inset-8 rounded-full border border-white/5"></div>
              
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

        {/* 技能标签云 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          {[
            'React','Vue.js', 'Next.js', 'TypeScript', 'Node.js', 'Python', 
            'Tailwind', 'PostgreSQL', 'MongoDB',
            'Docker', 'AWS', 'Figma'
          ].map((skill, index) => (
            <motion.span
              key={skill}
              className="skill-tag px-3 sm:px-4 py-2 bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-150 cursor-default"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1 + index * 0.02, 
                ease: "easeOut" 
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* 滚动提示 */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 