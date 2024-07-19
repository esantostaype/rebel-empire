'use client'

import Image from 'next/image'
import { Message } from 'ai/react'
import mainCharacters from '@/data/main-characters.json'
import { CharacterId } from '@/interfaces'

interface ChatMessageItemProps {
  message: Message
  characterId: CharacterId | null
}

export const ChatMessageItem = ({ message, characterId }: ChatMessageItemProps ) => {
  const character = mainCharacters.find( char => char.id === characterId )
  const roleUser = message.role === 'user'
  return (
    <div className={ roleUser ? "text-right" : ""}>
      <div className="relative max-w-[80%] inline-block rounded-lg backdrop-blur-lg p-4 overflow-hidden">
        <div className={`relative flex gap-2 items-start z-[2] ${ roleUser ? "flex-row-reverse" : ""}`}>
          <div className="h-8 w-8 overflow-hidden rounded-2xl flex-[0_0_32px]">
            <Image src={`${character?.thumbnail}`} alt={`${character?.name}`} width={32} height={32} />
          </div>
          { message.content }
        </div>
        <div className={`absolute top-0 left-0 w-full h-full z-[1] backdrop-blur-lg
          ${  roleUser ? "bg-accent opacity-20" : "bg-[rgba(120,120,120,0.16)]"}`}>
        </div>
      </div>
    </div>
  )
}