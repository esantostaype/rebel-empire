'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CharacterCard } from './CharacterCard'
import mainCharacters from '@/data/main-characters.json'
import styles from './CharacterSelection.module.css'
import { Button } from '@/components'
import { toast } from 'react-toastify'

export const CharacterSelection: React.FC = () => {

  const router = useRouter()

  const [ selectedId, setSelectedId ] = useState<string | null>(null)

  const handleSelect = ( id: string ) => {
    setSelectedId( id )
  }

  const handleSubmit = () => {
    if (!selectedId) {
      toast.error('Por favor, selecciona un personaje.')
      return
    }
    localStorage.setItem('theme', selectedId)
    router.push('/about')
  }
  
  return (
    <>
    <ul className={ `flex gap-8 ${ styles.list }` }>
      { mainCharacters.map(( character, index ) => (
        <CharacterCard
          key={ character.id }
          character={ character }
          onSelect={ handleSelect }
          isSelected={ character.id === selectedId }
          isNotSelected={ selectedId !== null && character.id !== selectedId }
          className={`animate-duration-500 animate-fade-up animate-delay-${ index + 1 }00`}
        />
      ))}
    </ul>
    <div className="mt-20 relative animate-duration-500 animate-fade-up animate-delay-300">
      <Button text='Ingresar' onClick={ handleSubmit } />
    </div>
    </>
  )
}