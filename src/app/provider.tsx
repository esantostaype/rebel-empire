'use client'
import { useEffect } from 'react';
import { Theme, useThemeStore } from '@/store/theme-store'
import { ViewTransitions } from 'next-view-transitions'
import Cookies from 'js-cookie'
import { useIsHome, useIsStart } from '@/utils/pathnames'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  const isStart = useIsStart()
  const isHome = useIsHome()
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
      <main className={`${ !isStart ? "pt-16 md:pt-20" : "" } ${ isHome ? "isHome" : "" } app relative min-h-screen theme-${ theme }` }>
        { children }
      </main>
    </ViewTransitions>
    </>
  )
}