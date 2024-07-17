import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CharacterSelection } from "./CharacterSelection"

export default function StartPage() {

  const theme = cookies().get('theme')
  if ( theme ) {
    redirect('/')
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen relative z-50">
      <h3 className="mb-12 animate-fade-up animate-duration-500 animate-delay-100">¿Con quién deseas emprender esta aventura?</h3>
      <CharacterSelection/>
    </section>
  )
}