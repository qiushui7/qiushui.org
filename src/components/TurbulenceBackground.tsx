'use client';

import { motion } from "framer-motion";

interface TurbulenceBackgroundProps {
  isClient: boolean;
}

export default function TurbulenceBackground({ isClient }: TurbulenceBackgroundProps) {
  if (!isClient) return null;

  return (
    <div className="fixed inset-0 turbulence-bg pointer-events-none z-[-1]">
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="turbulence-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Larger Turbulence Effects */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              background: `radial-gradient(circle, rgba(135, 206, 235, 0.1) 0%, rgba(79, 195, 247, 0.05) 50%, transparent 100%)`,
              filter: 'blur(3px)',
            }}
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 150 - 75],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
} 