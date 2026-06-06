import { useState, useEffect } from 'react'

export default function QuizPage() {

  const [questions, setQuestions] = useState([])

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setQuestions(data.results)
    })
  }

  useEffect(() => {
    getQuestions()
  }, [])

  const questionElements = questions.map((question, index) => (
    <p className="question" key={index}>{question.question}</p>
  ))

  return (
    <div>
      {questionElements}
      <button className="quiz-button">Check answers</button>
    </div>
  )
}
