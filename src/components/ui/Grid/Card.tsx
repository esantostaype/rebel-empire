import { DataGrid } from '@/interfaces'
import { extractId } from '@/utils'
import { Link } from 'next-view-transitions'
import Image from "next/image"
import { Lightsaber } from '../Lightsaber'

interface GridProps {
  data: DataGrid
  link?: string
  transparentImage?: boolean
}

export const Card = ({ data, link, transparentImage }: GridProps) => {

  const id = extractId( data.url )
  
  return (
    <Link href={`/${ link }/${ id }`} key={ data.name } className={`${ transparentImage ? "mb-8" : "" } relative flex flex-col group transition-all transition-custom-ease duration-default hover:scale-[1.1]`}>
      <div className={`${ transparentImage ? "p-4 md:p-8 md:pb-2 -mt-1" : `duration-default vt-${ link }-image-${ id } overflow-hidden` } bg-slate-700 group-hover:bg-slate-900 transition-all transition-custom-ease duration-default rounded-t-lg mb-[-1px] relative z-10`}>
        <Image 
          src={`/images/${ link }/${ id }.webp`} 
          width={ 560 } 
          height={ 560 } 
          alt={ data.name }
          className={ `${ transparentImage ? `-mt-12 md:-mt-16 duration-default vt-${ link }-image-${ id } group-hover:scale-[1.05]` : "aspect-4/3 group-hover:scale-[1.15]" } w-full object-cover group-hover:object-top transition-all transition-custom-ease duration-default` }
        />
      </div>
      <div className="bg-slate-700 px-4 py-3 md:px-6 md:py-4 flex-1 relative group-hover:bg-slate-900 transition-all transition-custom-ease duration-default">
        <div className="mb-2 md:mb-4 ">
          <Lightsaber hasHover />
        </div>
        <h2 className={`relative z-20 font-inter font-[600] capitalize text-base leading-5 ${`vt-${ link }-title-${ id }`}`}>{ data.name }</h2>
        <div className="absolute h-[12px] -bottom-[11px] w-full left-0 flex justify-between">
          <div className="w-[60%] rounded-bl-lg h-[12px] border-r-[12px] border-r-transparent border-t-[12px] border-t-slate-700 group-hover:group-hover:border-t-slate-900 transition-all transition-custom-ease duration-default"></div>
          <div className="w-[20%] rounded-br-lg h-[12px] border-l-[12px] border-l-transparent border-t-[12px] border-t-slate-700 group-hover:group-hover:border-t-slate-900 transition-all transition-custom-ease duration-default"></div>
        </div>
      </div>
    </Link>
  )
}