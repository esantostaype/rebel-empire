'use client'

import { SetStateAction, useEffect, useRef, useState } from 'react'
import { useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import { useChat } from 'ai/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'

export const Chat = () => {

  const { theme } = useThemeStore()
  const character = mainCharacters.find(char => char.id === theme)

  const predefinedQuestions = [
    "¿Cuál es tu misión principal?",
    "¿Cómo te uniste a la causa?",
    "¿Qué piensas de la Fuerza?",
    "¿Cuál es tu mayor desafío?"
  ]

  const getApiEndpoint = ( theme: string | null ) => {
    switch (theme) {
      case 'luke':
        return '/api/chat-luke'
      case 'vader':
        return '/api/chat-vader'
      case 'yoda':
        return '/api/chat-yoda'
    }
  }

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: getApiEndpoint(theme),
    keepLastMessageOnError: true
  })

  const [ pendingQuestion, setPendingQuestion ] = useState<string | null>(null)
  const [ initialQuestions, setInitialQuestions ] = useState( true )

  useEffect(() => {
    if ( pendingQuestion ) {
      handleSubmit()
      setPendingQuestion(null)
    }
  }, [ input, pendingQuestion, handleSubmit ])

  const handlePredefinedQuestionClick = ( question: string ) => {
    setInitialQuestions( false )
    setInput( question )
    setPendingQuestion( question )
  }

  const [ listRef ] = useAutoAnimate()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ( scrollRef.current ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [ messages ])

  return (
    <section className="z-[90] fixed top-0 left-0 h-screen w-full overflow-auto flex flex-col justify-between text-sm">
      <div className="w-[100%] px-20 xl:px-0 2xl:w-[1280px] xl:w-[1024px] h-[calc(100vh-20rem)] mx-auto flex-1 flex flex-col">
        <div ref={ scrollRef } className="w-1/2 flex flex-1 flex-col relative mt-20 mb-16 overflow-y-auto no-scrollbar"
            style={{ maskImage:"linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)" }}>
          {
            initialQuestions ?
            <div className="flex flex-1 items-center">
              <ul className='flex flex-wrap gap-4'>
                { predefinedQuestions.map(( question, index ) => (
                  <li key={ index } className="flex flex-col flex-[0_0_calc(50%-0.5rem)]">
                    <button 
                      onClick={() => handlePredefinedQuestionClick(question)}
                      disabled={ isLoading }
                      className="bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-all py-6 px-10 flex-1 rounded-md backdrop-blur-lg"
                    >
                      { question }
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          :
          <div className="flex flex-col gap-4 flex-1 py-10">
            { messages.map( message => (
              <div key={ message.id } className={ message.role === 'user' ? "text-right" : "" }>
                <div className="relative max-w-[80%] inline-block rounded-lg p-4 overflow-hidden">
                  <div className={`relative flex gap-2 items-start z-[2] ${ message.role === 'user' ? "flex-row-reverse" : "" }`}>
                    <div className="h-8 w-8 overflow-hidden rounded-2xl flex-[0_0_32px]">
                      <Image src={`${ character?.thumbnail }`} alt={`${ character?.name }`} width={ 32 } height={ 32 } />
                    </div>
                    { message.content }
                  </div>
                  <div className={`absolute top-0 left-0 w-full h-full z-[1] backdrop-blur-lg
                    ${ message.role === 'user' ? "bg-accent opacity-20" : "bg-[rgba(120,120,120,0.16)]"}`}>                    
                  </div>
                </div>
              </div>
            ))}
          </div>
          }
        </div>
        <form onSubmit={ handleSubmit } className="sticky bottom-16 w-1/2">
          <input
            name="prompt"
            value={ input }
            onChange={ handleInputChange }
            disabled={ isLoading }
            className="w-full rounded-[100px] h-14 pl-6 pr-16 bg-transparent border-[rgba(255,255,255,0.16)] hover:border-[rgba(255,255,255,0.48)] border-2 outline-none focus:border-accent transition-all"
            placeholder={`Envía un mensaje a ${ character?.name }`}
          />
          <button disabled={ input === '' } type="submit" className={`${ input === '' && "opacity-25" } transition-all bg-white text-black rounded-3xl absolute top-2 right-2 h-10 w-10 z-10 text-xl leading-5 flex items-center justify-center` }>
            <i className="fi fi-rr-arrow-small-up"></i>
          </button>
        </form>
      </div>
    </section>
  )
}
