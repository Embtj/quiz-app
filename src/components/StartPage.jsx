export default function StartPage(props) {
  return (
    <div className="content">
      <h1 className="game-title">Quizzical</h1>
      <p className="game-description">Test your knowledge with 5 random trivia questions!</p>
      <button onClick={props.onClick} className="btn start-btn">Start quiz</button>
    </div>
  )
}
