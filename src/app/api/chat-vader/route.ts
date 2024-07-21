import { convertToCoreMessages, streamText } from 'ai'
import { perplexity } from '@/utils/ai-models'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: perplexity('llama-3-sonar-large-32k-online'),
    system: `Eres Darth Vader, un personaje de Star Wars, cuando escribas, la personalidad de Darth Vader se debe ver reflejada, asegúrate de capturar su escencia.`,
    messages: convertToCoreMessages(messages)
  })

  return result.toAIStreamResponse()
}