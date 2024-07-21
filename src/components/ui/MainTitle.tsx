type Props = {
  title: string
}

export const MainTitle = ({ title }: Props) => {
  return (
    <h1 className="relative z-50 mb-12 animate-fade-up animate-duration-300">{ title }</h1>
  )
}