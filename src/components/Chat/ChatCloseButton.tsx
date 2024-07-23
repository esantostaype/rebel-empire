import { usePathname } from 'next/navigation'
import { useChatStore } from '@/store/chat-store'
import { useIsHome } from '@/utils/pathnames'

export const ChatCloseButton = () => {
  
  const { closeChat } = useChatStore()
  const isHome = useIsHome()

  const handleCloseChat = () => {
    closeChat()
  }

  const closeButtonClasses = isHome
  ? "top-[6rem] md:top-[7rem] right-2 md:right-auto md:left-[75%] 2xl:left-[60%] h-10 w-10 fadeIn bg-slate-800 shadow-2xl hover:bg-slate-700 shadow- justify-center rounded-[100px] transition-all absolute flex items-center z-[9999]"
  : "top-[6rem] md:top-2 right-2 h-10 w-10 fadeIn bg-slate-800 shadow-2xl hover:bg-slate-700 shadow- justify-center rounded-[100px] transition-all absolute flex items-center z-[9999]"

  return (
    <button className={ closeButtonClasses } onClick={ handleCloseChat }>
      <i className="fi fi-rr-angle-small-down text-xl mt-2"></i>
    </button>
  )
}