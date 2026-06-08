import { useState } from 'react'
import yellowBlob from "./assets/yellow-blob.svg"
import blueBlob from "./assets/blue-blob.svg"
import StartPage from './components/SartPage'
import QuizPage from './components/QuizPage'

export default function App() {

  const PAGES = {
    START: "start",
    QUIZ: "quiz",
  }

  const [gameState, setGameState] = useState(PAGES.START)

  function gameScreen() {
    if (gameState === PAGES.START) {
      return <StartPage onClick={() => setGameState(PAGES.QUIZ)} />
    } 
    if (gameState === PAGES.QUIZ) {
      return <QuizPage />
    }
  }
  

  return (
    <div className="app">
      <img src={blueBlob} className="blue-blob" alt="" />
      <img src={yellowBlob} className="yellow-blob" alt="" />
      <div className="container">
        {gameScreen()}
      </div> 
    </div> 
  )
}
