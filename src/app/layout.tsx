import type { Metadata } from 'next'
import { Antonio } from 'next/font/google'
import '@fontsource-variable/inter'
import './globals.css'
import './globals.scss'
import { Background, ToastNotification } from '@/components'
import { Providers } from './provider'

const antonio = Antonio({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-antonio",
})

export const metadata: Metadata = {
  title: "Rebel Empire AI",
  description: "Explora a fondo el universo de Star Wars con Rebel Empire AI. Elige entre Luke Skywalker, Darth Vader o el Maestro Yoda y chatea con cualquier de ellos. Obtén información de cada personaje, planeta y/o nave escencial y también información específica generada por IA."
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`overflow-hidden ${ antonio.variable }`} suppressHydrationWarning={ true }>
        <Providers>
          { children }
        </Providers>
        <Background/>
        <ToastNotification/>
      </body>
    </html>
  )
}
