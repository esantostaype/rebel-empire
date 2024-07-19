import { CharacterSelection, Header } from '@/components'

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header/>
      <div className="mx-auto max-w-screen-xl min-h-[calc(100vh-240px)] p-40 pb-20 box-content flex items-center justify-center">
        <div className="w-full">
          { children }
          <CharacterSelection/>
        </div>
      </div>
    </>
  )
}
