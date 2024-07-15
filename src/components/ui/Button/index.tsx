import styles from './Button.module.css'

interface ButtonProps {
  text: string
  onClick?: any
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className={ styles.content } onClick={ onClick }>
      <span>{ text }</span>
    </button>
  )
}
