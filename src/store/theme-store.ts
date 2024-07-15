import { create } from 'zustand'

export type Theme = 'luke' | 'vader' | 'yoda'

interface ThemeStore {
  theme: Theme | null
  setTheme: ( theme: Theme ) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  setTheme: ( theme ) => set({ theme })
}))