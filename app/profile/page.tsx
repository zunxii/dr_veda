'use client';

import React, { useEffect, useState } from 'react';
import ProfileSection from '@/components/ProfileSection';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';


export default function ProfilePage() {
const [authenticated, setAuthenticated] = useState<boolean | null>(null);
const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      router.push('/sign-in');
    }
  }, [authenticated, router]);

    if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );}
  return <ProfileSection />;
}