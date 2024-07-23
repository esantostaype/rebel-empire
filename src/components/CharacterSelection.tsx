'use client'
import Image from 'next/image'
import { Theme, useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import Cookies from 'js-cookie'
import { CharacterImage } from './CharacterImage'
import { useChatStore } from '@/store/chat-store'

export const CharacterSelection = () => {

  const { theme, setTheme } = useThemeStore()
  const { disableLinks } = useChatStore()
  const characterSelected = mainCharacters.find( char => char.id === theme )
  const filteredCharacters = mainCharacters.filter( char => char.id !== theme )

  const handleSelect = ( id: string ) => {
    Cookies.set('theme', id, { expires: 365 })
    setTheme( id as Theme )
  }

  return (
    <>
    <ul className={`${ disableLinks ? "disabled" : "" } hidden fixed bottom-8 gap-4 md:flex flex-col right-8 z-[999] vt-characters`}>
      { filteredCharacters.map(( character ) => (
        <li key={ character.id } onClick={ () => handleSelect( character.id ) } className="cursor-pointer">
          <div style={{ clipPath: 'path("M88,96H16c-6.2-6.2-9.8-9.8-16-16V8c0-4.4,3.6-8,8-8h72c6.2,6.2,9.8,9.8,16,16v72C96,92.4,92.4,96,88,96z")' }}>
            <Image
              src={ character.thumbnail }
              width={ 128 }
              height={ 128 }
              alt={ character?.name || 'Star Wars' }
              className="h-24 w-24 object-cover transition-transform duration-300 hover:scale-[1.2]"
            />
          </div>
        </li>
      ))}
    </ul>
    <div>
      { characterSelected?.id === 'luke' && 
        <CharacterImage character={ characterSelected } />
      }
      { characterSelected?.id === 'vader' && 
        <CharacterImage character={ characterSelected } />
      }
      { characterSelected?.id === 'yoda' && 
        <CharacterImage character={ characterSelected } />
      }
    </div>
    </>
  )
}