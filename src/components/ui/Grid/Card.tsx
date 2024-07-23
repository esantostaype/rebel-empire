import { DataGrid } from '@/interfaces'
import { extractId } from '@/utils'
import { Link } from 'next-view-transitions'
import Image from "next/image"

interface GridProps {
  data: DataGrid
  index: number
}

export const Card = ({ data, index }: GridProps) => {

  const id = extractId( data.url )
  const delay = ( index % 10 ) * 100
  
  return (
    <Link href={`/characters/${ id }`} key={ data.name } className="relative flex flex-col group transition-all transition-custom-ease duration-default hover:scale-[1.1]" >
      <div className={`rounded-t-lg overflow-hidden vt-char-image-${ id }`}>
        <Image 
          src={`/images/characters/${ id }.jpeg`} 
          width={ 256 } 
          height={ 256 } 
          alt={ data.name }
          className={ `w-full aspect-4/3 object-cover group-hover:scale-[1.15] group-hover:object-top transition-all transition-custom-ease duration-default` }
        />
      </div>
      <div className="bg-slate-700 backdrop-blur-lg px-4 py-3 md:px-6 md:py-4 flex-1 relative group-hover:bg-slate-900 transition-all transition-custom-ease duration-default">
        <div className="flex gap-1 mb-2 md:mb-4 opacity-20 group-hover:opacity-100">
          <span className="w-1 h-1 bg-white group-hover:shadow-[0_0_8px_2px_var(--color-base)] transition-all transition-custom-ease duration-default"></span>
          <span className="w-8 h-1 rounded-r-sm bg-white group-hover:shadow-[0_0_8px_2px_var(--color-base)] transition-all transition-custom-ease duration-default"></span>
        </div>
        <h2 className="font-inter font-[600] capitalize text-base leading-5">{ data.name }</h2>
        <div className="absolute h-[12px] -bottom-[11px] w-full left-0 flex justify-between">
          <div className="w-[60%] rounded-bl-lg h-[12px] border-r-[12px] border-r-transparent border-t-[12px] border-t-slate-700 group-hover:group-hover:border-t-slate-900 transition-all transition-custom-ease duration-default"></div>
          <div className="w-[20%] rounded-br-lg h-[12px] border-l-[12px] border-l-transparent border-t-[12px] border-t-slate-700 group-hover:group-hover:border-t-slate-900 transition-all transition-custom-ease duration-default"></div>
        </div>
      </div>
    </Link>
  )
}