'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogIn, LogOut, Leaf, Heart, Sparkles } from 'lucide-react';
import { isAuthenticated, signOut as serverSignOut } from '@/lib/actions/auth.action';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  const navItems = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/consultation', label: 'Consultation', key: 'consultation' },
    { href: '/reports', label: 'Reports', key: 'reports' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => setMobileOpen(prev => !prev);

  const handleAuthClick = async () => {
    setLoading(true);
    if (authenticated) {
      await serverSignOut();
      setAuthenticated(false);
      router.push('/');
    } else {
      router.push('/sign-in');
    }
    setLoading(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                {/* Main circular container with gradient */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg border border-emerald-200/50">
                  {/* Central leaf icon */}
                  <Leaf className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                
                {/* Heart accent - top right */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
                
                {/* Sparkle accent - bottom left */}
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  <Sparkles className="w-2.5 h-2.5 text-white fill-white" />
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-md -z-10 scale-110"></div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                  Dr. Veda
                </h1>
                <p className="text-xs text-emerald-600/80 font-medium tracking-wide">
                  Virtual Ayurvedic Doctor
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            {!isAuthPage && (
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-25'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
            )}

            {/* Mobile Menu & Auth */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {!isAuthPage && (
                <button
                  className="md:hidden p-2 rounded-full text-emerald-600 hover:bg-emerald-100 transition"
                  onClick={toggleMobileMenu}
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
              <button
                onClick={handleAuthClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition"
                disabled={loading}
              >
                {authenticated === null || loading ? (
                  'Loading...'
                ) : authenticated ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar (Only on non-auth pages) */}
      {!isAuthPage && (
        <>
          <div
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-emerald-100 shadow-xl transform transition-transform duration-300 ${
              mobileOpen ? 'translate-x-0' : '-translate-x-full'
            } md:hidden`}
          >
            <div className="p-6 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2 rounded-xl text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleAuthClick();
                }}
                className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {authenticated === null || loading ? (
                  'Loading...'
                ) : authenticated ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Backdrop */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
              onClick={toggleMobileMenu}
            />
          )}
        </>
      )}
    </>
  );
};

export default Header;