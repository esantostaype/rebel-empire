// pages/index.tsx
'use client';

import { useEffect } from 'react'
import { useCompletion } from 'ai/react'
import { Theme, useThemeStore } from '@/store/theme-store'

export default function ExamplePage() {

  const { theme, setTheme } = useThemeStore()
  const { completion, complete } = useCompletion({
    api: '/api/generate-text',
  })

  const character = theme === 'luke' ? 'Luke Skywalker' : theme === 'vader' ? 'Darth Vader' : 'Maestro Yoda'
  
  useEffect(() => {
    async function generateText() {
      await complete(`Generar un texto en español de no más de 60 palabras de Bienvenida como si ${ character } lo estuviera escribiendo`);
    }
    generateText();
  }, [ theme, setTheme, complete, character ]);

  const handleCardClick = ( character: string ) => {
    setTheme( character as Theme )
  };

  return (
    <div>
      <div data-testid="generation">{completion}</div>
      <ul>
      <li onClick={() => handleCardClick('luke')}>Luke Skywalker</li>
        <li onClick={() => handleCardClick('vader')}>Darth Vader</li>
        <li onClick={() => handleCardClick('yoda')}>Maestro Yoda</li>
      </ul>
    </div>
  );
}
