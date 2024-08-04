'use client'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { Logo } from "./Logo"
import { useChatStore } from '@/store/chat-store'
import { BurgerNav } from './ui/BurgerNav'
import { useState } from 'react'
import { NavMobile } from './NavMobile'

export const Header = () => {  
  const { disableLinks, closeChat } = useChatStore()
  const [ activeNav, setActiveNav ] = useState<boolean>( false )

  const handleCloseChat = () => {
    closeChat()
    setActiveNav( false )
  }
  const handleOpenNav = () => {
    setActiveNav( true )
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
    <NavMobile activeNav={ activeNav } setActiveNav={ setActiveNav }/>
    </>
  )
}