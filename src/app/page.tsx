import { CharacterSelection } from "@/components"

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h3 className="mb-12 animate-fade-up animate-duration-500 animate-delay-100">¿Con quién deseas emprender esta aventura?</h3>
      <CharacterSelection/>      
    </section>
  )
}