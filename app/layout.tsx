import React from 'react';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <Header />
          <main className="pt-10 pb-5">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
