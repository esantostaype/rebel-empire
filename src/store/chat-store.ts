import { create } from 'zustand'

interface ChatStore {
  openChat: () => void
  closeChat: () => void
  activeChat: boolean
  activeClassChat: boolean
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChat: false,
  activeClassChat: false,
  openChat: () => {
    set({ activeChat: true, activeClassChat: true })
  },
  closeChat: () => {
    set({ activeClassChat: false })    
    setTimeout(() => {
      set({ activeChat: false })
    }, 300)
  }
}))