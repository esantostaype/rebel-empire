import styles from './Button.module.css'

interface ButtonProps {
  text: string
  onClick?: any
  isGhost?: boolean
}

export const Button = ({ text, onClick, isGhost }: ButtonProps) => {
  return (
    <button className="transition-all px-6 py-3 font-antonio text-lg uppercase relative bg-accent hover:drop-shadow-[0_0_8px_var(--color-base)] mx-3" onClick={ onClick }>
      <span className="transition-all absolute rounded-tl-md -left-3 top-0 h-full w-3 border-accent border-b-[12px] border-b-transparent border-r-[12px] border-r-accent"></span>
      <span>{ text }</span>
      <span className="transition-all absolute rounded-br-md -right-3 top-0 h-full w-3 border-accent border-t-[12px] border-t-transparent border-l-[12px] border-l-accent"></span>
    </button>
  )
}