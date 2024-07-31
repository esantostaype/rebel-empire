import { Metadata } from 'next'
import { getPlanetById, getPlanets } from '@/lib/starwars-api'
import { Planet } from '@/interfaces'
import Image from 'next/image'
import { MainTitle } from '@/components'
import { extractId } from '@/utils'

interface Props {
  params: {
		id: string
	},  
  searchParams: {
    char: string
	}
}

export async function generateStaticParams() {
  const data = await getPlanets()
  const paramsArray = Array.from({ length: data.count }, (_, index) => ({
    id: ( index + 1 ).toString()
  }))
  return paramsArray
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await getPlanetById( params.id )
  return {
    title: `Planeta ${ name } | Rebel Empire AI`,
    description: `Explora y obtén información detallada del planeta ${ name }.`,
  }
}

export default async function PlanetPage({ params }: Props) {

  const planet: Planet = await getPlanetById( params.id )
  const id = extractId( planet.url )

  return (
    <section className="flex justify-center relative">
      <h1 className={`text-stroke leading-[15rem] text-transparent text-[16rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center vt-planets-title-${ params.id }`}>{ planet.name }</h1>
      <Image 
        src={`/images/planets/${ params.id }.webp`} 
        width={ 640 } 
        height={ 640 } 
        alt={ planet.name }
        className={`vt-planets-image-${ params.id }`}
      />
    </section>
  )
}