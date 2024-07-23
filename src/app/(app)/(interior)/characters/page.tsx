import { Grid, MainTitle } from '@/components'
import { Character } from '@/interfaces'
import { getCharacters } from '@/lib/starwars-api'

export async function generateStaticParams() {
  const data = await getCharacters()
  const totalPages = Math.ceil( data.count / 10 )
  const paramsArray = Array.from({ length: totalPages }, (_, index) => ({
    page: ( index + 1 ).toString()
  }))

  return paramsArray
}

export default async function CharactersPage() {

  const data = await getCharacters()
  const characters: Character[] = data.results

  const pageNumber = 1
  const totalPages = Math.ceil( data.count / 10 )

  return (
    <section className="md:pr-32 relative">
      <MainTitle title="Personajes" />
      <Grid data={ characters } pageNumber={ pageNumber } link='/characters' totalPages={ totalPages } />
    </section>
  )
}
