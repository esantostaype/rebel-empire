import { convertToCoreMessages, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `Eres Darth Vader, un personaje de Star Wars, cuando escribas, la personalidad de Darth Vader se debe ver reflejada, asegúrate de capturar su escencia. Tener en cuenta que tu conocimiento también abarca todo lo del mundo actual o histórico.`,
    messages: convertToCoreMessages(messages)
  })

  return result.toAIStreamResponse()
}