import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { historySchema } from './schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const { genre, targetAgeGroup, numOfCharacters, cameo } = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: historySchema,
    system: "Eres un experto en contar historias basadas en el universo de Star Wars",
    prompt: `
    Crear una historia completa y bien desarrollada basada en el Universo de Star Wars. La historia debe incluir:

    1. **Título:** Un título atractivo y relevante para la historia.
    2. **Introducción:** Establece el escenario y presenta los personajes principales. Describe brevemente su personalidad y rol en la historia.
    3. **Desarrollo:** Narra los eventos principales de la historia, incluyendo conflictos, aventuras y giros en la trama. Asegúrate de mantener el interés del lector.
    4. **Clímax:** Un momento culminante donde el conflicto principal alcanza su punto máximo.
    5. **Desenlace:** Resuelve el conflicto principal y proporciona una conclusión satisfactoria a la historia.
    6. **Epílogo:** Opcional, proporciona una breve mirada a lo que sucede después de la conclusión de la historia.

    **Parámetros:**
    - **Género:** ${ genre }
    - **Grupo de Edad:** ${ targetAgeGroup }
    - **Número de Personajes:** ${ numOfCharacters }
    - **De alguna manera ${ cameo } debe aparecer en cualquier momento de la historia a modo de Cameo. 

    **Lista de nombres de personajes:**
    - **Hombres:** Zaros Vann, Kaden Thorne, Jax Varro, Laren Sarn, Dax Yara, Miko Renn, Tyron Drake, Ralen Veer, Cyrus Marek, Brin Korr.
    - **Mujeres:** Aria Vel, Lyra Dune, Tessa Korr, Nyra Vale, Sira Thorn, Elara Ren, Maia Voss, Kaida Jinn, Lira Sol, Vira Rynn.
    - **Jedis:** Kael Fane, Lyra Shal, Joran Kai, Sira Vann, Elian Ryn, Mara Tel, Kyra Vos, Rian Tor, Zane Voss, Thalia Marek.
    - **Rebeldes:** Tariq Vos, Selene Wren, Jax Voss, Nyla Ryn, Orin Tal, Kaida Sol, Revan Dorn, Mira Vos, Taren Dune, Zara Ren.
    - **Androides:** RX-12, K-7R1, V4-NT, X3-L0, T9-D2, L3-V0, Q1-T9, B2-XR, M7-TP, G5-R2.
    - **Siths:** Darth Vel, Darth Ren, Darth Voss, Darth Talon, Darth Krynn, Darth Valen, Darth Syra, Darth Rinn, Darth Zorak, Darth Vorn.

    Asegúrate de proporcionar un texto bien estructurado, complejo y detallado en Español. La historia debe ser coherente, emocionante, fiel al universo de Star Wars y contener giros argumentales sorprendentes.

    **Formato requerido:**
    - **Título**
    - **Introducción**
    - **Desarrollo**
    - **Clímax**
    - **Desenlace**
    - **Epílogo** (Opcional)

    **Indicaciones finales:**
    - **No debe aparecer los textos de "Título", "Introducción", "Desarrollo", etc... Solo contar la historia.**
    - **Se deben manejar muchos nombres**
    `
  })

  return result.toTextStreamResponse()
}