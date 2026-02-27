'use client';

import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/components/home-header';
import Footer from '@/components/home-footer';
import { SocialLinksRow } from '@/components/social-links';
import ClientTurbulenceBackground from '@/components/client-turbulence-background';
import ScrollProgressBar from '@/components/scroll-progress-bar';
import { UiChromeProvider, useUiChrome } from '@/components/ui-chrome';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <UiChromeProvider>
      <Analytics />
      <SpeedInsights />
      <ScrollProgressBar />

      <Header />

      {/* Move the whole page content down smoothly when the full-screen menu opens */}
      <SiteShellContent>{children}</SiteShellContent>
    </UiChromeProvider>
  );
}

function SiteShellContent({ children }: { children: React.ReactNode }) {
  const { isFullScreenMenuOpen } = useUiChrome();

  return (
    <>
      <motion.div
        className="relative z-10 bg-black"
        style={{ clipPath: 'inset(0)' }}
        animate={{ y: isFullScreenMenuOpen ? '100vh' : 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
      >
        {/* Turbulence bg is clipped to the content area via clip-path on parent */}
        <ClientTurbulenceBackground />
        <main className="min-h-screen">{children}</main>
        {/* Social links & copyright — stays in the content layer, not the reveal footer */}
        <div>
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center space-y-8">
            <SocialLinksRow className="flex items-center space-x-6" />
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} qiushui. All rights reserved.
            </p>
          </div>
        </div>
        {/* Bottom shadow edge for the reveal effect */}
        <div className="pointer-events-none h-px w-full shadow-[0_20px_80px_40px_rgba(0,0,0,0.8)]" />
      </motion.div>
      <Footer />
    </>
  );
}
