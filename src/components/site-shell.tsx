'use client';

import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/components/home-header';
import Footer from '@/components/home-footer';
import ClientTurbulenceBackground from '@/components/client-turbulence-background';
import ScrollProgressBar from '@/components/scroll-progress-bar';
import { UiChromeProvider, useUiChrome } from '@/components/ui-chrome';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <UiChromeProvider>
      <Analytics />
      <SpeedInsights />
      <ScrollProgressBar />
      <ClientTurbulenceBackground />

      <Header />

      {/* Move the whole page content down smoothly when the full-screen menu opens */}
      <SiteShellContent>{children}</SiteShellContent>
    </UiChromeProvider>
  );
}

function SiteShellContent({ children }: { children: React.ReactNode }) {
  const { isFullScreenMenuOpen } = useUiChrome();

  return (
    <motion.div
      className="relative"
      animate={{ y: isFullScreenMenuOpen ? '100vh' : 0 }}
      transition={{ duration: 0.6, ease: [0.1, 0.1, 0.1, 0.1] }}
    >
      <main className="min-h-screen">{children}</main>
      <Footer />
    </motion.div>
  );
}
