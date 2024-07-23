type Props = {
  title: string
}

export const MainTitle = ({ title }: Props) => {
  return (
    <h1 className="text-accent md:-rotate-90 origin-top-right md:top-0 md:right-[6rem] md:absolute z-50 mb-6 md:mb-0 text-3xl md:text-[6rem] md:opacity-25 leading-none">{ title }</h1>
  )
}