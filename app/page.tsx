import { Book, Brain, Code, Zap } from 'lucide-react';
import React from 'react';
import { Button, Footer, Header, SectionTitle } from './components';

const Card: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 p-6 cursor-pointer border border-gray-700">
    <Icon className="w-12 h-12 text-primary-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const EscolaiLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header 
        title="Escolai" 
        items={[
          { href: "/courses", label: "Cursos" },
          { href: "/about", label: "Sobre" },
          { href: "/contact", label: "Contato" }
        ]} 
      />

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-100 font-heading">O que uma IA pode fazer por você?</h2>
          <p className="text-xl mb-8 text-gray-300">Um Guia Prático da Escolai</p>
          <Button href="#" className="bg-primary-500 hover:bg-primary-600 text-white">Comece Grátis</Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 mx-6">
          <Card icon={Zap} title="Aumente sua Produtividade" description="Assistência na escrita, revisão e resumo de documentos." />
          <Card icon={Brain} title="Estimule sua Criatividade" description="Brainstorming de ideias e superação do bloqueio criativo." />
          <Card icon={Book} title="Aprimore suas Habilidades" description="Auxílio no aprendizado de idiomas e melhoria da escrita." />
          <Card icon={Code} title="Auxílio em Programação" description="Depuração de código e explicação de conceitos técnicos." />
        </section>

        <section className="text-center mb-16">
          <SectionTitle className="text-gray-100">Por que escolher a Escolai?</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 mt-8 mx-6">
            {[
              { title: "Aprendizado Personalizado", description: "Cursos adaptados ao seu ritmo e estilo de aprendizagem." },
              { title: "Projetos Práticos", description: "Aplique seus conhecimentos em projetos do mundo real." },
              { title: "Certificações Reconhecidas", description: "Obtenha certificados valorizados pelo mercado." }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-gray-100 font-heading">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gray-800 rounded-lg shadow-md p-8 mb-16 border border-gray-700 mx-6">
          <SectionTitle className="text-gray-100">Pronto para iniciar sua jornada na IA?</SectionTitle>
          <p className="text-xl mb-8 text-gray-300">Junte-se a milhares de alunos e transforme sua carreira hoje mesmo.</p>
          <Button href="#" className="bg-primary-500 hover:bg-primary-600 text-white">Inscreva-se Agora</Button>
        </section>
      </main>

      <Footer copyright="© 2024 Escolai. Todos os direitos reservados." className="text-gray-400 bg-gray-800" />
    </div>
  );
};

export default EscolaiLandingPage;