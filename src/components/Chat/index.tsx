'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from 'ai/react'
import { ChatTopics } from './ChatTopics'
import { ChatForm } from './ChatForm'
import { ChatMessageList } from './ChatMessageList'
import { ChatOpenButton } from './ChatOpenButton'
import { ChatCloseButton } from './ChatCloseButton'
import { useThemeStore } from '@/store/theme-store'
import { useChatStore } from '@/store/chat-store'
import { CharacterId } from '@/interfaces'
import { useIsHome } from '@/utils/pathnames'
import mainCharacters from '@/data/main-characters.json'

export const Chat = () => {

  const isHome = useIsHome()

  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const { activeChat, activeClassChat, openChat, closeChat } = useChatStore()
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
    api: getApiEndpoint( theme ),
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
  const chatRef = useRef<HTMLDivElement>(null)
  
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

  const handleCloseChat = () => {
    closeChat()
  }

  const handleKeydown = ( e: KeyboardEvent ) => {
    if ( e.key === 'Escape' ) {
      handleCloseChat()
    }
  }

  // const handleClickOutside = ( e: MouseEvent ) => {
  //   if ( chatRef.current && !chatRef.current.contains( e.target as Node )) {
  //     handleCloseChat()
  //   }
  // }

  useEffect(() => {
    if ( activeChat ) {
      document.addEventListener( 'keydown', handleKeydown )
      // document.addEventListener( 'mousedown', handleClickOutside )
    }
    return () => {
      document.removeEventListener( 'keydown', handleKeydown )
      // document.removeEventListener( 'mousedown', handleClickOutside )
    }
  }, [ activeChat ])

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
      <ChatOpenButton/>
    }
    { activeChat &&
      <section className={`${ wrapperClasses } ${ activeClassChat ? "active" : "" } chat`} ref={ chatRef }>
        <div className={ contentClasses }>
          <ChatCloseButton/>
          { theme && showTopics[ theme ] ? (
            <div ref={ scrollRef } className={`${ sizeClasses } ${ isHome ? "mt-20" : "mt-20 md:mt-0" } flex-1 justify-center`}>              
              <ChatTopics onTopicClick={ handlePredefinedTopics } />
            </div>
            ) : (
            <div ref={ scrollRef } className={`${ sizeClasses } ${ isHome ? "mt-20 mb-6 md:mb-12" : "mt-20 md:mt-0" } flex-1 overflow-y-auto no-scrollbar scroll-smooth`}
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