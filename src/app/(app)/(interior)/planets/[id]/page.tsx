import { Metadata } from 'next'
import { getPlanetById, getPlanets } from '@/lib/starwars-api'
import { Planet } from '@/interfaces'
import Image from 'next/image'
import { InfoItem } from '@/components'
import { formatNumberWithKm } from '@/utils'
import { GenerateSimilarPlanets } from './GenerateSimilarPlanets'

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

  return (
    <section>
      <div className="relative">
        <div className="flex flex-col justify-center items-center gap-4 relative">
          <h1 className={`text-stroke md:text-transparent leading-[4rem] md:text-[7rem] md:leading-[7rem] lg:text-[10rem] lg:leading-[10rem] xl:text-[12rem] xl:leading-[12rem] md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-full md:px-36 text-center vt-planets-title-${ params.id } md:drop-shadow-[0_0_8px_black]`}>{ planet.name }</h1>
          <Image 
            src={`/images/planets/${ params.id }.webp`} 
            width={ 540 } 
            height={ 540 } 
            alt={ planet.name }
            className={`max-w-full md:w-[320px] lg:w-[480px] xl:w-[540px] vt-planets-image-${ params.id } relative`}
          />
        </div>
        <div className="mt-8 md:mt-0 md:absolute size-full top-0 flex flex-col gap-2 md:flex-row justify-between items-center">
          <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-left md:mt-0 md:flex-[0_0_160px]">
            <InfoItem title="Periodo de Rotación" info={ planet.rotation_period } />
            <InfoItem title="Periodo Orbital" info={ planet.orbital_period } />
            <InfoItem title="Diámetro" info={`${ formatNumberWithKm( +planet.diameter ) } ${ planet.surface_water !== "unknown" ? "Km" : "" }`} />
            <InfoItem title="Agua en la Superficie" info={`${ planet.surface_water }${ planet.surface_water !== "unknown" ? "%" : "" }`} />
          </div>
          <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-right md:mt-0 md:flex-[0_0_160px]">
            <InfoItem title="Clima" info={ planet.climate } />
            <InfoItem title="Gravedad" info={ planet.gravity } />
            <InfoItem title="Terreno" info={ planet.terrain } />
            <InfoItem title="Población" info={ formatNumberWithKm( +planet.population ) } />
          </div>
        </div>
      </div>
      <GenerateSimilarPlanets planet={ planet } />      
    </section>
  )
}