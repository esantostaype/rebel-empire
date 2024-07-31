type Props = {
  title: string
  className?: string
}

export const MainTitle = ({ title, className }: Props) => {
  return (
    <h1 className={`${ className } text-[3rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] leading-none`}>{ title }</h1>
  )
}