import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import React from 'react';
import { AnimatedContent, SectionTitle } from '../../../components';

interface ModuleContent {
  id: string;
  title: string;
  content: string[];
  exercises: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const moduleContents: Record<string, ModuleContent> = {
  'introducao': {
    id: 'introducao',
    title: 'Introdução às IAs Conversacionais',
    content: [
      'As IAs conversacionais, também conhecidas como chatbots de IA, são programas que podem entender e responder a perguntas em linguagem natural.',
      'Diferente dos chatbots tradicionais, elas não são limitadas a respostas pré-programadas, podendo gerar respostas únicas e contextuais.',
      'Exemplos populares incluem ChatGPT, Claude, e Gemini, cada um com suas próprias características e capacidades.'
    ],
    exercises: [
      {
        question: 'Qual a principal diferença entre chatbots tradicionais e IAs conversacionais?',
        options: [
          'IAs conversacionais são mais rápidas',
          'IAs conversacionais podem gerar respostas únicas e contextuais',
          'Chatbots tradicionais são mais precisos',
          'Não há diferença significativa'
        ],
        correctAnswer: 1
      }
    ]
  },
  'perguntas-efetivas': {
    id: 'perguntas-efetivas',
    title: 'Formulando Perguntas Efetivas',
    content: [
      'A qualidade das respostas de uma IA depende diretamente da qualidade das perguntas que fazemos.',
      'Uma boa pergunta deve ser clara, específica e fornecer contexto suficiente.',
      'Aprenda técnicas para estruturar suas perguntas e obter melhores resultados.'
    ],
    exercises: [
      {
        question: 'Qual é a principal diferença entre uma pergunta efetiva e uma pergunta inefetiva?',
        options: [
          'Perguntas efetivas são mais curtas',
          'Perguntas efetivas são mais longas',
          'Perguntas efetivas são mais claras',
          'Perguntas efetivas são mais específicas'
        ],
        correctAnswer: 3
      }
    ]
  },
  'praticas-exemplos': {
    id: 'praticas-exemplos',
    title: 'Práticas e Exemplos',
    content: [
      'Vamos aplicar o que aprendemos em situações reais do dia a dia.',
      'Veremos exemplos práticos de uso e exercícios para fixar o aprendizado.',
      'Ao final deste módulo, você estará pronto para usar IA de forma eficiente.'
    ],
    exercises: [
      {
        question: 'Qual é a principal diferença entre uma prática efetiva e uma prática inefetiva?',
        options: [
          'Práticas efetivas são mais curtas',
          'Práticas efetivas s��o mais longas',
          'Práticas efetivas são mais claras',
          'Práticas efetivas são mais específicas'
        ],
        correctAnswer: 3
      }
    ]
  }
};

// Add module order for navigation
const moduleOrder = ['introducao', 'perguntas-efetivas', 'praticas-exemplos'];

const ModuleContent: React.FC<{ params: { moduleId: string } }> = ({ params }) => {
  const module = moduleContents[params.moduleId];
  const currentModuleIndex = moduleOrder.indexOf(params.moduleId);
  const totalModules = moduleOrder.length;
  
  const nextModuleId = currentModuleIndex < totalModules - 1 ? moduleOrder[currentModuleIndex + 1] : null;
  const prevModuleId = currentModuleIndex > 0 ? moduleOrder[currentModuleIndex - 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans min-h-screen">
      {/* Navigation Header with Breadcrumbs */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <a href="/courses" className="hover:text-blue-400">Cursos</a>
          <span>/</span>
          <a href="/courses/inicio-rapido" className="hover:text-blue-400">Início Rápido com IA</a>
          <span>/</span>
          <span className="text-blue-400">{module.title}</span>
        </div>
        <a href="/courses/inicio-rapido" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Voltar ao curso
        </a>
      </div>

      {/* Module Navigation Progress */}
      <div className="mb-8">
        <div className="h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentModuleIndex + 1) / totalModules) * 100}%` }}
          />
        </div>
      </div>

      {/* Module Content */}
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          <SectionTitle>{module.title}</SectionTitle>
          
          {/* Content Sections */}
          <AnimatedContent>
            <div className="prose prose-invert max-w-none">
              {module.content.map((paragraph, idx) => (
                <p key={idx} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedContent>

          {/* Exercises */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Exercícios</h2>
            <AnimatedContent>
              {module.exercises.map((exercise, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6">
                  <p className="text-lg mb-4">{exercise.question}</p>
                  <div className="space-y-3">
                    {exercise.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        className="w-full text-left p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </div>

        {/* Updated Progress Sidebar */}
        <div className="md:col-span-4">
          <div className="sticky top-4 bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Seu Progresso</h3>
              <span className="text-primary-400">{currentModuleIndex + 1}/{totalModules}</span>
            </div>
            
            <div className="space-y-4">
              {nextModuleId ? (
                <a 
                  href={`/courses/inicio-rapido/${nextModuleId}`}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Próximo Módulo
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <a 
                  href="/courses/inicio-rapido/certificate"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Concluir Curso
                  <CheckCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleContent; 