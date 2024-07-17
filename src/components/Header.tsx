import { Link } from 'next-view-transitions'
import styles from './Header.module.css'
import { Logo } from "./Logo"

export const Header = () => {
  return (
    <>
    <header className="animate-fade animate-duration-300 flex items-center fixed w-full z-50 top-0 left-0">
      <div className="flex items-center justify-center w-20 h-20"><Link href="/"><Logo/></Link></div>
      <nav className="flex-1 font-antonio font-light tracking-wide uppercase">
        <ul className="flex justify-center gap-12">
          <li><Link href="/characters">Personajes</Link></li>
          <li><Link href="/starships">Naves</Link></li>
          <li><Link href="/planets">Planetas</Link></li>
          <li><Link href="/mini-histories">Mini Historias</Link></li>
        </ul>
      </nav>
      <div  className="flex items-center justify-center w-20 h-20"></div>
    </header>
    <div className="opacity-15 relative z-40">
      <div className="animate-fade animate-duration-300">
        <span className="h-px left-0 fixed w-full top-20 z-40 bg-white"></span>
        <span className="h-screen left-20 fixed w-px top-0 z-40 bg-white"></span>
        <span className="h-screen right-20 fixed w-px top-0 z-40 bg-white"></span>
      </div>
    </div>
    </>
  )
}
