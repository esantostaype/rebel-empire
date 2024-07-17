// pages/index.tsx
'use client';

import { useEffect } from 'react'
import { useCompletion } from 'ai/react'
import { Theme, useThemeStore } from '@/store/theme-store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import mainCharacters from '@/data/main-characters.json'
import Cookies from 'js-cookie'

export const WelcomeText = () => {

  const { theme, setTheme } = useThemeStore()
  const { completion, complete } = useCompletion({
    api: '/api/generate-text'
  })

  const character = mainCharacters.find( char => char.id === theme )
  
  useEffect(() => {
    async function generateText() {
      await complete(`Generar un texto de bienvenida en español, de entre 60 y 80 palabras, con temática de Star Wars, escrito como si ${character} lo estuviera redactando. Este texto se utilizará en una aplicación interactiva que incluye personajes, naves, planetas y concursos de trivia para medir el conocimiento sobre Star Wars. Asegúrate de capturar la personalidad y estilo del personaje ${character} y de incluir referencias relevantes al universo de Star Wars.`)
    }
    generateText();
  }, [ theme, setTheme, complete, character ])

  const handleSelect = ( id: string ) => {
    Cookies.set('theme', id, { expires: 365 })
    setTheme( id as Theme )
  }

  const [ listRef ] = useAutoAnimate()

  return (
    <div ref={ listRef }>
      <h1 className="animate-fade-up animate-duration-300">Bienvenido, { character?.name }</h1>
      { completion }
      <ul className={ `flex gap-8 mt-4` }>
        { mainCharacters.map(( character ) => (
          <li key={ character.id }>
            <button onClick={ () => handleSelect( character.id ) } >{ character.name }</button></li>
        ))} 
      </ul>
    </div>
  );
}
