'use client'
import mainCharacters from '@/data/main-characters.json'
import { useThemeStore } from '@/store/theme-store'
import Image from 'next/image'

export default function StarshipsPage() {
  const { theme } = useThemeStore()
  const character = mainCharacters.find( char => char.id === theme )

  return (
    <section className="">
      <h1 className="relative z-50 mb-12 animate-fade-up animate-duration-300">Naves</h1>
    </section>
  )
}