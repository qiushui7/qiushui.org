'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './mobile-menu';
import FullScreenMenu from './full-screen-menu';

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/video', label: 'Video' }
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 判断是否滚动
  const isScrolled = scrollY > 50;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        const timer = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
        return () => cancelAnimationFrame(timer);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 计算背景透明度：滚动距离越大，透明度越低
  const baseOpacity = Math.min(scrollY / 200, 0.95);
  const backgroundOpacity = isMobileMenuOpen ? Math.max(baseOpacity, 0.98) : baseOpacity;

  // 计算模糊程度
  const blurAmount = Math.min(scrollY / 100, 16);

  // 计算阴影强度
  const shadowOpacity = Math.min(scrollY / 300, 0.3);

  // 处理联系按钮点击
  // const handleContactClick = () => {
  //   window.location.href = 'mailto:qiushui030716@gamil.com';
  // };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 border-b transition-all duration-300"
      style={{
        backgroundColor: isMobile
          ? `rgba(0, 0, 0, ${backgroundOpacity})`
          : 'transparent',
        borderBottomColor: isMobile
          ? `rgba(255, 255, 255, ${Math.min(scrollY / 400, 0.1)})`
          : 'transparent',
        backdropFilter: isMobile ? `blur(${blurAmount}px)` : 'none',
        boxShadow: isMobile
          ? `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`
          : 'none',
        zIndex: isMobile ? 70 : 50
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="https://github.com/qiushui7" target="_blank">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src="/ava-1.png"
                alt="Qiushui Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.span
              className="font-bold text-xl tracking-wide"
              initial={{ opacity: 1 }}
              animate={{
                opacity: !isMobile && isScrolled ? 0 : 1,
                width: !isMobile && isScrolled ? 0 : 'auto'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              QIUSHUI
            </motion.span>
          </motion.div>
        </Link>

        {/* Right side */}
        <div className="flex items-center">
          {/* Language Switcher */}
          {/* <div className="hidden md:flex items-center space-x-2 text-xs text-white/50">
            <span>EN</span>
            <span>/</span>
            <span className="text-white">中文</span>
          </div> */}

          {/* Contact Button */}
          {/* <motion.button
            className="hidden md:block border border-white/30 text-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={handleContactClick}
          >
            CONTACT ME
          </motion.button> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {isScrolled
              ? (
                // 滚动后的 Menu 按钮
                <motion.div
                  className="flex items-center space-x-2 cursor-pointer text-white/70 hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  onClick={() => setIsFullScreenMenuOpen(!isFullScreenMenuOpen)}
                >
                  <span className="text-sm uppercase tracking-widest">MENU</span>
                  <motion.div
                    className="w-4 h-4 flex flex-col justify-center space-y-1"
                    animate={{ rotate: isHovered ? 90 : 0 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                  >
                    <div className="w-full h-px bg-current" />
                    <div className="w-full h-px bg-current" />
                    <div className="w-full h-px bg-current" />
                  </motion.div>
                </motion.div>
              )
              : (
                // 原始菜单
                <>
                  {menuItems.map(({ href, label }) => (
                    <Link key={href} href={href}>
                      <motion.div
                        className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                      </motion.div>
                    </Link>
                  ))}
                </>
              )}
          </div>

          {/* Mobile Menu Component */}
          <MobileMenu
            menuItems={menuItems}
            isMenuOpen={isMobileMenuOpen}
            setIsMenuOpenAction={setIsMobileMenuOpen}
          />

          {/* Full Screen Menu Component */}
          <FullScreenMenu
            isMenuOpen={isFullScreenMenuOpen}
            menuItems={menuItems}
            setIsMenuOpenAction={setIsFullScreenMenuOpen}
          />
        </div>
      </nav>
    </motion.header>
  );
}
