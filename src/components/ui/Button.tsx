import styles from './Button.module.css'

interface ButtonProps {
  text: string
  onClick?: any
  isGhost?: boolean
  disabled?: boolean
}

export const Button = ({ text, onClick, isGhost, disabled }: ButtonProps) => {
  return (
    <button
      className="transition-all p-3 font-antonio text-lg uppercase relative bg-accent hover:drop-shadow-[0_0_8px_var(--color-base)] mx-3"
      onClick={ disabled ? undefined : onClick }
      disabled={ disabled }
    >
      <span className="transition-all absolute rounded-tl-md -left-3 top-0 h-full w-3 border-accent border-b-[12px] border-b-transparent border-r-[12px] border-r-accent"></span>
      <span className="leading-6 block">{ text }</span>
      <span className="transition-all absolute rounded-br-md -right-3 top-0 h-full w-3 border-accent border-t-[12px] border-t-transparent border-l-[12px] border-l-accent"></span>
    </button>
  )
}