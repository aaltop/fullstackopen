/* eslint-disable react/prop-types */
// This is from my solution for the previous part's project 03
import AnecdotesContextProps from "./AnecdotesContext";

import { useReducer } from "react";


function createContext({ context, reducer, initialState })
{
    return function ContextProvider(props)
    {
        const [state, dispatch] = useReducer(reducer, initialState)
    
        return (
            <context.Provider value={[state, dispatch]}>
                {props.children}
            </context.Provider>
        )
    }
}


export const AnecdotesContextProvider = createContext(AnecdotesContextProps)