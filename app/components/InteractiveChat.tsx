"use client";

import { RotateCcw, SendHorizontal } from 'lucide-react';
import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface InteractiveChatProps {
  defaultContext?: string;
  suggestedQuestions?: string[];
  onQuestionClick?: (question: string) => void;
}

export const InteractiveChat: React.FC<InteractiveChatProps> = ({ 
  defaultContext, 
  suggestedQuestions = [],
  onQuestionClick 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionClick = (question: string) => {
    setInput(question);
    onQuestionClick?.(question);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: defaultContext 
            ? [{ role: 'system', content: defaultContext }, ...newMessages]
            : newMessages
        }),
      });

      const data = await response.json();
      
      if (data.content) {
        const newAssistantMessage: Message = { role: 'assistant', content: data.content };
        setMessages([...newMessages, newAssistantMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput('');
  };

  const formatMessage = (content: string) => {
    return content
      // Bold text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Numbered lists with proper spacing (without extra br)
      .replace(/^(\d+\.\s*)(.+)$/gm, '$1$2')
      // Bullet points with proper spacing (without extra br)
      .replace(/^\* (.+)$/gm, '• $1')
      // Single line breaks
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={resetChat}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-3 py-1 rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar Chat
        </button>
      </div>
      {suggestedQuestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(question)}
              className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      )}
      <div className="h-[300px] overflow-y-auto space-y-4 p-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
              dangerouslySetInnerHTML={{ 
                __html: formatMessage(message.content)
              }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}; 