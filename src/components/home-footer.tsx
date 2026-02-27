'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';

const FooterGlitchText = dynamic(() => import('./footer-glitch-text'), {
  ssr: false
});

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });

  return (
    <footer
      ref={footerRef}
      className="sticky bottom-0 z-0 w-full overflow-hidden bg-black"
    >
      <motion.div
        className="flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Desktop: Three.js glitch effect */}
        <div className="hidden md:block w-full">
          <FooterGlitchText />
        </div>
        {/* Mobile: plain text */}
        <h2
          className="block md:hidden select-none text-center font-bold uppercase leading-none tracking-wide text-white/70 w-full py-6"
          style={{ fontSize: 'clamp(3rem, 20vw, 40vh)' }}
        >
          QIUSHUI
        </h2>
      </motion.div>
    </footer>
  );
}
