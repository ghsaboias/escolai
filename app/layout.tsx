import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Escolai - Domine a Inteligência Artificial',
  description: 'Aprenda a utilizar IA para impulsionar sua carreira e sua vida com a Escolai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}