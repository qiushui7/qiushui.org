'use client';

import { motion } from 'framer-motion';
import { SocialLinksRow } from './social-links';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-gray-800/50 mt-20">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <SocialLinksRow className="flex items-center space-x-6" />

          {/* Copyright */}
          <motion.div
            className="text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>© {currentYear} qiushui. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
