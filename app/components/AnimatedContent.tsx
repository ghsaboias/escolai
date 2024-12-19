'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedContentProps {
  children: React.ReactNode;
}

interface ContentBlockProps {
  type: string;
  content: string | string[];
  icon?: string;
  details?: any;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ type, content, icon, details }) => {
  switch (type) {
    case 'interactive-demo':
      return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 hover:bg-gray-750 transition-colors">
          <h3 className="text-xl font-bold mb-4">{content}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Chatbot Tradicional:</div>
              {details.traditional}
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border-2 border-primary-500">
              <div className="text-sm text-gray-400 mb-2">LLM Moderno:</div>
              {details.llm}
            </div>
          </div>
        </div>
      );

    case 'fun-fact':
      return (
        <div className="bg-primary-900/20 border-l-4 border-primary-500 p-4 rounded my-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <span>{content}</span>
          </div>
        </div>
      );

    case 'comparison':
      if (!Array.isArray(content)) {
        return null;
      }
      return (
        <div className="grid md:grid-cols-2 gap-6 my-6">
          {content.map((line, i) => (
            <div key={i} className={line.startsWith('•') ? 'ml-4' : 'font-bold'}>
              {line}
            </div>
          ))}
        </div>
      );

    case 'quote':
      if (Array.isArray(content)) {
        return null;
      }
      return (
        <div className="bg-primary-900/20 border-l-4 border-primary-500 p-4 rounded my-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <span>{content}</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const AnimatedContent: React.FC<AnimatedContentProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}; 