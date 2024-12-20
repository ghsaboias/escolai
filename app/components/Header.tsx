'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface HeaderItem {
  href: string;
  label: string;
}

interface HeaderProps {
  title: string;
  items: HeaderItem[];
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, items, className }) => {
  const router = useRouter();

  return (
    <header className={`bg-gray-200 shadow-sm px-6 ${className}`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-600 font-heading cursor-pointer" onClick={() => router.push('/')}>{title}</h1>
      <nav className="font-sans">
        <ul className="flex space-x-4">
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="text-secondary-600 hover:text-primary-600 transition duration-300">{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </header>
  );
};