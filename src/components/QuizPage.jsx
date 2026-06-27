import { useState, useEffect } from 'react'
import he from "he"
import clsx from "clsx"

export default function QuizPage() {

  // State
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Derived
  const score = results.filter(value => value === true).length

  function shuffle(array) {
    const shuffled = [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }

  // Get data from api and format it
  async function getQuestions() {
    try {
      setLoading(true)
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")

      if (res.status === 429) {
        throw new Error("Too many requests, please wait a moment and try again")
      }

      if (!res.ok) {
        throw new Error("Something went wrong, please try again")
      }

      const data = await res.json()
      console.log(data)
      const formattedQuestions = data.results.map(question => {
        const correct = he.decode(question.correct_answer)

        const incorrect = question.incorrect_answers.map(answer =>
          he.decode(answer)
        )

        return {
          question: he.decode(question.question),
          correct_answer: correct,
          answers: shuffle([correct, ...incorrect])
        }
      })
      setQuestions(formattedQuestions)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])



  function handleSelectAnswer(questionIndex, answerIndex) {
    setSelectedAnswers(prev => {
      return {
        ...prev,
        [questionIndex]: answerIndex
      }
    })
  }

  function handleCheckAnswer() {
    const resultsArray = []

    questions.forEach((question, index) => {
      const chosenAnswer = question.answers[selectedAnswers[index]]
      const correctAnswer = question.correct_answer
      if (chosenAnswer === correctAnswer) {
        resultsArray.push(true)
      } else {
        resultsArray.push(false)
      }
    })
    setResults(resultsArray)
  }

  const questionElements = questions.map((question, questionIndex) => (
    <div key={questionIndex} className="question-element">
      <p className="question">{question.question}</p>
      <div className="answers-container">
        {question.answers.map((answer, answerIndex) => {
          const answersClass = clsx("answers", {
            "is-selected": selectedAnswers[questionIndex] === answerIndex,
            correct: results.length && question.correct_answer === answer,
            "chosen-incorrect": results.length && selectedAnswers[questionIndex] === answerIndex && question.correct_answer !== answer,
            incorrect: results.length && selectedAnswers[questionIndex] !== answerIndex && question.correct_answer !== answer
          })

          return (
            <button
              key={answerIndex}
              className={answersClass}
              disabled={results.length && answer !== question.correct_answer}
              onClick={() => handleSelectAnswer(questionIndex, answerIndex)}
            >
              {answer}
            </button>
          )
        })}
      </div>
    </div>
  ))

  function handleReset() {
    setQuestions([])
    setSelectedAnswers({})
    setResults([])
    getQuestions()
  }

  if (loading) {
    return <p aria-live="polite" className="loading-message content">Loading...</p>
  }

  if (error) {
    return (
      <div className="content">
        <p aria-live="assertive" className="error-message">{error}</p>
        <button onClick={() => {
          setError(null)
          getQuestions()
        }}
          className="btn score-button">Try again</button>
      </div>
    )
  }

  return (
    <div className="content">
      {questionElements}
      {results.length === 0 ?
        <button onClick={() => handleCheckAnswer()} className="btn quiz-button">Check answers</button>
        :
        <div className="score-container">
          <p className="score-text">You scored {score}/{questions.length} correct answers</p>
          <button onClick={() => handleReset()} className="btn score-button">Play again</button>
        </div>
      }
    </div>
  )
}
