'use client';

import { useState, useEffect } from 'react'
import { getTopics } from '@/actions/generate-topics'
import { useThemeStore } from '@/store/theme-store'
import mainCharacters from '@/data/main-characters.json'

type CharacterId = 'luke' | 'vader' | 'yoda'

interface Topic {
  item: string
}

interface GetTopicsResponse {
  topics: {
    topics: Topic[]
  }
}

interface TopicsProps {
  onTopicClick: (question: string) => void;
}

export const Topics = ({ onTopicClick }: TopicsProps) => {
  const [ topics, setTopics ] = useState<string[]>([])
  const [ loading, setLoading ] = useState(true)
  const { theme } = useThemeStore() as { theme: CharacterId | null }
  const character = mainCharacters.find( char => char.id === theme )

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading( true )
        const response: GetTopicsResponse = await getTopics(
          `Generar una lista random en español de 4 tópicos interesantes por el cual partir una conversación con ${character?.name}, un personaje de Star Wars, servirán para generar una lista de botones al chat de este personaje. La personalidad de ${character?.name} se debe ver reflejada, asegúrate de capturar su esencia.`
        )
        const topicsArray = response.topics.topics.map(topic => topic.item)
        setTopics(topicsArray)
      } catch ( error ) {
        console.error('Error fetching topics:', error)
      } finally {
        setLoading( false )
      }
    }

    fetchTopics()
  }, [character?.name])

  return (
    <>
    { loading ? (
      <div className='flex flex-wrap flex-1 gap-4'>
        { Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-2 flex-[0_0_calc(50%-0.5rem)] p-6 bg-[rgba(255,255,255,0.04)] animate-pulse rounded-md"
          >
            <div className="h-4 bg-[rgba(255,255,255,0.16)] rounded w-[100%]"></div>
            <div className="h-4 bg-[rgba(255,255,255,0.16)] rounded w-[70%]"></div>
          </div>
        ))}
      </div>
    ) : (
      <ul className='flex flex-wrap gap-4 '>
        { topics.map((topic, index) => (
          <li key={index} className="flex flex-col flex-[0_0_calc(50%-0.5rem)]">
            <button
              onClick={() => onTopicClick(topic)}
              className="text-center bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-all py-6 px-10 flex-1 rounded-md backdrop-blur-lg"
            >
              {topic}
            </button>
          </li>
        ))}
      </ul>
    )}
    </>
  )
}