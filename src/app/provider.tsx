'use client'
import { useEffect } from 'react';
import { Theme, useThemeStore } from '@/store/theme-store'
import { ViewTransitions } from 'next-view-transitions'
import Cookies from 'js-cookie'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  const { theme, setTheme } = useThemeStore()
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
      </main>
    </ViewTransitions>
    </>
  )
}