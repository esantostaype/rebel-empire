'use client'
import mainCharacters from '@/data/main-characters.json'
import { useThemeStore } from '@/store/theme-store'
import Image from 'next/image'

export default function CharactersPage() {
  const { theme } = useThemeStore()
  const character = mainCharacters.find( char => char.id === theme )

  return (
    <section className="">
      <h1 className="relative z-50 mb-12 animate-fade-up animate-duration-300">Personajes</h1>
      <Image src={ character?.mainImage! } width={ 960 } height={ 540 } alt={ character?.name || 'Star Wars' } className="absolute bottom-0 right-0 z-10 w-1/2 object-cover mix-blend-lighten vt-image" />
    </section>
  )
}