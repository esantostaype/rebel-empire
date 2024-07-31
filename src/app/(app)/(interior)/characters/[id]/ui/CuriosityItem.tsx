type CuriosityItemProps = {
  title: string
  content: string
}

export const CuriosityItem = ({ title, content }: CuriosityItemProps) => {
  return (
    <li className="transition-all px-2 py-4 font-medium relative bg-[rgba(255,255,255,0.1)] mx-3">
      <span className="transition-all absolute rounded-tl-md -left-3 top-0 h-full w-3 border-[rgba(255,255,255,0.1)] border-b-[12px] border-b-transparent border-r-[12px] border-r-[rgba(255,255,255,0.1)]"></span>
      <span>
        <p className="mb-1"><strong>{ title }:</strong></p>
        <p className="m-0">{ content }</p>
      </span>
      <span className="transition-all absolute rounded-br-md -right-3 top-0 h-full w-3 border-[rgba(255,255,255,0.1)] border-t-[12px] border-t-transparent border-l-[12px] border-l-[rgba(255,255,255,0.1)]"></span>
    </li>
  )
}