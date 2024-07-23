'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import mainCharacters from '@/data/main-characters.json'
import { CharacterCard } from './CharacterCard'
import { Button } from '@/components'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

export const CharacterSelection: React.FC = () => {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  const handleSubmit = () => {
    if (!selectedId) {
      toast.error('Por favor, selecciona un personaje.')
      return
    }
    Cookies.set('theme', selectedId, { expires: 365 })
    router.push('/')
  }

  return (
    <>
      <ul className="-my-28 sm:-my-12 md:-my-8 lg:-my-0 scale-[0.4] sm:scale-[0.6] md:scale-[0.75] lg:scale-100 relative z-50 flex gap-8">
        {mainCharacters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            onSelect={handleSelect}
            isSelected={character.id === selectedId}
            isNotSelected={selectedId !== null && character.id !== selectedId}
            className={`animate-fade-up animate-delay-${index + 1}00`}
          />
        ))}
      </ul>
      <div className="mt-4 md:mt-20 relative animate-fade-up animate-delay-300">
        <Button text='Ingresar' onClick={handleSubmit} />
      </div>
    </>
  )
}