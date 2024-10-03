import { Book, Brain, Building, Code, Gamepad2, Lightbulb, LucideIcon, Search, Star, UserCheck, Zap } from 'lucide-react';
import React from 'react';
import { Button, Card, SectionTitle } from '../components/index';

interface CourseItem {
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

const Courses: React.FC = () => {
  const courseItems: CourseItem[] = [
    { icon: Zap, title: "Início Rápido com IA", description: "Aprenda os conceitos básicos e comece a usar IA imediatamente.", difficulty: 1 },
    { icon: Gamepad2, title: "Diversão e Criatividade", description: "Explore jogos de palavras e geração de conteúdo criativo com IA.", difficulty: 1 },
    { icon: Book, title: "Assistente de Aprendizado", description: "Use IA para melhorar seus estudos e compreensão de novos tópicos.", difficulty: 2 },
    { icon: UserCheck, title: "Organização Pessoal", description: "Aprenda a usar IA para gerenciar tarefas e aumentar sua produtividade.", difficulty: 2 },
    { icon: Brain, title: "Estímulo à Criatividade", description: "Supere bloqueios criativos e gere ideias inovadoras com ajuda da IA.", difficulty: 3 },
    { icon: Search, title: "Pesquisa Avançada", description: "Aprimore suas habilidades de pesquisa e análise de dados com IA.", difficulty: 3 },
    { icon: Code, title: "Programação Assistida", description: "Use IA para aprender programação, depurar código e entender conceitos técnicos.", difficulty: 4 },
    { icon: Building, title: "IA nos Negócios", description: "Aplique IA em cenários empresariais, desde atendimento ao cliente até análise de mercado.", difficulty: 4 },
    { icon: Lightbulb, title: "Inovação com IA", description: "Aprenda a formular prompts avançados e explorar os limites da IA.", difficulty: 5 },
  ];

  const renderDifficultyStars = (difficulty: number) => {
    return Array(difficulty).fill(0).map((_, i) => (
      <Star key={i} className="inline-block w-4 h-4 text-yellow-400 fill-current" />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <SectionTitle>Jornada de Aprendizado em IA: Do Básico ao Avançado</SectionTitle>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 ml-6 mr-6">
        {courseItems.map((item, index) => (
          <Card 
            key={index} 
            icon={item.icon} 
            title={item.title} 
            description={item.description}
            children={<div className="mt-2">
              <p className="text-secondary-600">Nível: {renderDifficultyStars(item.difficulty)}</p>
            </div>}
          />
        ))}
      </div>

      <div className="text-center">
        <SectionTitle>Pronto para iniciar sua aventura no mundo da IA?</SectionTitle>
        <p className="text-xl mb-8 text-secondary-600">Embarque nesta jornada emocionante e descubra como a IA pode transformar sua vida!</p>
        <Button href="#">Comece sua jornada agora</Button>
      </div>
    </div>
  );
};

export default Courses;