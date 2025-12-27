'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { SocialLinksRow } from './social-links';

interface FullScreenMenuProps {
  isMenuOpen: boolean,
  menuItems: Array<{ href: string, label: string }>,
  setIsMenuOpenAction: (isOpen: boolean) => void
}

export default function FullScreenMenu({ isMenuOpen, menuItems, setIsMenuOpenAction }: FullScreenMenuProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageSrcByKey = useMemo<Record<string, string>>(
    () => ({
      '/': '/snow.jpeg',
      '/blog': '/xiamen.jpeg',
      '/video': '/sea.jpeg',
      contact: '/yuzi.jpeg'
    }),
    []
  );

  // No "default" image: start with the first menu item image (or fall back safely if missing).
  const firstMenuKey = menuItems.at(0)?.href;
  const initialKey = firstMenuKey ?? '/';
  const initialImageSrc = imageSrcByKey[initialKey] ?? '/snow.jpeg';

  const [activeImageKey, setActiveImageKey] = useState<string>(initialKey);
  const [visibleImageSrc, setVisibleImageSrc] = useState<string>(initialImageSrc);
  const [pendingImageSrc, setPendingImageSrc] = useState<string | null>(null);
  const [pendingReady, setPendingReady] = useState(false);
  const [pendingFadeDone, setPendingFadeDone] = useState(false);

  const activeImageSrc = imageSrcByKey[activeImageKey] ?? visibleImageSrc;

  const handleContactClick = () => {
    window.location.assign('mailto:qiushui030716@gmail.com');
    setIsMenuOpenAction(false);
  };

  // Preload all menu images when the menu opens to make hover switching consistently smooth.
  useEffect(() => {
    if (!isMenuOpen) return;
    for (const src of Object.values(imageSrcByKey)) {
      const img = new window.Image();
      img.src = src;
    }
  }, [imageSrcByKey, isMenuOpen]);

  // Cross-fade images without showing a blank background between switches.
  // Keep the previous image visible until the next image has finished loading.
  useEffect(() => {
    if (!isMenuOpen) return;
    if (activeImageSrc === visibleImageSrc) return;
    void Promise.resolve().then(() => {
      setPendingImageSrc(activeImageSrc);
      setPendingReady(false);
      setPendingFadeDone(false);
    });
  }, [activeImageSrc, isMenuOpen, visibleImageSrc]);

  // Commit the new image only after (1) the fade-in animation is done and (2) the image is ready.
  // The animation itself does NOT wait for loading; loading only affects when we swap/cleanup layers.
  useEffect(() => {
    if (!pendingImageSrc) return;
    if (!pendingReady) return;
    if (!pendingFadeDone) return;
    void Promise.resolve().then(() => {
      setVisibleImageSrc(pendingImageSrc);
      setPendingImageSrc(null);
      setPendingReady(false);
      setPendingFadeDone(false);
    });
  }, [pendingFadeDone, pendingImageSrc, pendingReady]);

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
          className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.1, 0.1, 0.1, 0.1] }}
        >
          <div className="absolute top-8 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 flex items-center justify-between">
            <Link
              href="https://github.com/qiushui7"
              onClick={() => setIsMenuOpenAction(false)}
              className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors"
              target="_blank"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/ava.jpg"
                  alt="Qiushui Avatar"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </Link>

            <motion.div
              className="flex flex-row items-center justify-center gap-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpenAction(false)}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <span className="text-lg uppercase tracking-widest leading-none">CLOSE</span>
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
          </div>

          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              className="w-full max-w-6xl px-6 md:px-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.2, 0.8, 0.2, 1]
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-36 items-stretch">
                {/* Illustration */}
                <motion.div
                  className="w-full max-w-md md:max-w-none mx-auto"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5">
                    {/* Base (always visible) */}
                    <div className="absolute inset-0">
                      <Image
                        src={visibleImageSrc}
                        alt="Menu illustration"
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 90vw"
                      />
                    </div>

                    {/* Pending (cross-fade in after loaded) */}
                    {pendingImageSrc && (
                      <motion.div
                        key={pendingImageSrc}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, ease: 'linear' }}
                        onAnimationComplete={() => setPendingFadeDone(true)}
                      >
                        <Image
                          src={pendingImageSrc}
                          alt="Menu illustration"
                          fill
                          loading="eager"
                          className="object-cover"
                          sizes="(min-width: 768px) 50vw, 90vw"
                          onLoadingComplete={() => setPendingReady(true)}
                          onLoad={() => setPendingReady(true)}
                        />
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </div>
                </motion.div>

                {/* Menu */}
                <div className="w-full h-full flex flex-col items-center">
                  {/* Menu items (centered within remaining space) */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="space-y-6 flex flex-col items-start text-left">
                      {menuItems.map(({ href, label }) => (
                        <motion.div
                          key={href}
                          initial={{ opacity: 0, y: -18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.24,
                            ease: [0.2, 0.8, 0.2, 1]
                          }}
                        >
                          <Link
                            href={href}
                            onClick={() => setIsMenuOpenAction(false)}
                            onMouseEnter={() => setActiveImageKey(href)}
                            onFocus={() => setActiveImageKey(href)}
                            className="relative inline-block text-4xl md:text-6xl font-bold text-white uppercase tracking-wide hover:text-gray-300 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full"
                          >
                            <span className="block overflow-hidden">
                              <motion.span
                                className="block"
                                initial={{ y: '-110%' }}
                                animate={{ y: 0 }}
                                transition={{
                                  duration: 0.55,
                                  delay: 0.24,
                                  ease: [0.2, 0.8, 0.2, 1]
                                }}
                              >
                                {label}
                              </motion.span>
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Contact button (aligned with the image bottom) */}
                  <motion.div
                    initial={{ opacity: 0, y: -18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.24,
                      ease: [0.2, 0.8, 0.2, 1]
                    }}
                    className="mt-auto flex justify-start"
                  >
                    <motion.button
                      className="border-2 border-white text-white px-8 py-4 text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContactClick}
                      onMouseEnter={() => setActiveImageKey('contact')}
                      onFocus={() => setActiveImageKey('contact')}
                    >
                      Contact Me
                    </motion.button>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Social links (bottom of the whole menu) */}
          <motion.div
            className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <SocialLinksRow className="flex items-center space-x-6" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
