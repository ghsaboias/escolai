import { ArrowLeft, Download, Share2 } from 'lucide-react';
import React from 'react';
import { SectionTitle } from '../../../components';

const Certificate: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans min-h-screen">
      <div className="text-center mb-12">
        <SectionTitle>Parabéns! 🎉</SectionTitle>
        <p className="text-xl text-gray-300 mt-4">
          Você completou o curso Início Rápido com IA
        </p>
      </div>

      {/* Certificate Preview */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-12 rounded-lg border border-gray-700 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Certificado de Conclusão</h2>
          <p className="text-xl mb-4">Este certificado é concedido a</p>
          <p className="text-2xl font-bold text-primary-400 mb-8">[Nome do Aluno]</p>
          <p className="text-xl mb-8">
            pela conclusão do curso<br />
            <span className="font-bold">Início Rápido com IA</span>
          </p>
          <div className="text-gray-400">
            <p>Data de conclusão: {new Date().toLocaleDateString()}</p>
            <p>Duração: 15 minutos</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Baixar Certificado
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Compartilhar
        </button>
      </div>

      {/* Return to Main Page */}
      <div className="flex items-center justify-between mb-8">
        <a 
          href="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar à página inicial
        </a>
      </div>
    </div>
  );
};

export default Certificate; 