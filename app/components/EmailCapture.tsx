"use client"
import React, { useState } from 'react';
import { Button } from './Button';

const EmailCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // setMessage('Dá uma olhada no seu e-mail 👀');
        setMessage('Cadastro realizado com sucesso! 🎉');
        setEmail('');
        setIsSuccess(true);
      } else {
        setMessage(data.error || 'Ocorreu um erro. Por favor, tente novamente');
      }
    } catch (error) {
      setMessage('Ocorreu um erro. Por favor, tente novamente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage('');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700 md:w-1/2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Seu e-mail"
          required
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 text-white placeholder-gray-400 text-center"
          onInvalid={(e) => {
            e.preventDefault();
            setMessage('Insira um e-mail válido');
          }}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? '...' : 'Começar grátis'}
        </Button>
        {message && (
        <div className="text-center">
          <p className={`text-md  ${isSuccess ? 'text-green-400 animate-pulse' : 'text-yellow-400'}`}>
            {message}
          </p>
        </div>
        )}
      </form>
    </div>
  );
};

export default EmailCapture;