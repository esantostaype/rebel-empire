// 'use server'
// import { fetchAllCharacters } from '@/utils/fetch-data'
// import { google } from '@ai-sdk/google'
// import { generateObject } from 'ai';
// import { z } from 'zod';

// export async function getNewCharacterList() {
//   const allCharacters = await fetchAllCharacters();
//   'use server';
//   const { object: newCharacterList } = await generateObject({
//     model: google('models/gemini-1.5-pro-latest'),
//     prompt: `De esta lista de personajes de Star Wars: ${ allCharacters } seleccionar los 20 personajes más importantes y relevantes y generar una nueva lista, todos los datos deben ser traducidos al español.`,
//     schema: z.object({
//       newCharacters: z.array(
//         z.object({
//           name: z.string(),
//           height: z.string(),
//           gender: z.string(),
//           birth_year: z.string(),
//           hair_color: z.string(),
//           skin_color: z.string(),
//           eye_color: z.string(),
//           biography: z.string().describe(`Generar una biografía detallada como si fueras Darth Vader, un personaje de Star Wars.`)
//         })
//       )
//     })
//   });

//   return { characters: newCharacterList.newCharacters }
// }
