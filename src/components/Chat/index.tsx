'use client'

import { useEffect, useRef, useState } from 'react'
import { useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import { useChat } from 'ai/react'
import { Topics } from './Topics'
import { ChatForm } from './ChatForm'
import { ChatMessageList } from './ChatMessageList'
import { CharacterId } from '@/interfaces'

export const Chat = () => {
  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const character = mainCharacters.find(char => char.id === theme)

  const getApiEndpoint = ( theme: CharacterId | null ) => {
    switch ( theme ) {
      case 'luke':
        return '/api/chat-luke'
      case 'vader':
        return '/api/chat-vader'
      case 'yoda':
        return '/api/chat-yoda'
      default:
        return '/api/default-chat'
    }
  }

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: getApiEndpoint(theme),
    keepLastMessageOnError: true
  })

  const [ showTopics, setShowTopics] = useState<{ [ key in CharacterId ]?: boolean }>({
    luke: true,
    vader: true,
    yoda: true
  })

  const [ pendingQuestion, setPendingQuestion ] = useState<string | null>(null)

  useEffect(() => {
    if (pendingQuestion) {
      handleSubmit()
      setPendingQuestion(null)
    }
  }, [ input, pendingQuestion, handleSubmit ])

  useEffect(() => {
    if ( theme && messages.length > 0) {
      setShowTopics(prev => ({ ...prev, [ theme ]: false }))
    }
  }, [messages, theme])

  const handlePredefinedQuestionClick = ( question: string ) => {
    if ( theme ) {
      setInput( question )
      setPendingQuestion( question )
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ( scrollRef.current ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <section className="z-[90] fixed top-0 left-0 h-screen w-full overflow-auto flex flex-col justify-between text-sm">
      <div className="w-[100%] px-20 xl:px-0 2xl:w-[1280px] xl:w-[1024px] h-[calc(100vh-20rem)] mx-auto flex-1 flex flex-col">
        <div ref={scrollRef} className="w-1/2 flex flex-1 flex-col relative mt-20 mb-16 overflow-y-auto no-scrollbar"
          style={{ maskImage: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)" }}>
          {theme && showTopics[theme] ? (
            <div className="flex flex-1 items-center">
              <Topics onTopicClick={handlePredefinedQuestionClick} />
            </div>
          ) : (
            <ChatMessageList messages={messages} characterId={theme} />
          )}
        </div>
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder={`Envía un mensaje a ${character?.name}`}
        />
      </div>
    </section>
  )
}
