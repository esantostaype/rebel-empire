'use client'

import { Message } from 'ai/react'
import { ChatMessageItem } from './ChatMessageItem'
import { CharacterId } from '@/interfaces'

interface ChatMessageListProps {
  messages: Message[]
  characterId: CharacterId | null
}

export const ChatMessageList = ({ messages, characterId }: ChatMessageListProps) => {
  return (
    <>
    { messages.map( message => (
      <ChatMessageItem key={ message.id } message={ message } characterId={ characterId } />
    ))}
    </>
  )
}