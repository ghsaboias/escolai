import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-6 font-heading">{children}</h2>
  </div>
);