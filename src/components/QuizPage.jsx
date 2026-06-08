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


  const formattedQuestions = questions.map(question => {
    return {
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [
        question.correct_answer,
        ...question.incorrect_answers
      ]
    }
  })

  const questionElements = formattedQuestions.map((question, index) => (
    <div key={index} className="question-element">
    <p className="question">{question.question}</p>
    <div className="answers-container">
      {question.answers.map((answer, index) => (
        <button key={index} className="answers">{answer}</button>
      ))}
    </div>
    </div>
  ))

  

  return (
    <div className="content">
      {questionElements}
      <button className="btn quiz-button">Check answers</button>
    </div>
  )
}
