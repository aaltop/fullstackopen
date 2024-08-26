import React from "react"
import ReactDOM from "react-dom/client"

import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

const App = () => {

    // perhaps not very sensible in the long run,
    // but it's a little more DRY than the most obvious alternative
    function dispatch(actionType)
    {
        store.dispatch({ type: actionType })
    }

    return (
        <div>
            <button onClick={() => dispatch("GOOD")}>good</button>
            <button onClick={() => dispatch("OK")}>ok</button>
            <button onClick={() => dispatch("BAD")}>bad</button>
            <button onClick={() => dispatch("ZERO")}>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>ok {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
