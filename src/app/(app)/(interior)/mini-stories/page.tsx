'use client';

import { historySchema } from '@/app/api/short-histories/schema'
import { CharacterId } from '@/interfaces';
import { useThemeStore } from '@/store/theme-store';
import { experimental_useObject } from '@ai-sdk/react'
import { useState } from 'react'
import Markdown from 'react-markdown'

export default function ShortStories() {

  const [ viewStory, setViewStory ] = useState( false )
  const [ genre, setGenre] = useState('adventure')
  const [ targetAgeGroup, setTargetAgeGroup ] = useState('general')
  const [ numOfCharacters, setNumOfCharacters ] = useState(3)

  const { theme } = useThemeStore() as { theme: CharacterId | null }

  const getCameo = ( theme: CharacterId | null ) => {
    switch ( theme ) {
      case 'luke':
        return 'Luke Skywalker'
      case 'vader':
        return 'Darth Vader'
      case 'yoda':
        return 'El Maestro Yoda'
      default:
        return 'Ningún Cameo'
    }
  }

  const { object, submit } = experimental_useObject({
    api: '/api/short-histories',
    schema: historySchema
  })

  const handleStory = () => {
    submit({
      genre,
      targetAgeGroup,
      numOfCharacters,
      cameo: getCameo( theme )
    })
    setViewStory(true)
  }

  return (
    <>
      { 
        viewStory ? (     
          object
          && (
            <>
            <h2>{ object.title }</h2>
            <Markdown>{ object.story }</Markdown>
            </>
          )
        ):
        <>
        <div>
          <label htmlFor="genre">Género:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="adventure">Aventura</option>
            <option value="sci-fi">Ciencia Ficción</option>
            <option value="comedy">Comedia</option>
            <option value="drama">Drama</option>
            <option value="mystery">Misterio</option>
            <option value="romance">Romance</option>
            <option value="horror">Terror</option>
            <option value="suspense">Suspenso</option>
          </select>
        </div>

        <div>
          <label htmlFor="targetAgeGroup">Grupo de Edad:</label>
          <select
            id="targetAgeGroup"
            value={targetAgeGroup}
            onChange={(e) => setTargetAgeGroup(e.target.value)}
          >
            <option value="children">Niños</option>
            <option value="teens">Adolescentes</option>
            <option value="adults">Adultos</option>
            <option value="general">General</option>
          </select>
        </div>

        <div>
          <label htmlFor="numOfCharacters">Número de Personajes:</label>
          <input
            id="numOfCharacters"
            type="number"
            value={numOfCharacters}
            onChange={(e) => setNumOfCharacters(parseInt(e.target.value))}
            min="1"
            max="5"
          />
        </div>

        <button
          onClick={() => handleStory()}
          className="text-left bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] transition-all py-6 px-10 flex-1 rounded-md backdrop-blur-lg"
        >
        Generar Historia
        </button>
        </>
      }
    </>
  );
}
