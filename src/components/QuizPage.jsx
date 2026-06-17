import { useState, useEffect } from 'react'
import he from "he"
import clsx from "clsx"

export default function QuizPage() {

  // State
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [results, setResults] = useState([])

  // Derived
  const score = results.filter(value => value === true).length

  // Get data from api and format it
  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const formattedQuestions = data.results.map(question => {
          const correct = he.decode(question.correct_answer)

          const incorrect = question.incorrect_answers.map(answer =>
            he.decode(answer)
          )

          return {
            question: he.decode(question.question),
            correct_answer: correct,
            answers: [correct, ...incorrect]
          }
        })
        setQuestions(formattedQuestions)
      })
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
