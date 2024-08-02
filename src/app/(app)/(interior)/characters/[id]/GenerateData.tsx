'use client'

import { experimental_useObject as useObject } from 'ai/react'
import { characterDataSchema } from '@/app/api/get-character-data/schema'
import { useThemeStore } from '@/store/theme-store'
import { CharacterData, CharacterId } from '@/interfaces'
import { getMainCharacterFullName } from '@/utils'
import { Button, ProgressBar } from '@/components'
import { DataSubtitle, PersonalityItem, CuriosityItem } from './ui'
import { useEffect, useState } from 'react'

type Props = {
  character: string
}

export const GenerateData = ({ character }: Props) => {
  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const [ storedData, setStoredData ] = useState<CharacterData | null>( null )
  const mainCharacter = getMainCharacterFullName(theme)

  const getApiEndpoint = ( theme: CharacterId | null ) => {
    switch ( theme ) {
      case 'luke':
        return '/api/get-character-data-by-luke'
      case 'vader':
        return '/api/get-character-data-by-vader'
      case 'yoda':
        return '/api/get-character-data-by-yoda'
      default:
        return '/api/get-character-data'
    }
  }

  const { object, submit } = useObject({
    api: getApiEndpoint( theme ),
    schema: characterDataSchema
  })

  const getLocalStorageKey = ( theme: CharacterId | null ) => {
    switch (theme) {
      case 'luke':
        return `data_${character}_by_luke`
      case 'vader':
        return `data_${character}_by_vader`
      case 'yoda':
        return `data_${character}_by_yoda`
      default:
        return `data_${character}_by_default`
    }
  }

  useEffect(() => {
    if ( object ) {
      const key = getLocalStorageKey( theme )
      localStorage.setItem( key, JSON.stringify( object ))
      setStoredData( object as CharacterData )
    }
  }, [ object, theme ])

  useEffect(() => {
    const key = getLocalStorageKey( theme )
    const data = localStorage.getItem( key )
    if ( data ) {
      setStoredData( JSON.parse( data ))
    } else {
      setStoredData( null)
    }
  }, [ theme ])

  return (
    <div>
      { storedData ? (
        <div className="mt-8">
          { storedData.biography &&
            <div className="mb-12">
              <DataSubtitle text='Biografía' />
              <p>{ storedData.biography }</p>
            </div>
          }
          { storedData.personality &&
            <div className="mb-12">
              <DataSubtitle text='Personalidad' />
              <ul className="flex flex-wrap items-center gap-2">
                { storedData?. personality?.map(( item, index ) => (
                  <PersonalityItem key={ index } text={`${item?.item}`} />
                ))}
              </ul>
            </div>
          }
          { storedData.popularityLevel &&
            <div className="mb-12">
              <DataSubtitle text='Nivel de Popularidad' />
              <ProgressBar number={ storedData.popularityLevel } />
            </div>
          }
          { storedData.curiosities &&
            <div className="mb-12">
              <DataSubtitle text='Curiosidades' />
              <ul className="flex flex-col gap-2">
                { storedData?.curiosities?.map((item, index) => (
                  <CuriosityItem key={index} title={`${item?.title}`} content={`${ item?.description }`} />
                ))}
              </ul>
            </div>
          }
          { storedData.actor &&
            <div className="flex items-center gap-2">
              <DataSubtitle text='Interpretado/a por' />
              <span className="text-2xl text-accent font-bold mb-4">{ storedData.actor }</span>
            </div>
          }
        </div>
      ) : (
        <>
          <p className="mb-8">Si deseas, puedes generar información adicional desde la perspectiva { theme === 'yoda' ? "del" : "de" } <strong className="text-accent">{ mainCharacter }</strong>, incluyendo biografía, análisis de personalidad, nivel de popularidad y 3 datos curiosos de este personaje.</p>
          <Button text='Generar Información Interactiva' onClick={() => submit( character )} />
        </>
      )}
    </div>
  )
}
