import { Grid, MainTitle } from '@/components'
import { Planet } from '@/interfaces'
import { getPlanets } from '@/lib/starwars-api'

type Props = {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const data = await getPlanets()
  const totalPages = Math.ceil( data.count / 10 )
  const paramsArray = Array.from({ length: totalPages }, (_, index) => ({
    page: ( index + 1 ).toString()
  }))

  return paramsArray
}

export default async function PlanetsPage({ params }: Props) {

  const data = await getPlanets( params.page )
  const planets: Planet[] = data.results

  const pageNumber = +params.page || 1
  const totalPages = Math.ceil( data.count / 10 )

  return (
    <section className="md:pr-32 relative">
      <div className="text-accent md:-rotate-90 origin-top-right md:top-0 md:right-[6rem] md:absolute z-50 mb-6 md:mb-0 md:opacity-25">
        <MainTitle title="Planetas" />
      </div>
      <Grid data={ planets } pageNumber={ pageNumber } link='planets' totalPages={ totalPages } transparentImage />
    </section>
  )
}