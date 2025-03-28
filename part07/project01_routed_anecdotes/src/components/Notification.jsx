import { NotificationContext } from "../contexts/NotificationContext"

import { useContext } from "react"


const Notification = () => {
    const [ state ] = useContext(NotificationContext)
        
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    if (!state.message) return null

    return (
        <div style={style}>
            {state.message}
        </div>
    )
}

export default Notification
