import Cookies from 'js-cookie'

export const setThemeCookie = ( theme: string ) => {
  Cookies.set( 'theme', theme, { expires: 365 } )
}

export const getThemeCookie = (): string | undefined => {
  return Cookies.get('theme')
}

export const removeThemeCookie = () => {
  Cookies.remove('theme')
}