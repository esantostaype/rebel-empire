'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MainCharacter } from '@/interfaces'

type Props = {
  character: MainCharacter
}

export const CharacterImage = ( { character } : Props ) => {

  const pathname = usePathname()

  return (
    <Image
      src={ character.mainImage }
      width={ 1920 }
      height={ 1080 }
      alt={ character?.name || 'Star Wars' }
      loading='lazy'
      className={ `
        absolute object-cover mix-blend-lighten vt-image z-20
        ${ pathname === '/' ?
        "top-0 right-0 h-screen w-full" :
        "bottom-0 -right-12 h-1/2 w-auto" }`
      }
    />
  )
}