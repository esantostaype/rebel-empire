import { create } from 'zustand'

interface ChatStore {
  openChat: () => void
  closeChat: () => void
  activeChat: boolean
  activeClassChat: boolean
  disLinks: ( value: boolean ) => void
  disableLinks: boolean
}

export const useChatStore = create<ChatStore>((set, get) => ({
  activeChat: false,
  activeClassChat: false,
  disableLinks: false,
  openChat: () => {
    set({ activeChat: true, activeClassChat: true })
  },
  closeChat: () => {
    set({ activeClassChat: false })
    setTimeout(() => {
      set({ activeChat: false })
    }, 250)
  },
  disLinks: ( value: boolean ) => {
    set({ disableLinks: value })
  }
}))