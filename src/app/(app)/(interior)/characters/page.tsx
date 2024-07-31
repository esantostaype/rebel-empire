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

export async function generateMetadata() {
  return {
    title: `Personajes | Rebel Empire AI`,
    description: `Descubre los personajes icónicos de Star Wars.`
  }
}

export default async function CharactersPage() {

  const data = await getCharacters()
  const characters: Character[] = data.results

  const pageNumber = 1
  const totalPages = Math.ceil( data.count / 10 )

  return (
    <section className="md:pr-32 relative">
      <div className="text-accent md:-rotate-90 origin-top-right md:top-0 md:right-[6rem] md:absolute z-50 mb-6 md:mb-0 md:opacity-25">
        <MainTitle title="Personajes" />
      </div>
      <Grid data={ characters } pageNumber={ pageNumber } link='characters' totalPages={ totalPages } />
    </section>
  )
}
