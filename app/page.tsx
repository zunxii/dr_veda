'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="space-y-12">
      <HeroSection onStartConsultation={() => router.push('/consultation')} />
      <HowItWorks/>
    </div>
  );
}