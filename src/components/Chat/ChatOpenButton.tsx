import { useChatStore } from '@/store/chat-store'

export const ChatOpenButton = () => {
  
  const { openChat } = useChatStore()

  const handleOpenChat = () => {
    openChat()
  }

  return (
    <button className={ `fadeIn transition-all fixed z-[9999] hover:scale-110 flex items-center bottom-6 md:bottom-8 right-6 md:right-36 bg-accent h-16 w-16 justify-center rounded-[100px] hover:drop-shadow-[0_0_8px_var(--color-base)]` } onClick={ handleOpenChat }>
      <i className="fi fi-rr-messages text-2xl mt-2"></i>
    </button>
  )
}