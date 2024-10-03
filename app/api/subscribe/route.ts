import { NextResponse } from 'next/server';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
  return open({
    filename: './subscribers.sqlite',
    driver: sqlite3.Database
  });
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Por favor, insira seu e-mail' }, { status: 400 });
  }

  try {
    const db = await openDb();
    await db.run('CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
    await db.run('INSERT INTO subscribers (email) VALUES (?)', email);
    await db.close();

    return NextResponse.json({ message: 'Successfully subscribed' }, { status: 201 });
  } catch (error: any) {
    if (error.errno === 19) { // SQLite UNIQUE constraint error
      return NextResponse.json({ error: 'Este email já está inscrito 😄' }, { status: 400 });
    }
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Error subscribing to the newsletter' }, { status: 500 });
  }
}