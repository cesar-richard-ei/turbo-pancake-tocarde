import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
