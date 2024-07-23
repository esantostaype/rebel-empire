'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useChat } from 'ai/react'
import { ChatTopics } from './ChatTopics'
import { ChatForm } from './ChatForm'
import { ChatMessageList } from './ChatMessageList'
import { useThemeStore } from '@/store/theme-store'
import { useChatStore } from '@/store/chat-store'
import { CharacterId } from '@/interfaces'
import mainCharacters from '@/data/main-characters.json'
import { ChatCloseButton } from './ChatCloseButton'
import { useIsHome } from '@/utils/pathnames'

export const Chat = () => {

  const isHome = useIsHome()

  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const { activeChat, activeClassChat, openChat } = useChatStore()
  const { disLinks } = useChatStore()
  const character = mainCharacters.find( char => char.id === theme )

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

  const [ showTopics, setShowTopics ] = useState<{ [ key in CharacterId ]?: boolean }>({
    luke: true,
    vader: true,
    yoda: true
  })

  const [ pendingTopic, setPendingTopic ] = useState<string | null>(null)

  useEffect(() => {
    disLinks( isLoading )
  }, [ isLoading, disLinks ])

  useEffect(() => {
    if ( pendingTopic ) {
      handleSubmit()
      setPendingTopic(null)
    }
    if ( theme && messages.length > 0) {
      setShowTopics(prev => ({ ...prev, [ theme ]: false }))
    }
  }, [ input, pendingTopic, handleSubmit, messages, theme ])

  const handlePredefinedTopics = ( topic: string ) => {
    if ( theme ) {
      setInput( topic )
      setPendingTopic( topic )
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if ( scrollRef.current ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })

  useEffect(() => {
    if ( scrollRef.current ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [ messages ])

  const handleOpenChat = () => {
    openChat()
  }

  const wrapperClasses = isHome 
    ? "backdrop-blur-lg md:backdrop-blur-none bg-[rgba(0,0,0,0.4)] md:bg-transparent fadeIn z-[90] fixed top-0 left-0 h-screen w-full flex flex-col justify-between text-sm"
    : "backdrop-blur-lg bg-[rgba(0,0,0,0.4)] fadeIn fadeIn z-[90] fixed bottom-0 md:bottom-8 right-0 md:right-36 h-screen md:h-[640px] w-full md:w-[480px] flex flex-col justify-between text-sm border-[1px] border-[rgba(255,255,255,0.1)] md:rounded-2xl vt-chat"

  const contentClasses = isHome 
    ? "relative w-full px-6 md:px-16 lg:px-20 2xl:w-[1280px] xl:w-[1024px] h-[calc(100vh-20rem)] mx-auto flex-1 flex flex-col xl:box-content"
    : "relative w-full md:p-6 md:pt-4 px-6 flex flex-1 flex-col h-[640px]"

  const sizeClasses = isHome
  ? "relative flex flex-col w-full md:w-[75%] 2xl:w-[60%] xl:mb-8"
  : "relative flex flex-col w-full"

  return (
    <>
    { !activeChat &&
      <button className={ `fadeIn transition-all fixed z-[9999] hover:scale-110 flex items-center bottom-6 md:bottom-8 right-6 md:right-36 bg-accent h-16 w-16 justify-center rounded-[100px] hover:drop-shadow-[0_0_8px_var(--color-base)]` } onClick={ handleOpenChat }>
        <i className="fi fi-rr-messages text-2xl mt-2"></i>
      </button>
    }
    { activeChat &&
      <section className={`${ wrapperClasses } ${ activeClassChat ? "active" : "" } chat`}>
        <div className={ contentClasses }>
          <ChatCloseButton/>
          { theme && showTopics[ theme ] ? (
            <div ref={ scrollRef } className={`${ sizeClasses } ${ isHome ? "mt-20" : "mt-20 md:mt-0" } flex-1 justify-center`}>              
              <ChatTopics onTopicClick={ handlePredefinedTopics } />
            </div>
            ) : (
            <div ref={ scrollRef } className={`${ sizeClasses } ${ isHome ? "mt-20 mb-6 md:mb-12" : "mt-20 md:mt-0" } flex-1 overflow-y-auto no-scrollbar`}
              style={{ maskImage: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)" }}
            >
              <div className={`flex flex-col gap-4 flex-1 ${ isHome ? "py-4 md:py-8" : "py-4" }`}>
                <ChatMessageList messages={ messages } characterId={ theme } />
              </div>
            </div>
          )}
          <div className={`${ sizeClasses } sticky bottom-6 md:bottom-12 xl:bottom-16`}>
            <ChatForm
              input={ input }
              handleInputChange={ handleInputChange }
              handleSubmit={ handleSubmit }
              isLoading={ isLoading }
              placeholder={`Envía un mensaje a ${ character?.name }`}
            />
          </div>
        </div>
      </section>
    }
    </>
  )
}