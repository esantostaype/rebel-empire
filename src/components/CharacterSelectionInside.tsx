'use client'
import { Theme, useThemeStore } from '@/store/theme-store'
import Cookies from 'js-cookie'
import mainCharacters from '@/data/main-characters.json'

export const CharacterSelectionInside = () => {

  const { theme, setTheme } = useThemeStore()

  const handleSelect = ( id: string ) => {
    Cookies.set('theme', id, { expires: 365 })
    setTheme( id as Theme )
  }

  return (
    <ul className="relative z-50 flex gap-8 mt-4">
      { mainCharacters.map(( character ) => (
        <li key={ character.id }>
          <button onClick={ () => handleSelect( character.id ) } >{ character.name }</button></li>
      ))} 
    </ul>
  )

}