'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FullScreenMenuProps {
  isMenuOpen: boolean,
  menuItems: Array<{ href: string, label: string }>,
  setIsMenuOpenAction: (isOpen: boolean) => void
}

export default function FullScreenMenu({ isMenuOpen, menuItems, setIsMenuOpenAction }: FullScreenMenuProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleContactClick = () => {
    window.location.assign('mailto:qiushui030716@gmail.com');
    setIsMenuOpenAction(false);
  };

  // 禁用/启用滚动
  useEffect(() => {
    if (isMenuOpen) {
      // 禁用滚动
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // 恢复滚动
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // 清理函数
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute top-8 right-4 md:right-8 lg:right-12 z-50 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpenAction(false)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <span className="text-sm uppercase tracking-widest">CLOSE</span>
            <motion.button
              className="w-5 h-5"
              animate={{ opacity: 1, scale: 1, rotate: isHovered ? 90 : -90 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <div className="relative w-5 h-5">
                <div className="w-5 h-px bg-current rotate-45 absolute top-1/2 left-0 -translate-y-1/2" />
                <div className="w-5 h-px bg-current -rotate-45 absolute top-1/2 left-0 -translate-y-1/2" />
              </div>
            </motion.button>
          </motion.div>

          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut'
              }}
            >
              {/* 菜单项 */}
              <div className="space-y-6">
                {menuItems.map(({ href, label }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 30, rotateX: -45, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    exit={{ y: 30, rotateX: -45, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.1,
                      ease: 'easeInOut'
                    }}
                  >
                    <Link href={href} onClick={() => setIsMenuOpenAction(false)}>
                      <motion.div
                        className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wide hover:text-gray-300 transition-colors duration-300 relative group"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {label}
                        <motion.div
                          className="absolute bottom-0 left-1/2 w-0 h-1 bg-white"
                          whileHover={{ width: '100%', x: '-50%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* 联系按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ y: 30, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5,
                  ease: 'easeInOut'
                }}
                className="pt-8"
              >
                <motion.button
                  className="border-2 border-white text-white px-8 py-4 text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContactClick}
                >
                  Contact Me
                </motion.button>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
