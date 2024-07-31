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
    description: `Explora a fondo el planeta ${ name }. Obtén su información escencial y también información específica generada por IA.`,
  }
}

export default async function PlanetPage({ params }: Props) {

  const planet: Planet = await getPlanetById( params.id )
  const id = extractId( planet.url )

  return (
    <section className="relative md:flex gap-8 lg:gap-12 2xl:gap-16 items-start justify-between">
      <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-right mt-8 md:mt-0 flex-[0_0_160px]">
      </div>
      <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 2xl:gap-16 items-start">
        <Image 
          src={`/images/planets/${ params.id }.webp`} 
          width={ 640 } 
          height={ 640 } 
          alt={ planet.name }
          className={`vt-planets-image-${ params.id }`}
        />
        <div className="flex flex-1 items-start gap-16 2xl:gap-20 justify-between">
        </div>
      </div>
      <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-right mt-8 md:mt-0 flex-[0_0_160px]">
      </div>
    </section>
  )
}