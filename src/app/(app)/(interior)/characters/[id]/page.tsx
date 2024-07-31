import { Metadata } from 'next'
import { getCharacterById, getCharacters } from '@/lib/starwars-api'
import { Character } from '@/interfaces'
import Image from 'next/image'
import { MainTitle } from '@/components'
import { extractId } from '@/utils'
import { Homeworld, InfoItem, GenerateData } from './ui'

interface Props {
  params: {
		id: string
	},  
  searchParams: {
    char: string
	}
}

export async function generateStaticParams() {
  const data = await getCharacters()
  const paramsArray = Array.from({ length: data.count }, (_, index) => ({
    id: ( index + 1 ).toString()
  }))
  return paramsArray
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await getCharacterById( params.id )
  return {
    title: `${ name } | Rebel Empire AI`,
    description: `Explora a fondo a ${ name }. Obtén su información escencial y también información específica generada por IA.`,
  }
}

export default async function CharacterPage({ params }: Props) {

  const character: Character = await getCharacterById( params.id )
  const id = extractId( character.url )
  const planetId = extractId( character.homeworld )

  // scale-75 mx-[-50px] my-[-62.5px]

  return (
    <section className="relative md:flex gap-8 lg:gap-12 2xl:gap-16 items-start justify-between">
      <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 2xl:gap-16 items-start">
        <Image 
          src={`/images/characters/${ params.id }.jpeg`} 
          width={ 400 } 
          height={ 500 } 
          alt={ character.name }
          className={`char-image object-cover max-w-full aspect-1/1 sm:aspect-4/5 sm:scale-50 sm:mx-[-100px] sm:my-[-125px] lg:scale-75 lg:mx-[-50px] lg:my-[-62.5px] 2xl:scale-100 2xl:mx-0 2xl:my-0 vt-characters-image-${ params.id }`}
        />
        <div className="flex flex-1 items-start gap-16 2xl:gap-20 justify-between">
          <div className="flex-1">
            <div className="animate-fade-right animate-duration-500 relative z-10 ml-0 xl:-ml-24 2xl:-ml-32 xl:mt-16">
              <MainTitle title={ character.name } className={`vt-characters-title-${ id } mb-8`}/>
            </div>
            <Homeworld name={ character.homeworldName } id={`${ planetId }`} />
            <div className="animate-fade-right animate-duration-300 animate-delay-300">
              <GenerateData character={ character.name }/>
            </div> 
          </div>
        </div>
      </div>
      <div className="flex md:flex-col flex-wrap gap-2 md:gap-6 md:text-right mt-8 md:mt-0 flex-[0_0_160px]">
        <InfoItem title="Altura" info={`${ +character.height / 100 } m`} />
        <InfoItem title="Peso" info={`${ character.mass } Kg`} />
        <InfoItem title="Color de Pelo" info={ character.hair_color } />
        <InfoItem title="Color de Piel" info={ character.skin_color } />
        <InfoItem title="Color de Ojos" info={ character.eye_color } />
        <InfoItem title="Año de Nacimiento" info={ character.birth_year } />
        <InfoItem title="Género" info={ character.gender } />
      </div>
    </section>
  )
}
