'use client'
import { Chat } from '@/components'
import mainCharacters from '@/data/main-characters.json'
import { useThemeStore } from '@/store/theme-store'
import Image from 'next/image'

export default function CharactersPage() {
  const { theme } = useThemeStore()
  const character = mainCharacters.find( char => char.id === theme )

  return (
    <section className="relative z-50">
      <h1 className="mb-12 animate-fade-up animate-duration-300">Personajes</h1>
      <Chat/>
    </section>
  )
}