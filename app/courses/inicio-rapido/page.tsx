import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';
import React from 'react';
import { SectionTitle } from '../../components';
import { StartCourseButton } from '../../components/StartCourseButton';

const CourseContent: React.FC = () => {
  const modules = [
    {
      id: 'introducao',
      title: "Introdução às IAs Conversacionais",
      description: "Entenda o que são chatbots de IA e como eles podem ajudar",
      duration: "5min"
    },
    {
      id: 'perguntas-efetivas',
      title: "Formulando Perguntas Efetivas",
      description: "Aprenda a estruturar suas perguntas para obter melhores respostas",
      duration: "5min"
    },
    {
      id: 'praticas-exemplos',
      title: "Práticas e Exemplos",
      description: "Veja exemplos práticos e exercícios para fixar o aprendizado",
      duration: "5min"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans min-h-screen">
      {/* Course Header - Full width with gradient background */}
      <div className="mb-12 -mx-4 px-4 py-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Início Rápido com IA</h1>
              <p className="text-xl text-blue-400">
                Aprenda os conceitos básicos e comece a usar IA imediatamente.
              </p>
            </div>
            <div className="flex items-center gap-6 text-blue-400">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>Nível Básico</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>15min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Main Content - 8 columns */}
        <div className="md:col-span-8 space-y-8">
          {/* Course Overview */}
          <div>
            <SectionTitle>Visão Geral</SectionTitle>
            <div className="bg-gray-800 rounded-lg p-6 mt-4">
              <p className="text-gray-300">
                Neste curso rápido, você aprenderá o essencial para começar a usar IA de forma prática e eficiente. 
                Ideal para iniciantes que querem resultados imediatos.
              </p>
            </div>
          </div>

          {/* Course Modules */}
          <div>
            <SectionTitle>Módulos do Curso</SectionTitle>
            <div className="space-y-4 mt-4">
              {modules.map((module, index) => (
                <a 
                  key={index}
                  href={`/courses/inicio-rapido/${module.id}`}
                  className="block group"
                >
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary-500 transition-all cursor-pointer hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-primary-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg group-hover:text-primary-400 transition-colors">
                            {module.title}
                          </h3>
                          <span className="text-sm text-gray-400">{module.duration}</span>
                        </div>
                        <p className="text-gray-300 mt-1">{module.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary-400 transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - 4 columns */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
            <h3 className="font-semibold text-lg mb-4">O que você vai aprender:</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                O que são IAs conversacionais e como funcionam
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                Como formular perguntas efetivas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                Melhores práticas para obter bons resultados
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                Exemplos práticos de uso no dia a dia
              </li>
            </ul>

            <StartCourseButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent; 