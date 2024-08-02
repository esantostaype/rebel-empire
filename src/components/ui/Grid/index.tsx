import { DataGrid } from "@/interfaces"
import { Pagination } from "../Pagination"
import { Card } from "./Card"

interface GridProps {
  data: DataGrid[],
  pageNumber: number
  totalPages: number
  link?: string
  transparentImage?: boolean
}

export const Grid = ({ data, pageNumber, totalPages, link, transparentImage }: GridProps) => {  
  
  return (
    <>
      <div className={`${ transparentImage ? "mb-8 mt-16 md:mt-4" : "mb-16" } grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-7 md:gap-x-8 md:gap-y-11`}>
      { data.map(( character, index ) => {
          return (
            <Card key={ character.name } data={ character } link={ link } transparentImage={ transparentImage } />
          )
        })}
      </div>      
      <Pagination pageNumber={ pageNumber } totalPages={ totalPages } link={ link } />
    </>
  )
}