import { MainTitle } from '@/components'
import { Pagination } from '@/components/ui/Pagination'
import { Character } from '@/interfaces'
import { getCharacters } from '@/lib/starwars-api'
import Image from 'next/image'
import { extractId } from '@/utils'
import { Link } from 'next-view-transitions'
import { cookies } from 'next/headers'

type Props = {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const data = await getCharacters()
  const totalPages = Math.ceil( data.count / 10 )
  const paramsArray = Array.from({ length: totalPages }, (_, index) => ({
    page: ( index + 1 ).toString()
  }))

  return paramsArray
}

export default async function Page({ params }: Props) {

  const theme = cookies().get('theme')

  const data = await getCharacters( params.page )
  const characters: Character[] = data.results
  
  const page = +params.page || 1
  const link = '/characters'
  const totalPages = Math.ceil( data.count / 10 )

  return (
    <>
      <MainTitle title="Personajes" />
      <div className="grid grid-cols-5 gap-4">
      { characters.map(( character ) => {
          const id = extractId( character.url )
          return (
            <Link href={`/characters/${id}`} key={character.name}>
              <p>{id}. {character.name}</p>
              <Image 
                src={`/images/characters/${id}.webp`} 
                width={256} 
                height={256} 
                alt={character.name}
              />
            </Link>
          )
        })}
      </div>
      <Pagination page={ page } totalPages={ totalPages } link={ link } />
    </>
  )
}
