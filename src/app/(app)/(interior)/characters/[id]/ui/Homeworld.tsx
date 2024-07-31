import Image from "next/image"
import { Lightsaber } from '@/components'

type Props = {
  name: string
  id: string
}

export const Homeworld = ({ name, id }: Props) => {
  return (
    <div className="flex items-center gap-4 animate-fade-right animate-duration-300 animate-delay-200 mb-12">
      <Lightsaber/>
      { name === "unknown"
        ? <div className="h-16 w-16 flex items-center justify-center bg-slate-700 rounded-full"><i className="fi fi-rr-planet-ringed text-2xl leading-none"></i></div>
        : <Image src={`/images/planets/${ id }.webp`} width={ 64 } height={ 64 } alt={ name } />
      }
      <div>
        <span className="text-sm block">Planeta Natal:</span>
        <div className="text-2xl font-bold leading-7 capitalize">{ name }</div>
      </div>
    </div>
  )
}