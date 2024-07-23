import Image from 'next/image'
import { MainTitle } from '@/components'
import { Pagination } from '@/components/ui/Pagination'
import { Character } from '@/interfaces'
import { getCharacters } from '@/lib/starwars-api'
import { extractId } from '@/utils'
import { Link } from 'next-view-transitions'
import { Grid } from '@/components/ui/Grid'

type Props = {
  searchParams: {
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

export default async function CharactersPage({ searchParams }: Props) {

  const data = await getCharacters( searchParams.page )
  const characters: Character[] = data.results

  const page = +searchParams.page || 1
  const totalPages = Math.ceil( data.count / 10 )

  return (
    <section className="md:pr-32 relative">
      <MainTitle title="Personajes" />
      <Grid data={ characters } page={ page } link='/characters' totalPages={ totalPages } />
    </section>
  )
}
