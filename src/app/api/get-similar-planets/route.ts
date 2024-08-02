import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { similarPlanetsSchema } from './schema'
import { getPlanets } from '@/lib/starwars-api'
import { Planet } from '@/interfaces'

export const maxDuration = 30

const data = await getPlanets()
const planets: Planet[] = data.results

export async function POST( req: Request ) {
  const { planet, planetName } = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: similarPlanetsSchema,
    prompt: `
    *  Analizar todos estos planetas: ${ planets }, y seleccionar 3 planetas que tengan similitud con este planeta: ${ planetName }, ya sea por su Periodo de Rotación, Perioro Orbital, Diámetro, Clima, Gravedad, Terreno, Porcentaje de Agua en su superficie y/o Población, esta es la información detallada del planeta a comparar: ${ planet }.
    *  Enviar el Nombre de cada Planeta.
    *  Enviar el ID de cada planeta (El ID es el número al final de la URL, por ejemplo el ID de Tatooine sería el "1" -> "url": "https://swapi.dev/api/planets/1/")
    *  Hacer un resumen del por qué los planetas que elegiste son similares a ${ planetName }.
    *  Enviar una calificación del 0 al 100 de qué tan similares son los planetas (Enviar solo en número)
    *  Generar la información en Español`
  })

  return result.toTextStreamResponse()
}