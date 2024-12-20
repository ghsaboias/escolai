"use client";

import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatedContent, SectionTitle } from '../../../components';
import { InteractiveChat } from '../../../components/InteractiveChat';

interface ModuleContent {
  id: string;
  title: string;
  content: (string | {
    type: 'text' | 'comparison' | 'interactive-demo' | 'fun-fact' | 'quote' | 'tip';
    content: string | string[];
    icon?: string;
    details?: any;
  })[];
  exercises: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
}

interface ExerciseState {
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

const moduleContents: Record<string, ModuleContent> = {
  'introducao': {
    id: 'introducao',
    title: 'Introdução às IAs Conversacionais',
    content: [
      {
        type: 'text',
        content: 'As IAs conversacionais modernas representam um salto evolutivo na forma como interagimos com computadores. Diferente dos chatbots tradicionais, que seguem scripts predefinidos, os Large Language Models (LLMs) podem compreender contexto, nuances e intenções, proporcionando interações muito mais naturais e úteis.'
      },
      {
        type: 'interactive-demo',
        content: 'Vamos ver na prática como IAs diferentes respondem à mesma pergunta:',
        details: {
          steps: [
            {
              title: "Passo 1: Pergunta Simples",
              traditional: {
                question: "Como posso aprender programação?",
                response: "Você pode: 1) Fazer cursos online 2) Ler livros 3) Praticar código",
                explanation: "Chatbot tradicional fornece uma resposta genérica pré-programada, igual para todos os usuários."
              },
              llm: {
                question: "Como posso aprender programação? Tenho interesse em desenvolvimento web e já conheço um pouco de HTML.",
                response: "Já que você tem experiência com HTML, um caminho natural seria aprender CSS para estilização e depois JavaScript para adicionar interatividade. Recomendo começar com:\n\n1. CSS: Flexbox e Grid para layouts modernos\n2. JavaScript básico: variáveis, funções, eventos\n3. Pequenos projetos práticos combinando HTML, CSS e JS\n\nQuer que eu sugira alguns projetos iniciantes específicos?",
                explanation: "O LLM adapta a resposta baseado no seu contexto e oferece continuidade à conversa."
              }
            },
            {
              title: "Passo 2: Pergunta Técnica",
              traditional: {
                question: "Como debugar meu código?",
                response: "Use um debugger ou adicione console.log()",
                explanation: "Resposta genérica sem considerar a linguagem ou contexto específico."
              },
              llm: {
                question: "Estou tendo problemas para debugar uma função async/await em JavaScript que às vezes retorna undefined. Como posso investigar?",
                response: "Para debugar problemas com async/await, sugiro:\n\n1. Verifique se todas as funções assíncronas estão usando await\n2. Adicione try/catch para capturar erros silenciosos\n3. Use console.log() estratégicamente:\n   - Antes da operação async\n   - Dentro do try/catch\n   - No valor final retornado\n\nQuer ver um exemplo prático de código com estes pontos de debug?",
                explanation: "O LLM oferece uma solução específica para o problema, considerando a tecnologia e o erro descrito."
              }
            }
          ]
        }
      },
      {
        type: 'comparison',
        content: [
          'Chatbot Tradicional 🤖',
          '• Respostas baseadas em regras fixas',
          '• Reconhece apenas padrões exatos',
          '• Não mantém contexto da conversa',
          '• Limitado a respostas pré-programadas',
          '',
          'LLM Moderno ✨',
          '• Compreende linguagem natural',
          '• Adapta respostas ao contexto',
          '• Mantém histórico da conversa',
          '• Gera respostas originais e relevantes'
        ]
      },
      {
        type: 'fun-fact',
        icon: '🧠',
        content: 'Os LLMs modernos são treinados em conjuntos de dados tão vastos que, se impressos, ocupariam mais espaço que todas as bibliotecas públicas dos EUA combinadas!'
      },
      {
        type: 'text',
        content: 'A verdadeira revolução dos LLMs está em sua capacidade de processar e gerar linguagem natural de forma contextual. Isso significa que eles podem entender não apenas o que você diz, mas também por que você está dizendo e como isso se relaciona com o contexto mais amplo da conversa.'
      },
      {
        type: 'interactive-demo',
        content: 'Observe como o contexto afeta as respostas:',
        details: {
          traditional: 'O que é Python?',
          llm: 'Sou um desenvolvedor JavaScript querendo aprender Python. Pode explicar as principais diferenças na sintaxe e paradigmas de programação entre as duas linguagens?'
        }
      },
      {
        type: 'quote',
        icon: '💭',
        content: '"A diferença entre IAs tradicionais e LLMs é como comparar um dicionário com um professor: um oferece definições fixas, o outro adapta a explicação baseado em quem está aprendendo." - Andrej Karpathy'
      },
      {
        type: 'tip',
        icon: '💡',
        content: 'Ao interagir com LLMs, trate-os como colaboradores inteligentes. Quanto mais contexto e detalhes você fornecer sobre seu objetivo, mais relevante e útil será a resposta.'
      },
      {
        type: 'text',
        content: 'Os LLMs são particularmente eficazes em tarefas que exigem compreensão profunda e adaptabilidade, como explicar conceitos complexos, auxiliar em debug de código, sugerir melhorias em textos ou até mesmo ajudar no planejamento de projetos.'
      }
    ],
    exercises: [
      {
        question: 'Qual característica melhor define a diferença fundamental entre chatbots tradicionais e LLMs?',
        options: [
          'LLMs são mais rápidos em processar informações',
          'LLMs podem gerar respostas originais baseadas em compreensão contextual',
          'LLMs sempre fornecem respostas corretas',
          'LLMs são gratuitos para usar'
        ],
        correctAnswer: 1,
        explanation: 'A capacidade de gerar respostas originais baseadas na compreensão contextual é o que verdadeiramente diferencia os LLMs. Enquanto chatbots tradicionais selecionam respostas pré-programadas, LLMs processam e geram texto novo baseado no entendimento do contexto.'
      },
      {
        question: 'Por que o contexto é tão importante ao interagir com LLMs?',
        options: [
          'Apenas para tornar a conversa mais longa',
          'Para ajudar o LLM a economizar recursos computacionais',
          'Para permitir respostas mais precisas e relevantes às suas necessidades específicas',
          'Porque os LLMs não funcionam sem contexto completo'
        ],
        correctAnswer: 2,
        explanation: 'O contexto permite que o LLM entenda não apenas sua pergunta, mas também sua situação específica, nível de conhecimento e objetivos, resultando em respostas mais úteis e apropriadas.'
      },
      {
        question: 'Experimento Prático: Adaptação de Explicações',
        options: [
          'Peça ao LLM: "Explique o que é uma API REST"',
          'Agora peça: "Explique o que é uma API REST para uma criança de 8 anos que gosta de Minecraft"',
          'Peça: "Explique o que é uma API REST para um gerente de negócios sem conhecimento técnico"',
          'Compare as três explicações e observe como o LLM adapta a linguagem e analogias para cada público'
        ],
        correctAnswer: -1,
        explanation: `Este exercício demonstra a capacidade única dos LLMs de adaptar explicações para diferentes públicos:

1. Para desenvolvedores: Explicação técnica com termos específicos
2. Para crianças: Uso de analogias com Minecraft (ex: como os blocos se comunicam)
3. Para gerentes: Foco em benefícios de negócio e analogias do dia a dia

Tente você mesmo e observe como o LLM:
• Ajusta o nível de complexidade
• Usa analogias relevantes para cada público
• Mantém a precisão técnica mesmo simplificando
• Adapta o tom e vocabulário

💡 Dica: Experimente com outros conceitos técnicos e diferentes públicos-alvo!`
      }
    ]
  },
  'perguntas-efetivas': {
    id: 'perguntas-efetivas',
    title: 'Formulando Perguntas Efetivas',
    content: [
      {
        type: 'text',
        content: 'A arte de formular perguntas efetivas é fundamental para obter as melhores respostas dos LLMs. Vamos explorar as técnicas principais.'
      },
      {
        type: 'comparison',
        content: [
          'Pergunta Ineficaz ❌',
          '• "Como fazer isso?"',
          '• "Explique tudo sobre X"',
          '• "Não está funcionando"',
          '',
          'Pergunta Eficaz ✨',
          '• "Como posso implementar X usando Y?"',
          '• "Quais são os 3 conceitos principais de X?"',
          '• "Estou recebendo o erro Z ao tentar X"'
        ]
      },
      {
        type: 'tip',
        icon: '🎯',
        content: 'Seja específico em suas perguntas e forneça contexto relevante para obter respostas mais precisas.'
      },
      {
        type: 'interactive-demo',
        content: 'Veja a diferença nas respostas:',
        details: {
          traditional: 'Como fazer um bolo?',
          llm: 'Preciso fazer um bolo de chocolate para 10 pessoas. Tenho forno elétrico e ingredientes básicos. Pode me dar uma receita detalhada?'
        }
      },
      {
        type: 'quote',
        icon: '💬',
        content: '"A qualidade da resposta é diretamente proporcional à qualidade da pergunta."'
      }
    ],
    exercises: [
      {
        question: 'Qual das seguintes é a pergunta mais efetiva para um LLM?',
        options: [
          'Preciso de uma receita de bolo de chocolate que seja fácil de fazer e que fique bem molhadinho. Você tem alguma sugestão?',
          'Preciso de uma receita de bolo de chocolate para 10 pessoas. Tenho forno elétrico e ingredientes básicos. Pode me ajudar?',
          'Quero fazer um bolo de chocolate para um aniversário importante amanhã. Preciso que seja um bolo bonito e gostoso.',
          'Pode me passar uma receita de bolo de chocolate caseiro? Gostaria de uma que seja testada e aprovada por outros cozinheiros.'
        ],
        correctAnswer: 1,
        explanation: 'A segunda opção é mais efetiva pois especifica o contexto (10 pessoas), equipamento disponível (forno elétrico) e outras informações relevantes (ingredientes básicos).'
      },
      {
        question: 'Ao pedir ajuda para organizar uma viagem, qual abordagem é mais eficaz?',
        options: [
          'Quero planejar uma viagem para o Rio de Janeiro nas férias de julho. Busco lugares turísticos famosos e bons restaurantes na cidade.',
          'Estou planejando uma viagem de 5 dias para o Rio de Janeiro em julho, com um orçamento de R$3.000. Gosto de praias e cultura local. Pode sugerir um roteiro?',
          'Preciso de recomendações para uma viagem ao Rio de Janeiro. Quero conhecer as praias mais bonitas e os melhores pontos turísticos da cidade.',
          'Vou passar uma semana no Rio de Janeiro e gostaria de dicas de hospedagem, restaurantes e atrações imperdíveis na cidade.'
        ],
        correctAnswer: 1,
        explanation: 'A segunda opção fornece detalhes importantes: duração da viagem, destino, época do ano, orçamento e preferências pessoais.'
      },
      {
        question: 'Ao pedir explicações sobre um assunto, qual é a melhor abordagem?',
        options: [
          'Sou iniciante em fotografia e acabei de comprar minha primeira câmera DSLR. Pode me explicar os conceitos básicos para começar?',
          'Pode me explicar os conceitos básicos de fotografia? Comprei minha primeira câmera digital e quero aprender sobre luz, composição e modos automáticos.',
          'Gostaria de aprender fotografia para tirar fotos melhores em viagens e eventos especiais. Quais são os princípios fundamentais?',
          'Quero entender melhor sobre fotografia digital. Pode me explicar sobre ISO, abertura e velocidade do obturador?'
        ],
        correctAnswer: 1,
        explanation: 'A segunda opção contextualiza seu nível (iniciante), equipamento (câmera digital) e especifica os aspectos que deseja aprender.'
      },
      {
        question: 'Qual é a melhor maneira de pedir sugestões de exercícios físicos?',
        options: [
          'Busco exercícios para perda de peso que posso fazer em casa. Tenho experiência com musculação e cardio moderado.',
          'Procuro exercícios para fazer em casa, 30 minutos por dia, focando em perda de peso. Tenho apenas pesos leves e um tapete de yoga.',
          'Gostaria de montar uma rotina de exercícios para emagrecer em casa. Prefiro treinos curtos e de alta intensidade.',
          'Preciso de um programa de exercícios para perda de peso que possa fazer em casa. Tenho pouco tempo disponível durante a semana.'
        ],
        correctAnswer: 1,
        explanation: 'A segunda opção especifica o local (casa), tempo disponível (30 minutos), objetivo (perda de peso) e equipamentos disponíveis.'
      },
      {
        question: 'Ao pedir recomendações de livros, qual abordagem é mais eficaz?',
        options: [
          'Busco recomendações de ficção científica hard sci-fi. Gosto de histórias com bases científicas sólidas e exploração espacial.',
          'Pode recomendar livros de ficção científica com foco em exploração espacial? Gostei muito de "Perdido em Marte" e prefiro histórias mais focadas em ciência que em fantasia.',
          'Procuro livros de ficção científica sobre exploração espacial. Gosto de autores como Andy Weir e Arthur C. Clarke.',
          'Gostaria de indicações de ficção científica realista. Prefiro histórias que se passam no espaço e têm embasamento científico.'
        ],
        correctAnswer: 1,
        explanation: 'A segunda opção fornece o gênero desejado (ficção científica), um subtema específico (exploração espacial), uma referência do que gosta (Perdido em Marte) e preferências específicas (foco em ciência).'
      }
    ]
  },
  'praticas-exemplos': {
    id: 'praticas-exemplos',
    title: 'Práticas e Exemplos',
    content: [
      {
        type: 'text',
        content: 'Vamos explorar exemplos práticos de interações com LLMs em diferentes contextos e situações.'
      },
      {
        type: 'interactive-demo',
        content: 'Exemplo de Brainstorming Criativo:',
        details: {
          traditional: 'Me dê ideias para um projeto',
          llm: 'Preciso de ideias para um projeto de app mobile que ajude pessoas a reduzir o desperdício de alimentos. O público-alvo são famílias urbanas.'
        }
      },
      {
        type: 'comparison',
        content: [
          'Uso Básico 📱',
          '• Perguntas simples',
          '• Respostas diretas',
          '• Interação única',
          '',
          'Uso Avançado 🚀',
          '• Conversas em contexto',
          '• Refinamento iterativo',
          '• Exploração profunda'
        ]
      },
      {
        type: 'fun-fact',
        icon: '💡',
        content: 'LLMs podem manter contexto por várias mensagens, permitindo conversas mais naturais e aprofundadas!'
      },
      {
        type: 'tip',
        icon: '🎯',
        content: 'Experimente dividir problemas complexos em partes menores e use o LLM para explorar cada parte separadamente.'
      }
    ],
    exercises: [
        {
          question: 'Qual das seguintes é a pergunta mais efetiva para um LLM?',
          options: [
            'Preciso de uma receita de bolo de chocolate que seja fácil de fazer e que fique bem molhadinho. Você tem alguma sugestão?',
            'Preciso de uma receita de bolo de chocolate para 10 pessoas. Tenho forno elétrico e ingredientes básicos. Pode me ajudar?',
            'Quero fazer um bolo de chocolate para um aniversário importante amanhã. Preciso que seja um bolo bonito e gostoso.',
            'Pode me passar uma receita de bolo de chocolate caseiro? Gostaria de uma que seja testada e aprovada por outros cozinheiros.'
          ],
          correctAnswer: 1,
          explanation: 'A segunda opção é mais efetiva pois especifica o contexto (10 pessoas), equipamento disponível (forno elétrico) e outras informações relevantes (ingredientes básicos).'
        },
        {
          question: 'Ao pedir ajuda para organizar uma viagem, qual abordagem é mais eficaz?',
          options: [
            'Quero planejar uma viagem para o Rio de Janeiro nas férias de julho. Busco lugares turísticos famosos e bons restaurantes na cidade.',
            'Estou planejando uma viagem de 5 dias para o Rio de Janeiro em julho, com um orçamento de R$3.000. Gosto de praias e cultura local. Pode sugerir um roteiro?',
            'Preciso de recomendações para uma viagem ao Rio de Janeiro. Quero conhecer as praias mais bonitas e os melhores pontos turísticos da cidade.',
            'Vou passar uma semana no Rio de Janeiro e gostaria de dicas de hospedagem, restaurantes e atrações imperdíveis na cidade.'
          ],
          correctAnswer: 1,
          explanation: 'A segunda opção fornece detalhes importantes: duração da viagem, destino, época do ano, orçamento e preferências pessoais.'
        },
        {
          question: 'Ao pedir explicações sobre um assunto, qual é a melhor abordagem?',
          options: [
            'Sou iniciante em fotografia e acabei de comprar minha primeira câmera DSLR. Pode me explicar os conceitos básicos para começar?',
            'Pode me explicar os conceitos básicos de fotografia? Comprei minha primeira câmera digital e quero aprender sobre luz, composição e modos automáticos.',
            'Gostaria de aprender fotografia para tirar fotos melhores em viagens e eventos especiais. Quais são os princípios fundamentais?',
            'Quero entender melhor sobre fotografia digital. Pode me explicar sobre ISO, abertura e velocidade do obturador?'
          ],
          correctAnswer: 1,
          explanation: 'A segunda opção contextualiza seu nível (iniciante), equipamento (câmera digital) e especifica os aspectos que deseja aprender.'
        },
        {
          question: 'Qual é a melhor maneira de pedir sugestões de exercícios físicos?',
          options: [
            'Busco exercícios para perda de peso que posso fazer em casa. Tenho experiência com musculação e cardio moderado.',
            'Procuro exercícios para fazer em casa, 30 minutos por dia, focando em perda de peso. Tenho apenas pesos leves e um tapete de yoga.',
            'Gostaria de montar uma rotina de exercícios para emagrecer em casa. Prefiro treinos curtos e de alta intensidade.',
            'Preciso de um programa de exercícios para perda de peso que possa fazer em casa. Tenho pouco tempo disponível durante a semana.'
          ],
          correctAnswer: 1,
          explanation: 'A segunda opção especifica o local (casa), tempo disponível (30 minutos), objetivo (perda de peso) e equipamentos disponíveis.'
        },
        {
          question: 'Ao pedir recomendações de livros, qual abordagem é mais eficaz?',
          options: [
            'Busco recomendações de ficção científica hard sci-fi. Gosto de histórias com bases científicas sólidas e exploração espacial.',
            'Pode recomendar livros de ficção científica com foco em exploração espacial? Gostei muito de "Perdido em Marte" e prefiro histórias mais focadas em ciência que em fantasia.',
            'Procuro livros de ficção científica sobre exploração espacial. Gosto de autores como Andy Weir e Arthur C. Clarke.',
            'Gostaria de indicações de ficção científica realista. Prefiro histórias que se passam no espaço e têm embasamento científico.'
          ],
          correctAnswer: 1,
          explanation: 'A segunda opção fornece o gênero desejado (ficção científica), um subtema específico (exploração espacial), uma referência do que gosta (Perdido em Marte) e preferências específicas (foco em ciência).'
        }
      ]
  }
};

// Add module order for navigation
const moduleOrder = ['introducao', 'perguntas-efetivas', 'praticas-exemplos'];

// Add this helper function at the top level
const isModuleAvailable = (moduleId: string, currentModuleIndex: number, moduleOrder: string[]) => {
  const moduleIndex = moduleOrder.indexOf(moduleId);
  return moduleIndex <= currentModuleIndex;
};

// Add this helper function
const hasCompletedModule = (exerciseStates: ExerciseState[], exercises: ModuleContent['exercises']) => {
  const regularExercises = exercises.filter(ex => ex.correctAnswer !== -1);
  const regularExerciseStates = exerciseStates.slice(0, regularExercises.length);
  
  return regularExerciseStates.every(state => state?.isCorrect === true);
};

const ModuleContent: React.FC<{ params: { moduleId: string } }> = ({ params }) => {
  const module = moduleContents[params.moduleId];
  
  // Add error handling for invalid module
  if (!module) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Módulo não encontrado</h1>
          <a href="/courses" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            Voltar aos cursos
          </a>
        </div>
      </div>
    );
  }

  const currentModuleIndex = moduleOrder.indexOf(params.moduleId);
  const totalModules = moduleOrder.length;
  
  const nextModuleId = currentModuleIndex < totalModules - 1 ? moduleOrder[currentModuleIndex + 1] : null;
  const prevModuleId = currentModuleIndex > 0 ? moduleOrder[currentModuleIndex - 1] : null;

  const [exerciseStates, setExerciseStates] = useState<ExerciseState[]>(() => 
    module?.exercises.map(() => ({ selectedAnswer: null, isCorrect: null })) || []
  );

  const calculateScore = () => {
    const completedExercises = exerciseStates.filter(state => state.isCorrect !== null);
    const correctExercises = exerciseStates.filter(state => state.isCorrect === true);
    return {
      completed: completedExercises.length,
      correct: correctExercises.length,
      total: exerciseStates.length,
      percentage: Math.round((correctExercises.length / exerciseStates.length) * 100)
    };
  };

  const handleAnswerSelect = (exerciseIndex: number, optionIndex: number) => {
    const exercise = module.exercises[exerciseIndex];
    
    // Skip if exercise doesn't have a correct answer (-1)
    if (exercise.correctAnswer === -1) return;

    const isCorrect = optionIndex === exercise.correctAnswer;
    
    setExerciseStates(prev => {
      const newStates = [...prev];
      newStates[exerciseIndex] = {
        selectedAnswer: optionIndex,
        isCorrect
      };
      return newStates;
    });
  };

  // Add state to track if user has attempted to proceed
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans min-h-screen">
      {/* Fixed Navigation Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <a href="/courses" className="hover:text-blue-400">Cursos</a>
              <span>/</span>
              <a href="/courses/inicio-rapido" className="hover:text-blue-400">Início Rápido com IA</a>
              <span>/</span>
              <span className="text-blue-400">{module.title}</span>
            </div>
            <a href="/courses/inicio-rapido" 
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 hover:bg-gray-800 px-3 py-1 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar ao curso
            </a>
          </div>
          
          {/* Progress bar in header */}
          <div className="mt-4 h-1 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentModuleIndex + 1) / totalModules) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content with adjusted padding for fixed header */}
      <div className="pt-24">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Content Column */}
          <div className="md:col-span-8">
            {/* Content Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <SectionTitle>{module.title}</SectionTitle>
              <AnimatedContent>
                <div className="prose prose-invert max-w-none space-y-6">
                  {module.content.map((item, idx) => {
                    if (typeof item === 'string') {
                      return <p key={idx} className="text-gray-300 leading-relaxed">{item}</p>;
                    } else {
                      const { type, content, icon, details } = item;
                      switch (type) {
                        case 'text':
                          return (
                            <div key={idx} className="py-4">
                              <p className="text-gray-300 leading-relaxed">{content}</p>
                            </div>
                          );

                        case 'interactive-demo':
                          if (!details.steps) return null;
                          
                          return (
                            <div key={idx} className="my-8 space-y-8">
                              <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2">
                                <span className="p-2 bg-primary-500/10 rounded-lg text-primary-400">
                                  💡
                                </span>
                                {content}
                              </h3>

                              {details.steps.map((step: any, stepIdx: number) => (
                                <div key={stepIdx} className="space-y-6">
                                  <h4 className="text-sm font-medium text-primary-400/70 uppercase tracking-wider">
                                    {step.title}
                                  </h4>
                                  
                                  <div className="grid gap-6 md:grid-cols-2">
                                    {/* Traditional Approach */}
                                    <div className="space-y-3">
                                      <div className="inline-block px-3 py-1 bg-gray-800 text-xs font-medium text-gray-400 rounded-full">
                                        Chatbot Tradicional
                                      </div>
                                      <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                                        <div className="flex gap-3 items-start">
                                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            🤖
                                          </div>
                                          <div className="space-y-4 flex-1">
                                            <div className="text-sm text-gray-200 bg-gray-800/80 rounded-lg p-3">
                                              <p className="font-medium mb-2 text-gray-100">Usuário pergunta:</p>
                                              {step.traditional.question}
                                            </div>
                                            <div className="text-sm text-gray-200 bg-gray-800/80 rounded-lg p-3">
                                              <p className="font-medium mb-2 text-gray-100">Chatbot responde:</p>
                                              {step.traditional.response}
                                            </div>
                                            <div className="text-xs text-gray-400 italic">
                                              {step.traditional.explanation}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* LLM Approach */}
                                    <div className="space-y-3">
                                      <div className="inline-block px-3 py-1 bg-primary-500/10 text-xs font-medium text-primary-300 rounded-full">
                                        LLM Moderno
                                      </div>
                                      <div className="p-4 rounded-lg bg-gray-900 border border-primary-800">
                                        <div className="flex gap-3 items-start">
                                          <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                                            ✨
                                          </div>
                                          <div className="space-y-4 flex-1">
                                            <div className="text-sm text-gray-100 bg-gray-800/80 rounded-lg p-3">
                                              <p className="font-medium mb-2">Usuário pergunta:</p>
                                              {step.llm.question}
                                            </div>
                                            <div className="text-sm text-gray-100 bg-gray-800/80 rounded-lg p-3 whitespace-pre-wrap">
                                              <p className="font-medium mb-2">LLM responde:</p>
                                              {step.llm.response}
                                            </div>
                                            <div className="text-xs text-primary-300 italic">
                                              {step.llm.explanation}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );

                        case 'fun-fact':
                          return (
                            <div key={idx} className="my-6 bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                              <div className="flex items-start gap-4">
                                <span className="text-2xl p-3 bg-blue-500/20 rounded-lg">{icon}</span>
                                <div>
                                  <h4 className="font-semibold text-blue-400 mb-2">Você sabia?</h4>
                                  <p className="text-gray-300">{content}</p>
                                </div>
                              </div>
                            </div>
                          );

                        case 'comparison':
                          if (!Array.isArray(content)) return null;
                          const midPoint = Math.ceil(content.length / 2);
                          const firstHalf = content.slice(0, midPoint);
                          const secondHalf = content.slice(midPoint);

                          return (
                            <div key={idx} className="my-8 grid md:grid-cols-2 gap-6">
                              <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
                                <h4 className="font-semibold text-red-400 mb-4">{firstHalf[0]}</h4>
                                <ul className="space-y-3">
                                  {firstHalf.slice(1).map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                                <h4 className="font-semibold text-green-400 mb-4">{secondHalf[0]}</h4>
                                <ul className="space-y-3">
                                  {secondHalf.slice(1).map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );

                        case 'quote':
                          return (
                            <div key={idx} className="my-6 bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                              <div className="flex items-start gap-4">
                                <span className="text-2xl p-3 bg-purple-500/20 rounded-lg">{icon}</span>
                                <blockquote className="text-gray-300 italic">
                                  {content}
                                </blockquote>
                              </div>
                            </div>
                          );

                        case 'tip':
                          return (
                            <div key={idx} className="my-6 bg-amber-500/10 rounded-xl p-6 border border-amber-500/20">
                              <div className="flex items-start gap-4">
                                <span className="text-2xl p-3 bg-amber-500/20 rounded-lg">{icon}</span>
                                <div>
                                  <h4 className="font-semibold text-amber-400 mb-2">Dica</h4>
                                  <p className="text-gray-300">{content}</p>
                                </div>
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    }
                  })}
                </div>
              </AnimatedContent>
            </div>

            {/* Exercises Section */}
            <div id="exercises" className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="p-2 bg-primary-500/20 rounded-lg">
                    📝
                  </span>
                  Exercícios
                </h2>
                
                {/* Score display */}
                <div className="bg-gray-700/50 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Pontuação: <span className="text-primary-400 font-bold">{calculateScore().percentage}%</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {calculateScore().correct}/{calculateScore().total} corretas
                    </div>
                  </div>
                </div>
              </div>

              <AnimatedContent>
                <div className="space-y-6">
                  {module.exercises.map((exercise, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-6">
                      <p className="text-lg mb-4 font-medium">{exercise.question}</p>
                      <div className="space-y-3">
                        {exercise.options.map((option, optIdx) => {
                          const state = exerciseStates[idx];
                          const isSelected = state?.selectedAnswer === optIdx;
                          const showResult = state?.isCorrect !== null;
                          const isCorrectAnswer = exercise.correctAnswer === optIdx;
                          const isPracticeExercise = exercise.correctAnswer === -1;
                          
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerSelect(idx, optIdx)}
                              disabled={showResult || isPracticeExercise}
                              className={`w-full text-left p-4 rounded-lg transition-all border
                                ${showResult && isCorrectAnswer 
                                  ? 'bg-green-900/20 border-green-500 text-gray-100'
                                  : showResult && isSelected && !isCorrectAnswer
                                  ? 'bg-red-900/20 border-red-500 text-gray-100'
                                  : isPracticeExercise
                                  ? 'bg-gray-800/50 border-gray-700 text-gray-300 cursor-default'
                                  : 'bg-gray-800/50 hover:bg-gray-800 border-gray-700 hover:border-primary-500 text-gray-300'}
                                ${!showResult && !isPracticeExercise && 'hover:translate-x-1 hover:shadow-lg'}
                              `}
                            >
                              <span className="flex items-center justify-between">
                                <span className="flex items-start items-center gap-3 min-h-[2.5rem]">
                                  <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm flex-shrink-0">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="flex-1 pt-1">{option}</span>
                                </span>
                                {showResult && isCorrectAnswer && (
                                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                )}
                                {showResult && isSelected && !isCorrectAnswer && (
                                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {/* Show explanation when answered */}
                      {exerciseStates[idx]?.isCorrect !== null && exercise.explanation && (
                        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg text-gray-300">
                          <p className="text-sm">{exercise.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedContent>
            </div>

            {/* Interactive Chat Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary-500/20 rounded-lg">
                  💬
                </span>
                Pratique o que aprendeu
              </h2>
              <p className="text-gray-300 mb-6">
                Use o chat abaixo para praticar os conceitos deste módulo. Experimente fazer perguntas diferentes e observe como o LLM adapta suas respostas.
              </p>
              <InteractiveChat 
                defaultContext={`Você é um assistente especializado em IAs conversacionais, ajudando com o módulo "${module.title}".`}
                suggestedQuestions={[
                  "Pode me explicar melhor sobre " + module.title + "?",
                  "Qual a importância deste tópico?",
                  "Como posso aplicar isso na prática?",
                  "Pode me dar um exemplo?",
                ]}
                onQuestionClick={() => {}}
              />
            </div>
          </div>

          {/* Sidebar with improved styling */}
          <div className="md:col-span-4">
            <div className="sticky top-24 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Seu Progresso</h3>
                <span className="px-3 py-1 bg-primary-500/20 rounded-full text-primary-400 font-medium">
                  {currentModuleIndex + 1}/{totalModules}
                </span>
              </div>
              
              {/* Module navigation */}
              <div className="space-y-4">
                {moduleOrder.map((id, idx) => {
                  const moduleContent = moduleContents[id];
                  if (!moduleContent) return null;

                  const isAvailable = isModuleAvailable(id, currentModuleIndex, moduleOrder);
                  const isCurrent = id === params.moduleId;

                  return (
                    <div key={id} className="relative group">
                      {!isAvailable && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                          🔒
                        </div>
                      )}
                      
                      {isAvailable ? (
                        <a
                          href={`/courses/inicio-rapido/${id}`}
                          className={`block p-3 rounded-lg transition-all ${
                            isCurrent 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                              ${isCurrent ? 'bg-primary-600' : 'bg-gray-800/50'}`}
                            >
                              {idx + 1}
                            </span>
                            <span className="flex-1">{moduleContent.title}</span>
                            {idx < currentModuleIndex && (
                              <span className="text-green-400">
                                <CheckCircle2 className="w-4 h-4" />
                              </span>
                            )}
                          </div>
                        </a>
                      ) : (
                        <div className={`block p-3 rounded-lg bg-gray-800/20 text-gray-500 cursor-not-allowed`}>
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-800/30 flex items-center justify-center text-sm">
                              {idx + 1}
                            </span>
                            <span className="flex-1">{moduleContent.title}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="mt-6 space-y-4">
                {nextModuleId ? (
                  <div className="space-y-3">
                    {showWarning && !hasCompletedModule(exerciseStates, module.exercises) && (
                      <div className="text-sm text-amber-400 flex items-center gap-2 justify-center animate-fadeIn">
                        <AlertCircle className="w-4 h-4" />
                        Complete todos os exercícios para avançar
                      </div>
                    )}
                    <a 
                      href={hasCompletedModule(exerciseStates, module.exercises) ? `/courses/inicio-rapido/${nextModuleId}` : '#exercises'}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition-all
                        flex items-center justify-center gap-2
                        ${hasCompletedModule(exerciseStates, module.exercises)
                          ? 'bg-primary-500 hover:bg-primary-600 text-white hover:-translate-y-1 hover:shadow-lg'
                          : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'}
                      `}
                      onClick={(e) => {
                        if (!hasCompletedModule(exerciseStates, module.exercises)) {
                          e.preventDefault();
                          setShowWarning(true);
                          document.querySelector('#exercises')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Próximo Módulo
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <a 
                    href="/courses/inicio-rapido/certificate"
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg 
                              font-semibold transition-all hover:-translate-y-1 hover:shadow-lg
                              flex items-center justify-center gap-2"
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
    </div>
  );
};

export default ModuleContent; 