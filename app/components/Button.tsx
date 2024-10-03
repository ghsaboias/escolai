import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}
  
export const Button: React.FC<ButtonProps> = ({ children, href, onClick, className }) => (
    <a
        href={href}
        onClick={onClick}
        className={`bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition duration-300 font-sans ${className}`}
    >
        {children}
    </a>
);