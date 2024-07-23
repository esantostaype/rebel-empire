import Image from 'next/image'
import { Message } from 'ai/react'
import mainCharacters from '@/data/main-characters.json'
import { CharacterId } from '@/interfaces'
import { usePathname } from 'next/navigation'
import { useIsHome } from '@/utils/pathnames'

interface ChatMessageItemProps {
  message: Message
  characterId: CharacterId | null
}

export const ChatMessageItem = ({ message, characterId }: ChatMessageItemProps ) => {

  const character = mainCharacters.find( char => char.id === characterId )
  const roleUser = message.role === 'user'
  const isHome = useIsHome()

  return (
    <div className={ roleUser ? "text-right" : ""}>
      <div className={`${ isHome ? "max-w-[90%] md:max-w-[80%]" : "max-w-[90%]" } relative inline-block rounded-lg p-4 overflow-hidden`}>
        <div className={`relative flex gap-2 items-start z-[2] ${ roleUser ? "flex-row-reverse" : ""}`}>
          <div className="bg-[rgba(0,0,0,0.5)] flex items-center justify-center h-8 w-8 overflow-hidden rounded-2xl flex-[0_0_32px]">
            { 
              roleUser
                ? <i className="fi fi-rr-user mt-1"></i>
                : <Image src={`${character?.thumbnail}`} alt={`${character?.name}`} width={32} height={32} />
            }            
          </div>
          { message.content }
        </div>
        <div className={`absolute top-0 left-0 w-full h-full z-[1] backdrop-blur-lg
          ${ roleUser ? "bg-accent opacity-20" : "bg-[rgba(120,120,120,0.16)]"}`}>
        </div>
      </div>
    </div>
  )
}