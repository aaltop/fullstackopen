import { useReducer } from "react"
import { NotificationContextProps } from "./NotificationContext"



function getContextProvider({ context, reducer, initialState })
{

    return function Context(props)
    {
        const [state, dispatch] = useReducer(reducer, initialState)

        return (
            <context.Provider value={[state, dispatch]}>
                {props.children}
            </context.Provider>
        )

    }

}


export const NotificationContextProvider = getContextProvider(NotificationContextProps)