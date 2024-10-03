import React from 'react';

interface FooterProps {
  copyright: string;
  className?: string;
}
  
export const Footer: React.FC<FooterProps> = ({ copyright, className }) => (
  <footer className={`bg-secondary-800 text-white py-8 font-sans ${className}`}>
    <div className="container mx-auto px-4 text-center">
      <p>{copyright}</p>
    </div>
  </footer>
);