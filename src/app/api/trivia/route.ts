import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { triviaSchema } from './schema'

export const maxDuration = 30

export async function POST( req: Request ) {

  const { question, choices, answer, previousQuestions, difficultyLevel } = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: triviaSchema,
    system: "Eres un experto del universo de Star Wars",
    prompt: `
    Crea una pregunta de trivia sobre el universo de Star Wars que sea ligeramente más difícil que la última pregunta de esta lista:
    
    ${previousQuestions.map(( question:string ) => `- ${question}`).join("\n")}.
    
    La dificultad debe incrementarse de manera gradual y razonable, sin hacer que la pregunta sea demasiado difícil en comparación con la última pregunta de la lista.

    **Evitar Repetición:**
    De manera obligatoria la pregunta generada no debe ser igual o similar por ningún motivo a ninguna de las preguntas almacenadas en esta lista:

    ${previousQuestions.map(( question:string ) => `- ${question}`).join("\n")}

**Formato requerido:**
   - **Pregunta:** Genera una pregunta clara y precisa. Asegúrate de que la pregunta no revele la respuesta correcta.
   - **Opciones de respuesta:** Proporciona cinco opciones, una correcta y cuatro incorrectas pero plausibles. Las opciones deben estar en un orden aleatorio.

**Instrucciones adicionales:**

- **Aleatorización de respuestas:** Asegúrate de que la opción correcta esté en una posición aleatoria entre las cinco opciones. Las opciones incorrectas también deben ser distribuidas aleatoriamente.

- **Verificación de respuestas:** Analiza esta pregunta: ${question}, y sus 5 opciones de respuesta: ${choices}. Verifica si ${answer} es la respuesta correcta. Si es correcta, responde con "CORRECT" y proporciona la respuesta correcta. Si es incorrecta, responde con "INCORRECT", proporciona la respuesta correcta y explica por qué es la respuesta correcta.

- **Genera una nueva pregunta ajustada para el nivel de dificultad gradual especificado. Asegúrate de cumplir con todas las instrucciones para evitar problemas de repetición y orden de las opciones.**

    `
  })

  return result.toTextStreamResponse()
}