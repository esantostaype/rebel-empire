import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getCharacterById, getCharacters } from '@/lib/starwars-api'
import { Character, CharacterId } from '@/interfaces'
import Image from 'next/image'

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
  try {
    const { name } = await getCharacterById( params.id )
    return {
      title: `${ name } | Rebel Empire`,
      description: `Explora a fondo a ${ name }. Descubre sus estadísticas, habilidades, tipos y más en nuestra completa guía de Pokémon. Todo lo que necesitas saber sobre este fascinante Pokémon en un solo lugar.`,
    }
  } catch (error) {
    return {
      title: "Personaje No Encontrado",
      description:
        "No se pudo encontrar el Personaje. Por favor ingrese un ID existente o elija uno en la Página Principal de Personajes.",
    }
  }
}

export default async function CharacterPage({ params, searchParams }: Props) {

  const character: Character = await getCharacterById( params.id )

  return (
    <section className="flex gap-16 items-start">
      <Image 
        src={`/images/characters/${ params.id }.jpeg`} 
        width={ 400 } 
        height={ 500 } 
        alt={ character.name }
        className={`object-cover max-w-full aspect-4/5 vt-char-image-${ params.id }`}
        style={{ clipPath: 'path("M376,500H48c-18.7-18.7-29.3-29.3-48-48V24C0,10.7,10.7,0,24,0h328c18.7,18.7,29.3,29.3,48,48v428 C400,489.3,389.3,500,376,500z")' }}
      />
      <div>
        <h1>{ character.name }</h1>
      </div>
    </section>
  )
}
