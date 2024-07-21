'use client'

import { useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import { Button, Lines } from '@/components'
import { useChatStore } from '@/store/chat-store'

export const Welcome = () => {

  const { openChat, activeChat } = useChatStore()
  const { theme } = useThemeStore()

  const character = mainCharacters.find( char => char.id === theme )

  const handleOpenChat = () => {
    openChat()
  }

  return (
    <>
    {
      !activeChat && (       
        <div className="fadeIn pt-32 md:pt-0 md:w-[75%] lg:w-[60%] relative z-40">
          <h1 className="text-3xl md:text-4xl mb-4 text-accent">{ character?.welcome }</h1>
          <div className="relative">
            <div className="absolute top-2 -left-40 ml hidden md:block"><Lines/></div>
            <div className="md:pl-24">
              <p>{ character?.message }</p>
              <p><strong>{ character?.chatMessage }</strong></p>
              <div className="mt-8"><Button text='Chatea Ahora' onClick={ handleOpenChat } /></div>
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}