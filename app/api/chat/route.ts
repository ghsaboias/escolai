import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024,
    });

    return NextResponse.json(chatCompletion.choices[0]?.message || {});
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get chat response' },
      { status: 500 }
    );
  }
} 