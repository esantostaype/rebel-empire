'use client'

import Image from 'next/image'
import { experimental_useObject as useObject } from 'ai/react'
import { similarPlanetsSchema } from '@/app/api/get-similar-planets/schema'
import { Planet, SimilarPlanetData } from '@/interfaces'
import { Button, ProgressBar } from '@/components'
import { Link } from 'next-view-transitions'
import { SkeletonSimilarPlanet } from './ui'
import { useEffect, useState } from 'react'

type Props = {
  planet: Planet
}

export const GenerateSimilarPlanets = ({ planet }: Props) => {

  const [ storedData, setStoredData ] = useState<SimilarPlanetData | null>( null )

  const { object, isLoading, submit } = useObject({
    api: '/api/get-similar-planets',
    schema: similarPlanetsSchema
  })

  useEffect(() => {
    if ( object ) {
      localStorage.setItem( `data_planet_${ planet.name }`, JSON.stringify( object ))
      setStoredData( object as SimilarPlanetData )
    }
  }, [object, planet.name])

  useEffect(() => {
    const data = localStorage.getItem(`data_planet_${ planet.name }`)
    if ( data ) {
      setStoredData( JSON.parse( data ))
    } else {
      setStoredData( null)
    }
  }, [ planet.name ])

  return (
    <div>
      { isLoading ? (
        <div className="mt-16">
          <p className="text-2xl text-center mb-8">Planetas similares a <strong className="text-accent">{ planet.name }:</strong></p>
          <div className="flex gap-16">
            <SkeletonSimilarPlanet/>
            <SkeletonSimilarPlanet/>
            <SkeletonSimilarPlanet/>
          </div>
        </div>
      ) : storedData ? (
        <div className="mt-16">
          <p className="text-2xl text-center mb-8">Planetas similares a <strong className="text-accent">{ planet.name }:</strong></p>
          { storedData.similarPlanets &&
            <ul className="flex flex-col lg:flex-row gap-16">
              { storedData?.similarPlanets?.map(( planet, index ) => (
                <li key={ index }>
                  <Link href={`/planets/${ planet?.id }`} className="flex items-center mb-4 group">
                    <Image src={`/images/planets/${ planet?.id }.webp`} className={`group-hover:scale-[1.1] transition-all transition-custom-ease duration-default animate-fade-right animate-duration-500 vt-planets-image-${ planet?.id}`} alt={ planet?.name || "Planeta Desconocido"} width={128} height={128} />
                    <h2 className="group-hover:-ml-4 -ml-8 animate-fade-right animate-duration-500 animate-delay-100 transition-all transition-custom-ease duration-default">{ planet?.name }</h2>
                  </Link>
                  <p className="text-sm animate-fade-right animate-duration-500 animate-delay-200">{ planet?.summary }</p>
                  <p><strong>Nivel de Similitud:</strong></p>
                  <ProgressBar number={ planet?.similarLevel || 0} />
                </li>
              ))}
            </ul>
          }
        </div>
      ) : (
        <div className="text-center mt-8 text-xl">
          <p>¿Quieres saber qué planetas se asemejan a <strong className="text-accent font-bold">{ planet.name }</strong>?</p>
          <Button text='¡Descúbrelo Ahora!' onClick={() => submit({ planet, planetName: planet.name })} />
        </div>
      )}
    </div>
  )
}