'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 计算背景透明度：滚动距离越大，透明度越低
  const backgroundOpacity = Math.min(scrollY / 200, 0.95);
  
  // 计算模糊程度
  const blurAmount = Math.min(scrollY / 100, 16);
  
  // 计算阴影强度
  const shadowOpacity = Math.min(scrollY / 300, 0.3);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
        borderBottomColor: `rgba(255, 255, 255, ${Math.min(scrollY / 400, 0.1)})`,
        backdropFilter: `blur(${blurAmount}px)`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">秋</span>
            </div>
            <span className="font-bold text-xl tracking-wide">QIUSHUI</span>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <motion.a 
            href="#" 
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Work
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
          <motion.a 
            href="/blog" 
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
          <motion.a 
            href="/contact" 
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-white/50">
            <span>EN</span>
            <span>/</span>
            <span className="text-white">中文</span>
          </div>

          {/* Let's Talk Button */}
          <motion.button 
            className="hidden md:block border border-white/30 text-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Let&apos;s Talk
          </motion.button>
          
          {/* Mobile Menu Component */}
          <MobileMenu />
        </div>
      </nav>
    </motion.header>
  );
} 