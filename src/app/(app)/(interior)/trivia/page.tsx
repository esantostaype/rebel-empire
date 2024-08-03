'use client';

import { triviaSchema } from '@/app/api/trivia/schema'
import { Trivia } from '@/interfaces'
import { experimental_useObject } from '@ai-sdk/react'
import { useState } from 'react'

export default function Chat() {

  const [ viewTrivia, setViewTrivia ] = useState( false )
  const [ previousQuestions, setPreviousQuestions ] = useState<string[]>([])

  const { object, submit } = experimental_useObject({
    api: '/api/trivia',
    schema: triviaSchema
  })

  const initialQuestion = "¿Cómo se llama el personaje principal de Star Wars interpretado por Mark Hamill?"
  const initialChoices = [
    { item: "Luke Skywalker" },
    { item: "Han Solo" },
    { item: "Darth Vader" },
    { item: "Obi-Wan Kenobi" },
    { item: "Anakin Skywalker" }
  ]

  const handleStartTrivia = () => {
    setViewTrivia( true )
    setPreviousQuestions( prev => [ ...prev, initialQuestion ] )
  }

  const handleTrivia = ({ question, choices, answer }: Trivia ) => {
    submit({ question, choices, answer, previousQuestions })
    if (question) {
      setPreviousQuestions( prev => [ ...prev, question ] )
    }
  }

  return (
    <>
      { 
        viewTrivia ? (     
          object && object.question && object.choices
          ? (
            <>
            <h1>{ object.question }</h1>
            <ul>
              { object?.choices?.map(( item, index ) => (
                <li key={ index }>
                  <button onClick={() => handleTrivia({ question: object?.question, choices: object?.choices, answer: item?.item })}>
                      { item?.item }
                    </button>
                </li>
              ))}
            </ul>
            <div className="bg-accent p-4 text-white">{ object.correctAnswer }</div>
            <div>{ object.descriptionCorrectAnswer }</div>
            <div className="text-accent mt-8">
            { object.response && object.response === 'CORRECT' ? 'Correcto' : 'Incorrecto' }
            </div>
            {previousQuestions.length > 0 && (
              <div>
                <h2>Preguntas Mostradas:</h2>
                <ul>
                  {previousQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
            </>
          ) : (
            <>
            <h1>¿Cómo se llama el personaje principal de Star Wars interpretado por Mark Hamill?</h1>
            <ul>
              { initialChoices.map(( item, index ) => (
                <li key={ index }>
                  <button onClick={() => handleTrivia({ question: initialQuestion, choices: initialChoices, answer: item?.item })}>
                    { item?.item }
                  </button>
                </li>
              ))}
            </ul>
            </>
          )
        ):
        <button
          onClick={() => handleStartTrivia()}
          className="text-left bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] transition-all py-6 px-10 flex-1 rounded-md backdrop-blur-lg"
        >
          Comenzar Trivia
        </button>    
      }
    </>
  );
}
