import Image from "next/image"
import { Lightsaber } from '@/components'
import { Link } from "next-view-transitions"

type Props = {
  name: string
  id: string
}

export const Homeworld = ({ name, id }: Props) => {
  return (
    <Link href={`/planets/${ id }`} className="flex items-center gap-4 mb-12">
      <div className="animate-fade-right animate-duration-300 animate-delay-200">
        <Lightsaber/>
      </div>
      <div className={`vt-planets-image-${ id } animate-fade-right animate-duration-300 animate-delay-200`}><Image src={`/images/planets/${ id }.webp`} width={ 64 } height={ 64 } alt={ name } /></div>
      <div>
        <span className="text-sm block animate-fade-right animate-duration-300 animate-delay-200">Planeta Natal:</span>
        <div className="text-2xl font-bold leading-7 capitalize animate-fade-right animate-duration-300 animate-delay-200">{ name }</div>
      </div>
    </Link>
  )
}