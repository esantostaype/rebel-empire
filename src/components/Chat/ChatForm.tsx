'use client'

import { FormEvent } from 'react'

interface ChatFormProps {
  input: string
  handleInputChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void
  handleSubmit: ( event: FormEvent<HTMLFormElement> ) => void
  isLoading: boolean
  placeholder: string
}

export const ChatForm = ({ input, handleInputChange, handleSubmit, isLoading, placeholder }: ChatFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="sticky bottom-16 w-1/2">
      <input
        name="prompt"
        value={input}
        onChange={ handleInputChange }
        disabled={isLoading}
        className="w-full rounded-[100px] h-14 pl-6 pr-16 bg-transparent border-[rgba(255,255,255,0.16)] hover:border-[rgba(255,255,255,0.48)] border-2 outline-none focus:border-accent transition-all"
        placeholder={placeholder}
      />
      <button disabled={input === ''} type="submit" className={`${input === '' && "opacity-25"} transition-all bg-white text-black rounded-3xl absolute top-2 right-2 h-10 w-10 z-10 text-xl leading-5 flex items-center justify-center`}>
        <i className="fi fi-rr-arrow-small-up"></i>
      </button>
    </form>
  )
}