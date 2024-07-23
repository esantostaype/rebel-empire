'use client'
import Image from 'next/image'
import { MainCharacter } from '@/interfaces'
import { useIsHome } from '@/utils/pathnames'

type Props = {
  character: MainCharacter
}

export const CharacterImage = ( { character } : Props ) => {

  const isHome = useIsHome()

  return (
    <Image
      src={ character.mainImage }
      width={ 1920 }
      height={ 1080 }
      alt={ character?.name || 'Star Wars' }
      loading='lazy'
      className={ `
        main-image
        animate-fade
        fixed object-cover md:object-contain object-top md:object-[60%] mix-blend-lighten vt-image z-20
        ${ isHome ?
        "isHome top-0 right-0 md:-right-[20%] lg:right-0 h-1/2 object-center md:object-right md:h-screen w-full md:w-auto" :
        "object-contain bottom-0 -right-[30%] sm:-right-[20%] md:-right-12 h-1/2 w-auto" }`
      }
    />
  )
}