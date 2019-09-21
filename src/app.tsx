import React from "react"
import ReactDOM from "react-dom"
import "normalize.css"
import "./app.less"

export const App = () => {
  return (
    <>
      <header className="title">app</header>
      <main>helloworld</main>
      <footer>footer</footer>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
