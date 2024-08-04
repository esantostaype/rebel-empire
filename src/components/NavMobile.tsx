import { Link } from "next-view-transitions"
import Image from "next/image"
import { CloseNav } from './ui/CloseNav'
import { useEffect, useState } from "react"
import { Theme, useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'
import Cookies from 'js-cookie'

interface NavMobileProps {
  activeNav: boolean
  setActiveNav: ( active: boolean ) => void
}

export const NavMobile = ({ activeNav, setActiveNav }: NavMobileProps) => {
  const { theme, setTheme } = useThemeStore()
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    Cookies.set('theme', id, { expires: 365 })
    setTheme(id as Theme)
    setSelectedCharacterId(id)
  }

  const handleCloseNav = () => {
    setActiveNav(false)
  }

  useEffect(() => {
    setSelectedCharacterId(theme)
  }, [theme])

  return (
    <div className={`navMobile ${activeNav ? "active" : ""} fixed w-full h-screen z-[99999] bg-[rgba(0,0,0,0.8)] top-0 flex items-center justify-center backdrop-blur-lg`}>
      <nav className="font-antonio text-2xl text-center font-light tracking-wide uppercase">
        <ul className="flex flex-col gap-6">
          <li><Link href="/" onClick={handleCloseNav}>Inicio</Link></li>
          <li><Link href="/characters" onClick={handleCloseNav}>Personajes</Link></li>
          <li><Link href="/planets" onClick={handleCloseNav}>Planetas</Link></li>
          <li><Link href="/translator" onClick={handleCloseNav}>Traductor</Link></li>
        </ul>
      </nav>
      <ul className={`absolute gap-4 flex bottom-6 right-6 z-[999]`}>
        {mainCharacters.map((character) => (
          <li key={character.id} onClick={() => handleSelect(character.id)} className={`cursor-pointer ${selectedCharacterId === character.id ? 'drop-shadow-[0_0_8px_var(--color-base)]' : ''}`}>
            <div style={{ clipPath: 'path("M88,96H16c-6.2-6.2-9.8-9.8-16-16V8c0-4.4,3.6-8,8-8h72c6.2,6.2,9.8,9.8,16,16v72C96,92.4,92.4,96,88,96z")' }}>
              <Image
                src={character.thumbnail}
                width={128}
                height={128}
                alt={character?.name || 'Star Wars'}
                className="h-24 w-24 object-cover transition-transform duration-300 hover:scale-[1.2]"
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute top-0 right-0 flex items-center justify-center w-16 h-16">
        <button onClick={handleCloseNav}><CloseNav/></button>
      </div>
    </div>
  )
}
