import { usePathname } from 'next/navigation'

export const useIsHome = () => {
  const isHome = usePathname() === '/'
  return isHome
}

export const useIsStart = () => {
  const isStart = usePathname() === '/start'
  return isStart
}
