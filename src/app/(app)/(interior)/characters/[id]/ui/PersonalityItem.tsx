type PersonalityItemProps = {
  text: string
}

export const PersonalityItem = ({ text }: PersonalityItemProps) => {
  return (
    <li className="transition-all px-4 py-2 font-medium relative bg-[rgba(255,255,255,0.1)] mx-3">
      <span className="transition-all absolute rounded-tl-md -left-3 top-0 h-full w-3 border-[rgba(255,255,255,0.1)] border-b-[12px] border-b-transparent border-r-[12px] border-r-[rgba(255,255,255,0.1)]"></span>
      <span>{ text }</span>
      <span className="transition-all absolute rounded-br-md -right-3 top-0 h-full w-3 border-[rgba(255,255,255,0.1)] border-t-[12px] border-t-transparent border-l-[12px] border-l-[rgba(255,255,255,0.1)]"></span>
    </li>
  )
}