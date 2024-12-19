'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const StartCourseButton: React.FC = () => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push('/courses/inicio-rapido/introducao')}
      className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
    >
      Começar Curso
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}; 