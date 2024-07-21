import { CharacterSelection, Chat, Header } from '@/components'

export default function InteriorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="">
        { children }
      </section>
    </>
  )
}