'use client'

import { Theme, useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import { Lines } from '@/components'
import Image from 'next/image'

export const Welcome = () => {

  const { theme } = useThemeStore()
  const character = mainCharacters.find( char => char.id === theme )

  return (
    <>
    <div className="md:w-3/4 lg:w-1/2 relative z-20">
      <h1 className="text-3xl md:text-4xl animate-fade-right animate-duration-300 mb-4 text-accent">{ character?.welcome }</h1>
      <div className="relative">
        <Lines/>
        <p className="animate-fade-right animate-duration-300 animate-delay-200 pl-24">{ character?.message }</p>
      </div>
    </div>
    <Image src={ character?.mainImage! } width={ 1920 } height={ 1080 } alt={ character?.name || 'Star Wars' } className="absolute top-0 right-0 h-screen z-10 w-full object-cover mix-blend-lighten vt-image" />
    </>
  )
}