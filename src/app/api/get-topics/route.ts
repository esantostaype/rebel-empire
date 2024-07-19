import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
  baseURL: 'https://api.perplexity.ai/',
});

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  // Realiza la solicitud a la API para obtener el texto generado
  const result = await streamText({
    model: perplexity('llama-3-sonar-large-32k-online'),
    prompt: 'Generar una lista random de 4 tópicos interesantes por el cual partir una conversación con Maestro Yoda, un personaje de Star Wars, servirán para generar una lista de botones al chat de este personaje',
  });

  // Convertir el resultado a texto
  const text = await result.text;

  // Procesar el texto para convertirlo en un array
  // Aquí asumimos que la respuesta es una lista separada por comas o saltos de línea
  const topics = text
    .trim() // Eliminar espacios en blanco alrededor
    .split('\n') // Dividir por saltos de línea, o usa ',' si el separador es una coma
    .filter(topic => topic.trim() !== ''); // Eliminar entradas vacías

  return new Response(JSON.stringify(topics), {
    headers: { 'Content-Type': 'application/json' },
  });
}
