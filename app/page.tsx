'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import { TestimonialsSection } from '@/components/landing/Testimonials';
import { AyurvedaSection } from '@/components/landing/AyurvedaSection';
import { Community } from '@/components/landing/Community';

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <HeroSection onStartConsultation={() => router.push('/consultation')} />
      <AyurvedaSection/>
      <HowItWorks/>
      <Community/>
      <TestimonialsSection/>
    </div>
  );
}