'use client'

import { experimental_useObject as useObject } from 'ai/react'
import { characterDataSchema } from '@/app/api/get-character-data/schema'
import { useThemeStore } from '@/store/theme-store'
import { CharacterId } from '@/interfaces'
import { getMainCharacterFullName } from '@/utils'
import { Button } from '@/components'
import { DataSubtitle, PersonalityItem, CuriosityItem } from './'
import { useEffect, useRef, useState } from 'react'

type Props = {
  character : string
}

export const GenerateData = ({ character } : Props) => {

  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const mainCharacter = getMainCharacterFullName( theme )

  const [ showData, setShowData ] = useState<{ [ key in CharacterId ]?: boolean }>({
    luke: true,
    vader: true,
    yoda: true
  })

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

  const { object, submit, isLoading } = useObject({
    api: getApiEndpoint( theme ),
    schema: characterDataSchema
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ( scrollRef.current ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [ object ])

  return (
    <div ref={ scrollRef }>
      { object ? (
        <div className="mt-8">
          { object.biography &&
          <div className="mb-12">
            <DataSubtitle text='Biografía' />
            <p>{ object.biography }</p>
          </div>
          }
          { object.personality &&
          <div className="mb-12">
            <DataSubtitle text='Personalidad' />
            <ul className="flex flex-wrap items-center gap-2">
              { object?.personality?.map(( item, index ) => (
                <PersonalityItem key={ index } text={`${ item?.item }`}/>
              )) }
            </ul>
          </div>
          }
          { object.popularityLevel &&
          <div className="mb-12">
            <DataSubtitle text='Nivel de Popularidad' />
            <div className="relative bg-[rgba(255,255,255,0.2)] mt-8 rounded-md h-3 overflow-hidden">
              <div
                className="absolute h-3 w-full rounded-md bg-accent top-0 left-0"
                style={{ animationDuration: '1s', animationFillMode: 'both', animationName: 'progress', transform: `translateX(-${100 - ( object.popularityLevel || 0)}% )` }}
              ></div>
            </div>
          </div>
          }
          { object.curiosities &&
          <div className="mb-12">
            <DataSubtitle text='Curiosidades' />
            <ul className="flex flex-col gap-2">
              { object?.curiosities?.map(( item, index ) => (
                <CuriosityItem key={ index } title={`${ item?.title }`} content={`${ item?.description }`}/>
              )) }
            </ul>
          </div>
          }
          { object.actor &&
          <div className="flex items-center gap-2"> 
            <DataSubtitle text='Interpretado/a por' />
            <span className="text-2xl text-accent font-bold mb-4">{ object.actor }</span>
          </div>
          }
        </div>
      ) : (
        <>
        <p className="mb-8">Si deseas, puedes generar información adicional desde la perspectiva { theme === 'yoda' ? "del" : "de" } <strong className="text-accent">{ mainCharacter }</strong>, incluyendo biografía, análisis de personalidad, nivel de popularidad y 3 datos curiosos de este personaje.</p>
        <Button text='Generar Información Interactiva' onClick={() => submit( character )}/>
        </>
      )}
    </div>
  )
}