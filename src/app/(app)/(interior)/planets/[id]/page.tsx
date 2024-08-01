import { Metadata } from 'next'
import { getPlanetById, getPlanets } from '@/lib/starwars-api'
import { Planet } from '@/interfaces'
import Image from 'next/image'
import { InfoItem, MainTitle } from '@/components'
import { extractId, formatNumberWithKm } from '@/utils'

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
    <section className="relative">
      <div className="flex justify-center items-center gap-16 relative">
      <h1 className={`text-stroke leading-[12rem] text-transparent text-[12rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-36 text-center vt-planets-title-${ params.id } drop-shadow-[0_0_8px_black]`}>{ planet.name }</h1>
        <Image 
          src={`/images/planets/${ params.id }.webp`} 
          width={ 540 } 
          height={ 540 } 
          alt={ planet.name }
          className={`vt-planets-image-${ params.id } relative`}
        />
      </div>
      <div className="absolute size-full top-0 flex justify-between items-center">
        <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-left mt-8 md:mt-0 flex-[0_0_160px]">
          <InfoItem title="Periodo de Rotación" info={ planet.rotation_period } />
          <InfoItem title="Periodo Orbital" info={ planet.orbital_period } />
          <InfoItem title="Diámetro" info={`${ formatNumberWithKm( +planet.diameter ) } ${ planet.surface_water !== "unknown" ? "Km" : "" }`} />
          <InfoItem title="Agua en la Superficie" info={`${ planet.surface_water }${ planet.surface_water !== "unknown" ? "%" : "" }`} />
        </div>
        <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-right mt-8 md:mt-0 flex-[0_0_160px]">
          <InfoItem title="Clima" info={ planet.climate } />
          <InfoItem title="Gravedad" info={ planet.gravity } />
          <InfoItem title="Terreno" info={ planet.terrain } />
          <InfoItem title="Población" info={ formatNumberWithKm( +planet.population ) } />
        </div>
      </div>
    </section>
  )
}