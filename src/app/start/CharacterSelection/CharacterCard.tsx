'use client'
import Image from 'next/image'
import { Tilt } from 'react-tilt'
import styles from './CharacterSelection.module.css'
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
      className={`${ className } ${styles.item} ${ isSelected ? styles.selected : ''} ${ isNotSelected ? styles.noSelected : ''}`}
      onClick={ handleCardClick }
    >
      <Tilt style={{ transformStyle: "preserve-3d" }}>
        <h2 className={ styles.name }>{ character.name }</h2>
        <div className={ styles.image }>
          <Image src={ character.image } alt={ character.name } width={ 496 } height={ 560 } priority={ true }/>
        </div>
      </Tilt>
    </li>
  )
}