import NotificationContextProps from "./NotificationContext"

/* eslint-disable react/prop-types */
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


export const NotificationContextProvider = createContext(NotificationContextProps)