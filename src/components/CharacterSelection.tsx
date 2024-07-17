'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Theme, useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import Cookies from 'js-cookie'

export const CharacterSelection = () => {

  const pathname = usePathname()

  const { theme, setTheme } = useThemeStore()
  const characterSelected = mainCharacters.find( char => char.id === theme )
  const filteredCharacters = mainCharacters.filter( char => char.id !== theme )

  const handleSelect = ( id: string ) => {
    Cookies.set('theme', id, { expires: 365 })
    setTheme( id as Theme )
  }

  return (
    <>
    <ul className="fixed bottom-8 gap-4 flex flex-col right-8 z-50">
      { filteredCharacters.map(( character ) => (
        <li key={ character.id } onClick={ () => handleSelect( character.id ) } className="cursor-pointer">
          <div className="character__thumbnail">
            <Image
              src={ character.thumbnail }
              width={ 128 }
              height={ 128 }
              alt={ character?.name || 'Star Wars' }
              className="h-24 w-24 object-cover transition-transform duration-300"
            />
          </div>
        </li>
      ))}
    </ul>
    <Image
      src={ characterSelected?.mainImage! }
      width={ 1920 }
      height={ 1080 }
      alt={ characterSelected?.name || 'Star Wars' }
      className={ pathname === '/' ?
        "absolute top-0 right-0 h-screen z-20 w-full object-cover mix-blend-lighten vt-image" :
        "absolute bottom-0 -right-12 h-1/2 z-20 w-auto object-cover mix-blend-lighten vt-image"
      }
    />
    </>
  )

}