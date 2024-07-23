import { Grid, MainTitle } from '@/components'
import { Character } from '@/interfaces'
import { getCharacters } from '@/lib/starwars-api'

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

export default async function CharactersPage({ params }: Props) {

  const data = await getCharacters( params.page )
  const characters: Character[] = data.results

  const pageNumber = +params.page || 1
  const totalPages = Math.ceil( data.count / 10 )

  return (
    <section className="md:pr-32 relative">
      <MainTitle title="Personajes" />
      <Grid data={ characters } pageNumber={ pageNumber } link='/characters' totalPages={ totalPages } />
    </section>
  )
}