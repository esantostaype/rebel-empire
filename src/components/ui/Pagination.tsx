import { Link } from 'next-view-transitions'
import styles from './Pagination.module.css'

type Props = {
  pageNumber: number
  totalPages: number
  link?: string
}

export const Pagination = ({ pageNumber, totalPages, link }: Props ) => {

  const pages = Array.from({ length: totalPages }, ( _, i ) => i + 1 )
  const isFirstPage = + pageNumber === 1 || pageNumber == null
  const isLastPage = + pageNumber === totalPages

  const linkClasses = "h-8 w-8 flex items-center justify-center rounded-[2rem] text-sm relative overflow-hidden group"

  return (
    <>
    { totalPages !== 1 && 
      <nav className="flex justify-center">
        <ul className="flex items-center gap-1">
          <li className={ isFirstPage ? 'pointer-events-none opacity-40' : '' }>
            <Link className={ linkClasses } href={`${ link }/page/${ + pageNumber && + pageNumber - 1 }`}>
              <i className="relative z-20 fi fi-rr-angle-left text-[10px] mt-[2px]"></i>
              <span className={`absolute transition-all z-10 w-full h-full bg-white opacity-0 group-hover:opacity-10`}></span>
            </Link>
          </li>

          {
            pages.map( page => (            
              <li key={ page } >
                <Link className={ linkClasses } href={ `${ link }/page/${ page }`}>
                  <span className="relative z-20">{ page }</span>
                  <span className={`absolute transition-all z-10 w-full h-full ${ page === pageNumber ? "bg-accent opacity-20" : "bg-white opacity-0 group-hover:opacity-10"}`}></span>
                </Link>
              </li>
            ))
          }
          
          <li className={ isLastPage ? 'pointer-events-none opacity-40' : '' }>
            <Link className={ linkClasses } href={`${ link }/page/${ + pageNumber + 1 }`}>
              <i className="relative z-20 fi fi-rr-angle-right text-[10px] mt-[2px]"></i>
              <span className={`absolute transition-all z-10 w-full h-full bg-white opacity-0 group-hover:opacity-10`}></span>
            </Link>
          </li>
        </ul>
      </nav>
    }
    </>
  )
}