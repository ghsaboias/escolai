import { ArrowRight, Book, Brain, Gamepad2, LucideIcon, Search, Star, UserCheck, Zap } from 'lucide-react';
import React from 'react';
import { Card, SectionTitle } from '../components/index';

interface CourseItem {
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  time: string;
  slug: string;
}

const Courses: React.FC = () => {
  const courseItems: CourseItem[] = [
    { 
      icon: Zap, 
      title: "Início Rápido com IA", 
      description: "Aprenda os conceitos básicos e comece a usar IA imediatamente.", 
      difficulty: 1, 
      time: "15min",
      slug: "inicio-rapido"
    },
    { 
      icon: Gamepad2, 
      title: "Diversão e Criatividade", 
      description: "Explore jogos de palavras e geração de conteúdo criativo com IA.", 
      difficulty: 1, 
      time: "30min",
      slug: "diversao-e-criatividade"
    },
    { 
      icon: Book, 
      title: "Assistente de Aprendizado", 
      description: "Use IA para melhorar seus estudos e compreensão de novos tópicos.", 
      difficulty: 2, 
      time: "45min",
      slug: "assistente-de-aprendizado"
    },
    { 
      icon: UserCheck, 
      title: "Organização Pessoal", 
      description: "Aprenda a usar IA para gerenciar tarefas e aumentar sua produtividade.", 
      difficulty: 2, 
      time: "1h",
      slug: "organizacao-pessoal"
    },
    { 
      icon: Brain, 
      title: "Estímulo à Criatividade", 
      description: "Supere bloqueios criativos e gere ideias inovadoras com ajuda da IA.", 
      difficulty: 3, 
      time: "1h30min",
      slug: "estimulo-a-criatividade"
    },
    { 
      icon: Search, 
      title: "Pesquisa Avançada", 
      description: "Aprimore suas habilidades de pesquisa e análise de dados com IA.", 
      difficulty: 3, 
      time: "1h30min",
      slug: "pesquisa-avancada"
    },
    /* Courses with difficulty > 3 commented out for future use
    { 
      icon: Code, 
      title: "Programação Assistida", 
      description: "Use IA para aprender programação, depurar código e entender conceitos técnicos.", 
      difficulty: 4, 
      time: "8h" 
    },
    { 
      icon: Building, 
      title: "IA nos Negócios", 
      description: "Aplique IA em cenários empresariais, desde atendimento ao cliente até análise de mercado.", 
      difficulty: 4, 
      time: "7h" 
    },
    { 
      icon: Lightbulb, 
      title: "Inovação com IA", 
      description: "Aprenda a formular prompts avançados e explorar os limites da IA.", 
      difficulty: 5, 
      time: "10h" 
    },
    */
  ];

  const renderDifficultyStars = (difficulty: number) => {
    return Array(difficulty).fill(0).map((_, i) => (
      <Star key={i} className="ml-1 inline-block w-4 h-4 text-yellow-400 fill-current" />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans min-h-screen flex flex-col">
      <SectionTitle>Jornada de Aprendizado em IA: Do Básico ao Avançado</SectionTitle>
      
      <div className="flex-grow grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 mx-6 place-content-center">
        {courseItems.map((item, index) => (
          <a 
            key={index} 
            href={`/courses/${item.slug}`} 
            className="block transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
          >
            <Card 
              icon={item.icon} 
              title={item.title} 
              description={item.description}
              children={<div className="mt-2">
                {/* centrally align stars and text */}
                <p className="text-gray-300 flex items-center">
                  Nível: {renderDifficultyStars(item.difficulty)}
                  <span className="ml-4">⏱️ {item.time}</span>
                </p>
              </div>}
            />
          </a>
        ))}
      </div>

      <div className="text-center mb-4">
        <SectionTitle>Pronto para começar?</SectionTitle>
        <p className="text-xl text-secondary-600 mb-6">Descubra como a IA pode melhorar sua vida!</p>
        <a 
          href="/courses/inicio-rapido/introducao" 
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:-translate-y-1"
        >
          Começar Agora
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Courses;