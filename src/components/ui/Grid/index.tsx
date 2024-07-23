import { DataGrid } from "@/interfaces"
import { Pagination } from "../Pagination"
import { Card } from "./Card"

interface GridProps {
  data: DataGrid[],
  page: number
  totalPages: number
  link?: string
}

export const Grid = ({ data, page, totalPages, link }: GridProps) => {  
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-7 md:gap-x-8 md:gap-y-11 mb-16">
      { data.map(( character, index ) => {
          return (
            <Card key={ character.name } data={ character } index={ index } />
          )
        })}
      </div>      
      <Pagination page={ page } totalPages={ totalPages } link={ link } />
    </>
  )
}