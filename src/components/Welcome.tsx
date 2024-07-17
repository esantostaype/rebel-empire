'use client'

import { useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import { Lines } from '@/components'

export const Welcome = () => {

  const { theme } = useThemeStore()
  const character = mainCharacters.find( char => char.id === theme )

  return (
    <>
    <div className="md:w-3/4 lg:w-1/2 relative z-20">
      <h1 className="text-3xl md:text-4xl mb-4 text-accent">{ character?.welcome }</h1>
      <div className="relative">
        <div className="absolute top-2 -left-40 ml"><Lines/></div>
        <p className="pl-24">{ character?.message }</p>
      </div>
    </div>
    </>
  )
}