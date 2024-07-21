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
          <div style={{ clipPath: 'polygon(30% 0%, 100% 0, 100% 70%, 70% 100%, 0 100%, 0% 30%)' }}>
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
    <div className="h-screen w-full top-0 left-0">
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