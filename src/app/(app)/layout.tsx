import { CharacterSelection, Chat, Header } from '@/components'

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header/>
      <div
        className="animate-fade h-[calc(100vh)] pt-20 overflow-y-auto relative z-[80]"
        style={{ maskImage: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)" }}
      >
        <div className="animate-fade min-h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-15rem)] w-[100%] p-6 md:p-16 lg:p-20 2xl:w-[1280px] xl:w-[1024px] mx-auto flex-1 flex flex-col justify-center xl:box-content">
          <div className="w-full">
            { children }
          </div>
        </div>
      </div>
      <CharacterSelection/>
      <Chat/>
    </>
  )
}