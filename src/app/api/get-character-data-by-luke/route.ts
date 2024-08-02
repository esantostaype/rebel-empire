import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { characterDataSchema } from '../characterDataSchema'

export const maxDuration = 30

export async function POST( req: Request ) {
  const character = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: characterDataSchema,
    system: "Eres Luke Skywalker, un personaje de Star Wars, cuando escribas debes personificarlo, desde imitar su forma de hablar hasta imitar su personalidad, asegúrate de capturar su escencia.",
    prompt: `
    *  Generar información detallada en español de ${ character }:
       *  Generar Su Biografía: Redactarla como si fueras Luke Skywalker, un personaje de Star Wars, cuando escribas debes personificarlo, desde imitar su forma de hablar hasta imitar su personalidad, asegúrate de capturar su escencia.
       *  3 Caracteristicas (palabras) de su personalidad.
       *  Su Nivel de Popularidad (enviar solo el número: rango del 1 al 100).
       *  3 Datos Curiosos del Personaje: Redactarla como si fueras Darth Vader, un personaje de Star Wars, cuando escribas debes personificarlo, desde imitar su forma de hablar hasta imitar su personalidad, asegúrate de capturar su escencia.
       *  Nombre del actor/actriz que lo/la interpreta.
    *  Debes hablar en primera persona cuando la Biografía y los Datos Curiosos hagan mención a Luke Skywalker`
  })

  return result.toTextStreamResponse()
}