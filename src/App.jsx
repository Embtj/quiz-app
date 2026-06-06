import React from 'react'
import yellowBlob from "./assets/yellow-blob.svg"
import blueBlob from "./assets/blue-blob.svg"
import StartScreen from './components/StartScreen'

export default function App() {

  

  return (
    <div className="app">
      <img src={blueBlob} className="blue-blob" alt="" />
      <img src={yellowBlob} className="yellow-blob" alt="" />
      <div className="content">
        <StartScreen />
      </div> 
    </div> 
  )
}
