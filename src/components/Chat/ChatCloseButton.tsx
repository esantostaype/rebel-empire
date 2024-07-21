import { usePathname } from 'next/navigation'
import { useChatStore } from '@/store/chat-store'

export const ChatCloseButton = () => {
  
  const { closeChat } = useChatStore()

  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleCloseChat = () => {
    closeChat()
  }

  const closeButtonClasses = isHome
  ? "top-4 right-0 h-10 w-10 fadeIn bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] justify-center rounded-[100px] transition-all absolute flex items-center z-[9999]"
  : "top-4 right-0 md:-top-2 md:-right-4 h-10 w-10 fadeIn bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] justify-center rounded-[100px] transition-all absolute flex items-center z-[9999]"

  return (
    <button className={ closeButtonClasses } onClick={ handleCloseChat }>
      <i className="fi fi-rr-angle-small-down text-xl mt-2"></i>
    </button>
  )
}