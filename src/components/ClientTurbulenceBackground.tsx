'use client';

import { useState, useEffect } from 'react';
import TurbulenceBackground from './TurbulenceBackground';

export default function ClientTurbulenceBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <TurbulenceBackground isClient={isClient} />;
}