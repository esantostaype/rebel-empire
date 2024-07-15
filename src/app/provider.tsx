'use client'
import { useEffect } from 'react';
import { Theme, useThemeStore } from '@/store/theme-store'
import { ViewTransitions } from 'next-view-transitions'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if ( savedTheme ) {
      setTheme( savedTheme as Theme )
    }
  }, [ setTheme ])
  return (
    <>
    <ViewTransitions>
      <main className={ `app theme-${ theme }` }>
        { children }
      </main>
    </ViewTransitions>
    </>
  )
}