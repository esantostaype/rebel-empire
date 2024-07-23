'use client'
import Image from 'next/image'
import { Tilt } from 'react-tilt'
import { useThemeStore } from '@/store/theme-store'
import { Theme } from '@/store/theme-store'
import { MainCharacter } from '@/interfaces'

interface CharacterCardProps {
  character: MainCharacter
  onSelect: ( id: string ) => void
  isSelected: boolean
  isNotSelected: boolean
  className?: string
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect, isSelected, isNotSelected, className }) => {

  const { setTheme } = useThemeStore()

  const handleCardClick = () => {
    setTheme( character.id as Theme )
    onSelect( character.id )
  }

  return (
    <li
      className={`${ className } transition-all duration-500 ease-out cursor-pointer relative ${ isSelected ? 'pointer-events-none' : ''} ${ isNotSelected ? 'filter grayscale opacity-40 hover:filter-none hover:opacity-100' : ''}`}
      onClick={ handleCardClick }
    >
      <Tilt style={{ transformStyle: "preserve-3d" }} className="transition-all duration-500 ease-out">
        <h2 className="transition-all duration-500 ease-out absolute bottom-10 left-[-48px] text-[4em] w-[140%] md:text-[3em] transform rotate-[-90deg] scale-90 md:w-full z-10" style={{ transform: 'translateZ(60px)' }}>{ character.name }</h2>
        <div className="transition-all duration-500 ease-out relative w-[248px] h-[480px] z-2" style={{ clipPath: 'path("M224,480H48c-18.7-18.7-29.3-29.3-48-48V24C0,10.7,10.7,0,24,0h176c18.7,18.7,29.3,29.3,48,48v408 C248,469.3,237.3,480,224,480z")' }}>
          <Image src={ character.image } alt={ character.name } width={ 496 } height={ 560 } priority={ true }/>
          <div className={`transition-all duration-500 ease-out top-0 left-0 h-full w-full absolute inset-0 bg-accent mix-blend-color ${ isSelected ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </Tilt>
    </li>
  )
}