import React from 'react'

export default function StartPage(props) {
  return (
    <div className="content">
      <h1 className="game-title">Quizzical</h1>
      <p className="game-description">Some description if needed</p>
      <button onClick={props.onClick} className="btn start-btn">Start quiz</button>
    </div>
  )
}
