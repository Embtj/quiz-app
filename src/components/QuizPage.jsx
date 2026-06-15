import { useState, useEffect } from 'react'
import he from "he"

export default function QuizPage() {

  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})

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
    questions.forEach((question, index) => {
      const chosenAnswer = question.answers[selectedAnswers[index]]
      const correctAnswer = question.correct_answer
      if (chosenAnswer === correctAnswer) {
        console.log("Correct!")
      } else {
        console.log("Wrong!")
      }
    })
  }

  const questionElements = questions.map((question, questionIndex) => (
    <div key={questionIndex} className="question-element">
      <p className="question">{question.question}</p>
      <div className="answers-container">
        {question.answers.map((answer, answerIndex) => (
          <button
            key={answerIndex}
            className={`answers ${selectedAnswers[questionIndex] === answerIndex ? "is-selected" : ""}`}
            onClick={() => handleSelectAnswer(questionIndex, answerIndex)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  ))

  return (
    <div className="content">
      {questionElements}
      <button onClick={() => handleCheckAnswer()} className="btn quiz-button">Check answers</button>
    </div>
  )
}
