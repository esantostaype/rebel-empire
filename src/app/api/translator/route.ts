import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { translatorSchema } from './schema'

export const maxDuration = 30

export async function POST(req: Request) {

  const { language, phrase } = await req.json()

  const languageDetails = {
    huttese: "Huttese es el idioma hablado por los Hutts, caracterizado por su sonido gutural y tono profundo. Se usa en el comercio y la comunicación entre criminales.",
    shyriiwook: "Shyriiwook es el idioma de los Wookiees, conocido por su sonido áspero y gruñido. Es muy expresivo y rítmico, utilizado por la especie Wookiee.",
    droid: "Droid es el idioma de los droides, compuesto por una serie de pitidos y chirridos. Es un lenguaje técnico y preciso, que los droides usan para comunicarse entre ellos.",
    mandalorian: "Mandalorian es el idioma de los Mandalorianos, con un sonido fuerte y marcial. Es un idioma que refleja la cultura guerrera y la historia de los Mandalorianos.",
    english: "Inglés es un idioma de la Tierra, usado comúnmente en la comunicación global, con una estructura gramatical clara y vocabulario extenso.",
    binary: "Binario es un lenguaje de programación compuesto por ceros y unos. Es utilizado por las máquinas y sistemas informáticos para procesar datos."
  }

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: translatorSchema,
    system: "Eres un experto en traducción de idiomas del universo de Star Wars y en lenguajes técnicos.",
    prompt: `
      Traduce la siguiente frase al idioma especificado. El idioma a traducir es ${ language }, y la frase es: "${ phrase }". 

      Detalles del idioma:
      - Huttese: ${languageDetails.huttese}
      - Shyriiwook: ${languageDetails.shyriiwook}
      - Droid: ${languageDetails.droid}
      - Mandalorian: ${languageDetails.mandalorian}
      - Inglés: ${languageDetails.english}
      - Binario: ${languageDetails.binary}
      
      Asegúrate de que la traducción capture las características únicas de cada idioma.
    `
  })

  return result.toTextStreamResponse()
}
