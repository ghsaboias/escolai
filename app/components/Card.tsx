import { LucideIcon } from 'lucide-react';
import React from 'react';

interface CardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    children?: React.ReactNode;
  }
  
export const Card: React.FC<CardProps> = ({ icon: Icon, title, description, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
      <Icon className="text-primary-600 mb-4" size={32} />
      <h3 className="text-xl font-semibold mb-2 text-secondary-800">{title}</h3>
      <p className="text-secondary-600">{description}</p>
      {children}
    </div>
  );