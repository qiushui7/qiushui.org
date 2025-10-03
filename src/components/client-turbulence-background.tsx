'use client';

import TurbulenceBackground from './turbulence-background';
import { useEffect, useState } from 'react';

export default function ClientTurbulenceBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TurbulenceBackground /> : null;
}
