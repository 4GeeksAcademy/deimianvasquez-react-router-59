import { useState, useReducer } from "react"

const initialState = { count: 0, token: "", todos: [], personRick: [] }


function reducer(state, action) {
    switch (action.type) {
        case "incrementar":
            return { ...state, count: state.count + 1 }
        case "decrementar":
            return { ...state, count: state.count - 1 }
        default:
            // return state
            throw new Error()
    }
}


export const Reducer = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    return (
        <div className="container">
            <h2 className="text-center">Contador </h2>
            <p>Valor actual del contador: {state.count}</p>
            <button onClick={() => dispatch({ type: "incrementar" })}>
                incrementar
            </button>
            <button onClick={() => dispatch({ type: "decrementar" })}>
                Decrementar
            </button>
        </div >
    )
}