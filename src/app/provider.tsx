'use client'
import { useEffect } from 'react';
import { Theme, useThemeStore } from '@/store/theme-store'
import { ViewTransitions } from 'next-view-transitions'
import { useChatStore } from '@/store/chat-store';
import { Chat } from '@/components';
import Cookies from 'js-cookie'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  const { theme, setTheme } = useThemeStore()  
  const { activeChat } = useChatStore
  ()
  useEffect(() => {
    const savedTheme = Cookies.get('theme')
    if ( savedTheme ) {
      setTheme( savedTheme as Theme )
    }
  }, [ theme, setTheme ])
  return (
    <>
    <ViewTransitions>
      <main className={ `app relative min-h-screen theme-${ theme }` }>
        { children }
        {
          activeChat && <Chat/>
        }
      </main>
    </ViewTransitions>
    </>
  )
}