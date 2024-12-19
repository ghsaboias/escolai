import { LucideIcon } from 'lucide-react';
import React from 'react';

interface CardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    children?: React.ReactNode;
  }
  
export const Card: React.FC<CardProps> = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 ease-in-out group">
      <Icon className="w-12 h-12 text-primary-400 mb-4 group-hover:text-primary-300 transition-colors" />
      <h3 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-primary-400 transition-colors">{title}</h3>
      <p className="text-gray-300">{description}</p>
      {children}
    </div>
  );
};