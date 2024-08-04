'use client'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { Logo } from "./Logo"
import { useChatStore } from '@/store/chat-store'
import { BurgerNav } from './ui/BurgerNav';
import { Theme, useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { CloseNav } from './ui/CloseNav'

export const Header = () => {  
  const { disableLinks, closeChat } = useChatStore()
  const { theme, setTheme } = useThemeStore()
  const [ selectedCharacterId, setSelectedCharacterId ] = useState<string | null>( null )
  const [ activeNav, setActiveNav ] = useState<boolean>( false )

  useEffect(() => {
    setSelectedCharacterId( theme )
  }, [ theme ])

  const handleCloseChat = () => {
    closeChat()
    setActiveNav( false )
  }
  const handleSelect = ( id: string ) => {
    Cookies.set('theme', id, { expires: 365 })
    setTheme( id as Theme )
    setSelectedCharacterId( id )
  }
  const handleOpenNav = () => {
    setActiveNav( true )
  }
  const handleCloseNav = () => {
    setActiveNav( false )
  }
  return (
    <>
    <header className={`${ disableLinks ? "disabled" : "" } animate-fade animate-duration-300 flex items-center justify-between fixed w-full z-[99] top-0 left-0`}>
      <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20"><Link href="/"><Logo/></Link></div>
      <nav className="hidden md:block flex-1 font-antonio font-light tracking-wide uppercase">
        <ul className="flex justify-center gap-12">
          <li><Link href="/characters" onClick={ handleCloseChat }>Personajes</Link></li>
          <li><Link href="/planets" onClick={ handleCloseChat }>Planetas</Link></li>
          <li><Link href="/translator" onClick={ handleCloseChat }>Traductor</Link></li>
        </ul>
      </nav>
      <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
        <button className="block md:hidden" onClick={ () => handleOpenNav() }><BurgerNav/></button>
      </div>
      <div className="opacity-15 absolute">
        <div className="animate-fade animate-duration-300">
          <span className="h-px left-0 fixed w-full top-16 md:top-20 z-40 bg-white"></span>
          <span className="hidden xl:block h-screen left-20 fixed w-px top-0 z-40 bg-white"></span>
          <span className="hidden xl:block h-screen right-20 fixed w-px top-0 z-40 bg-white"></span>
        </div>
      </div>
    </header>
    <div className={`navMobile ${ activeNav ? "active" : "" } fixed w-full h-screen z-[99999] bg-[rgba(0,0,0,0.8)] top-0 flex items-center justify-center backdrop-blur-lg`}>
      <nav className="font-antonio text-2xl text-center font-light tracking-wide uppercase">
        <ul className="flex flex-col gap-6">
          <li><Link href="/" onClick={ handleCloseChat }>Inicio</Link></li>
          <li><Link href="/characters" onClick={ handleCloseChat }>Personajes</Link></li>
          <li><Link href="/planets" onClick={ handleCloseChat }>Planetas</Link></li>
          <li><Link href="/translator" onClick={ handleCloseChat }>Traductor</Link></li>
        </ul>
      </nav>
      <ul className={`${ disableLinks ? "disabled" : "" } absolute gap-4 flex bottom-6 right-6 z-[999] vt-characters`}>
        { mainCharacters.map(( character ) => (
          <li key={ character.id } onClick={ () => handleSelect( character.id ) } className={`cursor-pointer ${selectedCharacterId === character.id ? 'drop-shadow-[0_0_8px_var(--color-base)]' : ''}`}>
            <div style={{ clipPath: 'path("M88,96H16c-6.2-6.2-9.8-9.8-16-16V8c0-4.4,3.6-8,8-8h72c6.2,6.2,9.8,9.8,16,16v72C96,92.4,92.4,96,88,96z")' }}>
              <Image
                src={ character.thumbnail }
                width={ 128 }
                height={ 128 }
                alt={ character?.name || 'Star Wars' }
                className="h-24 w-24 object-cover transition-transform duration-300 hover:scale-[1.2]"
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute top-0 right-0 flex items-center justify-center w-16 h-16">
        <button className="" onClick={ () => handleCloseNav() }><CloseNav/></button>
      </div>
    </div>
    </>
  )
}